@echo off
echo Setting up Git repository...

git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ngobac/WebGIS-Project
git push -u origin main

echo Git repository setup complete!
pause
