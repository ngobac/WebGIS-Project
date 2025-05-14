import os
from dotenv import load_dotenv
import requests
import json

# Load environment variables
load_dotenv()

# Get API key from environment
api_key = os.getenv("HUGGINGFACE_API_KEY")
model_id = os.getenv("HUGGINGFACE_MODEL", "mistralai/Mistral-7B-Instruct-v0.2")

if not api_key:
    print("Error: API key not found. Make sure it's set in the .env file.")
    exit(1)

# API endpoint for the model
api_url = f"https://api-inference.huggingface.co/models/{model_id}"

# Headers with API key
headers = {"Authorization": f"Bearer {api_key}"}

# Test prompt
test_prompt = """
Bạn là trợ lý về GIS và Remote Sensing. Hãy giải thích ngắn gọn GIS là gì?
"""

# Create the payload
payload = {
    "inputs": test_prompt,
    "parameters": {
        "max_new_tokens": 100,
        "temperature": 0.7,
        "top_p": 0.9
    }
}

print(f"Testing connection to Hugging Face API with model: {model_id}")
print("Sending test prompt...")

try:
    # Send request to the API
    response = requests.post(api_url, headers=headers, json=payload)
    
    # Check if the request was successful
    if response.status_code == 200:
        print("Success! API connection works.")
        print("\nResponse:")
        
        # Parse and format the response
        result = response.json()
        
        # Pretty print the response
        print(json.dumps(result, indent=2))
        
        # Extract the generated text for easier viewing
        if isinstance(result, list) and "generated_text" in result[0]:
            print("\nGenerated Text:")
            print(result[0]["generated_text"])
    else:
        print(f"Error: API request failed with status code {response.status_code}")
        print("Response content:")
        print(response.text)
        
except Exception as e:
    print(f"Error: {str(e)}")

print("\nTest completed.")
