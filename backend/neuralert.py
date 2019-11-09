from flask import Flask, jsonify, request, send_file, abort, flash, redirect, url_for, render_template
import datetime
from flask_cors import CORS
import requests
import numpy as np
import matplotlib.pyplot as plt
import datetime
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

    
    if (data["clicks"][1]['time'] - data["clicks"][0]['time'] < 500) and len(data["pos"]) > 3:
        print(len(data["pos"]))
        flag_moved = False
        final_point = data["pos"][-1] 
        num_consecutive_halt = 0
        latest_valid_index = None
        oldest_valid_index = None
        for i in range (len(data["pos"]) - 1, 0, -1):
            curr_point = data["pos"][i] 

            if not flag_moved:
                if curr_point["x"] != final_point["x"] or curr_point["y"] != final_point["y"]:
                    flag_moved = True
                    latest_valid_index = i
                    oldest_valid_index = i
            else:
                if data["pos"][i]["x"] == data["pos"][i-1]["x"] and data["pos"][i]["y"] == data["pos"][i-1]["y"]:
                    num_consecutive_halt += 1
                    if num_consecutive_halt > 20:
                        break
                        #do stuff
                else:
                    num_consecutive_halt = 0
                    oldest_valid_index = i
            if (i == 1):
                oldest_valid_index = i
        
        temp_x = []
        temp_y = []
        temp_time = []
        for i in range(oldest_valid_index, latest_valid_index + 1):
            temp_x.append(data["pos"][i]["x"])
            temp_y.append(data["pos"][i]["y"])
            temp_time.append(data["pos"][i]["time"])
            
        x = np.array(temp_x)
        y = np.array(temp_y)
        t = np.array(temp_time)

        total_time = data["pos"][latest_valid_index]["time"] - data["pos"][oldest_valid_index]["time"]

        
        dx = x[1:]-x[:-1]
        dy = y[1:]-y[:-1]

        step_size = np.sqrt(dx**2+dy**2)

        cumulative_distance = np.concatenate(([0], np.cumsum(step_size)))

        # print(cumulative_distance)
        
        # print(total_time)
        print(cumulative_distance[-1] / total_time)
        
        wfile = open("results.txt", "a")
        wfile.write(str(cumulative_distance[-1] / total_time) + ',' + str(max(step_size)/50) + ',' + str(datetime.datetime.now()) + '\n')


    return jsonify({"success": True})




if __name__ == '__main__':
    app.run(debug=True)