var appControllers = angular.module('overviewapp.controllers', ['pascalprecht.translate','ngCookies']);

appControllers.directive('sidebarDirective', function() {
	return {
		link : function(scope, element, attr) {
			scope.$watch(attr.sidebarDirective, function(newVal) {
				if (newVal) {
					element.addClass('show');
					return;
				}
				element.removeClass('show');
			});
		}
	};
});




appControllers
		.controller(
				'mainOverviewController',
				[
						'$scope',
						'$rootScope','$http',
						'$q', 'leafletData',
						'APIEndPointService',
						'DisplayIssuesService',
						'Issue2MapService',
						'DisplayLast6IssuesService',
						'BugService',
						'FixedPointsService',
						'cfpLoadingBar',
						'$interval',
						'$translate',
						function($scope, $rootScope, $http, $q, leafletData,
								APIEndPointService,
								DisplayIssuesService,
								Issue2MapService,
								DisplayLast6IssuesService, BugService, FixedPointsService,
								cfpLoadingBar,
								$interval,
								$translate) {

							$scope.lastdatesToCheck = 30;
							$scope.lastissues = [];
							$scope.markers = [];
							$scope.fixedmarkersGarbage = [];
							$scope.fixedmarkersLightning = [];
							$scope.state = true;
							$scope.toggleState = function() {
								$scope.state = !$scope.state;
							};

							//$http.get('config.json').success(function(response) {console.log(response["patras"][0]);});


							$scope.calcValue30daysIssues = '0';
							$scope.calcValue30daysEvents = '0';
							$scope.calcValueProblemsFrom2016 = '0';
							$scope.calcValueSolutionFrom2016 = '0';

							var icons = {
								garbage : {
									type : 'awesomeMarker',
									prefix : 'fa',
									icon : 'trash-o',
									markerColor : 'red'
								},
								"road-contructor" : {
									type : 'awesomeMarker',
									prefix : 'fa',
									icon : 'road',
									markerColor : 'red'
								},
								plumbing : {
									type : 'awesomeMarker',
									prefix : 'fa',
									icon : 'umbrella',
									markerColor : 'red'
								},
								lighting : {
									type : 'awesomeMarker',
									prefix : 'fa',
									icon : 'lightbulb-o',
									markerColor : 'red'
								},
								"protection-policy" : {
									type : 'awesomeMarker',
									prefix : 'fa',
									icon : 'lightbulb-o',
									markerColor : 'red'
								},
								green : {
									type : 'awesomeMarker',
									prefix : 'fa',
									icon : 'lightbulb-o',
									markerColor : 'red'
								},
								angry : {
									type : 'awesomeMarker',
									prefix : 'fa',
									icon : 'frown-o',
									markerColor : 'lightgreen',
									iconColor : 'darkgreen'
								},
								neutral : {
									type : 'awesomeMarker',
									prefix : 'fa',
									icon : 'meh-o',
									markerColor : 'lightgreen',
									iconColor : 'darkgreen'
								},
								happy : {
									type : 'awesomeMarker',
									prefix : 'fa',
									icon : 'smile-o',
									markerColor : 'lightgreen',
									iconColor : 'darkgreen'
								},
								greenGarbageBin : {
									type : 'extraMarker',
									prefix : 'fa',
									icon : 'fa-trash-o',
									markerColor : 'green',
									shape: 'square'
								},
								cyanGarbageBin : {
									type : 'extraMarker',
									prefix : 'fa',
									icon : 'fa-trash-o',
									markerColor : 'cyan',
									shape: 'square'
								},
								fixedLightning : {
									type : 'extraMarker',
									prefix : 'fa',
									icon : 'fa-lightbulb-o',
									markerColor : 'yellow',
									shape: 'square'
								}
							};

							$scope.map_center = {
								lat : $rootScope.Variables.lat_center,
								lng : $rootScope.Variables.long_center,
								zoom : $rootScope.Variables.map_zoom
							};


							$scope.openStreetMap = {
										name : 'OpenStreetMap',
										type : 'xyz',
										url : 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
										layerOptions : {
											showOnSelector : true,
											attribution : '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
											maxZoom: 19
										}
									};




							//We use a custom Google.js that calls also the google trafic layer. Please see http://www.qtrandev.com/transit5/ for inspiration

							var googleRoadmap = {
										name : 'Google Map + Traffic',
										layerType: 'ROADMAP',
										type : 'google',
										layerOptions : {
											showOnSelector : true,
											attribution : 'xxx',
											maxZoom: 20
										}
							};

							var googleHybrid = {
										name : 'Google Hybrid + Traffic',
										layerType: 'HYBRID',
										type : 'google',
										layerOptions : {
											showOnSelector : true,
											attribution : 'xxx',
											maxZoom: 20
										}
							};



							$scope.layers = {
								baselayers : {
									openStreetMap: $scope.openStreetMap,
									gR: googleRoadmap,
									gH: googleHybrid

								},
								overlays : {
									garbage : {
										type : 'group',
										name : 'Προβλήματα Σκουπιδιών',
										visible : true
									},
									lighting : {
										type : 'group',
										name : 'Προβλήματα Φωτισμού',
										visible : true
									},
									plumbing : {
										type : 'group',
										name : 'Προβλήματα Ύδρευσης',
										visible : true
									},
									"road-contructor" : {
										type : 'group',
										name : 'Προβλήματα Οδοστρώματος',
										visible : true
									},
									"protection-policy" : {
										type : 'group',
										name : 'Πολιτική Προστασία',
										visible : true
									},
									"green" : {
										type : 'group',
										name : 'Πράσινο',
										visible : true
									},
									reaction : {
										type : 'group',
										name : 'Προβλήματα Πολιτών',
										visible : true
									}
								}
							};

							$scope.$on('leafletDirectiveMap.overlayadd', function(event, o){
									console.log( "overlayadd event " );
									console.log( o.leafletEvent );
									console.log( o.leafletEvent.layer );

							});

							$scope.$on("leafletDirectiveMarker.click", function(event, args){
					     var marker3 = args.leafletObject;
					     var popup = marker3.getPopup();
					     // marker3.bindPopup("Loading...");
							 var issue_name;
					     Issue2MapService.get({issueID:marker3.options.issue_id}, function(resp) {
							console.log("resp =============-------------------->>>>>>>>>>"+JSONStringify(resp));
							console.log("resp[0] =============-------------------->>>>>>>>>>"+resp.issue);
							
					       switch(resp[0].issue){
					         case "garbage":
					           issue_name = "Πρόβλημα Καθαριότητας";
					           break;
					         case "lighting":
					           issue_name = "Πρόβλημα Φωτισμού";
					           break;
					         case "plumbing":
					           issue_name = "Πρόβλημα Ύδρευσης";
					           break;
					         case "road-contructor":
					           issue_name = "Πρόβλημα Δρόμου/Πεζοδρομίου/Πλατείας";
					           break;
							 case "protection-policy":
					           issue_name = "Πολιτική Προστασία";
					           break;
							 case "green":
					           issue_name = "Πράσινο";
					           break;
					         default:
					           break;
					       }
					       popup.setContent("<center><b>"+issue_name+"</b><br>"+resp[0].value_desc+"<br><img src="+resp[0].image_name+" style=height:200px><br><a href=\"http://"+$rootScope.Variables.city_name+".sense.city/scissuemap.html#?issue_id="+ issueid+"\">Εξέλιξη προβλήματος!</a></center>");
					       popup.update();
					     });
					   });


							var startdate = new Date();
							startdate.setDate(startdate.getDate() - $scope.lastdatesToCheck);
							$scope.startISOdate = startdate;
							$scope.endISOdate = new Date();

							$scope.submitSearchLast30days = function() {

								var calclast30daysIssues = 0;
								var calclast30daysEvents = 0;
								$scope.startdate = $scope.startISOdate
										.getFullYear()
										+ '-'
										+ ($scope.startISOdate.getMonth() + 1)
										+ '-' + $scope.startISOdate.getDate();
								$scope.enddate = $scope.endISOdate
										.getFullYear()
										+ '-'
										+ ($scope.endISOdate.getMonth() + 1)
										+ '-' + $scope.endISOdate.getDate();
								var paramsObj = [];

								paramsObj.push({
									startdate : $scope.startdate,
									enddate : $scope.enddate,
									issue : "garbage",
									image_field:0
								});
								paramsObj.push({
									startdate : $scope.startdate,
									enddate : $scope.enddate,
									issue : "lighting",
									image_field:0
								});
								paramsObj.push({
									startdate : $scope.startdate,
									enddate : $scope.enddate,
									issue : "plumbing",
									image_field:0
								});
								paramsObj.push({
									startdate : $scope.startdate,
									enddate : $scope.enddate,
									issue : "road-contructor",
									image_field:0
								});
								paramsObj.push({
									startdate : $scope.startdate,
									enddate : $scope.enddate,
									issue : "protection-policy",
									image_field:0
								});
								paramsObj.push({
									startdate : $scope.startdate,
									enddate : $scope.enddate,
									issue : "green",
									image_field:0
								});
								paramsObj.push({
									startdate : $scope.startdate,
									enddate : $scope.enddate,
									issue : "angry"
								});
								paramsObj.push({
									startdate : $scope.startdate,
									enddate : $scope.enddate,
									issue : "neutral"
								});
								paramsObj.push({
									startdate : $scope.startdate,
									enddate : $scope.enddate,
									issue : "happy"
								});

								var promisesArray = [];
								for (index = 0; index < paramsObj.length; index++) {
									promisesArray
											.push(doQuery(paramsObj[index]));
								}

								$q
										.all(promisesArray)
										.then(
												function(data) {
													var searchissues = [];
													for (i = 0; i < data.length; i++) {
														for (j = 0; j < data[i].length; j++) {
															searchissues
																	.push(data[i][j]);
														}
													}
													$scope.markers = [];
													angular
															.forEach(
																	searchissues,
																	function(
																			value,
																			key) {
																		var issueid = value._id;
																		var issuelink = "http://"+$rootScope.Variables.city_name+".sense.city/scissuemap.html#?issue_id="+ issueid;
																		var positionlat = value.loc.coordinates[1];
																		var positionlon = value.loc.coordinates[0];
																		var issue = value.issue;
																		var layer = '';
																		if (issue == "angry"
																				|| issue == "neutral"
																				|| issue == "happy") {
																			layer = 'reaction';
																		} else {
																			layer = issue;
																			calclast30daysIssues = calclast30daysIssues + 1;
																		}
																		calclast30daysEvents = calclast30daysEvents + 1;
																		var message = '';
																		if (value.value_desc) {
																			message = value.value_desc;
																		} else {
																			message = 'Μη διαθέσιμη περιγραφή';
																		}
																		var marker = {
																			"layer" : ""
																					+ layer
																					+ "",
																			"lat" : +positionlat,
																			"lng" : +positionlon,
																			"icon" : icons[issue],
																			// "message" : ""
																			// 		+ message
																			// 		+ "<br><a href="
																			// 		+ issuelink
																			// 		+ ">Δες με!</a>"
																			"issue_id":issueid
																		};
																		if (layer!='reaction'){
											                marker.message = "Loading...";
											              }
																		this
																				.push(marker);
																	},
																	$scope.markers);

													//$scope.markers = $scope.markers.concat( $scope.fixedmarkersLazyLoaded );

													$scope.calcValue30daysIssues = calclast30daysIssues;
													$scope.calcValue30daysEvents = calclast30daysEvents;
												});
							};

							function doQuery(obj) {
								var d = $q.defer();
								DisplayIssuesService.query(obj,
										function(result) {
											d.resolve(result);
										});
								return d.promise;
							}

							$scope.doCalcLast6Issues = function() {
								var theLastIssues = DisplayLast6IssuesService
										.query(function() {

											angular
													.forEach(
															theLastIssues,
															function(lastissue,
																	key) {
																// console.log("key=
																// " + key + ",
																// lastissue.issue="
																// +
																// lastissue.issue);
																if (lastissue.image_name === ''
																		|| lastissue.image_name === 'no-image'
																		|| lastissue.image_name === null
																		|| lastissue.image_name === undefined) {
																	lastissue.image_name = "images/EmptyBox-Phone.png";
																}
																
																console.log("test test test ====================>>>>>>>>>>>>>");
																
																switch (lastissue.issue) {
																case 'garbage':
																		lastissue.issue = 'GARBAGE_ISSUE';
																	break;
																case 'lighting':
																		lastissue.issue = 'LIGHTNING_ISSUE';
																	break;
																case 'plumbing':
																		lastissue.issue = 'PLUMBING_ISSUE';
																	break;
																case 'road-contructor':
																		lastissue.issue = 'ROAD_ISSUE';
																	break;
																case 'protection-policy':
																		lastissue.issue = 'PROTECTION_POLICY_ISSUE';
																	break;
																case 'green':
																		lastissue.issue = 'GREEN_ISSUE';
																	break;
																case 'angry':
																		lastissue.issue = 'MOOD';
																	break;
																case 'neutral':
																		lastissue.issue = 'MOOD';
																	break;
																case 'happy':
																		lastissue.issue = 'MOOD';
																	break;
																default:
																	issue = '';
																	break;
																}

																var today = new Date();
																var create_day = new Date(
																		lastissue.create_at);

																var seconds = (today
																		.getTime() - create_day
																		.getTime()) / 1000;
																var datediff = '';
																var datediffunit = '';

																if (seconds < 60) {
																	datediff =  seconds;
																	datediffunit = "SECS";
																} else if (seconds < 3600) {
																	datediff =  Math
																					.floor(seconds / 60);
																	datediffunit = "MINUTES";
																} else if (seconds < 86400) {
																	datediff =  Math
																					.floor(seconds / 3600);
																	datediffunit = "HOURS";
																} else {
																	datediff =  Math
																					.floor(seconds / 86400);
																	datediffunit = "DAYS";

																}
																lastissue.create_at = datediff;
																lastissue.create_at_unit = datediffunit;
																/*var bugParams =
																{
																    "method": "Bug.get",
																    "params": [{"ids":lastissue._id,"include_fields":["component","cf_sensecityissue","status","id","alias","summary","creation_time","whiteboard","resolution","last_change_time"]}],
																    "id": 1
																};
																BugService.search(bugParams, function(result) {
																		switch (result[0].status) {
																		 case 'CONFIRMED':
																			 result.status = 'CONFIRMED';
																			 break;
																		 case 'IN_PROGRESS':
																			 result.status = 'IN_PROGRESS';
																			 break;
																		 case 'RESOLVED':
																			 result.status = 'RESOLVED';
																			 break;
																	 }
																	 lastissue.status = result.status;
																});
																*/

															});
										});
										// query() returns all the last 6
										// issues

									$scope.lastissues = theLastIssues;
							};

							$scope.doCalcFrom2016 = function() {
								var problemsParam =
								{
										"method": "Bug.search",
										"params": [{"product": $rootScope.Variables.bugzilla_products,"order":"bug_id DESC","status":["CONFIRMED","IN_PROGRESS","RESOLVED"],"resolution":["---","FIXED"],"f1":"creation_ts","o1":"greaterthan","v1":"2016-01-01","include_fields":["id"]}],
										"id": 1
								};
								BugService.search(problemsParam, function(result) {
										 $scope.calcValueProblemsFrom2016 = result.length;
								});

								var solutionsParam =
								{
										"method": "Bug.search",
										"params": [{"product": $rootScope.Variables.bugzilla_products,"order":"bug_id DESC","status":"RESOLVED","resolution": "FIXED","f1":"resolution","o1":"changedafter","v1":"2016-01-01","include_fields":["id"]}],
										"id": 1
								};
								BugService.search(solutionsParam, function(result) {
										 $scope.calcValueSolutionFrom2016 = result.length;
								});

							};
							console.log("city_name11 : " + $rootScope.Variables.city_name);

							$scope.displayFixedPoints = function() {

								console.log("city_name : " + $rootScope.Variables.city_name);

								var i =0;
								var theFixedPoints = FixedPointsService.query(function() {
											angular.forEach( theFixedPoints, function(fixedpoint, key) {
												var positionlat = fixedpoint.loc.coordinates[1];
												var positionlon = fixedpoint.loc.coordinates[0];
												i ++;

												if (fixedpoint.type === 'garbage')
												{
													var garbageIcon = 'cyanGarbageBin'
													var titlenote= "κάδος ανακύκλωσης";
													if(fixedpoint.notes[0].ANAKIKLOSI=='0'){
														garbageIcon = 'greenGarbageBin';
														titlenote= "κάδος σκουπιδιών";
													}


													var marker = new L.marker([ positionlat, positionlon ] , {
																icon:  L.ExtraMarkers.icon( icons[garbageIcon] ),
																title: titlenote
															});


													$scope.fixedmarkersGarbage.push(marker);

												}

												if (fixedpoint.type === 'fotistiko')
												{
													var fixedLIcon = 'fixedLightning'
													var titlenote= "φωτιστικό στοιχείο";

													var marker = new L.marker([ positionlat, positionlon ] , {
																icon:  L.ExtraMarkers.icon( icons[fixedLIcon] ),
																title: titlenote
															});


													$scope.fixedmarkersLightning.push(marker);

												}



											});


										var markersGarbage = L.markerClusterGroup( {
													name : 'Κάδοι',
													visible : true,

													disableClusteringAtZoom : 19,
													animateAddingMarkers : false,
													spiderfyDistanceMultiplier: true,
													singleMarkerMode: false,
													showCoverageOnHover: true,
													chunkedLoading: true

												} );



										markersGarbage.addLayers( $scope.fixedmarkersGarbage );
										leafletData.getMap().then(function(map) {
											map.addLayer(markersGarbage);

										});



										 var markersLightning = L.markerClusterGroup( {
													name : 'Φωτισμός',
													visible : true,

													disableClusteringAtZoom : 19,
													animateAddingMarkers : false,
													spiderfyDistanceMultiplier: true,
													singleMarkerMode: false,
													showCoverageOnHover: true,
													chunkedLoading: true

										} );


										markersLightning.addLayers( $scope.fixedmarkersLightning );

										leafletData.getMap().then(function(map) {
											map.addLayer(markersLightning);
											//map.fitBounds(markers.getBounds());
										});



										var baseLayers = {
											//'Open Street Map': osmLayer,
											//'Google Maps':googleRoadmap,
											//'Google Maps Satellite':googleHybrid,
											//'Google Maps Traffic':googleTraffic

										};
										var overlays = {
											"<i class='fa fa-trash-o  fa-2x'></i>&nbsp;<span style='align:left'>Κάδοι σκουπιδιών</span>":  markersGarbage,
											"<i class='fa fa-lightbulb-o fa-2x'></i>&nbsp;<span style='align:left'>Φωτισμός</span>": markersLightning
										};
										leafletData.getMap().then(function(map) {
											L.control.layers( baseLayers , overlays).addTo(map);
									    	map.invalidateSize(true);
										});

								});


							}



							$scope.doCalcLast6Issues();
							$scope.submitSearchLast30days();
							$scope.doCalcFrom2016();
							$scope.displayFixedPoints();


							// set intervals to update
							var updtime = 1 * 60 * 1000; // every 5 minutes
							$interval($scope.doCalcLast6Issues, updtime);
							$interval($scope.submitSearchLast30days, updtime);





} ]);
