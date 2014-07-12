$(document).ready(function(){
	/*Station configuration on start screen'*/
	$("#newStationStart").autocomplete({
		delay: 1000,
		source: stationNames
	});

	$("#addStationStart").on("click", function(){
		if($("#newStationStart").val() != ""){
			addStation($("#newStationStart").val());
		}
	});

	/*Settings button*/
	$("#settingsButton").on("click", function(){
	    $("#settings").show();
	    $("#settingsBack").show();
	    $("#settingsButton").hide();
	});

	$("#settingsBack").on("click", function () {
	    $("#settings").hide();
	    $("#settingsBack").hide();
	    $("#settingsButton").show();
	});

	$("#changeStation").on("click", function () {
	    $("#start-overlay").show();
	    $("#content").html("");
	    $("#settings").hide();
	    $("#run").hide();
	    $("#height").hide();
	    $("#delete").hide();
	    $("#changeStationBack").show();
	    $(this).hide();
	});

	$("#changeStationBack").on("click", function () {
	    $(this).hide();
	    $("#start-overlay").hide();
	    $("#changeStation").show();
	});

	/*Add new station on setting page*/
	$("#newStationSettings").autocomplete({
		delay: 1000,
		source: stationNames
	});

	$("#newStationSettings").on("click", function(e){
		e.stopPropagation();
	});

	$("#addStationSettings").on("click", function(e){
		e.stopPropagation();
		if($("#newStationSettings").val() != ""){
		    addStation($("#newStationSettings").val());
		    console.log($("#newStationSettings").val())
		}
	});

	/*Everything for run*/

	$("#runHelp").html("Please run " + user.laplength + " meters. Press Go! if you are ready");	

	$("#runBackToMenu").on("click", function(e){
	    e.stopPropagation();
	    clearInterval(movement.runInterval);
	    $("#distanceRan").html("0");
	    $("#timeRan").html("0");
	    $("#settingsBack").show();
	    $("#settings").show();
	    $(this).hide();
	    $("#run").hide();
	});

	$("#reconfRun").on("click", function(e){
		$("#settings").hide();
		$("#run").show();
		$("#settingsBack").hide();
		$("#runBackToMenu").show();
	});

	$("#startRun").on("click", function(e){
		e.stopPropagation();
		run();
	});

	/*Everything for climbing stairs*/

	$("#height").on("click", function(e){
	    $(this).hide();
	    e.stopPropagation();
	    clearInterval(movement.heightInterval);
	    $("#heightToDescend").html("0");
	    $("#timeDescended").html("0");
		if(!user.firstStart){
			$("#start-overlay").show();
			$("#addStationContainerStart").show();
		}
	});

	$("#reconfHeight").on("click", function(e){
		e.stopPropagation();
		$("#settings").hide();
		$("#settingsBack").hide();
		$("#heightBackToMenu").show();
		$("#height").show();
	});

	$("#heightBackToMenu").on("click", function(e){
	    e.stopPropagation();
	    $("#timeDescended").html("0");
	    $("#settingsBack").show();
	    $("#settings").show();
	    $(this).hide();
	    $("#height").hide();
	});

	$("#startDescend").on("click", function(e){
		e.stopPropagation();
		startDescend();
		$(this).hide();
		$("#stopDescend").show();
	});

	$("#stopDescend").on("click", function(e){
		e.stopPropagation();
		stopDescend();
		$(this).hide();
		$("#height").hide();
		$("#start-overlay").show();
		$("#addStationContainerStart").show();
	});

    /*Everything for delete*/

	$("#deleteStation").on("click", function (e) {
	    e.stopPropagation();
	    $("#settings").hide();
	    $("#settingsBack").hide();
	    $("#deleteBackToMenu").show();
	    $("#delete").show();
        deleteStations();
	});

	$("#deleteBackToMenu").on("click", function (e) {
	    e.stopPropagation();
	    $("#settingsBack").show();
	    $("#settings").show();
	    $(this).hide();
	    $("#delete").hide();
	});

});