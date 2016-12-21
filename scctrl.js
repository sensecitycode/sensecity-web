var appControllers = angular.module('scapp.controllers', ['pascalprecht.translate','ngCookies', 'ngAnimate']);



	
	
appControllers.controller('sensecityMainCtrl', function($scope, $log, $location, $rootScope,$http,$window) {
	$log.debug('inside sensecityMainCtrl controller');
	$scope.scvesrion = '20160712_trunk';
	$scope.location = $location;
	
	
	
	
	var url_path = $location.absUrl().split("//");
	var sub_domain = url_path[1].split(".");
	
var mainInfo = $http.get('/config/'+sub_domain[0]+'.json').success(function(response) {
		
		$rootScope.Variables = {
			city_name: sub_domain[0],
			lat_center: response.lat_center,
			long_center: response.long_center,
			img_logo: "images/city_logos/"+response.city_name+".jpg",
			bugzilla_products: response.bugzilla_products,
                        icons: response.icons,
			APIURL: response.APIURL,
                        components: response.components,
                        components_en: response.components_en,
                        overlays: response.overlays,
                        categories: response.categories,
                        categories_issue: response.categories_issue,
                        departments: response.departments,
                        departments_en: response.departments_en,
                        feelingsURL: response.feelingsURL,
			bugzilla: response.bugzilla,
			ALLISSUESAPIURL: response.ALLISSUESAPIURL,
			active_user_URL : response.active_user_URL,
			activate_user_URL : response.activate_user_URL,
			APIADMIN: response.APIADMIN,
			map_zoom:response.zoom,	
			host:response.host	
			map_zoom:response.zoom,
                        translations_en: response.translations_en,
                        transaltions_gr: response.translations_gr,
                        issue_type_en: response.issue_type_en,
                        issue_type_gr: response.issue_type_gr
                 };
                
        return $rootScope;
    });
	//console.log("response.city_name = " + Variables.city_name);
	
});



appControllers.controller('allissuesCtrl', function($scope,$rootScope, $log, DisplayLast100IssuesService, BugService) {
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

                                                                                var cat_index = $rootScope.Variables.categories.indexOf(lastissue.issue);
                                                                                if(cat_index != -1){
                                                                                  lastissue.issue = $rootScope.Variables.categories_issue[cat_index];
                                                                                }else{
                                                                                  lastissue.issue = '';  
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
										
										/*
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

										*/
										
										
									});
				});
				// query() returns all the last 6
				// issues

			$scope.allissues = tmpIssues;
	};
	
	
	$scope.doCalcAllIssues();

});
