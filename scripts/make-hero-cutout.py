#!/usr/bin/env python3
"""Turn the hero photograph into the transparent PNG the hero section expects.

The source shot is a studio frame: one subject on a near-white seamless
backdrop. That makes a luma key reliable — everything brighter than the
threshold becomes transparent, everything darker stays, and the band between
the two thresholds becomes a feathered edge so the silhouette does not look
cut with scissors.

    pip install pillow
    python3 scripts/make-hero-cutout.py path/to/source.jpg

Writes public/hero-subject.png. The hero mirrors the subject in CSS, so keep
the source in its original orientation.
"""

import sys
from pathlib import Path

from PIL import Image, ImageFilter

# Pixels above HI are pure background, below LO are pure subject, and the
# range between the two is ramped for a soft edge.
LO = 196
HI = 232
FEATHER = 1.2
ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "hero-subject.png"


def flood_background(alpha: Image.Image) -> Image.Image:
    """Keep only transparency connected to the frame edge.

    A luma key also punches holes in bright parts of the subject (skin
    highlights, the light mat). Those holes are interior, so anything not
    reachable from the border is restored to opaque.
    """
    from collections import deque

    w, h = alpha.size
    px = alpha.load()
    seen = bytearray(w * h)
    q = deque()

    def push(x, y):
        i = y * w + x
        if not seen[i] and px[x, y] < 255:
            seen[i] = 1
            q.append((x, y))

    for x in range(w):
        push(x, 0)
        push(x, h - 1)
    for y in range(h):
        push(0, y)
        push(w - 1, y)

    while q:
        x, y = q.popleft()
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < w and 0 <= ny < h:
                push(nx, ny)

    out = Image.new("L", (w, h), 255)
    op = out.load()
    for y in range(h):
        row = y * w
        for x in range(w):
            if seen[row + x]:
                op[x, y] = px[x, y]
    return out


def main() -> int:
    if len(sys.argv) != 2:
        print(__doc__)
        return 2

    src = Image.open(sys.argv[1]).convert("RGB")
    luma = src.convert("L")

    span = HI - LO
    alpha = luma.point(lambda v: 0 if v >= HI else 255 if v <= LO else int(255 * (HI - v) / span))
    alpha = flood_background(alpha)
    alpha = alpha.filter(ImageFilter.GaussianBlur(FEATHER))

    out = src.copy()
    out.putalpha(alpha)
    out = out.crop(out.getbbox())

    OUT.parent.mkdir(parents=True, exist_ok=True)
    out.save(OUT, optimize=True)
    print(f"wrote {OUT} ({out.width}x{out.height})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
