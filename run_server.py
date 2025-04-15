from waitress import serve
from app import app

# For production deployment using Waitress WSGI server
if __name__ == '__main__':
    print('Starting production server...')
    print('Access the application at: http://localhost:8080')
    serve(app, host='0.0.0.0', port=8080)
