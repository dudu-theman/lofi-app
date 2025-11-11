from flask import Flask, render_template, redirect, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import os
from dotenv import load_dotenv
from helper_functions.song_maker import make_song, make_song_params
import requests

aws_access_key=os.getenv("AWS_ACCESS_KEY_ID")
aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY")
region_name=os.getenv("AWS_REGION")
bucket_name=os.getenv("AWS_BUCKET_NAME")


app = Flask(__name__)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

with app.app_context():
    db.create_all()

class AISong(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    song_url = db.Column(db.String(100),default="NO SONG MADE")


@app.route("/displaysongurls",  methods=["GET"])
def disp_songs():
    songurls = AISong.query.all()
    return render_template("displaysongurls.html", songurls=songurls)
    #return render_template("displaysongurls.html")


@app.route ("/playlist", methods=["GET", "POST"])
def call_suno():
    if request.method == "GET":
        response = make_song()
        return render_template("playlist.html")
    
    elif request.method == "POST":
        data = request.json
        print("Received callback:", data)

        code = data.get('code')
        callback_data = data.get('data', {})
        task_id = callback_data.get('task_id')
        music_data = callback_data.get('data', [])
        
        if code == 200:
            print(f"Music generation completed for task {task_id}")
            list_of_songs = []
            for i, song in enumerate(music_data):
                audio_url = song['audio_url']
                new_song = AISong(song_url=audio_url)
                list_of_songs.append(new_song)

            for song in list_of_songs:
                try:
                    db.session.add(song)
                    db.session.commit()
                except Exception as e:
                    print(f"ERROR:{e}")
                    return f"ERROR:{e}"

        return "HELLO"
                   
@app.route("/", methods=["POST","GET"])
def index():
    return render_template('index.html')

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)

    