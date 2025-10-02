from PIL import Image, ImageDraw, ImageFont
import os

def create_hero_image(output_path, text):
    width, height = 1200, 400
    img = Image.new("RGB", (width, height), color = (173, 216, 230)) # Light blue
    d = ImageDraw.Draw(img)

    try:
        # Try to load a common font, or use default if not found
        font = ImageFont.truetype("DejaVuSans-Bold.ttf", 60) # A common Linux font
    except IOError:
        font = ImageFont.load_default() # Fallback to default font
        print("Warning: DejaVuSans-Bold.ttf not found, using default font.")

    bbox = d.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    x = (width - text_width) / 2
    y = (height - text_height) / 2

    d.text((x, y), text, fill=(0, 0, 0), font=font)
    img.save(output_path)

if __name__ == "__main__":
    output_dir = "Criando-um-Gerador-de-QR-Codes-para-E-commerces-com-Node.js/assets"
    os.makedirs(output_dir, exist_ok=True)
    create_hero_image(os.path.join(output_dir, "hero_image.png"), "Gerador de QR Codes para E-commerce")

