var appControllers = angular.module('scapp.controllers', ['pascalprecht.translate','ngCookies', 'ngAnimate']);


appControllers.controller('sensecityMainCtrl', function($scope, $log, $location, $rootScope,$http,$window) {
	$log.debug('inside sensecityMainCtrl controller');
	$scope.scvesrion = '20160712_trunk';
	$rootScope.overview_url = $location.path();

});

appControllers.controller('mobilelinkCtl',function($scope,$window,$http,$q,$location){
    
    $scope.nloaded = true;
    var url_path = $location.absUrl().split("//");
        var sub_domain = url_path[1].split(".");
        var url;
    
    if (sub_domain[0].split(":").length > 1) {
            url = "./config/testcity1.json";
            sub_domain[0] = "patras";
        } else {
            url = '../config/' + sub_domain[0] + '.json';
        }

        var d = $q.defer();

        var mainInfo = $http.get(url).success(function (response) {

            $scope.Variables = {
                APIADMIN: response.APIADMIN
            };

            d.resolve(response);
            return d.promise;
        });
        
        var b_id = $location.absUrl().split("=")[1];

         $q.all([mainInfo]).then(function(data){
             $http.get($scope.Variables.APIADMIN+"/bugidtoalias/"+b_id).success(function (response) {
                 $scope.nloaded = false;
                 window.location = "http://"+sub_domain[0]+".sense.city/scissuemap.html?issue="+response.bugs[0].alias[0];
             });
         });
});

appControllers.controller('allissuesCtrl', function($scope,$rootScope, $log,$window,$http,$q,$location, $resource, $translate,BugService) {
	$log.debug('inside allissuesCtrl controller');
        $scope.nloaded = true;
        $scope.navClass = function (page) {
            var path = window.location.href.toString().split("/");
            var currentRoute = path[path.length - 1];
            if( currentRoute.split(".")[0] != page){
                return false;
            }else{
                return true;
            }
        }
        
        $scope.changeLanguage = function (langKey) {
            $translate.use(langKey);
        };
        
	$scope.allissues = [];
	$rootScope.overview_url = $location.path();
        
	$scope.doCalcAllIssues = function() {
                
                var url_path = $location.absUrl().split("//");
        var sub_domain = url_path[1].split(".");
        var url;

        if (sub_domain[0].split(":").length > 1) {
            url = "./config/testcity1.json";
            sub_domain[0] = "testcity1";
        } else {
            url = '../config/' + sub_domain[0] + '.json';
        }

        var d = $q.defer();

        $rootScope.mainInfo = $http.get(url).success(function (response) {

            $rootScope.Variables = {
                city_name: sub_domain[0],
                city_address: response.city_address,
                lat_center: response.lat_center,
                long_center: response.long_center,
                img_logo: "images/city_logos/" + response.city_name + ".jpg",
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
                active_user_URL: response.active_user_URL,
                activate_user_URL: response.activate_user_URL,
                APIADMIN: response.APIADMIN,
                issue_type_en: response.issue_type_en,
                issue_type_gr: response.issue_type_gr,
                availableIssues: response.availableIssues,
                searchIssues: response.searchIssues,
                map_zoom: response.zoom,
                overlay_functions: response.overlay_functions,
                overlay_categories: response.overlay_categories,
                google_init_coords: response.google_init_coords,
                google_buildings: response.google_buildings,
                host: response.host
            };

            d.resolve(response);
            return d.promise;
        });
        
         $q.all([$rootScope.mainInfo]).then(function(data){       
		var tmpIssues = $resource( $rootScope.Variables.APIURL+'?city='+ $rootScope.Variables.city_name+'&startdate=2017-01-01&sort=-1&limit=20&list_issue=1&image_field=1',
        {}, {
        update: {
          method: 'GET'
          // isArray: true
        }
    }).query(function() {

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
											lastissue.class = "fa fa-"+$rootScope.Variables.icons[lastissue.issue].icon;
                                                                                        lastissue.width = "80%";
										}else{
                                                                                    lastissue.width = "100%";
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
                                                                       $(window).trigger("resize");
                                                                       $scope.nloaded = false;
				});
                            $scope.allissues = tmpIssues;
                            });
	};

	$scope.doCalcAllIssues();

});