@echo off
echo === Git Repository Diagnostic Tool ===
echo This script will check for common Git issues and help fix them

REM Check if Git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Git is not installed. Please install Git from https://git-scm.com/downloads
    pause
    exit /b 1
)

echo.
echo === Checking Git configuration ===
git config --list

echo.
echo === Checking repository status ===
git status

echo.
echo === Checking remote repositories ===
git remote -v

echo.
echo === Checking branch information ===
git branch -a

echo.
echo === Checking last 5 commits ===
git log --oneline -n 5

echo.
echo === Checking for nested git repositories ===
dir /s /b /a:h .git | findstr /v "\\\.git\\"
if %ERRORLEVEL% EQU 0 (
    echo WARNING: Nested .git directories found. This can cause problems.
    echo Consider removing nested .git directories except the one at the project root.
) else (
    echo No nested .git directories found. Good!
)

echo.
echo === Checking for large files ===
echo Files larger than 50MB:
for /r %%F in (*) do (
    set "size=%%~zF"
    if !size! GTR 52428800 (
        echo %%F - !size! bytes
    )
)

echo.
echo === Recommended actions ===
echo 1. Make sure you're in the correct directory (C:\WebGIS\Project) when running Git commands
echo 2. Use 'git add .' to add all files (don't specify 'WebGIS', 'project', etc. as arguments)
echo 3. Run the upload_to_github_fix.bat script to push your changes

echo.
echo === Diagnostic complete ===
pause
