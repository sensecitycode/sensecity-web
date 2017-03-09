var app = angular.module('login_fo', ['ngCookies','ngRoute'])
        .constant("config", {"host": "api.sense.city", "bugzilla_host": "nam.ece.upatras.gr:80", "port": "3000", "bugzilla_path": "/bugzilla"});


//app.config([
//  '$httpProvider',
//  function($httpProvider) {
//    $httpProvider.defaults.withCredentials = true;
//  }]);
	
app.controller('login_controller', ['$scope', '$rootScope','$window', '$http', '$cookieStore', '$location', 'config', function ($scope, $rootScope,$window, $http, $cookieStore, $location, config) {
        $("html").addClass("body-full-height");
        $scope.admin_user = "";
        $scope.lock = "";
        $scope.username_l = "";
        $scope.password_l = "";
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
            var domain;
            if($location.host() == "localhost"){
             domain = [];
             domain[0] = "testcity1";   
            }else{
              domain = $location.host().split(".");  
            }
            var parameter = {username: $scope.username_l, password: $scope.password_l, city: domain[0]};                       
            $http.post($rootScope.Variables.APIADMIN+'/dashboard', parameter).success(
                                function (response, status, headers, cnfg) {
                                    response = response.split(';');
                                    if (response != "failure") {
                                        $cookieStore.put('city', response[0]);
                                        $cookieStore.put('role', response[1]);
                                        $cookieStore.put('department', response[2]);
                                        $cookieStore.put('email', response[3]);
                                        $cookieStore.put('uuid', response[4]);
                                        $cookieStore.put('username', response[5]);
                                        
                                        $location.path("/admin");

                                    } else {
                                        $window.alert("Wrong credentials!");
                                    }
                                }).error(
                                function (response) {
                                    $window.alert("failure");
                                });
        };
    }]);