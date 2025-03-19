from flask import Flask, request, jsonify
from transformers import pipeline

app = Flask(__name__)

# Load AI chatbot model
chatbot = pipeline("conversational")

# Sample property data
properties = [
    {"name": "Luxury Apartment", "price": 500000, "location": "New York"},
    {"name": "Cozy Cottage", "price": 250000, "location": "San Francisco"},
    {"name": "Modern Condo", "price": 350000, "location": "Los Angeles"}
]

@app.route('/properties', methods=['GET'])
def get_properties():
    location = request.args.get('location', '')
    min_price = request.args.get('minPrice', 0, type=int)
    max_price = request.args.get('maxPrice', 1000000, type=int)

    # Filter properties based on search criteria
    filtered_properties = [prop for prop in properties if 
                           (location.lower() in prop['location'].lower()) and 
                           (min_price <= prop['price'] <= max_price)]
    
    return jsonify({"properties": filtered_properties})

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    response = chatbot(user_message)
    return jsonify({"reply": response[0]['generated_text']})

if __name__ == "__main__":
    app.run(debug=True)
