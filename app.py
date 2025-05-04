from flask import Flask, render_template, request, redirect, url_for
import os

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

if __name__ == '__main__':
    app.run(debug=True)
