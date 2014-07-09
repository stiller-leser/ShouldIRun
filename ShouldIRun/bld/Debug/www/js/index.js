var user = {
    firstStart: true,
    distanceStation: -1,
    laplength: 100,
    laptime: 300, //Average speed of a human jogging in m/s
    height: 5,
    heightTime: 2,
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
		if (user.isMobile) {
		    if (window.localStorage.getItem("laptime") != null) {
		        user.laptime = window.localStorage.getItem("laptime");
		        alert("Laptime recovered");
		    }
		    //user.laptime = window.localStorage.getItem("laptime");
		    //console.log("RecoveredLaptime: " + window.localStorage.getItem("laptime") );
			/*user.heightTime = window.localStorage.getItem("heighTime");*/
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
	});

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
	        }, 5000);
	    }, 15000);
	}
};