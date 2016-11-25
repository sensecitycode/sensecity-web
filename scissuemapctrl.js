var appControllers = angular.module('scissuemapapp.scissuemapctrl', ['ngResource'])
.constant("config", {"host": "api.sense.city", "port": "4000"});

appControllers.controller('scissuemapctrl', ['$scope', '$location','$window','$resource','$http', 'EndPointService', 'BugService', 'ToGrService', 'Issue2MapService', 'FixPoints2MapService', 'FixPointsMarkerService','config',
    function ($scope, $location,$window,$resource,$http, EndPointService, BugService, ToGrService, Issue2MapService, FixPoints2MapService, FixPointsMarkerService,config) {

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
            },
            staticGarbage: {
                type: 'extraMarker',
                icon: 'fa-trash-o',
                prefix: 'fa',
                markerColor: 'green',
                shape: 'square'
            },
            staticGarbageRecycle: {
                type: 'extraMarker',
                prefix: 'fa',
                icon: 'fa-trash-o',
                markerColor: 'cyan',
                shape: 'square'
            },
            staticLighting: {
                type: 'extraMarker',
                prefix: 'fa',
                icon: 'fa-lightbulb-o',
                markerColor: 'yellow',
                shape: 'square'
            }
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
            }
        };

        $scope.center = {};
        $scope.markers = {};

        $scope.submit = "";
        $scope.assignment = "---";
        $scope.completion = "---";

        //parse ?issue_id from URL
        var issue_id = $location.search().issue_id;

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



            switch (issue[0].issue) {
                case "garbage":
                    if (localStorage.getItem("language") === 'en') {
                        issue_name_new = 'Cleaning Problem';
                    } else {
                        issue_name_new = "Πρόβλημα Καθαριότητας";
                    }
                    break;
                case "lighting":
                    if (localStorage.getItem("language") === 'en') {
                        issue_name_new = 'Lighting Problem';
                    } else {
                        issue_name_new = "Πρόβλημα Φωτισμού";
                    }
                    break;
                case "plumbing":
                    if (localStorage.getItem("language") === 'en') {
                        issue_name_new = 'Plumbing Problem';
                    } else {
                        issue_name_new = "Προβλήματα ύδρευσης";
                    }
                    break;
                case "road-contructor":
                    if (localStorage.getItem("language") === 'en') {
                        issue_name_new = 'Street/Sidewalk Problem';
                    } else {
                        issue_name_new = "Πρόβλημα Δρόμου/Πεζοδρομίου";
                    }
                case "protection-policy":
                    if (localStorage.getItem("language") === 'en') {
                        issue_name_new = 'Protection Policy';
                    } else {
                        issue_name_new = "Πολιτική Προστασία";
                    }
                case "green":
                    if (localStorage.getItem("language") === 'en') {
                        issue_name_new = 'Green';
                    } else {
                        issue_name_new = "Πράσινο";
                    }
                    break;
                default:
                    break;
            }

            $scope.issue_name_new = issue_name_new;
            $scope.issue_value_desc = issue[0].value_desc;
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
		
		var history = $resource('http://' + config.host + ':' + config.port + '/api/1.0/fullissue/'+ issue_id,
            {'query': {method: 'GET', isArray: true}});
            history.query(function(response){
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
            $window.alert(JSON.stringify(response[1].bugs[resp_id].comments[i]));
            $window.alert(response[1].bugs[resp_id].comments.length);
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