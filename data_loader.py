import pandas as pd
from sklearn.preprocessing import MultiLabelBinarizer
from sklearn.feature_extraction.text import TfidfVectorizer
from scipy.sparse import hstack
import re

def load_data():
    movies = pd.read_csv("ml-25m/ml-25m/movies.csv", index_col=0)
    links = pd.read_csv("C:/Users/91741/movie_recc_system/links.csv", dtype={"imdbId": str})
    df = movies.merge(links[['movieId', 'imdbId']], on="movieId")
    df = df[['title', 'movieId', 'imdbId', 'genres']]
    return df

def preprocess_data(df):
    df['cleaned_title'] = df['title'].apply(lambda x: re.sub(r'\W+', '', x.strip().lower()))
    df['cleaned_title'] = df['cleaned_title'].apply(lambda x: re.sub(r'\d{4}$', '', x))

    mlb = MultiLabelBinarizer()
    genres_encoded = mlb.fit_transform(df['genres'].str.split('|'))

    tfidf = TfidfVectorizer(stop_words='english', max_features=5000)
    titles_encoded = tfidf.fit_transform(df['title'])

    combined_features = hstack([genres_encoded, titles_encoded])

    return combined_features, df