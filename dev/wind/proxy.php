<?php
// Set your return content type
header('Content-type: application/json;');

if ( $_GET["id"] ) {
	
	$stationID = $_GET["id"];
	
	// Website url to open
	$daurl = 'http://servlet.dmi.dk/bv/servlet/bv?stat='.$stationID.'&map=dk&param=wind';
	
	// Get that website's content
	$handle = fopen($daurl, "r");

	// If there is something, read and return
	if ($handle) {
	    while (!feof($handle)) {
		
			$buffer .= fread($handle, 8192);
	    }

	    fclose($handle);
	}

	// do the magic - or something
	list($part1, $part2) = explode('middelvind:', $buffer);
	
	list($angleAndSpeed, $junk) = explode('<br>', $part2);

	// remove white spaces
	$angleAndSpeed = str_replace(" ", "", $angleAndSpeed);

	// split into two variables
	list($windAngle, $windSpeed) = explode(',', $angleAndSpeed);

	// remove excessive data
	$windAngle = str_replace("grader", "", $windAngle);
	$windSpeed = str_replace("m/s", "", $windSpeed);

	echo '{"name": "Drogden","windspeed":'.$windSpeed.',"degrees":'.$windAngle.'}';
}	

/*	
if ( $_GET["id"] ) {
	
	$stationID = $_GET["id"];
	
	// Website url to open
	$daurl = 'http://servlet.dmi.dk/bv/servlet/bv?stat='.$stationID.'&map=dk&param=wind';

	// Get that website's content
	$handle = fopen($daurl, "r");

	// If there is something, read and return
	if ($handle) {
	    while (!feof($handle)) {
	        $buffer = fgets($handle, 4096);
	        echo $buffer;
	    }
	    fclose($handle);
	}
}	
?>

*/
?>
