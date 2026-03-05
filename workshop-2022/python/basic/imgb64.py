import base64
import os

file_name = '_example.jpeg'
imageBase64 = None
if os.path.isfile(file_name):
    with open(file_name, "rb") as file:
        image = file.read()
        imageBase64 = base64.b64encode(image)
print(imageBase64)
