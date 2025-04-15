@echo off
echo Starting Personal Branding Website...

REM Check if Python is installed
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Python is not installed. Please install Python from https://www.python.org/downloads/
    pause
    exit /b
)

REM Create virtual environment if it doesn't exist
if not exist venv (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt

REM Create directories for static files if they don't exist
if not exist static\img mkdir static\img
if not exist static\files mkdir static\files

REM Start the Flask application
echo Starting Flask application...
python app.py

pause
