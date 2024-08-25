# ai_server.py
from flask import Flask, request, jsonify
from ai_model import predict_shortlist

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    resume_text = request.json.get('resume_text')
    result = predict_shortlist(resume_text)
    return jsonify({'shortlisted': result})

if __name__ == '__main__':
    app.run(port=5001)
