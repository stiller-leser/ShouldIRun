d3.csv("js/data/data.csv", function(test){
	var string = "{";
	$(test).each(function(){
		string += '"' + this.NAME.replace("\\"," -") + '":';
		string += "[";

		string += '"' + this.HAFASNr + '",';
		string += '"' + this.lat + '",';
		string += '"' + this.lon + '"';

		string +="],";
		console.log();
	});
	string += "}";
	$("#conOutput").html(string);
});
