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
    <div id="container">
		<div id="header" style="padding-top: 17px; background-color:#000000;height: 61px;">
			<div>
				<div id="logo" style="float:left;">
					<a href="./" style="font-size:1.5em"> <i class="ion-ios-analytics-outline"></i>
						sense.city <sup style="font-size: 55%">beta</sup></a>
					<img src="images/patraslogo.jpg" style="width: 51px; margin-top: -21px; margin-bottom: -17px; margin-left: 4px;"> 
					<img src="images/upatras_logo.png" style="width: 174px; margin-top: -24px; margin-bottom: -17px; margin-left: 4px;"> 	
				</div>
				<div style="font-size:26px; float:left; width:50%;"><center id="msg_subdomain_title">Τι συμβαίνει στην πόλη<center></div>
				<div style="float:left;">
					<a href="#" style="float:right;padding-left:0px;padding-right:0px;" id="land_el" ><img src="images/flags/el.png" /> </a>&nbsp;&nbsp;
					<a href="#" style="float:right;padding-left:0px;padding-right:5px;" id="land_en" ><img src="images/flags/en.png" /> </a>
				</div>
			</div>
		</div>
	</div>
	
	<div class="col-md-12" id="title_h1" style="background-color: #FFFFFF;padding: 20px;">
		
	</div>
	<div class="col-md-12 " style="background-color: #FFFFFF;">
		<br>
		<div class="col-lg-8">
			<div id="map" style="color: black; height:50vh;"></div>


		</div>
		<div class="col-lg-4" id="image_div" style="color:#000;height: 50%;overflow-x: hidden;">

		</div>
		<br>
	</div>
	<div class="col-md-12 " style="background-color: #FFFFFF;">
		<div id="timeline" style="padding-top:20px; color:#000;" class="text-center">
			<h2>Εξέλιξη προβλήματος</h2>
			<div class="progress">
				<div class="progress-bar progress-bar-striped" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
					<span class="sr-only">50% Complete</span>
				</div>
			</div>
			<div class="row tasks">
				<div class="col-sm-4">
					<p><span id="msg_dilosi">Δήλωση</span><br /><span id="submit"></span></p>
				</div>
				<div class="col-sm-4">
					<p><span id="msg_anathesi">Ανάθεση</span><br /><span id="assignment">---</span></p>
				</div>
				<div class="col-sm-4">
					<p><span id="msg_complete">Ολοκληρώθηκε</span><br /><span id="completion">---</span></p>
				</div>
			</div>
		</div>
	</div>
    <footer id="footer" style="background-color:#D0D0D0;">
        <div class="container">
            <div class="row"  style="margin-left:0px;margin-right:0px; ">
                <div class="col-xs-12 col-sm-9 column">
                    <h4 id="msg_section_info">Πληροφορίες</h4>
                    <ul class="list-inline">
                        <li><a href="">Products</a></li>
                        <li><a href="">Services</a></li>
                        <li><a href="">Benefits</a></li>
                        <li><a href="">Developers</a></li>
						<li><a href="#">Privacy Policy</a></li>
                        <li><a href="#">Terms &amp; Conditions</a></li>
                    </ul>
                </div>
                <div class="col-xs-12 col-sm-3 text-right">
                    <h4 id="msg_section_followus">Ακολουθήστε μας</h4>
                    <ul class="list-inline">
                      <li><a rel="nofollow" href="" title="Twitter"><i class="icon-lg ion-social-twitter-outline"></i></a>&nbsp;</li>
                      <li><a rel="nofollow" href="https://www.facebook.com/sensecitybook" title="Facebook"><i class="icon-lg ion-social-facebook-outline"></i></a>&nbsp;</li>
                      <li><a rel="nofollow" href="" title="Ιnstagram"><i class="icon-lg ion-social-instagram-outline"></i></a></li>
                    </ul>
                </div>
            </div>
            <br/>
            <span class="pull-right text-muted small"><a href="http://www.bootstrapzero.com">Theme by: Landing Zero by BootstrapZero</a> ©2015 Πανεπιστήμιο Πατρών</span>
        </div>
    </footer>
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
			
				console.log(localStorage.getItem("language"));
				
				
				if(localStorage.getItem("language") === 'en'){
					$('head').append('<script src="js/lang.en.js" />');
					localStorage.removeItem("language");
					localStorage.setItem("language", "en");
				}else{
					$('head').append('<script src="js/lang.js" />');
					localStorage.removeItem("language");
					localStorage.setItem("language", "el");
				}
				
				change_lang();
			
	
				console.log(localStorage.getItem("language"));
				
				
				$('#land_el').click(function() {
					localStorage.setItem("language", "el");
					console.log(localStorage.getItem("language"));
					
					
					$('head').append('<script src="js/lang.js" />');
					change_lang();
					
					return false;
				});
				
				$('#land_en').click(function() {
					localStorage.setItem("language", "en");
					console.log(localStorage.getItem("language"));
					$('head').append('<script src="js/lang.en.js" />');
					change_lang();
					return false;
				});
				
				
					
					
					function change_lang(){
						$('#msg_subdomain_title').html(lang.msg_subdomain_title);
						$('#msg_sub_text1').html(lang.msg_sub_text1);
						$('#msg_sub_text2').html(lang.msg_sub_text2);
						$('#msg_section_info').html(lang.msg_section_info);
						$('#msg_section_followus').html(lang.msg_section_followus);
						$('#msg_dilosi').html(lang.msg_dilosi);
						$('#msg_anathesi').html(lang.msg_anathesi);
						$('#msg_complete').html(lang.msg_complete);
						
						$('#image_div').html('');
						$('#title_h1').html('');

						$('#submit').html('');
						
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
										if(localStorage.getItem("language") === 'en'){
											issue_name_new = 'Cleaning Problem';
										}else{
											issue_name_new = "Πρόβλημα Καθαριότητας";
										}
										break;
									case "lighting":
										if(localStorage.getItem("language") === 'en'){
											issue_name_new = 'Lighting Problem';
										}else{
											issue_name_new = "Πρόβλημα Φωτισμού";
										}
										break;
									case "plumbing":
										if(localStorage.getItem("language") === 'en'){
											issue_name_new = 'Plumbing Problem';
										}else{
											issue_name_new = "Προβλήματα ύδρευσης";
										}
										break;
									case "road-contructor":
										if(localStorage.getItem("language") === 'en'){
											issue_name_new = 'Street/Sidewalk Problem';
										}else{
											issue_name_new = "Πρόβλημα Δρόμου/Πεζοδρομίου";
										}
										break;
									default:
										break;
								}

								$('#image_div').append('<center><img src="'+issue_image+'" style="height: 50vh;"/>');
								$('#title_h1').append('<span style="color:#000000; font-size:28px;"><b>'+issue_name_new+'</b>&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</span><span style="color:#000000; font-size:22px;">'+issue_value_desc+'</span>');

								var count_pos =0;
								var position = new Array();

								var positionlat = issue_lat;
								var positionlon = issue_long;

								var map = L.map('map').setView( new L.LatLng( positionlat, positionlon ), 16);

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
												
						 var bug_status;

						$.ajax({
							crossDomain: true,
							type:"POST",
							url:'http://api.sense.city:3001/bugs/search',
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
							url:'http://api.sense.city:3001/bugs/search',
							dataType: "json",
							data:{
								"method": "Bug.history",
								"params": [{ "ids":"<?php echo $_GET["issue_id"] ?>","product": "Δημος Πατρέων","component": "Τμήμα επίλυσης προβλημάτων"}],
								"id": 1
							},
							success: function(msg){
								moment.locale('el');
								
								var local_time_assign = null;
								var time_assign = null;
								var time_compl = null;
								
								for (i = 0; i < msg[0].history.length; i++)
								{
									for (j = 0; j <msg[0].history[i].changes.length; j++)
									{
										if (msg[0].history[i].changes[j].added == "IN_PROGRESS")
										{
											var time_assign = msg[0].history[i].when;
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
										if (msg[0].history[i].changes[j].added == "RESOLVED")
										{
											time_compl = msg[0].history[i].when;
										}
										if (msg[0].history[i].changes[j].field_name == "resolution")
										{
											var resol = msg[0].history[i].changes[j].added;
										}
									}
								}

								if (time_compl != null)
								{
									alert('111');
									alert(resol);
									var local_time_compl = moment(time_compl).format('LLL');
									switch(resol){
										case "FIXED":
											if(localStorage.getItem("language") === 'en'){
												new_resol = 'Fixed';
											}else{
												new_resol = "Αποκατάσταση";
											}
											break;
										case "INVALID":
											if(localStorage.getItem("language") === 'en'){
												new_resol = 'Invalid';
											}else{
												new_resol = "Εσφαλμένο αίτημα";
											}	
											break;
										case "WONTFIX":
											if(localStorage.getItem("language") === 'en'){
												new_resol = 'Will not Fix';
											}else{
												new_resol = "Μη αποκατάσταση";
											}
											break;
										case "DUPLICATE":
											if(localStorage.getItem("language") === 'en'){
												new_resol = 'Already reported in other issue';
											}else{
												new_resol = "Εχει ήδη αναφερθεί στο παρελθόν";
											}
											break;
									}
								
									$('#completion').replaceWith("("+new_resol+")<br />"+local_time_compl);
								}
							}
						});
					}
			
			
			</script>



			<script>
			  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
			  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
			  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
			  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

			  ga('create', 'UA-73253016-1', 'auto');
			  ga('send', 'pageview');

			</script>
			
			<style>
			
			.row.tasks div:first-child {
				text-align: left;
			}
			
			.row.tasks div:last-child {
				text-align: right;
			}
			
			
			</style>
  </body>
</html>
