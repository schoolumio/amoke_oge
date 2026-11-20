"""Generate tiny blurred placeholders (LQIP) for every image in src/assets/images.
Run after adding or replacing photos:  python3 scripts/placeholders.py
Writes src/data/placeholders.json  { "<file name without extension>": "data:image/jpeg;base64,..." }"""
import base64, io, json, pathlib
from PIL import Image, ImageFilter, ImageOps

root = pathlib.Path(__file__).resolve().parent.parent
out = {}
for f in sorted((root / 'src/assets/images').rglob('*')):
    if f.suffix.lower() not in {'.jpg', '.jpeg', '.png', '.webp'}:
        continue
    im = ImageOps.exif_transpose(Image.open(f)).convert('RGB')
    im.thumbnail((24, 24))
    im = im.filter(ImageFilter.GaussianBlur(0.6))
    buf = io.BytesIO()
    im.save(buf, 'JPEG', quality=60)
    out[f.stem] = 'data:image/jpeg;base64,' + base64.b64encode(buf.getvalue()).decode()
(root / 'src/data/placeholders.json').write_text(json.dumps(out, indent=1) + '\n')
print(f'{len(out)} placeholders written')
