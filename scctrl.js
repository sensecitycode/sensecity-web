var appControllers = angular.module('scapp.controllers', ['pascalprecht.translate','ngCookies', 'ngAnimate']);



	
	
appControllers.controller('sensecityMainCtrl', function($scope, $log, $location, $rootScope) {
	$log.debug('inside sensecityMainCtrl controller');
	$scope.scvesrion = '20160712_trunk';
	$scope.location = $location;
	
	var url_path = $location.absUrl().split("//");
	//var sub_domain = url_path.split(".");
	console.log('current url : '+url_path[0]);
	
	$rootScope.Variables = {
		city_name: sub_domain[0],
		lat_center: 21,
		long_center: 0,
		img_logo:'',
		bugzilla_products:''
	}
});



appControllers.controller('allissuesCtrl', function($scope, $log, DisplayLast100IssuesService, BugService) {
	$log.debug('inside allissuesCtrl controller');
	

	$scope.allissues = [];
	
	$scope.doCalcAllIssues = function() {
		var tmpIssues = DisplayLast100IssuesService
				.query(function() {

					angular
							.forEach(
									tmpIssues,
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
										var bugParams =
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

									});
				});
				// query() returns all the last 6
				// issues

			$scope.allissues = tmpIssues;
	};
	
	
	$scope.doCalcAllIssues();

});

