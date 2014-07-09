stationData = {
    loaded: false,
};

var addStation = function (newStation) {

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
	hafasNr = stations[name][0];
	stationData.latitude = stations[name][1];
	stationData.longitude = stations[name][2];

	getCon(hafasNr);
}


