// for geolocation and maps

document.addEventListener("DOMContentLoaded", init);

const KEY = "AIzaSyAFEzuDjXboUMYasDHpJuCG84VP3vJQLPw"

let myLatLng

function init(){
    if("geolocation" in navigator){
        let options = {
            timeout: 15000,
            maximumAge: 0,
            enableHighAccuracy: true
        };
        document.querySelector("#textCon").textContent = "Loading";
        navigator.geolocation.getCurrentPosition(ftw, wtf, options);
    }else{
        alert("Time for an upgrade dude.");
    }
}
function ftw(position){
    console.log(position);

    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${KEY}`;
    fetch(url)
    .then(response => response.json())
    .then(data =>{
        document.getElementById("textCon").textContent = data.results[0].formatted_address;
        myLatLng = data.results[0].geometry.location;
        buildMyMap(position);
    })    
}
function wtf(err){
    console.error(err);
    let position ={
        coords:{
            latitude: 45.4567,
            longitude: -75.5678
        }
    }
    
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${KEY}`;
    fetch(url)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
        document.getElementById("textCon").textContent = data.results[0].formatted_address;
        myLatLng = data.results[0].geometry.location;
        buildMyMap(position);
    })
}
function buildMyMap(pos){
    console.log(myLatLng)
    
    let map = new google.maps.Map(document.getElementById("m"), {
        center: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
        },
        zoom: 16
    });
    let marker = new google.maps.Marker({
        position: myLatLng,
        map: map
    })
    marker.setMap(map);
}