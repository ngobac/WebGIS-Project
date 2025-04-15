# Installation Guide

Follow these steps to set up and run the WebGIS Project.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Git](https://git-scm.com/)

## Step 1: Clone the Repository

```bash
git clone https://github.com/ngobac/WebGIS-Project.git
cd WebGIS-Project
```

## Step 2: Install Dependencies

Run the following command to install all required dependencies:

```bash
npm install
```

This will install:
- Leaflet.js for the mapping functionality
- http-server for local development

## Step 3: Run the Application

Start the local development server:

```bash
npm start
```

This will:
1. Start a local web server
2. Open the application in your default web browser
3. Automatically serve the WebGIS application

## Troubleshooting

If you encounter any issues:

1. Make sure Node.js is properly installed by running `node -v` in your terminal
2. Verify that the data file exists at `../Data/lots.geojson` relative to the project directory
3. Check browser console for any JavaScript errors

## Manual Start

If `npm start` doesn't automatically open the browser, you can access the application at:

```
http://localhost:8080
```
