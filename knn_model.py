import pandas as pd
from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.feature_extraction.text import TfidfVectorizer
from scipy.sparse import hstack
import pickle
import re
import requests
from dotenv import load_dotenv
import os

# load and merge
def load_data():
    movies = pd.read_csv("ml-25m/ml-25m/movies.csv", index_col=0)
    links = pd.read_csv("links.csv", dtype={"imdbId": str})
    df = movies.merge(links[['movieId', 'imdbId']], on="movieId")
    df = df[['title', 'movieId', 'imdbId', 'genres']]
    return df

# preprocess features
def preprocess_features(df):
    df['cleaned_title'] = df['title'].apply(lambda x: re.sub(r'\W+', '', x.strip().lower()))  
    df['cleaned_title'] = df['cleaned_title'].apply(lambda x: re.sub(r'\d{4}$', '', x))  
    
    mlb = MultiLabelBinarizer()
    genres_encoded = mlb.fit_transform(df['genres'].str.split('|'))
    
    tfidf = TfidfVectorizer(stop_words='english', max_features=5000)
    titles_encoded = tfidf.fit_transform(df['title'])
    
    combined_features = hstack([genres_encoded, titles_encoded])
    
    return combined_features, df

# train , employed ai help on hwo to do this
def train_knn_model(combined_features):
    knn = NearestNeighbors(n_neighbors=20, metric='cosine')
    knn.fit(combined_features)
    
    with open("knn_model.pkl", "wb") as f:
        pickle.dump(knn, f)

# loading
def load_knn_model():
    with open("knn_model.pkl", "rb") as f:
        knn = pickle.load(f)
    return knn

def get_recommendations(user_movie, df, knn_model, combined_features, tmdb_api_key):
    try:
        tmdb_base_url = "https://api.themoviedb.org/3/find/"

        user_movie_cleaned = re.sub(r'\W+', '', user_movie.strip().lower()) 
        user_movie_cleaned = re.sub(r'\d{4}$', '', user_movie_cleaned)  
        
        if user_movie_cleaned not in df['cleaned_title'].values:
            return {"error": f"Movie '{user_movie}' not found in the dataset."}

        user_movie_index = df[df['cleaned_title'] == user_movie_cleaned].index[0]
        movie_vector = combined_features.getrow(user_movie_index)

        user_movie_details = {}
        try:
            user_imdb_id = df.iloc[user_movie_index]['imdbId']
            response = requests.get(
                f"{tmdb_base_url}tt{user_imdb_id}",
                params={"api_key": tmdb_api_key, "external_source": "imdb_id"}
            )
            if response.status_code == 200:
                data = response.json()
                if 'movie_results' in data and len(data['movie_results']) > 0:
                    movie_data = data['movie_results'][0]
                    synopsis = movie_data.get('overview', 'No synopsis available.')
                    release_date = movie_data.get('release_date', None)
                    rating = movie_data.get('vote_average', None)

                    if release_date:
                        release_date = pd.to_datetime(release_date).strftime('%d-%m-%y')

                    user_movie_details = {
                        'title': user_movie,
                        'synopsis': synopsis,
                        'release_date': release_date,
                        'rating': rating,
                        'imdb_link': f"https://www.imdb.com/title/tt{user_imdb_id}/",  
                    }

                    poster_path = movie_data.get('poster_path', None)
                    user_movie_details['poster_url'] = f"https://image.tmdb.org/t/p/w500{poster_path}" if poster_path else "https://via.placeholder.com/500x750?text=No+Poster"

        except Exception as e:
            print(f"Error fetching details for user movie {user_movie}: {e}")

        distances, indices = knn_model.kneighbors(movie_vector)
        recommendations = []

        for index in indices[0]:
            movie = df.iloc[index]
            imdb_id = movie['imdbId']
            poster_url = None


            try:
                response = requests.get(
                    f"{tmdb_base_url}tt{imdb_id}",
                    params={"api_key": tmdb_api_key, "external_source": "imdb_id"}
                )
                if response.status_code == 200:
                    data = response.json()
                    if 'movie_results' in data and len(data['movie_results']) > 0:
                        poster_path = data['movie_results'][0].get('poster_path', None)
                        poster_url = f"https://image.tmdb.org/t/p/w500{poster_path}" if poster_path else "https://via.placeholder.com/500x750?text=No+Poster"
            except Exception as e:
                print(f"Error fetching poster for IMDb ID {imdb_id}: {e}")

            recommendations.append({
                'title': movie['title'],
                'imdb_link': f"https://www.imdb.com/title/tt{imdb_id}/", 
                'poster_url': poster_url or "https://via.placeholder.com/500x750?text=No+Poster" 
            })

        return {
            'user_movie_details': user_movie_details,
            'recommendations': recommendations  
        }

    except Exception as e:
        return {"error": str(e)}

