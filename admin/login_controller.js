var app = angular.module('login_fo', ['ngCookies', 'ngRoute'])
        .constant("config", {"host": "api.sense.city", "bugzilla_host": "nam.ece.upatras.gr:80", "port": "3000", "bugzilla_path": "/bugzilla"});


//app.config([
//  '$httpProvider',
//  function($httpProvider) {
//    $httpProvider.defaults.withCredentials = true;
//  }]);

app.controller('login_controller', ['$scope', '$rootScope', '$window', '$http', '$cookieStore', '$location', '$q', 'config', function ($scope, $rootScope, $window, $http, $cookieStore, $location, $q, config) {
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
            if ($location.host() == "localhost") {
                domain = [];
                domain[0] = "testcity1";
            } else {
                domain = $location.host().split(".");
            }
            var parameter = {username: $scope.username_l, password: $scope.password_l, city: domain[0]};
            var canfi = $q.defer();
            $http.post($rootScope.Variables.APIADMIN + '/dashboard', parameter, {timeout: canfi.promise}).success(
                    function (response, status, headers, cnfg) {
                        canfi.resolve();
                        if (response != "failure") {
                            $cookieStore.put('city', response[0].city);
                            $cookieStore.put('role', response[0].role);
                            $cookieStore.put('department', response[0].department);
                            $cookieStore.put('email', response[0].email);
                            $cookieStore.put('uuid', response[0].uuid);
                            $cookieStore.put('username', response[0].username);
                            $cookieStore.put('departments', response[0].departments);
                            $location.path("/admin");

                        } else {
                            $window.alert("Wrong credentials!");
                        }
                    });

            setTimeout(function () {
                if (canfi.promise.$$state.status == 0) {
                    canfi.resolve('cancelled');
                    alert("Η υπηρεσία δεν αναταποκρίνεται! Παρακαλώ δοκιμάστε αργότερα!");
                }
            }, 30000);
        };
    }]);