@echo off
echo Uploading WebGIS Project to GitHub...

REM Check if Git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Git is not installed. Please install Git from https://git-scm.com/downloads
    pause
    exit /b
)

REM Configure Git with token
git config --global credential.helper store
echo https://ngobac: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@github.com > "%USERPROFILE%\.git-credentials"

REM Initialize Git repository if not already initialized
if not exist .git (
    echo Initializing Git repository...
    git init
)

REM Add all files to the staging area
git add .

REM Commit the changes
git commit -m "Initial WebGIS project commit"

REM Set the remote origin if not already set
git remote -v | findstr origin >nul
if %ERRORLEVEL% NEQ 0 (
    echo Setting remote origin...
    git remote add origin https://github.com/ngobac/WebGIS-Project.git
)

REM Push to GitHub
echo Pushing to GitHub...
git branch -M main
git push -u origin main --force

REM Clean up credentials (optional for security)
REM echo Cleaning up credentials...
REM del "%USERPROFILE%\.git-credentials"

echo.
echo Upload complete! Your code is now available at:
echo https://github.com/ngobac/WebGIS-Project
echo.
pause
