/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var app = angular.module('login_fo', ['ngCookies'])
        .constant("config", {"host": "api.sense.city:", "bugzilla_host": "nam.ece.upatras.gr:80", "port": "3000", "bugzilla_path": "/bugzilla"});


//app.config([
//  '$httpProvider',
//  function($httpProvider) {
//    $httpProvider.defaults.withCredentials = true;
//  }]);

	
app.controller('login_controller', ['$scope', '$rootScope', '$window', '$http', '$cookieStore', '$location', 'config', function ($scope, $rootScope, $window, $http, $cookieStore, $location, config) {
	
		var url_path = $location.absUrl().split("//");
		var sub_domain = url_path[1].split(".");
		console.log('current url : '+sub_domain[0]);
		
		var mainInfo = $http.get('../config/'+sub_domain[0]+'.json').success(function(response) {
			
			$rootScope.Variables = {
				city_name: sub_domain[0],
				lat_center: response.lat_center,
				long_center: response.long_center,
				img_logo: "images/city_logos/"+response.city_name+".jpg",
				bugzilla_products: response.bugzilla_products,
				APIURL: "http://api.sense.city:3000/api/1.0/issue/",
				bugzilla: "http://api.sense.city:4001/bugs/search",
				ALLISSUESAPIURL: "http://api.sense.city:3000/api/1.0/issues",
				active_user_URL : "http://api.sense.city:3000/api/1.0/active_users",
				activate_user_URL : "http://api.sense.city:3000/api/1.0/activate_users",
				APIADMIN: "http://api.sense.city:3000/api/1.0",
				map_zoom:12
			};
			
			return $rootScope;
		});
	
	
        $scope.admin_user = "";
        $scope.lock = "";
        $scope.username_l = "Username";
        $scope.password_l = "Password";
        $scope.user_focus = function (event) {

            $scope.admin_user = {"border": "2px #979ea7 solid", "border-right": "none"};
        };
        $scope.lock_focus = function (event) {
            $scope.lock = {"border": "2px #979ea7 solid", "border-right": "none"};
        };
        $scope.user_blur = function (event, username) {
            $scope.admin_user = "";
            $scope.username_l = username;
        };
        $scope.lock_blur = function (event, password) {
            $scope.lock = "";
            $scope.password_l = password;
        };
        $scope.authenticate_us = function (event) {
            var domain = $location.host().split(".");
            var parameter = {username: $scope.username_l, password: $scope.password_l, city: $rootScope.Variables.city_name};    
			
			console.log($rootScope.Variables.APIADMIN);
			
            $http.post($rootScope.Variables.APIADMIN + '/dashboard', parameter).success(
                                function (response, status, headers, cnfg) {									
									
                                    response = response.split(';');
                                    if (response != "failure") {
                                        $cookieStore.put('city', response[0]);
                                        $cookieStore.put('role', response[1]);
                                        $cookieStore.put('department', response[2]);
                                        $cookieStore.put('email', response[3]);
                                        $cookieStore.put('uuid', response[4]);
                                        $cookieStore.put('username', response[5]);

                                        $window.location.href = "/admin/admin.html";

                                    } else {
                                        $window.alert("Wrong credentials!");
                                    }
                                }).error(
                                function (response) {
                                    $window.alert("failure");
                                });
        };
    }]);