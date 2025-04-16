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
    echo Failed to push to GitHub. This could be due to the remote repository having changes.
    echo.
    echo Options:
    echo 1. Pull changes first (git pull origin main)
    echo 2. Force push your changes (will overwrite remote changes)
    echo 3. Exit and set up authentication
    echo.
    set /p CHOICE="Enter option (1, 2, or 3): "
    
    if "%CHOICE%"=="1" (
        echo.
        echo Pulling changes from remote repository...
        git pull origin main
        echo.
        echo Now trying to push again...
        git push -u origin main
    ) else if "%CHOICE%"=="2" (
        echo.
        echo WARNING: This will OVERWRITE any changes on GitHub with your local changes.
        set /p CONFIRM="Are you sure? (yes/no): "
        if /i "%CONFIRM%"=="yes" (
            echo.
            echo Force pushing to GitHub...
            git push -f -u origin main
        ) else (
            echo Operation cancelled.
            pause
            exit /b
        )
    ) else (
        echo.
        echo For authentication information, visit: https://docs.github.com/en/authentication
        pause
        exit /b
    )
)

echo.
echo Upload complete! Your code is now available at:
echo https://github.com/ngobac/WebGIS-Project
echo.
pause
