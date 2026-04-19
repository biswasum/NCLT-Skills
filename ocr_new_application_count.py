import traceback
import pdfplumber
import easyocr
import numpy as np
from pathlib import Path

try:
    pdf_path = Path(r"C:\Users\BISWA\Finance\skills\skills\pdf\25.10.2021 Ahmedabad.pdf")
    reader = easyocr.Reader(['en'], gpu=False)
    count = 0
    pages = []
    with pdfplumber.open(pdf_path) as pdf:
        for i, page in enumerate(pdf.pages, start=1):
            pil_img = page.to_image(resolution=100).original.convert('RGB')
            img = np.array(pil_img)
            print('DEBUG PAGE', i, type(img), img.shape, img.dtype)
            if i == 1:
                # one-page debugging only
                ocr = ' '.join([item[1] for item in reader.readtext(img)]).lower()
                print('OCR first page length', len(ocr))
                occurrences = ocr.count('new application')
                print('occurrences', occurrences)
                break
            ocr = ' '.join([item[1] for item in reader.readtext(img)]).lower()
            occurrences = ocr.count('new application')
            if occurrences:
                pages.append((i, occurrences, ocr))
                count += occurrences
    print(count)
    for p, o, _ in pages:
        print(f'PAGE {p}: {o}')
except Exception:
    traceback.print_exc()
