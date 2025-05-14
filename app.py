from flask import Flask, render_template, request, redirect, url_for, jsonify
import os
from hf_chatbot import HuggingFaceChatbot

# Initialize Hugging Face Chatbot
chatbot = HuggingFaceChatbot()

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/blog')
def blog():
    return render_template('blog.html')

@app.route('/map')
def map():
    return render_template('map.html')

@app.route('/tools')
def tools():
    return render_template('tools.html')

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')
        
        # Here you would add code to handle the form submission
        # For example, sending an email or storing in a database
        
        return redirect(url_for('contact', submitted=True))
    
    submitted = request.args.get('submitted', False)
    return render_template('contact.html', submitted=submitted)

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '')
    
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400
    
    # Get response from Hugging Face
    response = chatbot.get_response(user_message)
    
    return jsonify({
        'message': response
    })

if __name__ == '__main__':
    app.run(debug=True)
