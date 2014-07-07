var addStation = function(newStation){

	var savedStations = JSON.parse(window.localStorage.getItem("savedStations"));

	if(savedStations === null){
		savedStations = [];
		savedStations.push(newStation);
	} else if(savedStations.indexOf(newStation) == -1) {
	    savedStations.push(newStation);
	    alert("Station added");
	} else {
	    alert("Station already exists");
	}
	
	window.localStorage.setItem("savedStations", JSON.stringify(savedStations));

	displayStations();
}

var displayStations = function(){
    var stations = JSON.parse(window.localStorage.getItem("savedStations"));
    $("#start-overlay").html("");
    if (stations) {
        jQuery.each(stations, function (index, name) {
            var button = document.createElement('button');
            $(button).attr("value", name);
            $(button).html(name);
            $(button).addClass("ui-btn ui-shadow ui-corner-all")
            $(button).on('click', { name: name }, function (event) {
                loadStation(name);
            })
            $("#start-overlay").append(button);
        });
    } else {
        $("#addStationContainerStart").show();
    }
}

var loadStation = function(name){
	var hafasNr = stationData[name][0];
	var latitude = stationData[name][1];
	var longitude = stationData[name][2];
	
	getCon(hafasNr);
	calculateCon();

	//First timeout needed because of framewoork gps duration
	var gpsTimeout = window.setTimeout(function(){
		var refreshDistance = window.setInterval(function(){
			getDistance(geoData.latitude, geoData.longitude, latitude, longitude);
			calculateCon();
		}, user.updateTime);
	},5000);
}


