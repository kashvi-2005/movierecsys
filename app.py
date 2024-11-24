import os
from dotenv import load_dotenv
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from knn_model import load_data, preprocess_features, load_knn_model, get_recommendations

# Load environment variables from .env file
load_dotenv()

# Get the TMDb API key from the environment variables
TMDB_API_KEY = os.getenv('API_KEY')
TMDB_BASE_URL = 'https://api.themoviedb.org/3/'

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

# Load the data and train the model
df = load_data()
combined_features, df = preprocess_features(df)
knn_model = load_knn_model()

@app.route('/')
def home():
    return "Welcome to the Movie Recommendation System! Use the '/recommend' endpoint to get movie recommendations."

@app.route('/recommend', methods=['POST'])
def recommend():
    movie = request.get_json()
    movie_title = movie.get("title")

    if movie_title:
        # Step 1: Get recommendations from the KNN model
        recommendations = get_recommendations(movie_title, df, knn_model, combined_features, TMDB_API_KEY)

        if recommendations:
            # Return the full response including user movie details and recommendations
            response = {
                'user_movie_details': recommendations['user_movie_details'],
                'movies': recommendations['recommendations']  # This is the list of recommended movies
            }
            return jsonify(response)

        else:
            return jsonify({"error": "No recommendations found"}), 400
    else:
        return jsonify({"error": "No title provided"}), 400

@app.route('/movies', methods=['GET'])
def get_movies():
    movie_titles = df['title'].tolist()
    return jsonify(movie_titles)

if __name__ == "__main__":
    app.run(port=5000, debug=True, host="0.0.0.0")  