@echo off
echo Uploading WebGIS Project to GitHub...

REM Check if Git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Git is not installed. Please install Git from https://git-scm.com/downloads
    pause
    exit /b
)

REM Add all files to the staging area
git add .

REM Commit the changes
set /p COMMIT_MSG="Enter commit message (or press Enter for default message): "
if "%COMMIT_MSG%"=="" set COMMIT_MSG="Updated WebGIS project files"
git commit -m "%COMMIT_MSG%"

REM Push to GitHub
echo Pushing to GitHub...
git branch -M main
git push -u origin main

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo Failed to push to GitHub. You may need to authenticate.
    echo.
    echo Options:
    echo 1. Use HTTPS with username and password/token
    echo 2. Set up SSH keys for GitHub
    echo.
    echo For more information, visit: https://docs.github.com/en/authentication
    pause
    exit /b
)

echo.
echo Upload complete! Your code is now available at:
echo https://github.com/ngobac/WebGIS-Project
echo.
pause
