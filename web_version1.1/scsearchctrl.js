var appControllers = angular.module('searchapp.controllers', ['ngSanitize']);


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

appControllers.controller('searchIssueController', ['$scope', '$window', '$rootScope', '$q', '$location', 'leafletData', '$resource', '$http', function ($scope, $window, $rootScope, $q, $location, leafletData, $resource, $http) {
        $rootScope.overview_url = $location.path();
        
        $scope.navClass = function (page) {
            var path = window.location.href.toString().split("/");
            var currentRoute = path[path.length - 1];
            if( currentRoute.split(".")[0] != page){
                return false;
            }else{
                return true;
            }
        }
        
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

        var idt = setTimeout(function () {
            for (var i = idt; i > 0; i--)
                clearInterval(i);
        }, 10);

        leafletData.getMap().then(function (map) {
            map.scrollWheelZoom.disable();
        });

        $scope.checkAll = {
            value1: false
        };

        $scope.issue_id = "";

        $scope.criteria_selected = true;

        $scope.state = true;
        $scope.toggleState = function () {
            $scope.state = !$scope.state;
        };

        $scope.invalidateTheMap = function () {

            leafletData.getMap().then(
                    function (map) {
                        map.invalidateSize(true);
                    }
            );
        };

        angular.extend($scope, {
            layercontrol: {
                icons: {
                    uncheck: "fa fa-toggle-off",
                    check: "fa fa-toggle-on"
                }
            },
            layers: {
                baselayers: {
                    openStreetMap: {
                        name: 'OpenStreetMap',
                        type: 'xyz',
                        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                        layerOptions: {
                            showOnSelector: true,
                            attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                            maxZoom: 19
                        }
                    },
                    googleRoadmap: {
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
                }, overlays: {
                    layer1: {name: '', type: 'group', visible: true}, layer2: {name: '', type: 'group', visible: true}, layer3: {name: '', type: 'group', visible: true}, layer4: {name: '', type: 'group', visible: true}, layer5: {name: '', type: 'group', visible: true}, layer6: {name: '', type: 'group', visible: true}, layer7: {name: '', type: 'group', visible: true}, layer8: {name: '', type: 'group', visible: true}, layer9: {name: '', type: 'group', visible: true}, layer10: {name: '', type: 'group', visible: true}}
            },
            addlayer: function (layer) {
                if (layer == 1) {
                    eval($rootScope.Variables.overlay_functions.layer1);
                } else if (layer == 2) {
                    eval($rootScope.Variables.overlay_functions.layer2);
                } else if (layer == 3) {
                    eval($rootScope.Variables.overlay_functions.layer3);
                } else if (layer == 4) {
                    eval($rootScope.Variables.overlay_functions.layer4);
                } else if (layer == 5) {
                    eval($rootScope.Variables.overlay_functions.layer5);
                } else if (layer == 6) {
                    eval($rootScope.Variables.overlay_functions.layer6);
                } else if (layer == 7) {
                    eval($rootScope.Variables.overlay_functions.layer7);
                } else if (layer == 8) {
                    eval($rootScope.Variables.overlay_functions.layer8);
                } else if (layer == 9) {
                    eval($rootScope.Variables.overlay_functions.layer9);
                } else if (layer == 10) {
                    eval($rootScope.Variables.overlay_functions.layer10);
                }
            },
            removelayer: function (layer) {
                if (layer == 1) {
                    delete this.layers.overlays.layer1;
                } else if (layer == 2) {
                    delete this.layers.overlays.layer2;
                } else if (layer == 3) {
                    delete this.layers.overlays.layer3;
                } else if (layer == 4) {
                    delete this.layers.overlays.layer4;
                } else if (layer == 5) {
                    delete this.layers.overlays.layer5;
                } else if (layer == 6) {
                    delete this.layers.overlays.layer6;
                } else if (layer == 7) {
                    delete this.layers.overlays.layer7;
                } else if (layer == 8) {
                    delete this.layers.overlays.layer8;
                } else if (layer == 9) {
                    delete this.layers.overlays.layer9;
                } else if (layer == 10) {
                    delete this.layers.overlays.layer10;
                }
            }
        });

        $scope.center = {
            lat: 37.787435,
            lng: 20.897801,
            zoom: 12
        };

        $('#issues').on('change', function () {
            setTimeout(function () {
                var wissues = $("button[data-id='issues']").attr("title").replace(/ /g, '').split(",");
                $scope.searchIssue = [];
                for (var i = 0; i < wissues.length; i++) {
                    for (var j = 0; j < $scope.allissues.length; j++) {
                        if (wissues[i] == $scope.allissues[j]) {
                            $scope.searchIssue.push($rootScope.Variables.searchIssues[j].value);
                        }
                        ;
                    }
                }
            }, 100);
        });

        $('#states').on('change', function () {
            setTimeout(function () {
                var wstate = $("button[data-id='states']").attr("title").replace(/ /g, '').split(",");
                $scope.searchState = [];
                for (var i = 0; i < wstate.length; i++) {
                    if (wstate[i] == "Ανοιχτά") {
                        $scope.searchState.push("CONFIRMED");
                    } else if (wstate[i] == "Ανάθεση/ΣεΕκτέλεση") {
                        $scope.searchState.push("IN_PROGRESS");
                    } else if (wstate[i] == "Ολοκληρωμένα") {
                        $scope.searchState.push("RESOLVED");
                    } else if (wstate[i] == "Ανώνυμα") {
                        $scope.searchState.push("Anonymous");
                    } else {
                        $scope.searchState.push("Καταστάσεις");
                    }
                }
            }, 100);
        });

        $('#disposal').on('change', function () {
            setTimeout(function () {
                var wdisposal = $("button[data-id='disposal']").attr("title").replace(/ /g, '').split(",");
                $scope.searchFeeling = [];
                for (var i = 0; i < wdisposal.length; i++) {
                    if (wdisposal[i] == "Θετική") {
                        $scope.searchFeeling.push("happy");
                    } else if (wdisposal[i] == "Ουδέτερη") {
                        $scope.searchFeeling.push("neutral");
                    } else if (wdisposal[i] == "Αρνητική") {
                        $scope.searchFeeling.push("angry");
                    } else {
                        $scope.searchFeeling.push("Διάθεση πολιτών");
                    }
                }
            }, 100);
        });

        $q.all([$rootScope.mainInfo]).then(
                function (data) {
                    $scope.issues = [];
                    angular.copy($rootScope.Variables.searchIssues, $scope.issues);
                    $scope.allissues = [];
                    for (var i = 0; i < $rootScope.Variables.searchIssues.length; i++) {
                        $scope.allissues.push($scope.$eval($rootScope.Variables.searchIssues[i].translate).replace(/ /g, ''));
                    }
                    for (i = 0; i < $scope.issues.length; i++) {
                        $scope.issues[i].translate = "'<i class=\"" + $scope.issues[i].class + "\"></i>'+(" + $scope.issues[i].translate + ");";
                    }
                    setTimeout(function () {
                        if ($(".select").length > 0) {
                            $(".select").selectpicker();

                            $(".select").on("change", function () {
                                if ($(this).val() == "" || null === $(this).val()) {
                                    if (!$(this).attr("multiple"))
                                        $(this).val("").find("option").removeAttr("selected").prop("selected", false);
                                } else {
                                    $(this).find("option[value=" + $(this).val() + "]").attr("selected", true);
                                }
                            });
                        }
                    }, 1);
                    for (var i = Object.keys($rootScope.Variables.overlay_functions).length + 1; i <= 10; i++) {
                        $scope.removelayer(i);
                    }

                    for (var i = 1; i <= Object.keys($rootScope.Variables.overlay_functions).length; i++) {
                        $scope.addlayer(i);
                    }

                    var icons = $rootScope.Variables.icons;
                    $scope.center = {
                        lat: $rootScope.Variables.lat_center,
                        lng: $rootScope.Variables.long_center,
                        zoom: 12
                    };

                    var counter = 0;
                    var counter1 = 0;

//                    $scope.check_criteria = function($event){
//                        $scope.searchIssue = "";
//                        $scope.searchState = "";
//                        $scope.searchFeeling = "";
//                      if($scope.checkAll.value1 == true){
//                          for (k = 0; k < $scope.issues.length; k++) {
//                             $scope.issues[k].checked = true; 
//                          }
//                          $(".ng-not-empty").click();
//                          $("label:has(.btn.btn-default)").attr("ng-model","btn btn-default active");
//                          $scope.criteria_selected = false;
//                      }else{
//                          for (k = 0; k < $scope.issues.length; k++) {
//                             $scope.issues[k].checked = false; 
//                          }
//                          $scope.searchIssue = "";
//                        $scope.searchState = "";
//                        $scope.searchFeeling = "";
//                        $("label:has(.btn.btn-default)").attr("class","btn btn-default");
//                        $('input:checkbox').not($event.currentTarget).attr("class","btn btn-default ng-valid ng-dirty ng-valid-parse ng-touched ng-empty");
//                        $('input:checkbox').not($event.currentTarget).click();   
//                        $scope.criteria_selected = true;
//                      }  
//                    };

                    $scope.activate_text = function () {
                        var state_active = true;
                        var feelings_active = true;
                        if ($scope.issue_id != "") {
                            $scope.criteria_selected = false;
                            return;
                        }
                        angular.forEach($scope.searchState, function (value, key) {
                            if (value == true) {
                                state_active = false;
                                $scope.criteria_selected = false;
                                return;
                            }
                        });
                        if (state_active == false) {
                            return;
                        }
                        angular.forEach($scope.searchFeeling, function (value, key) {
                            if (value == true) {
                                feelings_active = false;
                                $scope.criteria_selected = false;
                                return;
                            }
                        });
                        if (feelings_active == false) {
                            return;
                        }
                        var active = true;
                        for (var k = 0; k < $scope.issues.length; k++) {
                            if ($scope.issues[k].checked == true) {
                                active = false;
                                $scope.criteria_selected = active;
                                break;
                            }
                        }
                        if (active == true) {
                            $scope.criteria_selected = true;
                        }
                    };

                    $scope.activate_searchb = function () {
                        counter1++;
                        if (counter1 == 2) {
                            counter1 = 0;
                            var state_active = true;
                            var feelings_active = true;
                            if ($scope.issue_id != "") {
                                $scope.criteria_selected = false;
                                return;
                            }
                            angular.forEach($scope.searchState, function (value, key) {
                                if (value == true) {
                                    state_active = false;
                                    $scope.criteria_selected = false;
                                    return;
                                }
                            });
                            if (state_active == false) {
                                return;
                            }
                            angular.forEach($scope.searchFeeling, function (value, key) {
                                if (value == true) {
                                    feelings_active = false;
                                    $scope.criteria_selected = false;
                                    return;
                                }
                            });
                            if (feelings_active == false) {
                                return;
                            }
                            var active = true;
                            for (var k = 0; k < $scope.issues.length; k++) {
                                if ($scope.issues[k].checked == true) {
                                    active = false;
                                    $scope.criteria_selected = active;
                                    break;
                                }
                            }
                            if (active == true) {
                                $scope.criteria_selected = true;
                            }
                        }
                    };

                    $scope.checked_issue = function (index) {
                        counter++;
                        if (counter == 2) {
                            counter = 0;
                            $scope.issues[index].checked = !$scope.issues[index].checked;
                            var state_active = true;
                            var feelings_active = true;
                            if ($scope.issue_id != "") {
                                $scope.criteria_selected = false;
                                return;
                            }
                            angular.forEach($scope.searchState, function (value, key) {
                                if (value == true) {
                                    state_active = false;
                                    $scope.criteria_selected = false;
                                    return;
                                }
                            });
                            if (state_active == false) {
                                return;
                            }
                            angular.forEach($scope.searchFeeling, function (value, key) {
                                if (value == true) {
                                    feelings_active = false;
                                    $scope.criteria_selected = false;
                                    return;
                                }
                            });
                            if (feelings_active == false) {
                                return;
                            }
                            var active = true;
                            for (var k = 0; k < $scope.issues.length; k++) {
                                if ($scope.issues[k].checked == true) {
                                    active = false;
                                    $scope.criteria_selected = active;
                                    break;
                                }
                            }
                            if (active == true) {
                                $scope.criteria_selected = true;
                            }
                        }
                    };

                    var startdate = new Date();
                    startdate.setDate(startdate.getDate() - 30);
                    $scope.startISOdate = startdate;
                    $scope.endISOdate = new Date();
//need to refresh the map layer after everything is rendered, otherwise it displays empty tiles

                    $scope.$on("leafletDirectiveMarker.click", function (event, args) {
                        var marker3 = args.leafletObject;
                        var popup = marker3.getPopup();
                        var issue_name;
                        var issue_image;
                        $resource($rootScope.Variables.APIADMIN + '/fullissue/:issueID',
                                {issueID: '@id'}, {'query': {method: 'GET', isArray: true}}
                        ).query({issueID: marker3.options.issue_id}, function (resp) {

                            var resp_index = $rootScope.Variables.departments.indexOf(resp[0].issue);
                            if (resp_index != -1) {
                                issue_name = $rootScope.Variables.departments_en[resp_index];
                            }

                            if (resp[0].image_name == "" || resp[0].image_name == "no-image") {
                                resp[0].class = "fa fa-" + $rootScope.Variables.icons[resp[0].issue].icon;
                            } else {
                                issue_image = resp[0].image_name;
                            }

                            if (!(resp[0].image_name === '' || resp[0].image_name === 'no-image' || resp[0].image_name === null || resp[0].image_name === undefined)) {
                                popup.setContent("<center><b>" + issue_name + "</b><br>" + resp[0].value_desc + "<br><img src=\"" + issue_image + "\" style=\"height:200px\"><br><a href=\"http://" + $rootScope.Variables.city_name + ".sense.city/scissuemap.html?issue=" + resp[0]._id + "\">Εξέλιξη προβλήματος!</a></center>");
                            } else {
                                popup.setContent("<center><b>" + issue_name + "</b><br>" + resp[0].value_desc + "<br><i class='" + resp[0].class + "' style='font-size:12em;color:black'></i><br><a href=\"http://" + $rootScope.Variables.city_name + ".sense.city/scissuemap.html?issue=" + resp[0]._id + "\">Εξέλιξη προβλήματος!</a></center>");
                            }

                            popup.options.maxWidth = "auto";
                            popup.update();
                        });
                    });

                    function maptonum(month) {
                        switch (month) {
                            case "Ιανουάριος":
                                return "01";
                            case "Φεβρουάριος":
                                return "02";
                            case "Μάρτιος":
                                return "03";
                            case "Απρίλιος":
                                return "04";
                            case "Μάϊος":
                                return "05";
                            case "Ιούνιος":
                                return "06";
                            case "Ιούλιος":
                                return "07";
                            case "Αύγουστος":
                                return "08";
                            case "Σεπτέμβριος":
                                return "09";
                            case "Οκτώβριος":
                                return "10";
                            case "Νοέμβριος":
                                return "11";
                            case "Δεκέμβριος":
                                return "12";
                        }
                    }

                    $scope.submit = function () {
                        var date = $("#sdate").text();
                        if (date != "Διάστημα Αναζήτ.") {
                            var sdate = date.split("-")[0];
                            var edate = date.split("-")[1];
                            var csdate = sdate.split(" ");
                            var cedate = edate.split(" ");
                            $scope.markers = [];
                            $scope.startdate = csdate[2] + '-' + maptonum(csdate[0]) + '-' + ('0' + csdate[1].split(",")[0]).slice(-2);
                            $scope.enddate = cedate[3] + '-' + maptonum(cedate[1]) + '-' + ('0' + cedate[2].split(",")[0]).slice(-2);
                        }
                        var paramsObj = [];
                        var feelingsObj;
                        var states = "";
                        var feelings = "";
                        var includeAnonymous = 0;
                        var i = 0;

                        if ($scope.issue_id != "") {
                            var obj = {city: $rootScope.Variables.city_name, bug_id: $scope.issue_id};
                            $resource($rootScope.Variables.APIURL,
                                    {}, {
                                update: {
                                    method: 'GET'
                                }
                            }).query(obj, function (result) {
                                $scope.markers = [];
                                var issueid = result[0]._id;
                                var issuelink = "http://" + $rootScope.Variables.city_name + ".sense.city/scissuemap.html?issue=" + issueid;
                                var positionlat = result[0].loc.coordinates[1];
                                var positionlon = result[0].loc.coordinates[0];
                                var issue = result[0].issue;
                                var layer = issue;
                                var message = '';
                                if (result[0].value_desc) {
                                    message = result.value_desc;
                                } else {
                                    message = 'Μη διαθέσιμη περιγραφή';
                                }
                                var marker;
                                if (layer != 'reaction') {
                                    var lindex = $rootScope.Variables.overlay_categories.indexOf(issue) + 1;
                                } else {
                                    var lindex = $rootScope.Variables.overlay_categories.indexOf('reaction') + 1;
                                }
                                layer = "layer" + lindex;
                                if (issue == "angry" || issue == "neutral" || issue == "happy") {
                                    marker = {"layer": "" + layer + "", "lat": +positionlat, "lng": +positionlon, "icon": icons[issue], "issue_id": issueid, "message": "" + message + "<br>"};
                                } else {
                                    marker = {"layer": "" + layer + "", "lat": +positionlat, "lng": +positionlon, "icon": icons[issue], "issue_id": issueid, "message": "" + message + "<br><a href=" + issuelink + ">Δες με!</a>"};
                                }
                                if (layer != 'reaction') {
                                    marker.message = "Loading...";
                                }
                                $scope.markers.push(marker);
                            });
                        } else {
                            i = 0;
                            angular.forEach($scope.searchState, function (state) {
                                if (state != "Anonymous") {
                                    if (state != "Καταστάσεις") {
                                        if (i == 0) {
                                            states += state;
                                            i++;
                                        } else {
                                            states += " |" + state;
                                        }
                                    }
                                } else {
                                    includeAnonymous = 1;
                                }
                            });
                            var issue_counter = 0;
                            angular.forEach($scope.searchIssue, function (issue) {
                                if (issue == "roadconstructor") {
                                    issue = "road-constructor";
                                }
                                if (issue == "protectionpolicy") {
                                    issue = "protection-policy";
                                }
                                paramsObj.push({city: $rootScope.Variables.city_name, startdate: $scope.startdate, enddate: $scope.enddate, issue: issue, image_field: 0, status: states, includeAnonymous: includeAnonymous});
                            });
                            if ($scope.searchIssue == "" || $scope.searchIssue == undefined) {
                                paramsObj.push({city: $rootScope.Variables.city_name, startdate: $scope.startdate, enddate: $scope.enddate, image_field: 0, status: states, includeAnonymous: includeAnonymous});
                            }
                            i = 0;
                            angular.forEach($scope.searchFeeling, function (feeling) {
                                if (feeling != "Διάθεση πολιτών") {
                                    if (i == 0) {
                                        feelings += feeling;
                                        i++;
                                    } else {
                                        feelings += " |" + feeling;
                                    }
                                }
                            });
                            if (paramsObj.length == 0) {
                                if (states != "") {
                                    paramsObj.push({city: $rootScope.Variables.city_name, startdate: $scope.startdate, enddate: $scope.enddate, image_field: 0, status: states, includeAnonymous: includeAnonymous});
                                }
                            }

                            var promisesArray = [];

                            if (feelings != "") {
                                feelingsObj = {startdate: $scope.startdate, enddate: $scope.enddate, city: $rootScope.Variables.city_name, feeling: feelings};
                                promisesArray.push(feelingsQuery(feelingsObj));
                            }

                            for (index = 0; index < paramsObj.length; index++) {
                                promisesArray.push(doQuery(paramsObj[index]));
                            }

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
                                    var issuelink = "http://" + $rootScope.Variables.city_name + ".sense.city/scissuemap.html?issue=" + issueid;
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
                                    if (layer != 'reaction') {
                                        var lindex = $rootScope.Variables.overlay_categories.indexOf(issue) + 1;
                                    } else {
                                        var lindex = $rootScope.Variables.overlay_categories.indexOf('reaction') + 1;
                                    }
                                    layer = "layer" + lindex;
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
                        }
                    };
                    $scope.reset = function () {
                        var startdate = new Date();
                        startdate.setDate(startdate.getDate() - 30);
                        $scope.startISOdate = startdate;
                        $scope.endISOdate = new Date();
                        $scope.searchIssue = "";
                        $scope.searchState = "";
                        $scope.searchFeeling = "";
                        $scope.issue_id = "";
                        $scope.markers = [];
                        for (k = 0; k < $scope.issues.length; k++) {
                            $scope.issues[k].checked = false;
                        }
                        $scope.criteria_selected = true;
                        $scope.center = {
                            lat: $rootScope.Variables.lat_center,
                            lng: $rootScope.Variables.long_center,
                            zoom: $rootScope.Variables.map_zoom
                        };
                    };
                    function doQuery(obj) {
                        var d = $q.defer();
                        $resource($rootScope.Variables.APIURL,
                                {}, {
                            update: {
                                method: 'GET'
                            }
                        }).query(obj, function (result) {
                            d.resolve(result);
                        });
                        return d.promise;
                    }

                    function feelingsQuery(obj) {
                        var d = $q.defer();
                        $resource($rootScope.Variables.feelingsURL,
                                {}, {
                            update: {
                                method: 'GET'
                            }
                        }).query(obj, function (result) {
                            d.resolve(result);
                        });
                        return d.promise;
                    }
                    $(window).trigger("resize");
                });
    }]);