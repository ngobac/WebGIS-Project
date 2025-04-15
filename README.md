# WebGIS Project

A basic WebGIS application for displaying and interacting with land lots in Ho Chi Minh City.

## Features

- Display OpenStreetMap as a base layer
- Load and display land lots from GeoJSON data
- Interactive popups showing lot name and area when clicked
- Responsive design

## Installation

1. Open the project directory in your file explorer:
```
C:\WebGIS\Project
```

2. Run the setup script by double-clicking:
```
run_local.bat
```

This will automatically install dependencies and start the application.

## Running the Application

Start the local development server:
```
npm start
```

This will launch the application in your default web browser.

## Uploading to GitHub

To upload the project to GitHub:

1. Simply run the upload script by double-clicking:
```
upload_to_github.bat
```

This will initialize a Git repository, commit all files, and push to the GitHub repository.

## Project Structure

- `index.html`: Main HTML file
- `style.css`: Stylesheet for the application
- `script.js`: JavaScript code for map functionality
- `lots.geojson`: GeoJSON data containing land lots information

## Technologies Used

- Leaflet.js for interactive mapping
- OpenStreetMap for base map data
- HTML/CSS/JavaScript for the web interface
