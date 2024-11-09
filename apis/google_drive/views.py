import os
import pickle
from django.shortcuts import render, redirect
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from google.auth.transport.requests import Request

# Path to the credentials file
CLIENT_SECRET_FILE = 'credentials.json'
SCOPES = ['https://www.googleapis.com/auth/drive.file']

def authenticate_user(request):
    """Authenticate user with Google and get credentials."""
    credentials = None

    # The token.pickle file stores the user's access and refresh tokens.
    # It is created automatically when the authorization flow completes for the first time.
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            credentials = pickle.load(token)

    # If there are no (valid) credentials available, let the user log in.
    if not credentials or not credentials.valid:
        if credentials and credentials.expired and credentials.refresh_token:
            credentials.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                CLIENT_SECRET_FILE, SCOPES)
            credentials = flow.run_local_server(port=0)

        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(credentials, token)

    # Create an authorized Google API client
    drive_service = build('drive', 'v3', credentials=credentials)
    return drive_service


def upload_file_to_drive(request):
    """Uploads a PDF to Google Drive."""
    if request.method == "POST" and request.FILES.get('file'):
        file = request.FILES['file']
        drive_service = authenticate_user(request)
        
        # Create a MediaFileUpload instance for the PDF file
        media = MediaFileUpload(file.name, mimetype='application/pdf')

        # Create a file metadata (name, parent folder, etc.)
        file_metadata = {
            'name': file.name,  # Name of the file in Google Drive
            'mimeType': 'application/pdf'
        }

        # Upload the file to Google Drive
        uploaded_file = drive_service.files().create(
            body=file_metadata,
            media_body=media,
            fields='id, name'
        ).execute()

        # Return the file ID or some confirmation message
        return render(request, 'google_drive/upload_success.html', {
            'file_name': uploaded_file['name'],
            'file_id': uploaded_file['id']
        })

    return render(request, 'google_drive/upload.html')
