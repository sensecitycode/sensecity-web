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
    <div id="container">
		<div id="header" style="padding-top: 17px; background-color:#000000;height: 61px;">
			<div>
				<div id="logo" style="float:left;">
					<a href="./" style="font-size:1.5em"> <i class="ion-ios-analytics-outline"></i>
							sense.city <sup style="font-size: 55%">beta</sup></a>
					<img src="images/patraslogo.jpg" style="width: 51px; margin-top: -21px; margin-bottom: -17px; margin-left: 4px;"> 
					<img src="images/upatras_logo.png" style="width: 174px; margin-top: -24px; margin-bottom: -17px; margin-left: 4px;"> 
				</div>
				<div style="font-size:26px; float:left; width:50%;"><center>Τι συμβαίνει στην πόλη<center></div>
				<div style="float:left;">
					<a href="#" style="float:right;padding-left:0px;padding-right:0px;" id="land_el" ><img src="images/flags/el.png" /> </a>&nbsp;&nbsp;
					<a href="#" style="float:right;padding-left:0px;padding-right:5px;" id="land_en" ><img src="images/flags/en.png" /> </a>
				</div>
			</div>
		</div>
	</div>
    <section class="bg-primary" id="one">
        <div class="container">
            <div class="row">                
				<div class="col-lg-12" id="recent_five" style="padding-top:50px;">
					<br />					
				</div>
            </div>
        </div>
    </section>    
    <footer id="footer" style="background-color:#D0D0D0;">
        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-sm-9 column">
                    <h4>Πληροφορίες</h4>
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
                    <h4>Ακολουθήστε μας</h4>
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
						
						
						$('#recent_five').html('');
						$('#btn_more').html('');
						
						
						
						
						$.ajax({
							crossDomain: true,
							type:"GET",
							url: "http://api.sense.city:3000/api/issue?startdate=2016-03-15&sort=-1&limit=100&list_issue=1",
							dataType: "json",                
							success: function(msg){								
								
								$('#recent_five').append();
								var count_pos =0;
								var position = new Array();
								/*
								var positionlat = msg[0].loc.coordinates[1];
								var positionlon = msg[0].loc.coordinates[0];
								*/
								/*console.log(positionlat);
								console.log(positionlon);
								*/
								$.each(msg, function(idx, obj) {
								
								
									var positionlat = obj.loc.coordinates[1];
									var positionlon = obj.loc.coordinates[0];
									var image_name;
									if(obj.image_name==='noimage' || obj.image_name==='' || obj.image_name===null || obj.image_name===undefined){
										image_name = "images/EmptyBox-Phone.png";
									}
									else
									{
										image_name = obj.image_name;
									}
									var issue = '';
									switch(obj.issue){
										case 'garbage':
											if(localStorage.getItem("language") === 'en'){
												issue = 'Cleaning Problem';
											}else{
												issue = 'Πρόβλημα Καθαριότητας';
											}
											break;
										case 'lighting':
											if(localStorage.getItem("language") === 'en'){
												issue = 'Lighting Problem';
											}else{
												issue = 'Πρόβλημα Φωτισμού';
											}
											break;
										case 'plumbing':
											if(localStorage.getItem("language") === 'en'){
												issue = 'Plumbing Problem';
											}else{
												issue = 'Πρόβλημα Υδραυλικών';
											}
											break;
										case 'road-contructor':
											if(localStorage.getItem("language") === 'en'){
												issue = 'Street/Sidewalk Problem';
											}else{
												issue = 'Πρόβλημα Δρόμου/Πεζοδρομίου';
											}
											break;
										case 'angry':
											if(localStorage.getItem("language") === 'en'){
												issue = 'Disposal';
											}else{
												issue = 'Διάθεση';
											}
											break;
										case 'neutral':
											if(localStorage.getItem("language") === 'en'){
												issue = 'Disposal';
											}else{
												issue = 'Διάθεση';
											}
											break;
										case 'happy':
											if(localStorage.getItem("language") === 'en'){
												issue = 'Disposal';
											}else{
												issue = 'Διάθεση';
											}
											break;
										default:											
											issue = '';
											break;
									}									
									
									var today = new Date();
									var create_day = new Date(obj.create_at);
									
																	
									var seconds = (today.getTime() - create_day.getTime())/1000;									
									var datediff ='';
									
									if(seconds<60){
										if(localStorage.getItem("language") === 'en'){
											datediff = "before "+seconds+" seconds";
										}else{
											datediff = "πριν από "+seconds+" δευτερόλεπτα";
										}
									}
									else if(seconds<3600){
										if(localStorage.getItem("language") === 'en'){
											datediff = "before "+Math.floor(seconds/60)+" minutes";
										}else{
											datediff = "πριν από "+Math.floor(seconds/60)+" λεπτά";
										}
									}else if(seconds<86400){
										if(localStorage.getItem("language") === 'en'){
											datediff = "before "+Math.floor(seconds/3600)+" hours";
										}else{
											datediff = "πριν από "+Math.floor(seconds/3600)+" ώρες";
										}
									}
									else{
										if(localStorage.getItem("language") === 'en'){
											datediff = "before "+Math.floor(seconds/86400)+" days";
										}else{
											datediff = "πριν από "+Math.floor(seconds/86400)+" μέρες";
										}
									}
									
									
									$('#recent_five').append('<a href="http://sense.city/issuemap.php?issue_id='+obj._id+'" style="color: #FFFFFF !important;"><div class="col-lg-4 col-md-6 col-sm-12"><div style="border-radius: 5px 5px 5px 5px; -moz-border-radius: 5px 5px 5px 5px; -webkit-border-radius: 5px 5px 5px 5px; border: 1px solid #BFAFAF;  height: 100px;  margin-top: 20px; background-color: #756161;"><div class="col-lg-4 col-md-4 col-sm-4 col-xs-4" style="padding-top:4px;"><img src="'+image_name+'" height="90px" style="max-width: 110px;" /></div><div class="col-lg-8 col-md-8 col-sm-8 col-xs-8"><h4>'+issue+'</h4><div  style="text-align: left; font-size: 12px; margin-top:-8px; padding-left: 0px;">'+datediff+'</div><div>'+obj.value_desc+'</div></div></div></div></a>');

								});
								
								
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
  </body>
</html>