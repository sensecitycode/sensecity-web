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
    <script src="http://momentjs.com/downloads/moment-with-locales.js"></script>

  </head>
  <body>
  <div class="col-md-12 ">
    <nav id="topNav" class="navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand page-scroll" href="../#first"><i class="ion-ios-analytics-outline"></i> sense.city
				<sup style="font-size: 55%">beta</sup></a>
            </div>
            <div class="navbar-collapse collapse" id="bs-navbar">
                <ul class="nav navbar-nav">
                    <li>
                        <a class="page-scroll" href="../#one">Η ΠΟΛΗ</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="../#two">ΣΥΜΜΕΤΟΧΗ</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="../#three">sense.city app</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="../#four">ΔΕΔΟΜΕΝΑ</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="../#last">ΕΠΙΚΟΙΝΩΝΙΑ</a>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a class="page-scroll" data-toggle="modal" title="sense.city @ Πάτρα" href="#aboutModal">Σχετικα</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</div>
	<div class="col-md-12 " style="padding-top:50px;">
		<br>
		<div class="col-lg-8">
			<h2 class="margin-top-0 text-primary text-center">Συμβαίνει στη πόλη</h2>
			<div id="map" style="color: black; height:85vh;"></div>



      <div id="timeline" style="padding-top:20px;" class="text-center">
        <h2>Εξέλιξη προβλήματος</h2>
        <div class="progress">
          <div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
            <span class="sr-only">50% Complete</span>
          </div>
        </div>
        <div class="row tasks">
           <div class="col-sm-4">
             <p>Δήλωση<br /><span id="submit"></span></p>
           </div>
           <div class="col-sm-4">
             <p>Ανάθεση<br /><span id="assignment">---</span></p>
           </div>
           <div class="col-sm-4">
             <p>Ολοκληρώθηκε<br /><span id="completion">---</span></p>
           </div>

         </div>
      </div>



		</div>
		<div class="col-lg-4" id="image_div" style="padding-top:20px;">

		</div>
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

			var issue_image;
			var issue_name;
			var issue_value_desc;
			var issue_long;
			var issue_lat;
			var issue_name_new;

			$.ajax({
				crossDomain: true,
				type:"GET",
				url: "http://api.sense.city:3000/api/issues/<?php echo $_GET["issue_id"] ?>",
				dataType: "json",
				success: function(msg){

					issue_image = msg.image_name;
					issue_name = msg.issue;
					issue_value_desc = msg.value_desc;
					issue_long = msg.loc.coordinates[0];
					issue_lat = msg.loc.coordinates[1];

					switch(issue_name){
						case "garbage":
							issue_name_new = "Πρόβλημα Καθαριότητας";
							break;
						case "lighting":
							issue_name_new = "Πρόβλημα Φωτισμού";
							break;
						case "plumbing":
							issue_name_new = "Προβλήματα ύδρευσης";
							break;
						case "road-contructor":
							issue_name_new = "Πρόβλημα Δρόμου/Πεζοδρομίου";
							break;
						default:
							break;
					}

					$('#image_div').append('<center><img src="'+issue_image+'" width="450px" /><br /><hr><br /><h3>'+issue_name_new+'</h3>'+issue_value_desc+'</center>');

					var count_pos =0;
					var position = new Array();

					var positionlat = issue_lat;
					var positionlon = issue_long;

					var map = L.map('map').setView( new L.LatLng( positionlat, positionlon ), 12);

					L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
						attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
						maxZoom: 18, }).addTo(map);

					var get_issue = issue_name;
					switch(get_issue){
						case "garbage":
							var garbageMarkers = L.layerGroup().addTo(map);
							break;
						case "lighting":
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

					if (get_issue === 'lighting') {
						var redMarker = L.AwesomeMarkers.icon({
							icon: 'lightbulb-o',
							prefix: 'fa',
							markerColor: 'orange'
						});

						var marker = L.marker([positionlat, positionlon], {icon: redMarker});
							marker.bindPopup("light");
							lightingMarkers.addLayer(marker);
					}else if (get_issue === 'garbage') {
						var redMarker = L.AwesomeMarkers.icon({
							icon: 'trash-o',
							prefix: 'fa',
							markerColor: 'green'
						});

						var marker = L.marker([positionlat, positionlon], {icon: redMarker});
						garbageMarkers.addLayer(marker);
						marker.bindPopup("garbage");
					}else if (get_issue === 'road-contructor') {
						var redMarker = L.AwesomeMarkers.icon({
							icon: 'road',
							prefix: 'fa',
							markerColor: 'cadetblue'
						});

						var marker = L.marker([positionlat, positionlon], {icon: redMarker});
						roadConstMarkers.addLayer(marker);
						marker.bindPopup("road");
					}else if (get_issue === 'plumping') {
						var redMarker = L.AwesomeMarkers.icon({
							icon: 'umbrella',
							prefix: 'fa',
							markerColor: 'darkpuple'
						});

						var marker = L.marker([positionlat, positionlon], {icon: redMarker});
						plumpingMarkers.addLayer(marker);

						marker.bindPopup("plumping");
					}else {
						var ic = 'smile-o'
						if (get_issue === 'neutral'){
							ic = 'meh-o';
						} else if (get_issue === 'angry'){
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

					var overlayMaps = {
						"Προβλήματα σκουπιδιών": garbageMarkers,
						"Προβλήματα φωτισμού": lightingMarkers,
						"Προβλήματα ύδρευσης": plumpingMarkers,
						"Προβλήματα οδοστρώματος": roadConstMarkers,
						"Ανάδραση πολιτών": smiliesMarkers
					};

					L.control.layers(null, overlayMaps).addTo(map);

				}
			});
			</script>


      <script>
        var bug_status;

        $.ajax({
          crossDomain: true,
          type:"POST",
          url:'http://localhost:3001/bugs/search',
          dataType: "json",
          data:{
                "method": "Bug.get",
                "params": [{ "ids":"<?php echo $_GET["issue_id"] ?>","product": "Δημος Πατρέων","component": "Τμήμα επίλυσης προβλημάτων",
                            "include_fields":["component","cf_sensecityissue","status","id","alias","summary","creation_time","whiteboard","resolution"]}],
                "id": 1
              },
          success: function(msg){
            // console.log("get");
            // console.log(msg[0]);
            moment.locale('el');
            var local_time_sub = moment(msg[0].creation_time).format('LLL');
            $('#submit').append(local_time_sub);
            var width;
            switch(msg[0].status){
              case "CONFIRMED":
                width = "16%";
                break;
              case "IN_PROGRESS":
                width = "50%";
                break;
              case "RESOLVED":
                width = "100%";
                break;
            }
            $( ".progress-bar.progress-bar-striped" ).css( "width",width );
          }
        });


        $.ajax({
          crossDomain: true,
          type:"POST",
          url:'http://localhost:3001/bugs/search',
          dataType: "json",
          data:{
                "method": "Bug.history",
                "params": [{ "ids":"<?php echo $_GET["issue_id"] ?>","product": "Δημος Πατρέων","component": "Τμήμα επίλυσης προβλημάτων"}],
                "id": 1
              },
          success: function(msg){
            // console.log("history");
            // console.log(msg[0].id);
            // console.log(msg[0].alias);
            // console.log(msg[0].history);
            moment.locale('el');

            for (i = 0; i < msg[0].history.length; i++)
            {
              for (j = 0; j <msg[0].history[i].changes.length; j++)
              {
                // console.log(msg[0].history[i].changes[j]);
                if (msg[0].history[i].changes[j].added == "IN_PROGRESS")
                {
                  var time_assign = msg[0].history[i].when;
                  // console.log("time_assign");
                  // console.log(time_assign);
                }
              }
            }

            if (time_assign != null)
            {
              var local_time_assign = moment(time_assign).format('LLL');
              $('#assignment').replaceWith(local_time_assign);
            }

            for (i = 0; i < msg[0].history.length; i++)
            {
              for (j = 0; j <msg[0].history[i].changes.length; j++)
              {
                // console.log(msg[0].history[i].changes[j]);
                if (msg[0].history[i].changes[j].added == "RESOLVED")
                {
                  var time_compl = msg[0].history[i].when;
                  // console.log("time_compl");
                  // console.log(time_compl);
                }
                if (msg[0].history[i].changes[j].field_name == "resolution")
                {
                  var resol = msg[0].history[i].changes[j].added;
                  // console.log("resol");
                  // console.log(resol);
                }
              }
            }

            if (time_compl != null)
            {
              var local_time_compl = moment(time_compl).format('LLL');
              switch(resol){
                case "FIXED":
                  new_resol = "Αποκατάσταση";
                  break;
                case "INVALID":
                  new_resol = "Μη αποδεκτό";
                  break;
                case "WONTFIX":
                  new_resol = "Μη αποκατάσταση";
                  break;
                case "DUPLICATE":
                  new_resol = "Διπλοεγγραφή";
                  break;
              }
              $('#completion').replaceWith("("+new_resol+")<br />"+local_time_compl);
            }



          }
        });

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
