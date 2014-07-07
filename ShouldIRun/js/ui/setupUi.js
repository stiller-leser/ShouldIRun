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
	})

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
		//If user started the app for the first time, show start overlay
		/*if(!user.firstStart){
			$("#height").show();
		}*/
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

	/*$("#heightHelp").html("Please descend " + user.height + " meters. Press Go! if you are ready");
	$("#heightToDescend").html(user.height);

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
		$("#height").show();
	});

	$("#startDescend").on("click", function(e){
		e.stopPropagation();
		descend();
	});*/

});