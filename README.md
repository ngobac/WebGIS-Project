# WebGIS Project

An interactive web mapping application for forest resource management and environmental data visualization.

## Features

- **Interactive Web Maps**: Explore forest resource data through interactive maps with multiple basemaps
- **Data Import**: Upload and visualize spatial data in various formats (GeoJSON, KML, Shapefile)
- **Measurement Tools**: Measure distances and areas directly on the map
- **Layer Management**: Control visibility and styling of map layers
- **Coordinate Display**: View real-time WGS84 coordinates as you move across the map
- **Drawing Tools**: Create and edit spatial features on the map

## Technology Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML, CSS, JavaScript
- **Mapping**: Leaflet.js
- **Styling**: Bootstrap 5
- **Data Processing**: Turf.js

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/ngobac/WebGIS-Project.git
   ```

2. Navigate to the project directory:
   ```
   cd WebGIS-Project
   ```

3. Create and activate a virtual environment:
   ```
   python -m venv venv
   venv\Scripts\activate  # On Windows
   source venv/bin/activate  # On macOS/Linux
   ```

4. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

5. Run the application:
   ```
   python app.py
   ```

6. Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

## Usage

- Use the toolbar at the top of the map to access drawing and measurement tools
- Import data using the control panel on the right side of the map
- Switch between different basemaps to better visualize your data
- Click on features to view their attributes
- Measure distances and areas using the measurement tools
- Export your data and measurements for use in other applications

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Data provided by [Your Data Source]
- Icons from [Font Awesome](https://fontawesome.com/)
- Basemaps from OpenStreetMap, ESRI, and CartoDB
