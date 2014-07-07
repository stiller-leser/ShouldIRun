var movement = {
    runInterval: 0,
    heightInterval: 0
};

function run(caller) {
    if (geoData.accuracy <= geoData.requiredAccuracy) {
        var date = new Date();
        var startTime = date.getTime();

        //get the position of the user
        var startLat = geoData.latitude;
        var startLong = geoData.longitude;

        console.log(startLat + " : " + startLong);

        if (startLat != 0 && startLong != 0) {
            var time = 0;

            if (!user.isMobile) {
                var intervalTime = (Math.random() + 0.1) * 1000;
                alert("not mobile");
                var desktop = window.setInterval(function () {
                    geoData.distanceRan += 1;
                    $("#distanceRan").html(user.laplength - geoData.distanceRan);
                    console.log(geoData.distanceRan);
                }, intervalTime);
            }

            movement.runInterval = window.setInterval(function () {
                console.log(geoData.latitude + " : " + geoData.longitude);

                if (geoData.distanceRan < user.laplength) {
                    var date = new Date();
                    console.log(geoData.distanceRan);
                    if (user.isMobile) {
                        var distanceM = getDistanceFromLatLon(startLat, startLong, geoData.latitude, geoData.longitude);
                        $("#distanceRan").html(distanceM);
                        geoData.distanceRan = distanceM;
                    }
                    time = (date.getTime() - startTime) / 1000;
                    $("#timeRan").html(time);
                } else {
                    if (!user.isMobile) {
                        clearInterval(desktop);
                    }
                    clearInterval(movement.runInterval);
                    user.laptime = time;
                    window.localStorage.setItem("laptime", time);

                    //If user started the app for the first time, show start overlay
                    if (!user.firstStart) {
                        $("#run").hide();
                        $("#height").show();
                    }
                }

            }, 1000);
        } else {
            alert("No GPS, please wait 10 seconds.");
        }
    } else {
        alert("Accuracy is not high enough, please go outside")
    }
};

function descend(){
	var date = new Date();
	var startTime = date.getTime();

	//get the position of the user
	var startAltitude = geoData.altitude;

	var intervalTime = (Math.random() + 0.1) * 1000;

	if(startAltitude != 0){
		var time = 0;

		if(!user.isMobile){
			var desktop = window.setInterval(function(){
				geoData.distanceDescended += 1;
				$("#heightToDescend").html(user.height - geoData.distanceDescended);
				console.log(geoData.distanceDescended);
			}, intervalTime);
		}

		movement.heightInterval = window.setInterval(function(){
		 	if(geoData.distanceDescended < user.height){
		 		var date = new Date();
		 		geoData.distanceDescended = startAltitude - geoData.altitude;
				console.log(geoData.distanceDescended);
				$("#heightToDescend").html(user.height - geoData.distanceDescended);
				time = (date.getTime() - startTime) / 1000;
				$("#timeDescended").html(time);
			} else {
				if(!user.isMobile){
					clearInterval(desktop);
				}
				clearInterval(movement.heightInterval);
				user.heightTime = time;
				window.localStorage.setItem("heightTime", time);

				if(!user.notFirstStart){
					$("#height").hide();
					$("#start-overlay").show();
					$("#addStationContainerStart").show();
				}
			}

		}, 1000);
	} else {
		alert("No GPS, please wait 10 seconds.");
	}

}