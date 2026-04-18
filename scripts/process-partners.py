#!/usr/bin/env python3
"""Rename partner logos and remove white/light backgrounds."""
import os
import shutil
from PIL import Image
import numpy as np

PARTNERS_DIR = os.path.join(os.path.dirname(__file__), "../public/partners")

# Map old filename → new name
RENAME_MAP = {
    "2025-04-30_16-53-18.png": "vanue.png",
    "2025-04-30_16-53-33.png": "karelpiu.png",
    "2025-04-30_16-53-50.png": "happyfox.png",
    "2025-04-30_16-54-15.png": "navicott.png",
    "2025-04-30_16-54-33.png": "lia-collection.png",
    "2025-04-30_16-54-47.png": "pavlotti.png",
    "2025-04-30_16-55-02.png": "bussin.png",
    "2025-04-30_16-56-25.png": "martin-luther.png",
    "2025-04-30_16-56-44.png": "nuzhnoe-vam.png",
    "2025-04-30_16-57-08.png": "meta-prom.png",
    "2025-04-30_16-59-05.png": "fayzur.png",
    "2025-04-30_17-03-20.png": "roox.png",
    "2025-04-30_17-09-53.png": "unaidy.png",
    "2025-04-30_17-15-50.png": "sleepy-secret.png",
    "photo_2025-04-30_17-17-26.jpg": "bambino.png",
}

def remove_light_bg(img: Image.Image, threshold: int = 240, fuzz: int = 30) -> Image.Image:
    """Remove near-white pixels by making them transparent."""
    img = img.convert("RGBA")
    data = np.array(img, dtype=np.float32)
    r, g, b, a = data[:, :, 0], data[:, :, 1], data[:, :, 2], data[:, :, 3]
    # Pixels where all channels are above threshold → transparent
    mask = (r >= threshold) & (g >= threshold) & (b >= threshold)
    # Soft edge: partially transparent near threshold
    edge = (r >= threshold - fuzz) & (g >= threshold - fuzz) & (b >= threshold - fuzz) & ~mask
    data[mask, 3] = 0
    # Feather edges
    brightness = np.minimum(r, np.minimum(g, b))
    alpha_edge = ((brightness - (threshold - fuzz)) / fuzz * 255).clip(0, 255)
    data[edge, 3] = alpha_edge[edge]
    return Image.fromarray(data.astype(np.uint8), "RGBA")

def normalize_size(img: Image.Image, target_h: int = 120) -> Image.Image:
    """Resize to uniform height keeping aspect ratio."""
    w, h = img.size
    new_w = int(w * target_h / h)
    return img.resize((new_w, target_h), Image.LANCZOS)

def process(src_name: str, dst_name: str):
    src = os.path.join(PARTNERS_DIR, src_name)
    dst = os.path.join(PARTNERS_DIR, dst_name)
    if not os.path.exists(src):
        print(f"  SKIP (not found): {src_name}")
        return
    img = Image.open(src)
    img = remove_light_bg(img)
    img = normalize_size(img)
    img.save(dst, "PNG", optimize=True)
    print(f"  OK: {src_name} → {dst_name}")

print("Processing partner logos...")
for old, new in RENAME_MAP.items():
    if old != new:  # skip already-renamed vanue.png
        process(old, new)

# Remove old timestamped files after processing
print("\nCleaning up old files...")
for old in RENAME_MAP:
    old_path = os.path.join(PARTNERS_DIR, old)
    if os.path.exists(old_path) and old != RENAME_MAP[old]:
        os.remove(old_path)
        print(f"  Removed: {old}")

print("\nDone.")
