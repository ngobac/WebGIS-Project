from flask import Flask, render_template, request, redirect, url_for, send_from_directory
import os
import json
from datetime import datetime

app = Flask(__name__)

# Data for the website
SKILLS = {
    "GIS": ["Geographic Information Systems", "Spatial data management", "Cartography", "Spatial analysis"],
    "Remote Sensing": ["Satellite imagery processing", "Image classification", "Change detection", "Vegetation indices"],
    "Spatial Analysis": ["Geostatistics", "Network analysis", "Terrain analysis", "Spatial interpolation"],
    "Forest Management": ["Forest inventory", "Sustainable forestry", "Biodiversity assessment", "Carbon sequestration"],
    "Technology": ["Google Earth Engine", "ArcGIS Pro", "QGIS", "Python", "Mapbox", "R", "JavaScript"]
}

BLOG_POSTS = [
    {
        "id": 1,
        "title": "Getting Started with Google Earth Engine for Forest Monitoring",
        "category": "GIS/RS Tools",
        "date": "2025-03-15",
        "excerpt": "Learn how to use Google Earth Engine to monitor forest cover changes over time.",
        "image": "static/img/blog/gee-forest.jpg"
    },
    {
        "id": 2,
        "title": "Python for Spatial Analysis: A Beginner's Guide",
        "category": "Python",
        "date": "2025-02-28",
        "excerpt": "This guide walks you through setting up your Python environment for spatial analysis.",
        "image": "static/img/blog/python-spatial.jpg"
    },
    {
        "id": 3,
        "title": "Latest Innovations in Remote Sensing Technology",
        "category": "Technology",
        "date": "2025-01-20",
        "excerpt": "Exploring cutting-edge remote sensing platforms and their applications in resource management.",
        "image": "static/img/blog/rs-innovations.jpg"
    },
    {
        "id": 4,
        "title": "Creating Interactive Web Maps with Leaflet",
        "category": "Tutorials",
        "date": "2024-12-10",
        "excerpt": "Step-by-step guide to creating responsive and interactive web maps using Leaflet.",
        "image": "static/img/blog/leaflet-webmaps.jpg"
    },
    {
        "id": 5,
        "title": "Forest Fire Risk Assessment Using Machine Learning",
        "category": "Research",
        "date": "2024-11-05",
        "excerpt": "How to combine remote sensing data with machine learning to predict forest fire risks.",
        "image": "static/img/blog/fire-ml.jpg"
    },
    {
        "id": 6,
        "title": "Automating Deforestation Detection with Python",
        "category": "Python",
        "date": "2024-10-18",
        "excerpt": "Build an automated system to detect and alert about deforestation events.",
        "image": "static/img/blog/deforestation-python.jpg"
    }
]

TOOLS = [
    {
        "id": 1,
        "name": "ForestCoverAnalyzer",
        "description": "A Python toolkit for analyzing forest cover changes using satellite imagery.",
        "features": ["Automated classification", "Time-series analysis", "Export to GIS formats"],
        "technologies": ["Python", "NumPy", "rasterio", "scikit-learn"],
        "github": "https://github.com/username/ForestCoverAnalyzer",
        "image": "static/img/tools/forest-cover.jpg"
    },
    {
        "id": 2,
        "name": "NDVI Calculator Plugin",
        "description": "A QGIS plugin that simplifies the calculation of vegetation indices from satellite imagery.",
        "features": ["Supports multiple indices (NDVI, EVI, SAVI)", "Batch processing", "Time-series graphs"],
        "technologies": ["Python", "PyQGIS", "Qt", "matplotlib"],
        "github": "https://github.com/username/NDVI-Calculator",
        "image": "static/img/tools/ndvi-plugin.jpg"
    },
    {
        "id": 3,
        "name": "GEE Forest Monitor",
        "description": "Google Earth Engine scripts for continuous monitoring of forest health and changes.",
        "features": ["Automated alerts", "Cloud-based processing", "Interactive dashboard"],
        "technologies": ["JavaScript", "Google Earth Engine API", "Earth observation data"],
        "github": "https://github.com/username/GEE-Forest-Monitor",
        "image": "static/img/tools/gee-monitor.jpg"
    },
    {
        "id": 4,
        "name": "LiDAR Point Cloud Processor",
        "description": "Tools for processing and analyzing LiDAR data for forestry applications.",
        "features": ["Ground filtering", "Tree detection", "Biomass estimation"],
        "technologies": ["Python", "PDAL", "laspy", "Open3D"],
        "github": "https://github.com/username/LiDAR-Processor",
        "image": "static/img/tools/lidar-tool.jpg"
    }
]

