from flask import Flask, jsonify, request, send_file, abort, flash, redirect, url_for, render_template
import datetime
from flask_cors import CORS
import requests

import os


__version__ = (0, 0, 1, "dev")

app = Flask(__name__, static_url_path='', static_folder='static')

CORS(app)
app.secret_key = os.environ.get("SECRET_KEY", "dev")


@app.route("/")
def get_index_html():
    return jsonify("hi")
    
@app.route("/data", methods=["POST"])
def post_data():
    data = request.get_json(force=True)
    print(data)
    

    return jsonify({"success": True})




if __name__ == '__main__':
    app.run(debug=True)