//make a new map
var map = L.map('map', {
    crs: L.CRS.Simple //This changes coordinates to a simple square mapping
}).fitWorld();

var markers = []; // Used to
var a = 0; // Used to store the alpha value from the orientation sensor
var b = 0; // Used to store the beta value from the orientation sensor


// create a map tile layer and add it to the map

L.tileLayer('fabric-tile.jpg', {
    attribution: '',
    maxZoom: 4,
    minZoom: 1
}).addTo(map);

var markerIcon = L.icon({
    iconUrl: 'marker_red.png',
    iconSize: [35, 35],
    iconAnchor: [17, 17],
});

//click on the map to add a marker
map.on('click', addMarker);

window.addEventListener("deviceorientation", handleOrientation, true);
function handleOrientation(e){
  b = e.beta;
  a = e.alpha;
  console.log(b)
}

var mapBounds = [
    [-180, -180],
    [-180, 180],
    [180, 180],
    [180, -180],
    [-180, -180],
];

var borders = L.polyline(mapBounds, {color: '#0000ff33'}).addTo(map);
// zoom the map to the polyline
map.fitBounds(borders.getBounds());

function addMarker(e){
    var date = new Date();

    var latlng = L.latLng(a, b);
    //var latlng = L.latLng((date.getSeconds() * 6) - 180, b); //Use this line instead to map

    marker = L.marker(latlng, {icon: markerIcon}).addTo(map);
    markers.push(latlng)
    //console.log(markers);
    var polygon = L.polygon(markers, {color: 'white'}).addTo(map);
}
