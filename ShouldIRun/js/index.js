var user = {
    firstStart: true,
    distanceStation: -1,
    laplength: 100,
    laptime: 300, //Average speed of a human jogging in m/s
    floorHeight: 2.75,
    heightTime: 2,
    floor: 0,
    updateTime: 5000,
    isMobile: true,
    debug: false
}

function init() {
    getPosition();
    user.isMobile = true; //window.matchMedia("only screen and (device-max-width: 760px)").matches;

    //Does the app is started for the first time?
	user.firstStart = window.localStorage.getItem("firstStart");
	if(!user.firstStart){
		$("#start-overlay").hide();
		$("#run").show();
	} else {
		displayStations();
	    if (window.localStorage.getItem("laptime") != null) {
	        user.laptime = window.localStorage.getItem("laptime");
	    }
	    if (window.localStorage.getItem("heightTime") != null) {
	    	user.heightTime = window.localStorage.getItem("heightTime");
	    }
	}

	var gpsControll = window.setInterval(function () {
	    if (geoData.latitude != 0 && geoData.longitude != 0 && stationData.loaded) {
	        
	        getDistance(geoData.latitude, geoData.longitude, stationData.latitude, stationData.longitude);

	        //First timeout needed because of framewoork gps duration
	        var gpsTimeout = window.setTimeout(function () {
	            var refreshDistance = window.setInterval(function () {
	                getDistance(geoData.latitude, geoData.longitude, stationData.latitude, stationData.longitude);
	            }, user.updateTime);
	        }, 1000);
	        clearInterval(gpsControll);
	    }
	}, 1000);

	if (user.debug) {
	    $("#debug").show();
	    window.setTimeout(function () {
	        var debug = window.setInterval(function () {
	            var string = "";
	            string += "Laptime: " + user.laptime + "<br>";
	            string += "Longitude: " + geoData.longitude + "<br>";
	            string += "Latitude: " + geoData.latitude + "<br>";
	            string += "Distance Run: " + getDistanceFromLatLon(startLat, startLong, geoData.latitude, geoData.longitude) + "<br>";
	            string += "Accuracy: " + geoData.accuracy;
	            $("#debug").html(string);
	        }, 2000);
	    }, 5000);
	}
};