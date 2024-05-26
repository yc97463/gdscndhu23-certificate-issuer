import fitz  # PyMuPDF
import cv2
import numpy as np
from pyzbar.pyzbar import decode
import os

def extract_qr_code_info(image):
    qr_codes = decode(image)
    for qr in qr_codes:
        return qr.data.decode('utf-8')
    return None

def extract_qr_code_area(page, x, y, size, scale=2):
    # Define the position and size of the QR code area
    rect = fitz.Rect(x, y, x + size, y + size)
    # Increase the resolution by scaling the page
    matrix = fitz.Matrix(scale, scale)
    pix = page.get_pixmap(matrix=matrix, clip=rect)
    img_array = np.frombuffer(pix.samples, dtype=np.uint8).reshape(pix.height, pix.width, pix.n)
    img = cv2.cvtColor(img_array, cv2.COLOR_RGB2BGR)
    return img

def extract_pages_from_pdf(input_pdf_path, output_dir, qr_x, qr_y, qr_size, debug_dir):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    if not os.path.exists(debug_dir):
        os.makedirs(debug_dir)

    # Open the PDF file
    pdf_document = fitz.open(input_pdf_path)
    num_pages = pdf_document.page_count

    for page_num in range(num_pages):
        page = pdf_document.load_page(page_num)
        
        # Extract the QR code area image with increased resolution
        qr_image = extract_qr_code_area(page, qr_x, qr_y, qr_size)
        
        # Save the QR code image for debugging
        qr_image_path = os.path.join(debug_dir, f"page_{page_num + 1}_qr.png")
        cv2.imwrite(qr_image_path, qr_image)
        
        # Extract QR code info
        qr_info = extract_qr_code_info(qr_image)
        if qr_info:
            output_pdf_path = os.path.join(output_dir, f"{qr_info}.pdf")

            # Create a new PDF with the single page
            new_pdf_document = fitz.open()
            new_pdf_document.insert_pdf(pdf_document, from_page=page_num, to_page=page_num)
            new_pdf_document.save(output_pdf_path)
            new_pdf_document.close()
        else:
            print(f"QR code not found on page {page_num + 1}")

    pdf_document.close()

# Define the folder containing the PDF files
folder = "/Users/yc97463/Downloads/GDSCNDHU 2023 時數證明"
for file in os.listdir(folder):
    if file.endswith(".pdf"):
        file_name = file.split(".")[0]
        input_pdf_path = os.path.join(folder, file)
        output_dir = os.path.join(folder, file_name)
        debug_dir = os.path.join(folder, "qr_code_images")
        qr_x = 498
        qr_y = 772
        qr_size = 65
        extract_pages_from_pdf(input_pdf_path, output_dir, qr_x, qr_y, qr_size, debug_dir)
        print(f"Extraction completed for {file_name}.")

print("Extraction completed.")
