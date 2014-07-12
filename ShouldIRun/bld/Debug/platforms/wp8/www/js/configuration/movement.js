var movement = {
    runInterval: 0,
    heightInterval: 0,
    heightTime: 0
};

function run(caller) {
    if (geoData.accuracy <= geoData.requiredAccuracy) {
        var startDate = new Date();
        var startTime = startDate.getTime();

        //get the position of the user
        var startLat = geoData.latitude;
        var startLong = geoData.longitude;

        if (startLat != 0 && startLong != 0) {
            var time = 0;

            movement.runInterval = window.setInterval(function () {

                if (geoData.distanceRan < user.laplength) {
                    var date = new Date();
                    if (user.isMobile) {
                        var distanceM = getDistanceFromLatLon(startLat, startLong, geoData.latitude, geoData.longitude);
                        $("#distanceRan").html(distanceM);
                        geoData.distanceRan = distanceM;
                    }
                    time = (date.getTime() - startTime) / 1000;
                    $("#timeRan").html(time);
                } else {
                    clearInterval(movement.runInterval);
                    user.laptime = time;
                    window.localStorage.setItem("laptime", time);
                    //If the user started the app for the first time, force him to run, even if he closes the app and opens it again
                    //If user started the app for the first time, show start overlay
                    if (!user.firstStart) {
                        window.localStorage.setItem("firstStart", true);
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

function startDescend(){
	var startDate = new Date();
    movement.heightTime = startDate.getTime();

    movement.heightInterval = window.setInterval(function(){
        var date = new Date();
        $("#timeDescended").html((date.getTime() - movement.heightTime) / 1000);
    }, 1000)
}

function stopDescend(){
    var date = new Date();
    user.heightTime = (date.getTime() - movement.heightTime) / 1000;
    clearInterval(movement.heightInterval);
    window.localStorage.setItem("heightTime", user.heightTime);
}