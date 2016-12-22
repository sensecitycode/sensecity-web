var appControllers = angular.module('searchapp.controllers', []);


appControllers.directive('sidebarDirective', function () {
    return {
        link: function (scope, element, attr) {
            scope.$watch(attr.sidebarDirective, function (newVal) {
                if (newVal)
                {
                    element.addClass('show');
                    return;
                }
                element.removeClass('show');
            });
        }
    };
});

appControllers.controller('searchIssueController', ['$scope', '$window', '$rootScope', '$q', 'DisplayIssuesService', 'DisplayFeelingsService', 'Issue2MapService', 'leafletData', function ($scope, $window, $rootScope, $q, DisplayIssuesService, DisplayFeelingsService, Issue2MapService, leafletData) {

        $scope.state = true;
        $scope.toggleState = function () {
            $scope.state = !$scope.state;
        };
        var icons = $rootScope.Variables.icons;
        $scope.center = {
            lat: $rootScope.Variables.lat_center,
            lng: $rootScope.Variables.long_center,
            zoom: 12
        };
        $scope.layers = {
            baselayers: {
                openStreetMap: {
                    name: 'OpenStreetMap',
                    type: 'xyz',
                    url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    layerOptions: {
                        showOnSelector: false,
                        attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
                    }
                }
            },
            overlays: $rootScope.Variables.overlays
        };
        var startdate = new Date();
        startdate.setDate(startdate.getDate() - 30);
        $scope.startISOdate = startdate;
        $scope.endISOdate = new Date();
//need to refresh the map layer after everything is rendered, otherwise it displays empty tiles
        $scope.invalidateTheMap = function () {

            leafletData.getMap().then(
                    function (map) {
                        map.invalidateSize(true);
                    }
            );
        };
        $scope.$on("leafletDirectiveMarker.click", function (event, args) {
            var marker3 = args.leafletObject;
            var popup = marker3.getPopup();
            var issue_name;
            var issue_image;
            Issue2MapService.query({issueID: marker3.options.issue_id}, function (resp) {

                var resp_index = $rootScope.Variables.departments.indexOf(resp[0].issue);
                if (resp_index != -1) {
                    issue_name = $rootScope.Variables.departments_en[resp_index];
                }

                if (resp[0].image_name == "" || resp[0].image_name == "no-image") {
                    issue_image = "/images/EmptyBox-Phone.png";
                } else {
                    issue_image = resp[0].image_name;
                }

                popup.setContent("<center><b>" + issue_name + "</b><br>" + resp[0].value_desc + "<br><img src=\"" + issue_image + "\" style=\"height:200px\"><br><a href=\"http://" + $rootScope.Variables.city_name + ".sense.city/#/scissuemap=" + resp[0]._id + "\">Εξέλιξη προβλήματος!</a></center>");
                popup.update();
            });
        });
        $scope.submit = function () {
            $scope.startdate = $scope.startISOdate.getFullYear() + '-' + ($scope.startISOdate.getMonth() + 1) + '-' + $scope.startISOdate.getDate();
            $scope.enddate = $scope.endISOdate.getFullYear() + '-' + ($scope.endISOdate.getMonth() + 1) + '-' + $scope.endISOdate.getDate();
            var paramsObj = [];
            var feelingsObj;
            var states = "";
            var feelings = "";
            var component = angular.copy($rootScope.Variables.components);
            var i = 0;
            angular.forEach($scope.searchState, function (state, sstate) {
                if (state == true) {
                    if (sstate != "default") {
                        if (i == 0) {
                            states += sstate;
                            i++;
                        } else {
                            states += "|" + sstate;
                        }
                    } else {
                        component.push("default");
                    }
                }
            });
            
            angular.forEach($scope.searchIssue, function (state, problem) {
                if (problem == "roadcontructor") {
                    problem = "road-contructor";
                }
                if (problem == "protectionpolicy") {
                    problem = "protection-policy";
                }

                if (state === true) {
                    if (states == "") {
                        paramsObj.push({startdate: $scope.startdate, enddate: $scope.enddate, issue: problem, image_field: 0, component: component});
                    } else {
                        paramsObj.push({startdate: $scope.startdate, enddate: $scope.enddate, issue: problem, image_field: 0, status: states, component: component});
                    }
                }
            });
            i = 0;
            angular.forEach($scope.searchFeeling, function (state, feeling) {
                if (state == true) {
                    if (i == 0) {
                        feelings += feeling;
                        i++;
                    } else {
                        feelings += "|" + feeling;
                    }
                }
            });
            if (paramsObj.length == 0) {
                if (states == "") {
                    paramsObj.push({startdate: $scope.startdate, enddate: $scope.enddate, image_field: 0, component: component});
                } else {
                    paramsObj.push({startdate: $scope.startdate, enddate: $scope.enddate, image_field: 0, status: states, component: component});
                }
            }

            if (feelings != "") {
                feelingsObj = {startdate: $scope.startdate, enddate: $scope.enddate, city: $rootScope.Variables.city_name, feeling: feelings};
            } else {
                feelingsObj = {startdate: $scope.startdate, enddate: $scope.enddate, city: $rootScope.Variables.city_name};
            }

            var promisesArray = [];
            for (index = 0; index < paramsObj.length; index++) {
                promisesArray.push(doQuery(paramsObj[index]));
            }

            promisesArray.push(feelingsQuery(feelingsObj));
            $q.all(promisesArray).then(function (data) {
                var searchissues = [];
                for (i = 0; i < data.length; i++) {
                    for (j = 0; j < data[i].length; j++) {
                        searchissues.push(data[i][j]);
                    }
                }

                $scope.markers = [];
                angular.forEach(searchissues, function (value, key) {
                    var issueid = value._id;
                    var issuelink = "http://" + $rootScope.Variables.city_name + ".sense.city/#/scissuemap=" + issueid;
                    var positionlat = value.loc.coordinates[1];
                    var positionlon = value.loc.coordinates[0];
                    var issue = value.issue;
                    var layer = '';
                    if (issue == "angry" || issue == "neutral" || issue == "happy") {
                        layer = 'reaction';
                    } else {
                        layer = issue;
                    }
                    var message = '';
                    if (value.value_desc) {
                        message = value.value_desc;
                    } else {
                        message = 'Μη διαθέσιμη περιγραφή';
                    }
                    var marker;
                    if (issue == "angry" || issue == "neutral" || issue == "happy") {
                        marker = {"layer": "" + layer + "", "lat": +positionlat, "lng": +positionlon, "icon": icons[issue], "issue_id": issueid, "message": "" + message + "<br>"};
                    } else {
                        marker = {"layer": "" + layer + "", "lat": +positionlat, "lng": +positionlon, "icon": icons[issue], "issue_id": issueid, "message": "" + message + "<br><a href=" + issuelink + ">Δες με!</a>"};
                    }
                    if (layer != 'reaction') {
                        marker.message = "Loading...";
                    }
                    this.push(marker);
                }, $scope.markers);
            });
        };
        $scope.reset = function () {
            var startdate = new Date();
            startdate.setDate(startdate.getDate() - 30);
            $scope.startISOdate = startdate;
            $scope.endISOdate = new Date();
            $scope.searchIssue = "";
            $scope.searchState = "";
            $scope.searchFeeling = "";
            $scope.markers = [];
            $scope.center = {
                lat: $rootScope.Variables.lat_center,
                lng: $rootScope.Variables.long_center,
                zoom: $rootScope.Variables.map_zoom
            };
        };
        function doQuery(obj) {
            var d = $q.defer();
            DisplayIssuesService.query(obj, function (result) {
                d.resolve(result);
            });
            return d.promise;
        }

        function feelingsQuery(obj) {
            var d = $q.defer();
            DisplayFeelingsService.query(obj, function (result) {
                d.resolve(result);
            });
            return d.promise;
        }
    }]);