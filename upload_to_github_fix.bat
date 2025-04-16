@echo off
echo === WebGIS Project GitHub Upload Script ===
echo This script will automatically handle common Git issues

REM Check if Git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Git is not installed. Please install Git from https://git-scm.com/downloads
    pause
    exit /b 1
)

echo.
echo Step 1: Fetching latest changes from GitHub...
git fetch origin
if %ERRORLEVEL% NEQ 0 (
    echo Failed to fetch from GitHub. Check your internet connection.
    pause
    exit /b 1
)

echo.
echo Step 2: Pulling changes from GitHub...
git pull origin main
if %ERRORLEVEL% NEQ 0 (
    echo Failed to pull changes. There might be conflicts.
    echo.
    echo Options:
    echo 1. Resolve conflicts manually
    echo 2. Force push your changes (will overwrite remote changes)
    echo.
    set /p CHOICE="Enter option (1 or 2): "
    
    if "%CHOICE%"=="2" (
        echo.
        echo WARNING: This will OVERWRITE any changes on GitHub with your local changes.
        set /p CONFIRM="Are you sure? (yes/no): "
        if /i "%CONFIRM%"=="yes" (
            goto FORCE_PUSH
        ) else (
            echo Operation cancelled.
            pause
            exit /b 1
        )
    )
    
    echo Please resolve conflicts manually, then run this script again.
    pause
    exit /b 1
)

echo.
echo Step 3: Preparing files for commit...
git add .
if %ERRORLEVEL% NEQ 0 (
    echo Failed to add files to the staging area.
    pause
    exit /b 1
)

echo.
echo Step 4: Creating commit...
set /p COMMIT_MSG="Enter commit message (or press Enter for default message): "
if "%COMMIT_MSG%"=="" set COMMIT_MSG="Enhanced WebGIS project with ArcGIS-like map interface"
git commit -m "%COMMIT_MSG%"
if %ERRORLEVEL% NEQ 0 (
    echo Failed to create commit.
    pause
    exit /b 1
)

echo.
echo Step 5: Pushing to GitHub...
git push origin main
if %ERRORLEVEL% NEQ 0 (
    echo Failed to push to GitHub.
    echo.
    echo The most common issues are:
    echo 1. Authentication failure - Ensure you're using the correct credentials
    echo 2. Remote has changes that need to be pulled first
    echo.
    echo Options:
    echo 1. Try with authentication (using a token)
    echo 2. Force push your changes (will overwrite remote changes)
    echo.
    set /p CHOICE="Enter option (1 or 2): "
    
    if "%CHOICE%"=="1" (
        echo.
        echo You'll need a Personal Access Token from GitHub.
        echo Create one at: GitHub Settings -^> Developer settings -^> Personal access tokens
        echo.
        set /p TOKEN="Enter your GitHub token: "
        echo.
        echo Using token for authentication...
        set GIT_CURL_VERBOSE=1
        git -c http.extraHeader="Authorization: token %TOKEN%" push origin main
        if %ERRORLEVEL% NEQ 0 (
            echo Still failed to push. You might need to force push or resolve conflicts.
            goto FORCE_PUSH_OPTION
        )
    ) else if "%CHOICE%"=="2" (
        :FORCE_PUSH_OPTION
        echo.
        echo WARNING: This will OVERWRITE any changes on GitHub with your local changes.
        set /p CONFIRM="Are you sure? (yes/no): "
        if /i "%CONFIRM%"=="yes" (
            :FORCE_PUSH
            echo.
            echo Force pushing to GitHub...
            git push -f origin main
            if %ERRORLEVEL% NEQ 0 (
                echo Failed to force push. Please check your credentials and permissions.
                pause
                exit /b 1
            ) else (
                echo Force push successful!
            )
        ) else (
            echo Operation cancelled.
            pause
            exit /b 1
        )
    ) else (
        echo Invalid option. Operation cancelled.
        pause
        exit /b 1
    )
)

echo.
echo === Upload Complete! ===
echo Your code is now available at: https://github.com/ngobac/WebGIS-Project
echo.
pause
