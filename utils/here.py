#!/usr/bin/env python3

"""
Usage:
    virtualenv venv
    source venv/Scripts/activate
    pip install -r requirements.txt
    python here.py

"""


import qrcode

URL = "https://earthboundworm.github.io"
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


if __name__ == '__main__':
    main()
