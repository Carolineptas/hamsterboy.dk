$(document).ready(function() {

	var stations = [
	  { name: "Drogden", id: "6183" },
	  { name: "Kbh lufthavn", id: "6180" },
	  { name: "Gniben", id: "6169" },			
	  { name: "Thorsminde", id: "6052" }			
	];

	function initialize (){
		
		// create each of the stations
		$.each(stations, function(i, item) {

			// create the gauge markup
			createWindGauge( item.id, item.name );

			// load the data
			getGaugeData( item.id, item.name );
			
		});
	}

	function getGaugeData( stationID, stationName ) {
		
		//console.log("init weather station");
		
		$.ajax({
			type: "GET",
			url: 'http://hamsterboy.dk/dev/wind/proxy.php',
			data: { id : stationID },
			success : function( data ) {
				//console.log("	done!");
				fillData(data, stationID);
	        },
			complete: function(data) {
				//setTimeout( getGaugeData(data, stationID), 6000);
				//console.log("Refreshing the data... hang on please.");
			},
			dataType: "json"
		});
	}

	function createWindGauge( stationID, stationName ){
		if ( $("#content .weather-stations").length == 0 ) {
			// create the list element
			$("#content").append("<table class='weather-stations'><tbody></tbody></table>");
		}

		var listItem = 
			"<tr class=\"station-" + stationID + "\">" +
				"<th>" + stationName + "</th>" +
				"<td>" +
					"<div class=\"speed\"><span>0.0</span> <div class=\"speed-unit\">m/s</div></div>" +
				"</td>" +
				"<td>" +
					"<div class=\"direction\">" +
						"<span class=\"direction-icon\"></span>"+
						"<span class=\"label\"></span>"+
					"</li>" +
				"</ul>" +
				"</a>" +
			"</tr>";

			
		// append list item
		$("#content .weather-stations").append( listItem );
		
		return listItem;
	}

	function setWindDirection( elm, angle ) {
		$(elm[0]).css("-moz-transform","rotate("+ angle + "deg)");	
		$(elm[0]).css("-webkit-transform","rotate("+ angle + "deg)");	
		$(elm[0]).css("-ms-transform","rotate("+ angle + "deg)");	
		$(elm[0]).css("-o-transform","rotate("+ angle + "deg)");	
	}

	function fillData( data, stationID ) {

		// create reference to the list item
		var listItem = $(".weather-stations tr.station-"+ stationID);
		
		// fill in the wind speed
		$(listItem).find(".speed span").html(data.windspeed);

		// fill in the wind direction
		//$(listItem).find(".degrees").html(data.degrees + "&deg;");
		
		// set the rotation of the wind arrow
		setWindDirection( $(listItem).find(".direction-icon"), data.degrees ); 
	}

	//initialize();
});
