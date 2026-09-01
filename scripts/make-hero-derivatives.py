#!/usr/bin/env python3
"""Generate the hero image derivatives from a source photograph.

    pip install pillow
    python3 scripts/make-hero-derivatives.py path/to/photo.jpg

Writes public/hero-<width>.{avif,webp,jpg} for every step that the source can
actually fill, and prints the srcset to paste into HeroSection.tsx.

Only widths at or below the source width are emitted, so nothing is invented:
a 3000px original yields real 640/1000/1600/2200 steps, while a small source
quietly produces fewer. Use --crop to trim dead space off an edge before
resizing — the hero puts copy over the left third, so a subject sitting too
far left is worth cropping toward, and the hero frame is much wider than a
3:2 photograph, so trimming the top and bottom is usually needed too.
"""

import argparse
from pathlib import Path

from PIL import Image, ImageFilter

STEPS = (640, 1000, 1600, 2200)
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("source")
    ap.add_argument("--name", default="hero", help="output basename (default: hero)")
    ap.add_argument("--crop-left", type=float, default=0.0, help="fraction to trim off the left, e.g. 0.13")
    ap.add_argument("--crop-right", type=float, default=0.0, help="fraction to trim off the right")
    ap.add_argument("--crop-top", type=float, default=0.0, help="fraction to trim off the top")
    ap.add_argument("--crop-bottom", type=float, default=0.0, help="fraction to trim off the bottom")
    args = ap.parse_args()

    src = Image.open(args.source).convert("RGB")
    print(f"source {src.width}x{src.height}")

    if args.crop_left or args.crop_right or args.crop_top or args.crop_bottom:
        left = int(src.width * args.crop_left)
        right = src.width - int(src.width * args.crop_right)
        top = int(src.height * args.crop_top)
        bottom = src.height - int(src.height * args.crop_bottom)
        src = src.crop((left, top, right, bottom))
        print(f"cropped to {src.width}x{src.height} (aspect {src.width / src.height:.2f})")

    widths = [w for w in STEPS if w <= src.width] or [src.width]
    if src.width not in widths and src.width < STEPS[-1]:
        widths.append(src.width)

    OUT.mkdir(parents=True, exist_ok=True)
    for w in widths:
        im = src if w == src.width else src.resize(
            (w, round(src.height * w / src.width)), Image.LANCZOS
        )
        # A downscale loses a little acutance; a light unsharp puts it back.
        if w < src.width:
            im = im.filter(ImageFilter.UnsharpMask(radius=1.0, percent=42, threshold=3))

        base = OUT / f"{args.name}-{w}"
        im.save(base.with_suffix(".avif"), quality=48, speed=2)
        im.save(base.with_suffix(".webp"), quality=80, method=6)
        im.save(base.with_suffix(".jpg"), quality=84, optimize=True, progressive=True)

        sizes = " ".join(
            f"{ext}:{(base.with_suffix('.' + ext)).stat().st_size // 1024}KB"
            for ext in ("avif", "webp", "jpg")
        )
        print(f"  {w}w  {im.width}x{im.height}  {sizes}")

    largest = max(widths)
    ratio = src.height / src.width
    print("\nsrcset:")
    print("  " + ", ".join(f"/{args.name}-{w}.EXT {w}w" for w in widths))
    print(f"intrinsic size for the <img>: width={largest} height={round(largest * ratio)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
