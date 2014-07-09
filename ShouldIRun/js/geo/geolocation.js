
var geoData = {
	altitude: 0,
	latitude: 0,
	longitude: 0,
	accuracy: 0,
    requiredAccuracy: 15,
    distanceRan: 0,
    distanceDescended: 0
};

//Unfortunately first call first after 10 seconds
function getPosition() {
    window.setInterval(function () {
        navigator.geolocation.getCurrentPosition(success, error, { maximumAge: 1000, timeout: 1000, enableHighAccuracy: true });
    }, 100);
}

var success = function (position) {
        geoData.altitude = position.coords.altitude;
        geoData.latitude = position.coords.latitude;
        geoData.longitude = position.coords.longitude;
        geoData.accuracy = position.coords.accuracy;
}

var error = function (error) {
    
	console.log(error);
}

function getDistance(lat1,lon1,lat2,lon2) {
    //Using yournavigation.com - osm material, cause it's open
    $.ajax({
    	url: "http://www.yournavigation.org/api/1.0/gosmore.php?format=kml&flat="+lat1+"&flon="+lon1+"&tlat="+lat2+"&tlon="+lon2+"&v=foot&fast=1",
    	type: "POST",
    	crossDomain: true
    }).done(function(jqXHR){
    	var distanceKm = $(jqXHR).find("distance")[0].textContent;
    	var distanceM = Math.round(distanceKm * 1000);
        $("#distanceStation").html(distanceM);    
        user.distanceStation = distanceM;
    }).fail(function(error){
    	console.log(error);
    })
}

function getDistanceFromLatLon(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d*1000;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}