var user = {
    firstStart: true,
    distanceStation: 170,
    laplength: 100,
    laptime: 3, //Average speed of a human jogging in m/s
    height: 5,
    heightTime: 2,
    updateTime: 10000,
    isMobile: true,
    debug: true
}

function init() {
    console.log("init")
    getPosition();
    user.isMobile = true; //window.matchMedia("only screen and (device-max-width: 760px)").matches;

    //Does the app is started for the first time?
	user.firstStart = window.localStorage.getItem("firstStart");
	if(!user.firstStart){

		$("#start-overlay").hide();
		$("#run").show();

		window.localStorage.setItem("firstStart", true);
	} else {
		displayStations();
		if(user.isMobile){
			user.laptime = window.localStorage.getItem("laptime");
			/*user.heightTime = window.localStorage.getItem("heighTime");*/
		}
	}

	if (user.debug) {
	    window.setTimeout(function () {
	        var startLat = geoData.latitude;
	        var startLong = geoData.longitude;
	        //getDistance(startLat, startLong, geoData.latitude, geoData.longitude, "run");
	        var debug = window.setInterval(function () {
	            console.log(geoData.latitude + " : " + geoData.longitude);
	            var string = "";
	            string += "Altitude: " + geoData.altitude + "<br>";
	            string += "Longitude: " + geoData.longitude + "<br>";
	            string += "Latitude: " + geoData.latitude + "<br>";
	            string += "Distance Run: " + getDistanceFromLatLon(startLat, startLong, geoData.latitude, geoData.longitude) + "<br>";
	            string += "Accuracy: " + geoData.accuracy;
	            $("#debug").html(string);
	        }, 5000);
	    }, 15000);
	}
};