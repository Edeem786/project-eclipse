from flask import Flask, render_template
import requests
from PIL import Image
from io import BytesIO

app = Flask(__name__)

key = "ITW6pgXWbstkCxXyjmeFNqT1ulilmf1OZE2zBJWS"
media_type = "image"
base_url = "https://images-api.nasa.gov/search"
def get_images(query):
    images = []
    params = {
        "q" : query,
        "media_type" : media_type,
    }
    response = requests.get(base_url, params=params)
    if (response.status_code == 200):
        data = response.json()
        items = data.get("collection", ()).get("items", [])
        for item in items[:6]:
            image_url = item.get("links", [])[0].get("href","")
            if image_url:
                images.append(image_url)
    else:
        print("Cant find images", response.status_code)
    return images


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/eclipse")
def eclipse():
    return render_template("eclipse.html")

@app.route("/extras")
def model():
    return render_template("extra.html")

@app.route("/edu")
def edu():
    return render_template("edu.html")

@app.route("/totalsolareclipse")
def total_solar_eclipse():
    image_urls = get_images("total solar eclipse")
    return render_template("totalsolareclipse.html", image_urls=image_urls)

@app.route("/partialsolareclipse")
def partial_solar_eclipse():
    image_urls = get_images("Partial Solar Eclipse")
    return render_template("partialsolareclipse.html", image_urls=image_urls)

@app.route("/annularsolareclipse")
def annular_solar_eclipse():
    image_urls = get_images("Annular Solar Eclipse")
    return render_template("annularsolareclipse.html", image_urls=image_urls)

# Continue adding routes for other eclipse types
@app.route("/hybridsolareclipse")
def hybrid_solar_eclipse():
    image_urls = get_images("Hybrid Solar Eclipse")
    return render_template("hybridsolareclipse.html", image_urls=image_urls)

@app.route("/totallunareclipse")
def total_lunar_eclipse():
    image_urls = get_images("Total Lunar Eclipse")
    return render_template("totallunareclipse.html", image_urls=image_urls)

@app.route("/partiallunareclipse")
def partial_lunar_eclipse():
    image_urls = get_images("Partial Lunar Eclipse")
    return render_template("partiallunareclipse.html", image_urls=image_urls)

@app.route("/penumbrallunareclipse")
def penumbral_lunar_eclipse():
    image_urls = get_images("Penumbral Lunar Eclipse")
    return render_template("penumbrallunareclipse.html", image_urls=image_urls)

@app.route("/quiz")
def quiz():
    return render_template("quiz.html")

if __name__ == "__main__":
    app.run(debug=True)