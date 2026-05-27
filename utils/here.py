#!/usr/bin/env python3

"""
Usage:
    python3 -m venv .venv
    source .venv/bin/activate
    python3 -m pip install -r requirements.txt
    python3 here.py
    deactivate

"""

import qrcode

URL = "https://aardkronkel.github.io"
OUTPUT_FILE = "here.png"

def main():
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_Q,
        box_size=10,
        border=4,
    )
    qr.add_data(URL)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    img.save(OUTPUT_FILE)


if __name__ == "__main__":
    main()
