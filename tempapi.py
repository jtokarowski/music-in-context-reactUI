import json
from flask import Flask, send_from_directory, request
import requests
from flask_cors import CORS

########################################################################
####        BASIC API TO MOCK UP REACT INTEGRATION                   ###
########################################################################

#creates instance of app
app = Flask(__name__, static_folder='./build')
CORS(app)

CLIENT_SIDE_URL = "http://127.0.0.1"
PORT = 7000

outgoingData = {
    'dataByAttribute':{
        'labels':['Track 1', 'Track 2', 'Track 3','Track 4','Track 5'],
        'datasets':[
        {'label': 'Accousticness','data':[0.028, 0.11, 0.078, 0.01, 0.03],'borderColor':'rgba(25, 25, 25, 1)','fill':'false'},
        {'label': 'Danceability','data':[0.064, 0.68, 0.69, 0.75, 0.70],'borderColor':'rgba(25, 25, 25, 1)','fill':'false'},
        {'label': 'Energy','data':[0.87, 0.76, 0.76, 0.64, 0.82],'borderColor':'rgba(86, 230, 30, 1)','fill':'false'},
        {'label': 'Instrumentalness','data':[0.86, 0.15, 0.06, 0.84, 0.72],'borderColor':'rgba(25, 25, 25, 1)','fill':'false'},
        {'label': 'Liveness','data':[0.20, 0.18, 0.20, 0.11, 0.19],'borderColor':'rgba(25, 25, 25, 1)','fill':'false'},
        {'label': 'Speechiness','data':[0.04, 0.05, 0.06, 0.05, 0.51],'borderColor':'rgba(25, 25, 25, 1)','fill':'false'},
        {'label': 'Valence','data':[0.13, 0.15, 0.52, 0.24, 0.58],'borderColor':'rgba(25, 25, 25, 1)','fill':'false'},
        ]
    },
    'databyTrack':{
        'labels':['acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'speechiness', 'valence'],
        'datasets':[
        {'label': 'Track 1','data':[0.028, 0.64, 0.87, 0.86, 0.20, 0.04, 0.13],'borderColor':'rgba(100, 99, 132, 0.8)','fill':'false'},
        {'label': 'Track 2','data':[0.11, 0.68, 0.76, 0.15, 0.18, 0.05, 0.15],'borderColor':'rgba(255, 99, 132, 0.8)','fill':'false'},
        {'label': 'Track 3','data':[0.078,0.69,0.76, 0.06, 0.20, 0.06,0.52],'borderColor':'rgba(100, 99, 132, 0.8)','fill':'false'},
        {'label': 'Track 4','data':[0.01,0.75, 0.64, 0.84, 0.11, 0.05,0.24],'borderColor':'rgba(25, 99, 132, 0.8)','fill':'false'},
        {'label': 'Track 5','data':[0.03,0.70,0.82,0.72,0.19,0.51,0.58],'borderColor':'rgba(5, 99, 132, 0.8)','fill':'false'}
        ]}}

@app.route("/data", methods=["GET","POST"])
def response():
    print(request.get_data())
    print(request.json['refresh_token'])
    #responseRaw = {'audioData':{'labels': ['acousticness', 'danceability', 'energy', 'instrumentalness', 'liveness', 'speechiness', 'valence'],'datasets':[{ 'label':'Cluster A', 'data': [0.028,0.64, 0.87, 0.86, 0.20, 0.04, 0.13], 'backgroundColor':['rgba(255, 99, 132, 0.6)']}]}}
    #responseRaw = {'audioData': [0.028, 0.64, 0.87, 0.86, 0.20, 0.04, 0.13]}
    #responseRaw = {'Response': "Hello, World!"}
    return json.dumps(outgoingData)

#instantiate app
if __name__ == "__main__":
    app.run(debug=True, port=PORT)