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
    $("#start-overlay .stationButton").remove();
    
    console.log(stations.length)
    if (stations && stations.length > 0) {
        jQuery.each(stations, function (index, name) {
            var button = document.createElement('button');
            $(button).attr("value", name);
            $(button).attr("class", "stationButton");
            $(button).html(name);
            $(button).addClass("ui-btn ui-shadow ui-corner-all")
            $(button).on('click', { name: name }, function (event) {
                user.floor = $("#userFloor").val();
                $("#changeStationBack").hide();
                $("#changeStation").show();
                loadStation(name);
            })
            $("#start-overlay").append(button);
        });
    } else {
        $("#userHeight").hide();
        $("#addStationContainerStart").show();
    }
}

var deleteStations = function () {
    var stations = JSON.parse(window.localStorage.getItem("savedStations"));
    $("#delete .deleteButton").remove();
    if (stations) {
        jQuery.each(stations, function (index, name) {
            var button = document.createElement('button');
            $(button).attr("value", name);
            $(button).attr("class", "deleteButton");
            $(button).html(name);
            $(button).addClass("ui-btn ui-shadow ui-corner-all")
            $(button).on('click', { name: name }, function (event) {
                var index = stations.indexOf(name);
                console.log(stations)
                if (index > -1) {
                    stations.splice(index, 1);
                    window.localStorage.setItem("savedStations", JSON.stringify(stations));
                    alert("Station deleted");
                    deleteStations();
                }
            })
            $("#delete").append(button);
        });
    }
}

var loadStation = function(name){
	hafasNr = stations[name][0];
	stationData.latitude = stations[name][1];
	stationData.longitude = stations[name][2];

	getCon(hafasNr);
}


