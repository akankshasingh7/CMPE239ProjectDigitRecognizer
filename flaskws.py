from flask import Flask
from flask import request
from flask import jsonify
from flask import render_template

import re
from ImageIn import ImageConv

app = Flask(__name__)

def save_image_from_req():
    request_body = request.get_data()
    image_data = re.sub(r"^data.+base64\,", "", request_body)
    fh = open("/home/shivi/Pictures/digit_image.png", "wb")
    fh.write(image_data.decode('base64'))
    fh.close()


def recognize_image():
    # Insert call to method that will take the image file as input
    # and return a 'dictionary' as result
    # eg. confusion_matrix = recognize_image_for_digits("/tmp/digit_image.png")
    # confusion_matrix should be a dict like -
    # {1 : 0.99, 2 : 0.8, 3 : 0.6}
    ImageConv("/home/shivi/Pictures/digit_image.png")
    return {1 : 0.99, 2 : 0.8, 3 : 0.6}


@app.route('/analyzeImage', methods=['POST', 'GET'])
def recognize_image_routine():
    if request.method == 'POST':
        save_image_from_req()
        return_dict = recognize_image()
        return jsonify(return_dict)
    else:
        return render_template('digitInputPage.html')



if __name__ == '__main__':
    app.run(debug=True)
