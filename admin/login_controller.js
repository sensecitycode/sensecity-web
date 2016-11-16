/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var app = angular.module('login_fo', ['ngCookies']);

//app.config([
//  '$httpProvider',
//  function($httpProvider) {
//    $httpProvider.defaults.withCredentials = true;
//  }]);

app.controller('login_controller', ['$scope', '$window', '$http','$cookieStore','$location', function ($scope, $window, $http,$cookieStore,$location) {
        $scope.admin_user = "";
        $scope.lock = "";
        $scope.username_l = "Username";
        $scope.password_l = "Password";
        $scope.user_focus = function (event) {

            $scope.admin_user = {"border": "2px #979ea7 solid", "border-right": "none"};
        }
        $scope.lock_focus = function (event) {
            $scope.lock = {"border": "2px #979ea7 solid", "border-right": "none"};
        }
        $scope.user_blur = function (event, username) {
            $scope.admin_user = "";
            $scope.username_l = username;
        }
        $scope.lock_blur = function (event, password) {
            $scope.lock = "";
            $scope.password_l = password;
        }
        $scope.authenticate_us = function (event) {
            var domain = $location.host().split(".");
            var parameter = JSON.stringify({username: $scope.username_l, password: $scope.password_l, city: domain[0]});
            $http.post('http://api.sense.city:4000/dashboard', parameter).success(
                    function (response, status, headers, config) {
                        response = response.split(';');
                        if (response != "failure") {
                            $cookieStore.put('city',response[0]);
                            $cookieStore.put('role',response[1]);
                            $cookieStore.put('department',response[2]);
                            $cookieStore.put('email',response[3]);
                            $cookieStore.put('uuid',response[4]);
                            $cookieStore.put('username',response[5]);
                            $window.location.href = "/admin/admin.html";
                        } else {
                            $window.alert("Wrong credentials!");
                        }
                    }).error(
                    function (response) {
                        $window.alert("failure");
                    });
        }
    }]);