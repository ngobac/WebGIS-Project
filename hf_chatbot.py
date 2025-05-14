import os
import json
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class HuggingFaceChatbot:
    def __init__(self):
        self.api_key = os.getenv("HUGGINGFACE_API_KEY")
        self.model = os.getenv("HUGGINGFACE_MODEL", "mistralai/Mistral-7B-Instruct-v0.2")
        self.api_url = f"https://api-inference.huggingface.co/models/{self.model}"
        self.headers = {"Authorization": f"Bearer {self.api_key}"}
        self.conversation_history = []
        self.system_prompt = """
        Bạn là một trợ lý ảo cho trang web về GIS và Remote Sensing.
        Hãy trả lời các câu hỏi một cách ngắn gọn, súc tích và thân thiện.
        Tập trung vào chủ đề GIS, remote sensing, bản đồ, và phân tích không gian.
        Nếu có câu hỏi không liên quan đến lĩnh vực này, hãy lịch sự đề nghị người dùng hỏi về GIS, viễn thám, hoặc trang web.
        Trả lời bằng Tiếng Việt, giới hạn trong 2-3 câu ngắn gọn.
        """
    
    def format_prompt(self, user_message):
        """Format the conversation for Mistral, Llama or similar models"""
        formatted_prompt = f"{self.system_prompt}\n\n"
        
        # Add up to 5 most recent conversation turns
        recent_history = self.conversation_history[-10:]
        for message in recent_history:
            if message["role"] == "user":
                formatted_prompt += f"User: {message['content']}\n"
            else:
                formatted_prompt += f"Assistant: {message['content']}\n"
                
        # Add the current user message
        formatted_prompt += f"User: {user_message}\nAssistant: "
        
        return formatted_prompt
    
    def get_response(self, user_message):
        try:
            # Add user message to conversation history
            self.conversation_history.append({"role": "user", "content": user_message})
            
            # Prepare formatted prompt
            prompt = self.format_prompt(user_message)
            
            # For text generation models
            payload = {
                "inputs": prompt,
                "parameters": {
                    "max_new_tokens": 150,
                    "temperature": 0.7,
                    "top_p": 0.9,
                    "do_sample": True
                }
            }
            
            # Make request
            response = requests.post(self.api_url, headers=self.headers, json=payload)
            
            if response.status_code != 200:
                print(f"API Error: {response.status_code}")
                print(response.text)
                raise Exception(f"API Error: {response.status_code}")
                
            # Parse response
            result = response.json()
            
            # The format of the response depends on the model type
            if isinstance(result, list) and len(result) > 0:
                if "generated_text" in result[0]:
                    # Text generation model
                    generated_text = result[0]["generated_text"]
                    
                    # Strip the prompt from the beginning if it's included
                    if generated_text.startswith(prompt):
                        generated_text = generated_text[len(prompt):].strip()
                        
                    # Cut off at the next "User:" if it exists
                    if "User:" in generated_text:
                        generated_text = generated_text.split("User:")[0].strip()
                        
                    response_text = generated_text
                else:
                    # Other type of model
                    response_text = str(result[0])
            else:
                # Handle direct text response or other formats
                response_text = str(result)
            
            # Clean and limit response to be concise
            response_text = self.clean_response(response_text)
            
            # Add assistant response to conversation history
            self.conversation_history.append({"role": "assistant", "content": response_text})
            
            return response_text
            
        except Exception as e:
            print(f"Error calling Hugging Face API: {e}")
            return "Xin lỗi, tôi đang gặp sự cố kết nối. Vui lòng thử lại sau."
    
    def clean_response(self, text):
        """Clean and limit the response text"""
        # Remove any "Assistant:" prefix if present
        if text.startswith("Assistant:"):
            text = text[len("Assistant:"):].strip()
            
        # Limit to a reasonable length (about 3 sentences)
        sentences = text.split('. ')
        if len(sentences) > 3:
            text = '. '.join(sentences[:3]) + '.'
            
        return text.strip()
