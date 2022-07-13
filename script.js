let luke = {}
var desc = document.querySelector("h2")
var btn = document.querySelector(".js-button")
var pin = document.querySelector(".js-frame")
var loadText = document.querySelector(".update")
var loader = document.querySelector(".loader")

var issIcon = L.icon({
iconUrl: 'fav.png',


iconSize:     [64, 74], // size of the icon
iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
shadowAnchor: [4, 62],  // the same for the shadow
popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// Gets API Data from JSON
async function getISS() {
    const api_url = "https://api.wheretheiss.at/v1/satellites/25544"
    const response = await fetch(api_url);
    const data = await response.json();
    const {latitude, longitude} = data;


    var name = String(data.name)
    var ISS = name.toUpperCase()
    desc.innerHTML = (`<h2>
    Where is the ${ISS} now? <br>Latitude: ${data.latitude}<br>
    Longtitude: ${data.longitude}
    <h2>`)   
    loadText.style.visibility = "visible"
    loader.style.visibility = "hidden"
    return data;    
}


// Initializes a map
    var map = L.map('map').setView([0, 0], 13)
    var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 3,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    var marker = L.marker([0, 0], {icon:issIcon}).addTo(map);


    


    loadText.style.display = "inline-block"
setInterval(function(){


    ( async() => {

    const data = await getISS();
    lat = data.latitude
    long = data.longitude
    console.log(lat,long)
    console.log("this should run")
    getISS()
    
    lat = data.latitude
    long = data.longitude
    console.log(lat)
    console.log(long)
    map.panTo(new L.LatLng(lat, long));
    marker.setLatLng([lat, long], {icon:issIcon}).update();
    })()
    }, 3000)

    





       
 