PROJECTS = [
    {
        "id": 1,
        "title": "National Forest Inventory Modernization",
        "description": "Led the technical implementation of modern remote sensing methods to enhance the national forest inventory process.",
        "role": "GIS Technical Lead",
        "partners": ["National Forestry Department", "Environmental Research Institute"],
        "image": "static/img/projects/forest-inventory.jpg",
        "date": "2024-2025"
    },
    {
        "id": 2,
        "title": "Deforestation Early Warning System",
        "description": "Developed an automated system that uses satellite imagery to detect and alert about potential deforestation events in protected areas.",
        "role": "Remote Sensing Specialist & Lead Developer",
        "partners": ["Conservation International", "Local Forest Protection Units"],
        "image": "static/img/projects/deforestation-alert.jpg",
        "date": "2023-2024"
    },
    {
        "id": 3,
        "title": "Carbon Stock Assessment for REDD+ Projects",
        "description": "Created methodology and tools for accurately measuring and monitoring forest carbon stocks in REDD+ project areas.",
        "role": "Spatial Analysis Expert",
        "partners": ["UN-REDD Programme", "Climate Investment Fund"],
        "image": "static/img/projects/carbon-stock.jpg",
        "date": "2022-2023"
    },
    {
        "id": 4,
        "title": "Biodiversity Mapping for Conservation Planning",
        "description": "Combined field surveys with remote sensing to create high-resolution biodiversity maps for prioritizing conservation efforts.",
        "role": "GIS Analyst & Field Coordinator",
        "partners": ["Wildlife Conservation Society", "National Biodiversity Institute"],
        "image": "static/img/projects/biodiversity-map.jpg",
        "date": "2021-2022"
    }
]

MAPS = [
    {
        "id": 1,
        "title": "Forest Cover Change (2000-2025)",
        "description": "Interactive map showing forest cover changes over 25 years with filtering options by region and forest type.",
        "type": "Leaflet",
        "image": "static/img/maps/forest-cover.jpg",
        "map_id": "forest-cover-map"
    },
    {
        "id": 2,
        "title": "Real-time Fire Monitoring",
        "description": "Live map of active fire hotspots with historical data and risk assessment layers.",
        "type": "Mapbox GL",
        "image": "static/img/maps/fire-monitor.jpg",
        "map_id": "fire-monitor-map"
    },
    {
        "id": 3,
        "title": "Forest Health Index",
        "description": "Visualization of forest health metrics derived from multi-spectral satellite imagery.",
        "type": "Leaflet",
        "image": "static/img/maps/forest-health.jpg",
        "map_id": "forest-health-map"
    },
    {
        "id": 4,
        "title": "3D Forest Structure Model",
        "description": "Three-dimensional visualization of forest structure based on LiDAR data.",
        "type": "CesiumJS",
        "image": "static/img/maps/3d-forest.jpg",
        "map_id": "forest-3d-map"
    }
]

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html', skills=SKILLS)

@app.route('/blog')
def blog():
    return render_template('blog.html', posts=BLOG_POSTS)

@app.route('/blog/<int:post_id>')
def blog_post(post_id):
    post = next((post for post in BLOG_POSTS if post["id"] == post_id), None)
    if post:
        return render_template('blog_post.html', post=post)
    return redirect(url_for('blog'))

@app.route('/maps')
def maps():
    return render_template('maps.html', maps=MAPS)

@app.route('/tools')
def tools():
    return render_template('tools.html', tools=TOOLS)

@app.route('/projects')
def projects():
    return render_template('projects.html', projects=PROJECTS)

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'POST':
        # In a real app, you would process the form data here
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')
        
        # Just a placeholder for form processing
        print(f"Contact form submission: {name}, {email}, {message}")
        
        # Redirect to thank you page or same page with a success message
        return render_template('contact.html', success=True)
    
    return render_template('contact.html')

@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

@app.route('/download/cv')
def download_cv():
    return send_from_directory('static/files', 'cv.pdf')

@app.context_processor
def inject_year():
    return {'year': datetime.now().year}

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
