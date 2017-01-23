var appControllers = angular.module('scissuemapapp.scissuemapctrl', ['ngResource','scissuemapapp.scissuemapsrvs'])
        .constant("config", {"host": "api.sense.city", "port": "3000"});

appControllers.controller('scissuemapctrl', ['$scope', '$rootScope', '$location', '$window', '$resource', '$http', 'BugService', 'ToGrService', 'Issue2MapService', 'FixPoints2MapService', 'FixPointsMarkerService', 'config','leafletData',
    function ($scope, $rootScope, $location, $window, $resource, $http, BugService, ToGrService, Issue2MapService, FixPoints2MapService, FixPointsMarkerService, config,leafletData) {
        var icons = $rootScope.Variables.icons;

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
                },googleRoadmap: {
                                        name: 'Google Map + Traffic',
                                        layerType: 'ROADMAP',
                                        type: 'google',
                                        layerOptions: {
                                            showOnSelector: true,
                                            attribution: 'xxx',
                                            maxZoom: 20
                                        }
                                    }, googleHybrid: {
                                        name: 'Google Hybrid + Traffic',
                                        layerType: 'HYBRID',
                                        type: 'google',
                                        layerOptions: {
                                            showOnSelector: true,
                                            attribution: 'xxx',
                                            maxZoom: 20
                                        }
                                    }
            }
        };

        $scope.center = {};
        $scope.markers = {};

        $scope.submit = "";
        $scope.assignment = "---";
        $scope.completion = "---";

        //parse ?issue_id from URL
        var issue_id = $location.$$url.replace('/scissuemap=', '');

        Issue2MapService.query({issueID: issue_id}, function (issue) {
            console.log(issue);
            $scope.issue_image = issue[0].image_name;
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
        });


        //progress-bar percentage
        var params1 = {"ids": issue_id,
            "include_fields": ["component", "cf_sensecityissue", "status", "id", "alias", "summary", "creation_time", "whiteboard", "resolution"]};
        var obj1 =
                {
                    "method": "Bug.get",
                    "params": [params1],
                    "id": 1
                };
        BugService.search(obj1, function (result) {
            moment.locale('el');
            var local_time_sub = moment(result[0].creation_time).format('LLL');
            $scope.submit = local_time_sub;
            var width;
            switch (result[0].status) {
                case "CONFIRMED":
                    width = "16%";
                    break;
                case "IN_PROGRESS":
                    width = "50%";
                    break;
                case "RESOLVED":
                    width = "100%";
                    break;
            }
            $scope.barwidth = width;
        });

        //progress info
        var params2 = {"ids": issue_id};
        var obj2 =
                {
                    "method": "Bug.history",
                    "params": [params1],
                    "id": 1
                };
        BugService.search(obj2, function (result) {
            moment.locale('el');

            var local_time_assign = null;
            var time_assign = null;
            var time_compl = null;

            for (i = 0; i < result[0].history.length; i++)
            {
                for (j = 0; j < result[0].history[i].changes.length; j++)
                {
                    if (result[0].history[i].changes[j].added == "IN_PROGRESS")
                    {
                        time_assign = result[0].history[i].when;
                    }
                }
            }

            if (time_assign !== null)
            {
                local_time_assign = moment(time_assign).format('LLL');
                $scope.assignment = local_time_assign;
            }



            for (i = 0; i < result[0].history.length; i++)
            {
                for (j = 0; j < result[0].history[i].changes.length; j++)
                {
                    if (result[0].history[i].changes[j].added == "RESOLVED")
                    {
                        time_compl = result[0].history[i].when;
                    }
                    if (result[0].history[i].changes[j].field_name == "resolution")
                    {
                        $scope.resol = result[0].history[i].changes[j].added;
                    }
                }
            }

            if (time_compl !== null)
            {
                var local_time_compl = moment(time_compl).format('LLL');
                switch ($scope.resol) {
                    case "FIXED":
                        if (localStorage.getItem("language") === 'en') {
                            new_resol = 'Fixed';
                        } else {
                            new_resol = "Αποκατάσταση";
                        }
                        break;
                    case "INVALID":
                        if (localStorage.getItem("language") === 'en') {
                            new_resol = 'Invalid';
                        } else {
                            new_resol = "Εσφαλμένο αίτημα";
                        }
                        break;
                    case "WONTFIX":
                        if (localStorage.getItem("language") === 'en') {
                            new_resol = 'Will not Fix';
                        } else {
                            new_resol = "Μη αποκατάσταση";
                        }
                        break;
                    case "DUPLICATE":
                        if (localStorage.getItem("language") === 'en') {
                            new_resol = 'Already reported in other issue';
                        } else {
                            new_resol = "Εχει ήδη αναφερθεί στο παρελθόν";
                        }
                        break;
                }
                //$('#completion').replaceWith("("+new_resol+")<br />"+local_time_compl);
                $scope.completion = "(" + new_resol + ")\n" + local_time_compl;
                console.log($scope.completion);
                // $('#completion').html('');
                // $('#completion').html("("+new_resol+")<br />"+local_time_compl);
            }
        });

        var history = $resource($rootScope.Variables.APIADMIN+'/fullissue/' + issue_id,
                {'query': {method: 'GET', isArray: true}});
        history.query(function (response) {
            //        var res = [{
//                time: "2000-07-25T13:50:04Z",
//                content: "test bug to fix problem in removing from cc list.",
//                tags: ["Ανοιχτό", "Τμήμα επίλυσης προβλημάτων"]
//            }, {time: "2010-08-22T18:20:12Z",
//                content: "new comment",
//                tags: ["Σε εκτελεση", "Τμήμα επίλυσης προβλημάτων"]
//            }, {time: "2010-08-22T18:20:12Z",
//                content: "default",
//                tags: ["Σε εκτελεση", "Τμήμα επίλυσης προβλημάτων"]
//            }, {time: "2010-08-22T18:20:12Z",
//                content: "new comment",
//                tags: ["Ολοκληρωμένο", "Τμήμα επίλυσης προβλημάτων"]
//            }];

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
        });
        /*	
         console.log('http://' + config.host + ':' + config.port + '/api/1.0/fullissue/'+ issue_id);
         $http.get('http://' + config.host + ':' + config.port + '/api/1.0/fullissue/'+ issue_id, {isArray:true} ).success(
         function (response, status, headers, conf) {                     
         //        var res = [{
         //                time: "2000-07-25T13:50:04Z",
         //                content: "test bug to fix problem in removing from cc list.",
         //                tags: ["Ανοιχτό", "Τμήμα επίλυσης προβλημάτων"]
         //            }, {time: "2010-08-22T18:20:12Z",
         //                content: "new comment",
         //                tags: ["Σε εκτελεση", "Τμήμα επίλυσης προβλημάτων"]
         //            }, {time: "2010-08-22T18:20:12Z",
         //                content: "default",
         //                tags: ["Σε εκτελεση", "Τμήμα επίλυσης προβλημάτων"]
         //            }, {time: "2010-08-22T18:20:12Z",
         //                content: "new comment",
         //                tags: ["Ολοκληρωμένο", "Τμήμα επίλυσης προβλημάτων"]
         //            }];
         
         $scope.comments = [];
         var resp_id = response[0].bug_id;
         
         for (var i = 0; i < response[1].bugs[resp_id].comments.length; i++) {
         
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
         
         if (i == 0) {
         color = {"background-color": "#e74c3c"};
         type = "Ανοιχτο";
         } else if (response[1].bugs[resp_id].comments[i].tags[0] == "IN_PROGRESS") {
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
         if(response[1].bugs[resp_id].comments[i].content == 'default'){
         show = false;
         }
         if(response[1].bugs[resp_id].comments[i].tags[1] == "all"){
         response[1].bugs[resp_id].comments[i].tags[1] = "Τμήμα επίλυσης προβλημάτων";
         }else if(response[1].bugs[resp_id].comments[i].tags[1] == "protection"){
         response[1].bugs[resp_id].comments[i].tags[1] = "Τμήμα πολιτικής προστασίας";
         }else if(response[1].bugs[resp_id].comments[i].tags[1] == "road-contructor"){
         response[1].bugs[resp_id].comments[i].tags[1] = "Τμήμα πεζοδρομίου/δρόμου/πλατείας";
         }
         var com = {
         "content": response[1].bugs[resp_id].comments[i].content,
         "type": type,
         "day": day,
         "month": month,
         "year": year,
         "time": time,
         "color": color,
         "component": response[1].bugs[resp_id].comments[i].tags[1],
         "show": show
         };
         
         $scope.comments.push(com);
         }
         }).error(
         function (data, status) {
         
         });*/
    }]);