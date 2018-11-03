from flask import Flask
from flask_restful import Api, Resource, reqparse
import json
from watson_developer_cloud import ToneAnalyzerV3
import APIkey

app = Flask(__name__)
api = Api(app)

tone_analyzer = ToneAnalyzerV3(
    version= APIkey.version,
    iam_apikey=APIkey.iam_apikey,
    url=APIkey.url
)

def anger_score(data):
    doc_tone = data.get('document_tone')
    tones = doc_tone.get('tones')
    threshold = 0

    for tone in tones:
        score = tone.get("score")
        tone_id = tone.get("tone_id")
        if score > threshold and tone_id == "anger":
            return score

class Tone(Resource):
    def get(self, input):
        text = input
        tone_analysis = tone_analyzer.tone({'text': text},'application/json').get_result()
        data = json.loads(json.dumps(tone_analysis, indent=2))
        return anger_score(data), 200


api.add_resource(Tone, "/tone/<string:input>")
app.run(debug=True)
