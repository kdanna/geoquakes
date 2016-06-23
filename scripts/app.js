	// define globals
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var $quakesList;
var map;
var source = $("#quakes-template").html();
var template = Handlebars.compile(source);




$(document).on("ready", function() {
	


	$.get(weekly_quakes_endpoint, function(data){
			
		  console.log(data); // this works	
		  var quakeNames = template({quakes: data.features});
		  $("#info").append(quakeNames);



		  var quakeResults = data.features;
		  var coordinates = {};

		  quakeResults.forEach(function(quake) {
		  // console.log(quake.geometry.coordinates[0] + " " + quake.geometry.coordinates[1]);
		  var lat = quake.geometry.coordinates[0];
		  var lng = quake.geometry.coordinates[1];
		  coordinates.lat = lat;
		  coordinates.lng = lng;
		  console.log(coordinates.lat + " " + coordinates.lng);
		  var marker = new google.maps.Marker({
			    position: coordinates,
			    map: map
			});
		});

	});

	function initMap() {
		map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 1
        });
	}

	initMap();
		 
 });






