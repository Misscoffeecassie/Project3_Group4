var map = L.map('mapid').setView([-25.2744, 133.7751], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

var heatmapData = [
    // [latitude, longitude, population density]
    [-33.8688, 151.2093, 0.5], // Sydney
    [-37.8136, 144.9631, 0.7], // Melbourne
    [-28.0167, 153.4000, 0.3], // Gold Coast
    [-34.9285, 138.6007, 0.4], // Adelaide
    [-31.9505, 115.8605, 0.2], // Perth
    [-35.2809, 149.1300, 0.1], // Canberra
];

var heat = L.heatLayer(heatmapData, { radius: 50 }).addTo(map);