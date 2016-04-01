<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>sense.city</title>
    <meta name="description" content="sense.city" />
	<!-- based on a free Bootstrap landing page theme created for BootstrapZero. Feature video background and one page design. -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="generator" content="Codeply">
    <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" />
    <link href="http://cdnjs.cloudflare.com/ajax/libs/animate.css/3.1.1/animate.min.css" rel="stylesheet" />
    <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" />
	<link href="http://netdna.bootstrapcdn.com/font-awesome/4.0.0/css/font-awesome.css" rel="stylesheet">
	<link rel="stylesheet" href="css/leaflet.css" />
	<link rel="stylesheet" href="css/leaflet.awesome-markers.css">
	<script src="js/leaflet.js"></script> 
    <link rel="stylesheet" href="css/styles.css" />
	
  </head>
  <body>
    <nav id="topNav" class="navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand page-scroll" href="./"><i class="ion-ios-analytics-outline"></i> sense.city
				<sup style="font-size: 55%">beta</sup></a>
            </div>
        </div>
    </nav>                
	<div class="col-lg-12 ">
		<h2 class="margin-top-0 text-primary text-center">Συμβαίνει στη πόλη</h2>
		<br>                    
		<div id="map" style="color: black; height:85vh;"></div>
		<br>					
	</div>
    <div id="galleryModal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-lg">
        <div class="modal-content">
        	<div class="modal-body">
        		<img src="//placehold.it/1200x700/222?text=..." id="galleryImage" class="img-responsive" />
        		<p>
        		    <br/>
        		    <button class="btn btn-primary btn-lg center-block" data-dismiss="modal" aria-hidden="true">Close <i class="ion-android-close"></i></button>
        		</p>
        	</div>
        </div>
        </div>
    </div>
    <div id="aboutModal" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
        	<div class="modal-body">
        		<h2 class="text-center">sense.city @ Πάτρα</h2>
        		<h5 class="text-center">
        		    Συμμετέχω ενεργά στη πόλη μου
        		</h5>
        		<p class="text-justify">
        		   Οι πολίτες είστε οι αισθητήρες της πόλης! Χρησιμοποιώντας τις δικές σας συσκευές επικοινωνίας, είτε μέσω της εφαρμογής sense.city είτε με άλλες συσκευές που αναφέρουν στο sense.city δεδομένα της πόλης, ενημερώνετε τους συμπολίτες και το δήμο για προβλήματα και συμβάντα που συμβαίνουν κάθε στιγμή.
        		</p>
        		
        		<br/>
        		<button class="btn btn-primary btn-lg center-block" data-dismiss="modal" aria-hidden="true"> OK </button>
        	</div>
        </div>
        </div>
    </div>    
    <!--scripts loaded here from cdn for performance -->
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
     <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script> 
    <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
    <script src="http://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.js"></script>
	<script src="js/leaflet.awesome-markers.js"></script>
    <script src="js/scripts.js"></script>
	
	 <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script> -->
    <!-- <script>window.jQuery || document.write('<script src="_js/vendor/jquery.min.js"><\/script>')</script> -->
    <!-- <script src="_js/bootstrap.min.js"></script> -->
    <!-- <script src="_js/docs.min.js"></script> -->
    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->

			<script>

			/*
			
				$.ajax({
					crossDomain: true,
					type:"GET",
					url: "http://api.sense.city:3000/api/issues",
					dataType: "json",                
					success: function(msg){*/
						
						
						//var zoom = 13;
						//var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
						//var toProjection   = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
						var count_pos =0;
						var position = new Array();
						//
						var positionlat = <?php echo $_GET["lang"]; ?>;
						var positionlon = <?php echo $_GET["long"]; ?>;
						
						console.log(positionlat);
						console.log(positionlon);

						
						
						var map = L.map('map').setView( new L.LatLng( positionlat, positionlon ), 12);
			
						L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
						attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
						maxZoom: 18, }).addTo(map);
						var get_issue = '<?php echo $_GET["issue"]; ?>';
						switch(get_issue){
							case "garbage":
								var garbageMarkers = L.layerGroup().addTo(map);
								break;
							case "light":
								var lightingMarkers = L.layerGroup().addTo(map);
								break;
							case "plumping":
								var plumpingMarkers = L.layerGroup().addTo(map);
								break;
							case "road-contructor":
								var roadConstMarkers = L.layerGroup().addTo(map);
								break;
							default:
								break;
						}
						
						
						
						
						var smiliesMarkers = L.layerGroup().addTo(map);
						
						//map.addLayer(garbageMarkers);
						//map.addLayer(lightingMarkers);
						
						//$.each(msg, function(idx, obj) {
							//var positionlat = obj.loc.coordinates[1];
							//var positionlon = obj.loc.coordinates[0];
							
							if (get_issue === 'light') 
							{
								var redMarker = L.AwesomeMarkers.icon({
									icon: 'lightbulb-o',
									prefix: 'fa',
									markerColor: 'orange'
								  });
								  
								var marker = L.marker([positionlat, positionlon], {icon: redMarker});					
								marker.bindPopup("light");
								lightingMarkers.addLayer(marker);			
							}else if (get_issue === 'garbage') 
							{
								var redMarker = L.AwesomeMarkers.icon({
									icon: 'trash-o',
									prefix: 'fa',
									markerColor: 'green'
								  });
								  
								var marker = L.marker([positionlat, positionlon], {icon: redMarker});
								garbageMarkers.addLayer(marker);								
								marker.bindPopup("garbage");
							}else if (get_issue === 'road') 
							{
								var redMarker = L.AwesomeMarkers.icon({
									icon: 'road',
									prefix: 'fa',
									markerColor: 'cadetblue'
								  });
								  
								var marker = L.marker([positionlat, positionlon], {icon: redMarker});
								roadConstMarkers.addLayer(marker);	
								marker.bindPopup("road");
							}else if (get_issue === 'plumping') 
							{
								var redMarker = L.AwesomeMarkers.icon({
									icon: 'umbrella',
									prefix: 'fa',
									markerColor: 'darkpuple'
								  });
								  
								var marker = L.marker([positionlat, positionlon], {icon: redMarker});
								plumpingMarkers.addLayer(marker);
								
								marker.bindPopup("plumping");
							}else
							{	
								var ic = 'smile-o'
								if (get_issue === 'neutral')
								{
										ic = 'meh-o';
								} else if (get_issue === 'angry')
								{
										ic = 'frown-o';
								}
										
								var redMarker = L.AwesomeMarkers.icon({
									icon: ic,
									prefix: 'fa',
									markerColor: 'lightgreen',
									iconColor: 'darkgreen'
								  });
								  
								var marker = L.marker([positionlat, positionlon], {icon: redMarker});
								marker.bindPopup("Διάθεση");
								smiliesMarkers.addLayer(marker);
							}
							

						//});
						
						var overlayMaps = {
							"Προβλήματα σκουπιδιών": garbageMarkers,
							"Προβλήματα φωτισμού": lightingMarkers,
							"Προβλήματα ύδρευσης": plumpingMarkers,
							"Προβλήματα οδοστρώματος": roadConstMarkers,
							"Ανάδραση πολιτών": smiliesMarkers
						};	
							
						L.control.layers(null, overlayMaps).addTo(map);

					/*}
					
				});
		*/
		
		
		
		
		
				/*$('a.page-scroll').bind('click', function(event) {
					var $anchor = $(this);
					$('html, body').stop().animate({
						scrollTop: ($($anchor.attr('href')).offset().top - 50)
					}, 1250, 'easeInOutExpo');
					event.preventDefault();
				});*/

			</script>
			
			<script>
			  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

			  ga('create', 'UA-73253016-1', 'auto');
			  ga('send', 'pageview');

			</script>
  </body>
</html>