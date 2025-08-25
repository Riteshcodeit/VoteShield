from flask import Flask, request, jsonify
import base64
import numpy as np
import cv2
import face_recognition
import os
import pickle
from flask_cors import CORS
from supabase import create_client
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()
SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("VITE_SUPABASE_ANON_KEY")

# Connect to Supabase
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

# Initialize Flask app
app = Flask(__name__)  # ✅ Fixed app initialization
app.config['JSONIFY_PRETTYPRINT_REGULAR'] = True
CORS(app)

# Or to be more specific:
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Load stored faces
faces_file = "data/faces_data.pkl"
if os.path.exists(faces_file):
    with open(faces_file, "rb") as f:
        stored_faces = pickle.load(f)
else:
    stored_faces = {}

# 📌 API to Register Voter
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    name, voter_id, face_data_base64 = data.get("name"), data.get("voter_id"), data.get("face_data")

    if not name or not voter_id or not face_data_base64:
        return jsonify({"error": "Missing data"}), 400

    # Convert Base64 image to OpenCV image
    try:
        face_data_bytes = base64.b64decode(face_data_base64.split(",")[1])
        face_np = np.frombuffer(face_data_bytes, dtype=np.uint8)
        face_image = cv2.imdecode(face_np, cv2.IMREAD_COLOR)
    except Exception:
        return jsonify({"error": "Invalid image format"}), 400

    # Encode face
    face_encoding = face_recognition.face_encodings(face_image)
    if not face_encoding:
        return jsonify({"error": "No face detected"}), 400

    stored_faces[voter_id] = face_encoding[0]
    with open(faces_file, "wb") as f:
        pickle.dump(stored_faces, f)

    # Store voter in Supabase
    supabase.table("voters").insert({"voter_id": voter_id, "name": name, "face_data": face_data_base64}).execute()
    
    return jsonify({"message": "Voter Registered!"})

# 📌 API to Verify Face for Voting
@app.route("/verify-face", methods=["POST"])
def verify_face():
    data = request.get_json()
    face_data_base64 = data.get("face_data")

    if not face_data_base64:
        return jsonify({"error": "No face data"}), 400

    # Convert Base64 image to OpenCV image
    try:
        face_data_bytes = base64.b64decode(face_data_base64.split(",")[1])
        face_np = np.frombuffer(face_data_bytes, dtype=np.uint8)
        face_image = cv2.imdecode(face_np, cv2.IMREAD_COLOR)
    except Exception:
        return jsonify({"error": "Invalid image format"}), 400

    # Compare with stored faces
    new_encoding = face_recognition.face_encodings(face_image)
    if not new_encoding:
        return jsonify({"error": "No face detected"}), 400

    for voter_id, stored_encoding in stored_faces.items():
        if face_recognition.compare_faces([stored_encoding], new_encoding[0])[0]:
            return jsonify({"message": "Face verified", "voter_id": voter_id})

    return jsonify({"error": "Face not recognized"}), 401

# 📌 API to Cast Vote
@app.route("/vote", methods=["POST"])
def cast_vote():
    data = request.get_json()
    voter_id, candidate_id = data.get("voter_id"), data.get("candidate_id")

    if not voter_id or not candidate_id:
        return jsonify({"error": "Missing voter ID or candidate"}), 400

    # Check if voter already voted
    existing_vote = supabase.table("votes").select("*").eq("voter_id", voter_id).execute()
    if existing_vote.data and len(existing_vote.data) > 0:
        return jsonify({"error": "You have already voted"}), 400

    # Store vote in Supabase
    supabase.table("votes").insert({"voter_id": voter_id, "candidate_id": candidate_id}).execute()

    return jsonify({"message": "Vote cast successfully!"})

# 📌 API to Get Election Results
@app.route("/results", methods=["GET"])
def get_results():
    results = supabase.table("votes").select("candidate_id").execute()
    
    # Process results
    counts = {}
    for vote in results.data:
        candidate = vote["candidate_id"]
        counts[candidate] = counts.get(candidate, 0) + 1

    return jsonify(counts)

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Welcome to the Blockchain Voting System!"})

# Run Flask server
if __name__ == "__main__":  # ✅ Fixed condition
    app.run(host="127.0.0.1", port=8000, debug=True)
