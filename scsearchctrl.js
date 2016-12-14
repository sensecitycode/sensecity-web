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

appControllers.controller('searchIssueController', ['$scope', '$window', '$rootScope', '$q', 'DisplayIssuesService', 'Issue2MapService', 'leafletData', function ($scope, $window, $rootScope, $q, DisplayIssuesService, Issue2MapService, leafletData) {

        $scope.state = true;
        $scope.toggleState = function () {
            $scope.state = !$scope.state;
        };

        var icons = {
            garbage: {
                type: 'awesomeMarker',
                prefix: 'fa',
                icon: 'trash-o',
                markerColor: 'green'
            },
            "road-contructor": {
                type: 'awesomeMarker',
                prefix: 'fa',
                icon: 'road',
                markerColor: 'cadetblue'
            },
            plumbing: {
                type: 'awesomeMarker',
                prefix: 'fa',
                icon: 'umbrella',
                markerColor: 'darkpuple'
            },
            lighting: {
                type: 'awesomeMarker',
                prefix: 'fa',
                icon: 'lightbulb-o',
                markerColor: 'orange'
            },
            "protection-policy": {
                type: 'awesomeMarker',
                prefix: 'fa',
                icon: 'shield',
                markerColor: 'lightblue'
            }, green: {
                type: 'awesomeMarker',
                prefix: 'fa',
                icon: 'tree',
                markerColor: 'lightgreen'
            }, enviroment: {
                type: 'awesomeMarker',
                prefix: 'fa',
                icon: 'leaf',
                markerColor: 'darkgreen'
            },
            angry: {
                type: 'awesomeMarker',
                prefix: 'fa',
                icon: 'frown-o',
                markerColor: 'lightgreen',
                iconColor: 'darkgreen'
            },
            neutral: {
                type: 'awesomeMarker',
                prefix: 'fa',
                icon: 'meh-o',
                markerColor: 'lightgreen',
                iconColor: 'darkgreen'
            },
            happy: {
                type: 'awesomeMarker',
                prefix: 'fa',
                icon: 'smile-o',
                markerColor: 'lightgreen',
                iconColor: 'darkgreen'
            }
        };

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
            overlays: {
                garbage: {
                    type: 'group',
                    name: 'Σκουπιδιών',
                    visible: true
                },
                lighting: {
                    type: 'group',
                    name: 'Φωτισμού',
                    visible: true
                },
                plumbing: {
                    type: 'group',
                    name: 'Ύδρευσης',
                    visible: true
                },
                "road-contructor": {
                    type: 'group',
                    name: 'Οδοστρώματος',
                    visible: true
                },
                "protection-policy": {
                    type: 'group',
                    name: 'Πολιτικής Προστασίας',
                    visible: true
                },
                "green": {
                    type: 'group',
                    name: 'Πρασίνου',
                    visible: true
                }, "enviroment": {
                    type: 'group',
                    name: 'Περιβαντολλογικά',
                    visible: true
                },
                reaction: {
                    type: 'group',
                    name: 'Πολιτών',
                    visible: true
                }
            }
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

                switch (resp[0].issue) {
                    case "garbage":
                        issue_name = "Πρόβλημα Καθαριότητας";
                        break;
                    case "lighting":
                        issue_name = "Πρόβλημα Ηλεκτροφωτισμού";
                        break;
                    case "plumbing":
                        issue_name = "Πρόβλημα Ύδρευσης";
                        break;
                    case "road-contructor":
                        issue_name = "Πρόβλημα Πεζοδρομίου/Δρόμου/Πλατείας";
                        break;
                    case "protection-policy":
                        issue_name = "Πρόβλημα Πολιτική Προστασία";
                        break;
                    case "green":
                        issue_name = "Πρόβλημα Πρασίνου";
                        break;
                    case "enviroment":
                        issue_name = "Πρόβλημα Περιβάλλοντος";
                    default:
                        break;
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
            var states = "";
            var i = 0;
            angular.forEach($scope.searchState, function (state, sstate) {
                if (state == true) {
                    if (i == 0) {
                        states += sstate;
                        i++;
                    } else {
                        states += "|" + sstate;
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
                        paramsObj.push({startdate: $scope.startdate, enddate: $scope.enddate, issue: problem, image_field: 0});
                    } else {
                        paramsObj.push({startdate: $scope.startdate, enddate: $scope.enddate, issue: problem, image_field: 0, status: states});
                    }
                }
            });
            
            if( paramsObj == []){
                paramsObj.push({startdate: $scope.startdate, enddate: $scope.enddate,image_field: 0});
            }

            var promisesArray = [];
            for (index = 0; index < paramsObj.length; index++) {
                promisesArray.push(doQuery(paramsObj[index]));
            }
            $window.alert(JSON.stringify(paramsObj));
            $q.all(promisesArray).then(function (data) {
                var searchissues = [];
                for (i = 0; i < data.length; i++) {
                    for (j = 0; j < data[i].length; j++) {
                        searchissues.push(data[i][j]);
                    }
                }
                $window.alert(JSON.stringify(searchissues));
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
                    var marker = {"layer": "" + layer + "", "lat": +positionlat, "lng": +positionlon, "icon": icons[issue], "issue_id": issueid, "message": "" + message + "<br><a href=" + issuelink + ">Δες με!</a>"};
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
    }]);