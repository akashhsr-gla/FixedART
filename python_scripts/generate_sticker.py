from PIL import Image
import sys

def generate_sample_sticker(sticker_path, qr_code_path, logo_path, output_path):
    try:
        # Open the sample sticker template, QR code, and logo images
        print(f"Opening sticker template from {sticker_path}")
        sticker = Image.open(sticker_path)

        print(f"Opening QR code from {qr_code_path}")
        qr_code = Image.open(qr_code_path)
        qr_code = qr_code.convert("RGBA")  # Ensure transparency handling

        print(f"Opening logo from {logo_path}")
        logo = Image.open(logo_path)
        logo = logo.convert("RGBA")  # Ensure transparency handling

        # Print dimensions for debugging
        print(f"Sticker dimensions: {sticker.size}")
        print(f"QR code dimensions: {qr_code.size}")
        print(f"Logo dimensions: {logo.size}")

        # Resize images as needed
        qr_code = qr_code.resize((100, 100))  # Adjust QR size as necessary
        logo = logo.resize((200, 100))  # Adjust logo size as necessary

        # Paste the QR code and logo onto the sticker
        sticker.paste(qr_code, (20, 400), qr_code)  # Position QR at bottom-left
        sticker.paste(logo, (220, 20), logo)  # Position logo at top-center

        # Save the final sticker
        sticker.save(output_path)
        print(f"Sample sticker generated successfully! Saved at {output_path}")
    except Exception as e:
        print(f"Error generating sample sticker: {e}")

if __name__ == "__main__":
    # Example usage: python generateSampleSticker.py ss1.png qr_code.png logo.png output.png
    generate_sample_sticker(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4])
