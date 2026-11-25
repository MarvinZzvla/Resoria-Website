from PIL import Image
from pathlib import Path

assets = Path(r"C:\Users\pc\.cursor\projects\c-Users-pc-Desktop-Proyectos-Personales-Resoria-Website\assets")
out = Path(r"c:\Users\pc\Desktop\Proyectos Personales\Resoria-Website\public\images\allies")
out.mkdir(parents=True, exist_ok=True)

mapping = {
    "Gemini_Generated_Image_yj0cajyj0cajyj0c-7315280e-77ef-42f1-bb90-b0e5d683d401.jpg": "portico.png",
    "Gemini_Generated_Image_v2fm4xv2fm4xv2fm-32e21857-bc48-4e97-9dcd-112606bd24ef.jpg": "krizar.png",
    "Gemini_Generated_Image_pzifmcpzifmcpzif-7d89b493-3c13-4bf0-b9c0-e934a499847e.jpg": "rinconcito-encantador.png",
    "Gemini_Generated_Image_qimgxxqimgxxqimg-dce495cf-a579-4778-90e7-056cd7340406.jpg": "paris-rica-tentacion.png",
    "Gemini_Generated_Image_j0y368j0y368j0y3-a95645ef-e27c-4308-8c78-371b770e1edb.jpg": "flor-de-pochote.png",
    "Gemini_Generated_Image_jpqumqjpqumqjpqu-f550806a-5abc-4f46-a5c0-208e0ff8acb7.jpg": "barber-benthi.png",
    "Gemini_Generated_Image_ua9yidua9yidua9y-7e67ae4a-a805-4b6d-a911-d70be2f14e0b.jpg": "ofemarket.png",
    "Gemini_Generated_Image_rfsfwprfsfwprfsf-ebce2cd3-ff6f-4d69-b8f6-b3126c41f4d0.jpg": "radio-oxigeno.png",
}

BG_CUTOFF = 95
CANVAS_W = 480
CANVAS_H = 240
TARGET_H = 180


def luminance(r: int, g: int, b: int) -> float:
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def force_white_alpha(img: Image.Image) -> Image.Image:
    """Keep only alpha; every visible pixel becomes pure white."""
    img = img.convert("RGBA")
    pixels = img.load()
    width, height = img.size
    for y in range(height):
        for x in range(width):
            _r, _g, _b, a = pixels[x, y]
            if a < 8:
                pixels[x, y] = (255, 255, 255, 0)
            else:
                pixels[x, y] = (255, 255, 255, a)
    return img


def to_white_transparent(src: Path) -> Image.Image:
    img = Image.open(src).convert("RGBA")
    pixels = img.load()
    width, height = img.size

    for y in range(height):
        for x in range(width):
            r, g, b, _a = pixels[x, y]
            lum = luminance(r, g, b)
            if lum <= BG_CUTOFF:
                pixels[x, y] = (255, 255, 255, 0)
            else:
                # Map brightness to alpha; darker logo edges stay softer
                alpha = int(max(0, min(255, ((lum - BG_CUTOFF) / (255 - BG_CUTOFF)) * 255)))
                pixels[x, y] = (255, 255, 255, alpha)

    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)
    return force_white_alpha(img)


def fit_on_canvas(logo: Image.Image) -> Image.Image:
    lw, lh = logo.size
    scale = TARGET_H / lh
    if lw * scale > CANVAS_W * 0.92:
        scale = (CANVAS_W * 0.92) / lw
    new_w = max(1, int(lw * scale))
    new_h = max(1, int(lh * scale))
    resized = logo.resize((new_w, new_h), Image.Resampling.LANCZOS)
    resized = force_white_alpha(resized)

    canvas = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    x = (CANVAS_W - new_w) // 2
    y = (CANVAS_H - new_h) // 2
    canvas.paste(resized, (x, y), resized)
    return force_white_alpha(canvas)


for src_name, dest_name in mapping.items():
    src = assets / src_name
    if not src.exists():
        print(f"MISSING {src_name}")
        continue
    processed = fit_on_canvas(to_white_transparent(src))
    dest = out / dest_name
    processed.save(dest, "PNG", optimize=True)
    samples = list(processed.getdata())
    dark = sum(1 for r, g, b, a in samples if a > 10 and luminance(r, g, b) < 250)
    opaque = sum(1 for *_rgb, a in samples if a > 10)
    corner = processed.getpixel((0, 0))
    print(f"OK {dest_name} size={processed.size} opaque={opaque} nonwhite={dark} corner={corner}")

print("done")
