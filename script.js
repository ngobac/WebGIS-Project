// Initialize the map centered on Ho Chi Minh City
const map = L.map('map').setView([10.8231, 106.6297], 11);

// Add OpenStreetMap as a base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
}).addTo(map);

// Function to style the land lot polygons
function stylePolygon(feature) {
    return {
        fillColor: '#3388ff',
        weight: 2,
        opacity: 1,
        color: '#2c3e50',
        fillOpacity: 0.5
    };
}

// Function to create popup content for each polygon
function createPopupContent(feature, layer) {
    if (feature.properties) {
        const popupContent = document.createElement('div');
        popupContent.className = 'popup-content';
        
        const title = document.createElement('h3');
        title.textContent = feature.properties.name || 'Unnamed Lot';
        popupContent.appendChild(title);
        
        const areaInfo = document.createElement('p');
        areaInfo.textContent = `Area: ${feature.properties.area ? feature.properties.area.toFixed(2) : 'Unknown'} sq.m`;
        popupContent.appendChild(areaInfo);
        
        layer.bindPopup(popupContent);
    }
}

// Load GeoJSON data from file
fetch('lots.geojson')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Add the GeoJSON layer to the map
        L.geoJSON(data, {
            style: stylePolygon,
            onEachFeature: createPopupContent
        }).addTo(map);
        
        // Fit the map to the bounds of the GeoJSON data
        if (data.features && data.features.length > 0) {
            const geoJsonLayer = L.geoJSON(data);
            map.fitBounds(geoJsonLayer.getBounds());
        }
    })
    .catch(error => {
        console.error('Error loading GeoJSON:', error);
        alert('Failed to load land lots data. Please make sure the file exists and is accessible.');
    });
