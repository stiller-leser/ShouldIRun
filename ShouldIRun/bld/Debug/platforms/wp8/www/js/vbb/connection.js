function getCon(hafasNr){
	//AccessID and URL from the appsandthecity.net
	var accessId = '951a204d5462906e60494ed0a7a79ff5'
	var hafasUrl = 'http://demo.hafas.de/bin/pub/vbb-fahrinfo/relaunch2011/extxml.exe/';

	//Get the current date
	var date = new Date();
	var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	
	//00 = leer; 90 = Hafas-Number; 58101 = VBB-Number - In this case its Berlin Südkreuz
	//The numbers can be found here: https://offenedaten.de/dataset/vbb-haltestellen/resource/7472a55b-3bf7-49ee-80cb-ad9ebb781252
	var station = '00' + hafasNr;

	//Request, can be configured through the variables up there, DON'T TOUCH the request itself
	var request = '<STBReq boardType="DEP"><Time>' + time + '</Time><Today /><TableStation externalId="' + station + '"/><ProductFilter>1111111111111111</ProductFilter></STBReq>';
	//Request gets wrapped in this: DON'T TOUCH!
	var reqC = '<?xml version="1.0" encoding="iso-8859-1"?><ReqC lang="DE" prod="testsytem" ver="1.1" accessId="' + accessId + '">' + request + '</ReqC>';

	console.log(reqC);

	$.ajax({
		url: hafasUrl,
		contentType: 'text/xml',
		type: "POST",
		dataType: "xml",
		crossDomain: true,
		processData: false,
		data: reqC
	}).done(function (jqXhr) {
		$("#start-overlay").hide();
		$(".app").show();
		var xml = jqXhr;
		//Process the answer of the server
		var resC = $('STBJourney',xml);
		var list = "<ul>";
        console.log(jqXhr)
	    //From here on we can filter like this
		$(resC).each(function () {
			var timeDate = $(this).find("Time")[0].textContent;
			//Get the time of the connection
			var time = timeDate.split("T")[1];
			var hours = time.split(":")[0];
			var minutes = time.split(":")[1];
			var seconds = 0;

			//0 ist Tram67, 1 ist Tram, 2 ist nur T, 3 ist BVG, 4 ist nur 67, 5 ist Richtung
			try{
				var tram = $(this).find("AttributeVariant[type='NORMAL']")[0].textContent;
				var direction = $(this).find("AttributeVariant[type='NORMAL']")[5].textContent;
			}catch(err){
				alert("Could not load notifications");
				console.log(err);
				console.log($(resC));
			}

			list += "<li class='connectionList' data-hours=" + hours +" data-minutes=" + minutes + " data-seconds=" + seconds + ">";
			list += "Time: " + time + " - " + tram + " to " + direction + "</li>";
		});
		list += "</ul>";

		$("div[data-role='content']").append(list);
	}).fail(function (error) {
	    console.log("ERROR");
		console.log(error);
	});
}

function calculateCon(){
	var connections = $(".connectionList");
	$(connections).each(function(){

		//Calculate the difference in time

		var hours = $(this).data("hours");
		var minutes = $(this).data("minutes");
		var seconds = $(this).data("seconds");
		
		var currentDate = new Date();
		var currentTimeHours = currentDate.getHours();
		var currentTimeMinutes = currentDate.getMinutes();
		var currentTimeSeconds = currentDate.getSeconds();

		var timeTram = (hours*60*60) + (minutes*60) + seconds;
		var currentTime = (currentTimeHours*60*60) + (currentTimeMinutes * 60) + currentTimeSeconds;

		var conDifference = timeTram - currentTime;
		
		//Take the laptime of the user into account

		var distance = user.distanceStation;

		var timeOneMeter = user.laptime / user.laplength;
		var timeForDistance = distance * timeOneMeter;

		//Remember kids, the differences are in seconds

		var overallDifference = conDifference - timeForDistance;

		//Overall Difference is not working

		if(overallDifference <= -61){
		    $(this).hide();
		} else if (overallDifference <= -60){
			$(this).css("background-color","black");
		} else if (overallDifference <= 30){
			$(this).css("background-color","purple")
		} else if (overallDifference <= 60){
			$(this).css("background-color","red")
		} else if (overallDifference <= 120){
			$(this).css("background-color","orange")
		} else if (overallDifference <= 150){
			$(this).css("background-color","yellow")
		} else if (overallDifference <= 180){
			$(this).css("background-color","darkgreen")
		} else {
			$(this).css("background-color","lime")
		}
	});
}