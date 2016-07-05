var appControllers = angular.module('overviewapp.controllers', []);

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
				'mainController',
				[
						'$scope',
						'$q',
						'APIEndPointService',
						'DisplayIssuesService',
						'DisplayLast6IssuesService',
						'BugService',
						'cfpLoadingBar',
						'$interval',
						function($scope, $q, APIEndPointService,
								DisplayIssuesService,
								DisplayLast6IssuesService, BugService,
								cfpLoadingBar,
								$interval) {

							$scope.lastdatesToCheck = 30;
							$scope.lastissues = [];
							$scope.state = true;
							$scope.toggleState = function() {
								$scope.state = !$scope.state;
							};

							var icons = {
								garbage : {
									type : 'awesomeMarker',
									prefix : 'fa',
									icon : 'trash-o',
									markerColor : 'green'
								},
								"road-contructor" : {
									type : 'awesomeMarker',
									prefix : 'fa',
									icon : 'road',
									markerColor : 'cadetblue'
								},
								plumbing : {
									type : 'awesomeMarker',
									prefix : 'fa',
									icon : 'umbrella',
									markerColor : 'darkpuple'
								},
								lighting : {
									type : 'awesomeMarker',
									prefix : 'fa',
									icon : 'lightbulb-o',
									markerColor : 'orange'
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
								}
							};

							$scope.center = {
								lat : 38.248028,
								lng : 21.7583104,
								zoom : 12
							};

							$scope.layers = {
								baselayers : {
									openStreetMap : {
										name : 'OpenStreetMap',
										type : 'xyz',
										url : 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
										layerOptions : {
											showOnSelector : false,
											attribution : '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
										}
									}
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
									reaction : {
										type : 'group',
										name : 'Προβλήματα Πολιτών',
										visible : true
									}
								}
							};

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
									issue : "garbage"
								});
								paramsObj.push({
									startdate : $scope.startdate,
									enddate : $scope.enddate,
									issue : "lighting"
								});
								paramsObj.push({
									startdate : $scope.startdate,
									enddate : $scope.enddate,
									issue : "plumbing"
								});
								paramsObj.push({
									startdate : $scope.startdate,
									enddate : $scope.enddate,
									issue : "road-contructor"
								});
								paramsObj.push({
									startdate : $scope.startdate,
									enddate : $scope.enddate,
									issue : "angry"
								});
								paramsObj.push({
									startdate : $scope.startdate,
									enddate : $scope.enddate,
									issue : "nutral"
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
																		var issuelink = "http://sense.city/issuemap.php?issue_id="
																				+ issueid;
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
																			"message" : ""
																					+ message
																					+ "<br><a href="
																					+ issuelink
																					+ ">Δες με!</a>"
																		};
																		this
																				.push(marker);
																	},
																	$scope.markers);

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
																		|| lastissue.image_name === null
																		|| lastissue.image_name === undefined) {
																	lastissue.image_name = "images/EmptyBox-Phone.png";
																}

																switch (lastissue.issue) {
																case 'garbage':
																	lastissue.issue = 'Πρόβλημα Καθαριότητας';
																	break;
																case 'lighting':
																	lastissue.issue = 'Πρόβλημα Φωτισμού';
																	break;
																case 'plumbing':
																	lastissue.issue = 'Πρόβλημα Καθαριότητας';
																	break;
																case 'road-contructor':
																	lastissue.issue = 'Πρόβλημα Δρόμου/Πεζοδρομίου';
																	break;
																case 'angry':
																	lastissue.issue = 'Διάθεση';
																	break;
																case 'neutral':
																	lastissue.issue = 'Διάθεση';
																	break;
																case 'happy':
																	lastissue.issue = 'Διάθεση';
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

																if (seconds < 60) {
																	datediff = "πριν από "
																			+ seconds
																			+ " δευτερόλεπτα";
																} else if (seconds < 3600) {
																	datediff = "πριν από "
																			+ Math
																					.floor(seconds / 60)
																			+ " λεπτά";
																} else if (seconds < 86400) {
																	datediff = "πριν από "
																			+ Math
																					.floor(seconds / 3600)
																			+ " ώρες";
																} else {
																	datediff = "πριν από "
																			+ Math
																					.floor(seconds / 86400)
																			+ " μέρες";
																}
																lastissue.create_at = datediff;
																var bugParams =
																{
																    "method": "Bug.get",
																    "params": [{"ids":lastissue._id,"product": "Δημος Πατρέων","component": "Τμήμα επίλυσης προβλημάτων","include_fields":["component","cf_sensecityissue","status","id","alias","summary","creation_time","whiteboard","resolution","last_change_time"]}],
																    "id": 1
																};
																BugService.search(bugParams, function(result) {
																		switch (result[0].status) {
																		 case 'CONFIRMED':
																			 result.status = 'Ανοιχτό';
																			 break;
																		 case 'IN_PROGRESS':
																			 result.status = 'Σε εκτελέση';
																			 break;
																		 case 'RESOLVED':
																			 result.status = 'Ολοκληρωμένο';
																			 break;
																	 }
																	 lastissue.status = result.status;
																});

															});
										});
										// query() returns all the last 6
										// issues

									$scope.lastissues = theLastIssues;
							};

							$scope.doCalcFrom2016 = function() {
								var problemsParam = {startdate:"2016-05-01",sort:"-1",list_issue:"1",image_field:"0"};
								DisplayIssuesService.query(problemsParam, function(result) {
										 $scope.calcValueProblemsFrom2016 = result.length;
								});

								var solutionsParam =
								{
										"method": "Bug.search",
										"params": [{"product": "Δημος Πατρέων","component": "Τμήμα επίλυσης προβλημάτων","order":"bug_id DESC","status":"RESOLVED","f1":"resolution","o1":"changedafter","v1":"2016-01-01","include_fields":["component","cf_sensecityissue","status","id","alias","summary","creation_time","whiteboard","resolution","last_change_time"]}],
										"id": 1
								};
								BugService.search(solutionsParam, function(result) {
										 $scope.calcValueSolutionFrom2016 = result.length;
								});

							};


							$scope.doCalcLast6Issues();
							$scope.submitSearchLast30days();
							$scope.doCalcFrom2016();


							// set intervals to update
							var updtime = 60 * 1000; // every 60 secs
							$interval($scope.doCalcLast6Issues, updtime);
							$interval($scope.submitSearchLast30days, updtime);

						} ]);