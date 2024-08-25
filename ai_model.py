# ai_model.py
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import numpy as np

# Example training data
resumes = ["experience in python and data science", "expert in machine learning and AI", "web developer with react and node.js"]
labels = [1, 1, 0]  # 1 for shortlisted, 0 for not shortlisted

# Vectorize the resumes
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(resumes)

# Train a logistic regression model
model = LogisticRegression()
model.fit(X, labels)

# Function to predict if a resume should be shortlisted
def predict_shortlist(resume_text):
    X_test = vectorizer.transform([resume_text])
    prediction = model.predict(X_test)
    return prediction[0]

# Example usage
print(predict_shortlist("skilled in AI and machine learning"))  # Output: 1 (shortlisted)
