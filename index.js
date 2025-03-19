// Handle property search form submission
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const location = document.getElementById('location').value;
    const minPrice = document.getElementById('min-price').value;
    const maxPrice = document.getElementById('max-price').value;

    // Call backend to get property results (for now, simulate results)
    fetch(`https://your-backend-api.com/properties?location=${location}&minPrice=${minPrice}&maxPrice=${maxPrice}`)
        .then(response => response.json())
        .then(data => {
            const resultsDiv = document.getElementById('property-results');
            resultsDiv.innerHTML = '';
            data.properties.forEach(property => {
                const propertyElement = document.createElement('div');
                propertyElement.innerHTML = `
                    <h3>${property.name}</h3>
                    <p>Price: $${property.price}</p>
                    <p>Location: ${property.location}</p>
                    <button>View Details</button>
                `;
                resultsDiv.appendChild(propertyElement);
            });
        })
        .catch(error => {
            console.error('Error fetching properties:', error);
        });
});

// Chatbot interaction
function sendMessage() {
    const userMessage = document.getElementById('userInput').value;
    const messagesDiv = document.getElementById('messages');

    if (userMessage.trim()) {
        const userMessageElement = document.createElement('div');
        userMessageElement.textContent = "You: " + userMessage;
        messagesDiv.appendChild(userMessageElement);
        document.getElementById('userInput').value = '';

        // Send to backend (simulate chatbot for now)
        fetch('https://your-backend-api.com/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userMessage })
        })
        .then(response => response.json())
        .then(data => {
            const botMessageElement = document.createElement('div');
            botMessageElement.textContent = "Bot: " + data.reply;
            messagesDiv.appendChild(botMessageElement);
        })
        .catch(error => console.error('Error:', error));
    }
}
