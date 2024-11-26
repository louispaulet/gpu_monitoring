from flask import Flask, jsonify
from flask_cors import CORS
from gpu_monitor import GPUMonitor

app = Flask(__name__)
CORS(app)  # Enable CORS

monitor = GPUMonitor()

@app.route('/metrics', methods=['GET'])
def get_metrics():
    metrics = monitor.get_metrics()
    return jsonify(metrics)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
