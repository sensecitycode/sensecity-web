var appControllers = angular.module('scissuemapapp.scissuemapctrl', ['ngResource','scissuemapapp.scissuemapsrvs'])
        .constant("config", {"host": "api.sense.city", "port": "3000"});

appControllers.controller('scissuemapctrl', ['$scope', '$rootScope', '$location', '$window', '$resource', '$http', 'BugService', 'ToGrService', 'Issue2MapService', 'FixPoints2MapService', 'FixPointsMarkerService', 'config','leafletData',
    function ($scope, $rootScope, $location, $window, $resource, $http, BugService, ToGrService, Issue2MapService, FixPoints2MapService, FixPointsMarkerService, config,leafletData) {
        var icons = $rootScope.Variables.icons;
        var idt = setTimeout(function() { for (var i=idt;i>0;i--) clearInterval(i); },10); 
     $rootScope.$on('$locationChangeStart', function (event, current, previous) {
        var url = current.split(".");

        if( url[1] == "sense"){
            url = current.split("#/");
            event.preventDefault();
            document.location.href = current.split(".")[0]+".sense.city";
        }
});
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
            }
        };

        $scope.center = {};
        $scope.markers = {};

        $scope.submit = "";
        $scope.assignment = "---";
        $scope.completion = "---";
        
        function timeline(response) {
            
            $scope.comments = [];
            var resp_id = response[0].bug_id;
            var tag_pos;
            var dep_pos;

            for (var i = 1; i < response[1].bugs[resp_id].comments.length; i++) {

                var day;
                var month;
                var year;
                var time;
                var color;
                var type;
                var show = true;


                var time_parse = response[1].bugs[resp_id].comments[i].time.split("-");
                day = time_parse[2].substring(0, 2);
                month = time_parse[1];


                var tag_pos;
                switch (response[1].bugs[resp_id].comments[i].tags[0]) {
                    case "CONFIRMED":
                    case "IN_PROGRESS":
                    case "RESOLVED":
                        tag_pos = 0;
                        dep_pos = 1;
                        break;
                    default:
                        tag_pos = 1;
                        dep_pos = 0;
                        break;
                }

                if (response[1].bugs[resp_id].comments[i].tags[tag_pos] == "CONFIRMED") {
                    color = {"background-color": "#e74c3c"};
                    type = "Ανοιχτο";
                } else if (response[1].bugs[resp_id].comments[i].tags[tag_pos] == "IN_PROGRESS") {
                    color = {"background-color": "#e67e22"};
                    type = "Σε εκτελεση";
                } else {
                    color = {"background-color": "#2ecc71"};
                    type = "Ολοκληρωμενο";
                }

                switch (month) {
                    case "01":
                        month = "Ιαν";
                        break;
                    case "02":
                        month = "Φεβ";
                        break;
                    case "03":
                        month = "Μαρ";
                        break;
                    case "04":
                        month = "Απρ";
                        break;
                    case "05":
                        month = "Μαη";
                        break;
                    case "06":
                        month = "Ιουν";
                        break;
                    case "07":
                        month = "Ιουλ";
                        break;
                    case "08":
                        month = "Αυγ";
                        break;
                    case "09":
                        month = "Σεπτ";
                        break;
                    case "10":
                        month = "Οκτ";
                        break;
                    case "11":
                        month = "Νοε";
                        break;
                    case "12":
                        month = "Δεκ";
                        break;
                }

                year = time_parse[0];

                time = response[1].bugs[resp_id].comments[i].time.substring(11, 19);
                var temp_time = time.substring(0, 2);
                var ntime = parseInt(temp_time);
                ntime += 2;
                if (ntime < 10) {
                    time = "0" + ntime + time.substring(2);
                } else if (ntime > 23) {
                    if (ntime == 24) {
                        ntime = 0;
                    } else {
                        ntime = 1;
                    }
                    time = "0" + ntime + time.substring(2);
                } else {
                    time = ntime + time.substring(2);
                }
                if (response[1].bugs[resp_id].comments[i].text == 'undefined') {
                    show = false;
                }
                var dep_index = $rootScope.Variables.components_en.indexOf(response[1].bugs[resp_id].comments[i].tags[dep_pos]);
                response[1].bugs[resp_id].comments[i].tags[dep_pos] = $rootScope.Variables.components[dep_index];

                var com = {
                    "content": response[1].bugs[resp_id].comments[i].text,
                    "type": type,
                    "day": day,
                    "month": month,
                    "year": year,
                    "time": time,
                    "color": color,
                    "component": response[1].bugs[resp_id].comments[i].tags[dep_pos],
                    "show": show
                };

                if (response[1].bugs[resp_id].comments[i].text.substr(2, 3) != "***") {
                    $scope.comments.push(com);
                }
            }
        };

        
        //parse ?issue_id from URL
        var issue_id = $location.$$url.replace('/scissuemap=', '');

        Issue2MapService.query({issueID: issue_id}, function (issue) {
            console.log(issue);
            if( issue[0].image_name != "" && issue[0].image_name != "no-image"){
            $scope.issue_image = issue[0].image_name;
        }else{
            $scope.issue_image = "./images/"+issue[0].issue+".png";
        }
            $scope.center = {lat: issue[0].loc.coordinates[1], lng: issue[0].loc.coordinates[0], zoom: 16};
            $scope.markers = [{"lat": issue[0].loc.coordinates[1], "lng": issue[0].loc.coordinates[0], "icon": icons[issue[0].issue]}];

            if (issue[0].issue == "garbage" || "lighting") {
                var type;
                if (issue[0].issue == "lighting")
                {
                    type = "fotistiko";
                } else {
                    type = issue[0].issue;
                }

                FixPoints2MapService.query({long: issue[0].loc.coordinates[0], lat: issue[0].loc.coordinates[1], type: type}, function (fix_points) {
                    angular.forEach(fix_points, function (value, key) {
                        var icon = FixPointsMarkerService.icon(value);
                        $scope.markers.push({"lat": value.loc.coordinates[1], "lng": value.loc.coordinates[0], "icon": icons[icon]});
                    });
                });
            }

            var issue_name_new;


            var issue_index = $rootScope.Variables.categories.indexOf(issue[0].issue);
            if (issue_index != -1) {
                if (localStorage.getItem("language") === 'en') {
                    issue_name_new = $rootScope.Variables.issue_type_en[issue_index];
                } else {
                    issue_name_new = $rootScope.Variables.issue_type_gr[issue_index];
                }
            }

            $scope.issue_name_new = issue_name_new;
            $scope.issue_value_desc = issue[0].value_desc;
            
            leafletData.getMap().then(function (map) {
                                                map.invalidateSize(true);
                                            });
            
            timeline(issue);

        });
        
            }]);