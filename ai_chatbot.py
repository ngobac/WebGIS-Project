import os
import openai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Set OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

class AIChatbot:
    def __init__(self):
        self.model = "gpt-3.5-turbo"
        self.system_prompt = """
        Bạn là một trợ lý ảo cho trang web về GIS và Remote Sensing.
        Hãy trả lời các câu hỏi một cách ngắn gọn, súc tích và thân thiện.
        Tập trung vào chủ đề GIS, remote sensing, bản đồ, và phân tích không gian.
        Nếu có câu hỏi không liên quan đến lĩnh vực này, hãy lịch sự đề nghị người dùng hỏi về GIS, viễn thám, hoặc trang web.
        Trả lời bằng Tiếng Việt, giới hạn trong 2-3 câu ngắn gọn.
        """
        self.conversation_history = []
    
    def get_response(self, user_message):
        try:
            # Add user message to conversation history
            self.conversation_history.append({"role": "user", "content": user_message})
            
            # Prepare messages for API call
            messages = [
                {"role": "system", "content": self.system_prompt}
            ]
            
            # Add up to 5 most recent messages from conversation history
            messages.extend(self.conversation_history[-5:])
            
            # Call OpenAI API
            response = openai.chat.completions.create(
                model=self.model,
                messages=messages,
                max_tokens=150,
                temperature=0.7
            )
            
            # Extract response text
            response_text = response.choices[0].message.content
            
            # Add assistant response to conversation history
            self.conversation_history.append({"role": "assistant", "content": response_text})
            
            return response_text
            
        except Exception as e:
            print(f"Error calling OpenAI API: {e}")
            return "Xin lỗi, tôi đang gặp sự cố kết nối. Vui lòng thử lại sau."

# Alternative implementation using Anthropic Claude API
# Uncomment and use if you prefer Claude
"""
import anthropic

class AIChatbot:
    def __init__(self):
        self.client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
        self.model = "claude-3-haiku-20240307"
        self.system_prompt = "..."  # Same prompt as above
        self.conversation_history = []
    
    def get_response(self, user_message):
        try:
            # Add user message to conversation history
            self.conversation_history.append({"role": "user", "content": user_message})
            
            # Prepare messages for API call
            messages = [
                {"role": "user", "content": user_message}
            ]
            
            # Call Anthropic API
            response = self.client.messages.create(
                model=self.model,
                system=self.system_prompt,
                messages=self.conversation_history[-5:],
                max_tokens=150
            )
            
            # Extract response text
            response_text = response.content[0].text
            
            # Add assistant response to conversation history
            self.conversation_history.append({"role": "assistant", "content": response_text})
            
            return response_text
            
        except Exception as e:
            print(f"Error calling Anthropic API: {e}")
            return "Xin lỗi, tôi đang gặp sự cố kết nối. Vui lòng thử lại sau."
"""
