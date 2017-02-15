var app = angular.module('issuepage', ['adminapp']);

app.controller('issuepage_controller', ['$scope', '$rootScope', '$window', '$cookieStore', '$http', '$location','ToGrService', 'PriorityTag', 'SeverityTag','FixPoints2MapService', 'FixedPointsService', 'Tab2BugzillaService', 'FixPointsMarkerService', 'leafletData', function ($scope, $rootScope, $window, $cookieStore, $http, $location,ToGrService, PriorityTag, SeverityTag,FixPoints2MapService, FixedPointsService, Tab2BugzillaService, FixPointsMarkerService, leafletData) {

        var panorama;
        var isfixed = 0;
        var small = 0;
        var panel;
        $scope.full = 0;

        var issue_id = $location.$$url.replace('/issuepage=', '');

        $scope.logout = function ($event) {
            $http.get($rootScope.Variables.host + '/api/1.0/logout', {headers: {'x-uuid': $cookieStore.get("uuid")}}).success(function (response) {
                $cookieStore.remove("uuid");
                $cookieStore.remove("city");
                $cookieStore.remove("role");
                $cookieStore.remove("department");
                $cookieStore.remove("email");
                $cookieStore.remove("username");
                $cookieStore.remove("bug_token");
                window.location = "index.html";
            });
        };

        $scope.initialize = function () {

            // var fenway = {lat: 38.246453, lng: 21.735068};             
            var fenway = {lat: 38.27942654793131, lng: 21.76288604736328};
            var panoOptions = {
                position: fenway,
                addressControlOptions: {
                    position: google.maps.ControlPosition.BOTTOM_CENTER
                },
                linksControl: false,
                panControl: false,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL
                },
                enableCloseButton: false
            };
            panorama = new google.maps.StreetViewPanorama(
                    document.getElementById('smap'), panoOptions);
            
            $(window).resize(function () {

                google.maps.event.trigger(panorama, "resize");
            });
        };

        $(window).on('resize', function () {
            if ($(document).width() <= 992) {
                small = 1;
                isfixed = 0;
                $("#right-column").removeAttr('style');
            } else {
                var bottom = $('.xn-profile').position().top;
                var outerHeight = $('.xn-profile').height();
                if (small == 1 && $(window).scrollTop() > bottom + outerHeight) {
                    if ($(window).scrollTop() > bottom + outerHeight && $(window).width() >= 992) {
                        if (isfixed == 0) {
                            $("#right-column").css({position: 'fixed', top: '4%', width: $("#right-column").width()});
                        }
                    } else {
                        $("#right-column").removeAttr('style');
                    }
                    small = 0;
                } else if (small == 1 && $(window).scrollTop() <= bottom + outerHeight) {
                    small = 0;
                }
            }
        });

        function authorizedu() {
            if ($cookieStore.get("uuid") !== undefined) {
                $scope.valid = true;
            } else {
                $scope.valid = false;
            }
        }

        function username() {
            $scope.usrname = $cookieStore.get("username");
        }

        function userole() {
            $scope.usrrole = $cookieStore.get("role");
        }

        $scope.check_panorama = function (coords) {
            if (coords == "ncoords") {
                return true;
            } else {
                return false;
            }
        };

        function checkNearestStreetView(panoData) {

            var issue_index = $rootScope.Variables.departments.indexOf($scope.panels[strvcounter].issue);
            var issueMarker = new google.maps.Marker({
                position: panoData.location.latLng,
                map: panorama,
                icon: './icons/' + $scope.panels[strvcounter].issue + '.png',
                title: $rootScope.Variables.departments_en[issue_index],
                visible: true
            });
            var category_index = $rootScope.Variables.departments_en.indexOf(issueMarker.title);
            issueMarker.info = new google.maps.InfoWindow({
                content: $scope.panels[strvcounter].value_desc
            });
            google.maps.event.addListener(issueMarker, 'click', function () {
                issueMarker.info.open(panorama, issueMarker);
            });
            $scope.street_view_marker = issueMarker;
//        var issue_coords = new google.maps.LatLng($scope.panels[strvcounter].lat, $scope.panels[strvcounter].lng);
//                var webService = new google.maps.StreetViewService();
//                webService.getPanoramaByLocation(issue_coords, 200, checkNearestStreetView);
        }

        authorizedu();
        username();
        userole();

        $scope.removeFixed = function () {
            if ($scope.full == 0) {
                isfixed = 1;
                $("#right-column").removeAttr('style');
                $scope.full = 1;
            } else {
                isfixed = 0;
                var bottom = $('.xn-profile').position().top;
                var outerHeight = $('.xn-profile').height();
                if ($(window).scrollTop() > bottom + outerHeight && $(window).width() >= 992) {
                    if (isfixed == 0) {
                        $("#right-column").css({position: 'fixed', top: '4%', width: $("#right-column").width()});
                    }
                } else {
                    $("#right-column").removeAttr('style');
                }
                $scope.full = 0;
            }
        };
        $scope.removeFixeds = function () {
            if ($scope.currentactive != -1) {
                if ($scope.full == 0) {
                    $scope.street = 1;
                    isfixed = 1;
                    $("#right-column").removeAttr('style');
                    $(window).resize();
                    $scope.full = 1;
                } else {
                    $scope.street = 0;
                    isfixed = 0;
                    var bottom = $('.xn-profile').position().top;
                    var outerHeight = $('.xn-profile').height();
                    if ($(window).scrollTop() > bottom + outerHeight && $(window).width() >= 992) {
                        if (isfixed == 0) {

                            $("#right-column").css({position: 'fixed', top: '4%', width: $("#right-column").width()});
                        }
                    } else {
                        $("#right-column").removeAttr('style');
                    }
                    $scope.full = 0;
                }
            }
        };
        $scope.city = $cookieStore.get("city");
        function timegr(local_time) {
            var temp_time = local_time.split(",");
            switch (temp_time[0]) {
                case "Monday":
                    local_time = "Δευ,";
                    break;
                case "Tuesday":
                    local_time = "Τρ,";
                    break;
                case "Wednesday":
                    local_time = "Τετ,";
                    break;
                case "Thursday":
                    local_time = "Πεμ,";
                    break;
                case "Friday":
                    local_time = "Παρ,";
                    break;
                case "Saturday":
                    local_time = "Σαβ,";
                    break;
                case "Sunday":
                    local_time = "Κυρ,";
                    break;
            }
            switch (temp_time[1].split(" ")[1]) {
                case "January":
                    local_time += temp_time[1].replace("January", "Ιαν") + ",";
                    break;
                case "February":
                    local_time += temp_time[1].replace("February", "Φεβ") + ",";
                    break;
                case "March":
                    local_time += temp_time[1].replace("March", "Μαρ") + ",";
                    break;
                case "April":
                    local_time += temp_time[1].replace("April", "Απρ") + ",";
                    break;
                case "May":
                    local_time += temp_time[1].replace("May", "Μάης") + ",";
                    break;
                case "June":
                    local_time += temp_time[1].replace("June", "Ιουν") + ",";
                    break;
                case "July":
                    local_time += temp_time[1].replace("July", "Ιουλ") + ",";
                    break;
                case "August":
                    local_time += temp_time[1].replace("August", "Αυγ") + ",";
                    break;
                case "September":
                    local_time += temp_time[1].replace("September", "Σεπ") + ",";
                    break;
                case "October":
                    local_time += temp_time[1].replace("October", "Οκτ") + ",";
                    break;
                case "November":
                    local_time += temp_time[1].replace("November", "Νοε") + ",";
                    break;
                case "December":
                    local_time += temp_time[1].replace("December", "Δεκ") + ",";
                    break;
            }
            switch (temp_time[2].substring(temp_time[2].length - 2)) {
                case "AM":
                    local_time += temp_time[2].replace("AM", "ΠΜ");
                    break;
                case "PM":
                    local_time += temp_time[2].replace("PM", "ΜΜ");
                    break;
            }
            return local_time;
        }

        var map = leafletData.getMap("issuesmap").then(
                function (map) {
                    map.invalidateSize(true);
                }

        );

        if ($scope.valid) {
            $scope.issue_data = function ($index, panel, event) {
                var sparams = {"id": issue_id};
                $http.get($rootScope.Variables.APIURL, sparams, {headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).success(function (result) {
                    $window.alert("mphke");
                    var priority = PriorityTag.priority_type(result[0].priority);
                    var severity = SeverityTag.severity_type(result[0].severity);
                    var panelTitle = ToGrService.statusTitle(result[0].status, result[0].resolution);
                    $scope.panels[panel.order].status = panelTitle.status;
                    $scope.panels[panel.order].resolution = panelTitle.resolution;
                    $scope.panels[panel.order].email = result[0].cf_email;
                    $scope.panels[panel.order].tel = result[0].cf_mobile;
                    $scope.panels[panel.order].creator = result[0].cf_creator;
                    $scope.panels[panel.order].component = result[0].component;
                    $scope.panels[panel.order].severity = {en: result[0].severity, gr: severity};
                    $scope.panels[panel.order].priority = {en: result[0].priority, gr: priority};

                    var panel = {
                        "title": "#" + value.bug_id + " (" + issue_name + "-" + value.value_desc + ") -- " + time_fromNow,
                        "style": panelTitle.status_style,
                        "issuenameGR": issue_name,
                        "issuenameEN": value.issue,
                        "icon": panelTitle.status_icon,
                        "time": local_time,
                        "status": value.status,
                        "admin": false,
                        "ArrayID": key,
                        "order": counter,
                        "mongoId": value._id,
                        "id": value.bug_id,
                        "issue": value.issue,
                        "value_desc": value.value_desc
                    };
                });
                $http.post($rootScope.Variables.host + '/api/1.0/admin/bugs/comment', {id: panel.id}, {headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).success(
                        function (response, status, headers, config) {
                            var history = [];
                            var com;
                            var tag_pos;
                            for (var i = 1; i < response.bugs[Object.keys(response.bugs)[0]].comments.length; i++) {
                                com = response.bugs[Object.keys(response.bugs)[0]].comments[i].text;
                                if (com == "undefined") {
                                    com = "";
                                }
                                if (com.substring(0, 7) == "*** Bug") {
                                    com = "";
                                }

                                switch (response.bugs[Object.keys(response.bugs)[0]].comments[i].tags[0]) {
                                    case "CONFIRMED":
                                    case "IN_PROGRESS":
                                    case "RESOLVED":
                                        tag_pos = 0;
                                        break;
                                    default:
                                        tag_pos = 1;
                                        break;
                                }

                                if (response.bugs[Object.keys(response.bugs)[0]].comments[i] != []) {
                                    var htime = timegr(moment(response.bugs[Object.keys(response.bugs)[0]].comments[i].time).format('LLLL'));
                                    if (response.bugs[Object.keys(response.bugs)[0]].comments[i].tags[tag_pos] == "CONFIRMED") {
                                        history.push({"text": com, "timestamp": htime, "state": "Ανοιχτό", "style": {'color': '#e42c2c'}, "class": 'glyphicon glyphicon-exclamation-sign'});
                                    } else if (response.bugs[Object.keys(response.bugs)[0]].comments[i].tags[tag_pos] == "IN_PROGRESS") {
                                        history.push({"text": com, "timestamp": htime, "state": "Σε εκτέλεση", "style": {'color': 'orange'}, "class": 'glyphicon glyphicon-question-sign'});
                                    } else {
                                        history.push({"text": com, "timestamp": htime, "state": "Ολοκληρωμένο", "style": {'color': 'green'}, "class": 'glyphicon glyphicon-ok-sign'});
                                    }
                                }
                            }

                            if (panel.comment == undefined) {
                                panel.comment = '';
                            }
                            $scope.panels[panel.order].history = history;
                            $scope.panels[panel.order].comment = com;
                            $scope.itemClicked($index, event);
                            $scope.linkmap(panel);
                            $scope.nloaded = false;
                        });
                Issue2MapService.query({issueID: panel.mongoId}, function (issue) {

                    if (issue[0] != undefined) {
                        if (issue[0].image_name != "" && issue[0].image_name != "no-image") {
                            $scope.image_width = "100%";
                            $scope.panels[panel.order].image = "";
                            $scope.pclass = "";
                            $scope.panels[panel.order].image = issue[0].image_name;
                        } else {
                            $scope.image_width = "60%";
                            $scope.panels[panel.order].image = "";
                            $scope.pclass = "";
                            $scope.panels[panel.order].image = issue[0].image_name;
                            $scope.pclass = "fa fa-" + $rootScope.Variables.icons[issue[0].issue].icon;
                        }
                        $scope.pimage = $scope.panels[panel.order].image;
                        $scope.panels[panel.order].lat = issue[0].loc.coordinates[1];
                        $scope.panels[panel.order].lng = issue[0].loc.coordinates[0];
                        $scope.center = {lat: issue[0].loc.coordinates[1], lng: issue[0].loc.coordinates[0], zoom: 17};
                        $scope.ALLmarkers.push({"lat": issue[0].loc.coordinates[1], "lng": issue[0].loc.coordinates[0], "icon": icons[panel.issue], "panelid": panel.ArrayID});
                    }
                    if ($scope.street_view_markers[panel.order] != "ncoords") {
                        panorama.setPosition($scope.street_view_marker.position);
                    }
                });
            };
            $scope.ALLcenter = $rootScope.Variables.center;
            $scope.ALLmarkers = [];
            $scope.defaults = {
                scrollWheelZoom: false
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
            var redMarker = {
                type: 'awesomeMarker',
                icon: 'info-circle',
                prefix: 'fa',
                markerColor: 'red'
            };
            var layers_ref;
            var markersGarbage;
            var markersLightning;
            var icons = $rootScope.Variables.icons;
            var displayFixedPoints = function () {

                $scope.buildings_view = function () {
                    if ($scope.currentactive != -1) {
                        $window.open("https://www.google.gr/maps/@" + panel.lat + "," + panel.lng + ",200a,20y,41.27t/data=!3m1!1e3?hl=en");
                    }
                };

                $scope.fixedmarkersGarbage = [];
                $scope.fixedmarkersLightning = [];
                var i = 0;
                var theFixedPoints = FixedPointsService.query(function () {
                    angular.forEach(theFixedPoints, function (fixedpoint, key) {
                        var positionlat = fixedpoint.loc.coordinates[1];
                        var positionlon = fixedpoint.loc.coordinates[0];
                        i++;
                        if (fixedpoint.type === 'garbage') {
                            var garbageIcon = 'cyanGarbageBin';
                            var titlenote = "κάδος ανακύκλωσης";
                            if (fixedpoint.notes[0].ANAKIKLOSI == '0') {
                                garbageIcon = 'greenGarbageBin';
                                titlenote = "κάδος σκουπιδιών";
                            }

                            var marker = new L.marker([positionlat, positionlon], {
                                icon: L.ExtraMarkers.icon(icons[garbageIcon]),
                                title: titlenote
                            });
                            $scope.fixedmarkersGarbage.push(marker);
                        }

                        if (fixedpoint.type === 'fotistiko') {
                            var fixedLIcon = 'fixedLightning'
                            var titlenote = "φωτιστικό στοιχείο";
                            var marker = new L.marker([positionlat, positionlon], {
                                icon: L.ExtraMarkers.icon(icons[fixedLIcon]),
                                title: titlenote
                            });
                            $scope.fixedmarkersLightning.push(marker);
                        }

                    });
                    markersGarbage = L.markerClusterGroup({
                        name: 'Κάδοι',
                        visible: true,
                        disableClusteringAtZoom: 19,
                        animateAddingMarkers: false,
                        spiderfyDistanceMultiplier: true,
                        singleMarkerMode: false,
                        showCoverageOnHover: true,
                        chunkedLoading: true
                    });
                    markersGarbage.addLayers($scope.fixedmarkersGarbage);
                        leafletData.getMap("issuesmap").then(function (map) {
                            map.addLayer(markersGarbage);
                        });
                    markersLightning = L.markerClusterGroup({
                        name: 'Φωτισμός',
                        visible: true,
                        disableClusteringAtZoom: 19,
                        animateAddingMarkers: false,
                        spiderfyDistanceMultiplier: true,
                        singleMarkerMode: false,
                        showCoverageOnHover: true,
                        chunkedLoading: true
                    });
                    markersLightning.addLayers($scope.fixedmarkersLightning);
                        leafletData.getMap("issuesmap").then(function (map) {
                            map.addLayer(markersLightning);
                        });
                    var baseLayers = {
                        //'Open Street Map': osmLayer,
                        //'Google Maps':googleRoadmap,
                        //'Google Maps Satellite':googleHybrid,
                        //'Google Maps Traffic':googleTraffic
                    };
                    var overlays = {
                        "<i class='fa fa-trash-o  fa-2x'></i>&nbsp;<span style='align:left'>Κάδοι σκουπιδιών</span>": markersGarbage,
                        "<i class='fa fa-lightbulb-o fa-2x'></i>&nbsp;<span style='align:left'>Φωτισμός</span>": markersLightning
                    };
                        leafletData.getMap("issuesmap").then(function (map) {
                            L.control.layers(baseLayers, overlays).addTo(map);
                            map.invalidateSize(true);
                        });
                });
            };

            displayFixedPoints();

            $scope.admin = function (panel) {

                $scope.selectedStatus = null;
                $scope.selectedResolution = null;
                panel.admin = true;
                $scope.statuses = [{"gr": "Ανοιχτό", "en": "CONFIRMED"}, {"gr": "Σε εκτέλεση", "en": "IN_PROGRESS"}, {"gr": "Ολοκληρωμένο", "en": "RESOLVED"}];
                $scope.sresolved = [{"gr": "Ανοιχτό", "en": "CONFIRMED"}, {"gr": "Ολοκληρωμένο", "en": "RESOLVED"}];
                $scope.resolutions = [{"gr": "Αποκατάσταση", "en": "FIXED"}, {"gr": "Εσφαλμένη Αναφορά", "en": "INVALID"}, {"gr": "Μη αποκατάσταση / Απόρριψη από Δήμο", "en": "WONTFIX"}, {"gr": "Έχει ήδη αναφερθεί σε άλλο αίτημα", "en": "DUPLICATE"}];
                $scope.priorities = ["Υψηλή", "Κανονική", "Χαμηλή"];
                $scope.severities = ["Κρίσιμο", "Μείζον", "Κανονικό", "Ελάσσον", "Μηδαμινό", "Βελτίωση"];
                $scope.components = $rootScope.Variables.components;
                $scope.selectedComponent = panel.component;
                $scope.selectedPriority = {en: panel.priority.en, gr: panel.priority.gr};
                $scope.selectedSeverity = {en: panel.severity.en, gr: panel.severity.gr};
                $scope.selectedResolution = {en: panel.resolution.en, gr: panel.resolution.gr};
                $scope.selectedStatus = panel.status;
                $scope.comment = panel.comment;
                $scope.duplicof = panel.duplicof;
               //$scope.duplicof = panel;


                if (panel.resolution.gr !== undefined)
                {
                    $scope.selectedResolution = {"en": panel.resolution.en, "gr": panel.resolution.gr};
                } else {
                    $scope.selectedResolution = {"en": "FIXED", "gr": "Αποκατάσταση"};
                }
            };

            $scope.initResetPanel = function (panel) {
                $scope.selectedStatus = null;
                $scope.selectedResolution = null;
            };

            $scope.resetPanel = function (panel) {
                panel.admin = false;
                $scope.selectedStatus = null;
                $scope.selectedResolution = null;
                $scope.comment = null;
            };

            $scope.submit = function (panel, seldstatus, seldResolution, seldcomment, seldcomponent, seldpriority, seldseverity, e) {
                $scope.pimage = "";
                $scope.pclass = "";
                if ($cookieStore.get("uuid") != undefined) {
                    panel.status = seldstatus;
                    panel.priority.en = PriorityTagEn.priority_type(panel.priority.gr);
                    panel.severity.en = SeverityTagEn.severity_type(panel.severity.gr);
                    panel.resolution.en = ResolutionTagEn.resolution_type(panel.resolution.gr);
                    if (panel.status.en == "RESOLVED")
                    {
                        panel.resolution = seldResolution;
                    } else
                    {
                        panel.resolution = {"en": ""};
                    }
                    panel.comment = seldcomment;
                    panel.component = seldcomponent;
                    panel.admin = false;
                    function update() {
                        var obj;
                        if (panel.status.en == "RESOLVED")
                        {
                            if (panel.resolution.en == "DUPLICATE") {
                                obj = {"ids": [panel.id], "status": panel.status.en, "product": $cookieStore.get("city"), "component": panel.component, "resolution": panel.resolution.en, "dupe_of": $scope.duplicof, "priority": panel.priority.en, "severity": panel.severity.en, "reset_assigned_to": true};
                            } else {
                                obj = {"ids": [panel.id], "status": panel.status.en, "product": $cookieStore.get("city"), "component": panel.component, "priority": panel.priority.en, "severity": panel.severity.en, "reset_assigned_to": true};
                            }
                        } else {
                            obj = {"ids": [panel.id], "status": panel.status.en, "product": $cookieStore.get("city"), "component": panel.component, "priority": panel.priority.en, "severity": panel.severity.en, "reset_assigned_to": true};
                        }
                        if (panel.status.en == "RESOLVED")
                        {
                            obj.resolution = panel.resolution.en;
                        }
                        if (panel.status.en == "CONFIRMED") {
                            $scope.comment = "undefined";
                            panel.comment = "undefined";
                        }

                        $http.post($rootScope.Variables.host + '/api/1.0/admin/bugs/update', obj, {headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).success(function (result) {

                            $http.post($rootScope.Variables.host + '/api/1.0/admin/bugs/comment/add', {"comment": $scope.comment, "id": obj.ids[0]}, {headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).success(
                                    function (response, status, headers, conf) {
                                        var panel_index = $rootScope.Variables.components.indexOf(panel.component);
                                        var comp = $rootScope.Variables.components_en[panel_index];
                                        $http.post($rootScope.Variables.host + '/api/1.0/admin/bugs/comment/tags', {"add": [panel.status.en, comp], "id": response.id}, {headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).success(
                                                function (response, status, headers, config) {
                                                });
                                    });
                            var panelTitle = ToGrService.statusTitle(seldstatus.en, seldResolution.en);
                            panel.style = panelTitle.status_style;
                            panel.icon = panelTitle.status_icon;
                        });
                    }
                    if ($scope.selectedStatus.gr == 'Ανοιχτό') {
                        if ($scope.selectedStatus.gr != panel.status.gr) {
                            panel.priority = {en: PriorityTagEn.priority_type(seldpriority.gr), gr: seldpriority.gr};
                            panel.severity = {en: SeverityTagEn.severity_type(seldseverity.gr), gr: seldseverity.gr};
                            panel.resolution = {en: ResolutionTagEn.resolution_type(seldResolution.gr), gr: seldResolution.gr};
                            if (panel.comment == undefined || panel.comment == "") {
                                panel.comment = "undefined";
                            }
                            if ($scope.comment == "") {
                                $scope.comment = "undefined";
                            }
                            $scope.comment = panel.comment;
                            update();
                            if ((panel.status.gr == 'Σε εκτέλεση' && panel.component != $scope.selectedComponent && $scope.assignissues == false && $scope.allclosedissues == false) || (panel.status.gr == 'Ολοκληρωμένο' && (($scope.closedissues == false && $scope.allclosedissues == false) || ($scope.closedissues == true && panel.component != $scope.component)))) {
                                setTimeout(function () {
                                    $(e.target).closest(".timeline-item-active").remove();
                                    $scope.activePanel = -1;
                                    $scope.currentactive = -1;
                                }, 3000);
                            }
                            $scope.selectedStatus = panel.status;
                            $scope.component = panel.component;
                            panel.priority = seldpriority;
                            panel.severity = seldseverity;
                        }
                    } else if ($scope.selectedStatus.gr == 'Σε εκτέλεση') {
                        if (panel.comment == undefined || panel.comment == "") {
                            panel.comment = "undefined";
                        }
                        if ($scope.comment == "") {
                            $scope.comment = "undefined";
                        }
                        if ($scope.selectedStatus.gr != panel.status.gr || $scope.selectedComponent != panel.component || panel.comment != $scope.comment || $scope.selectedPriority.gr != panel.priority.gr || $scope.selectedSeverity.gr != panel.severity.gr) {
                            $scope.comment = panel.comment;
                            panel.priority = {en: PriorityTagEn.priority_type(seldpriority.gr), gr: seldpriority.gr};
                            panel.severity = {en: SeverityTagEn.severity_type(seldseverity.gr), gr: seldseverity.gr};
                            panel.resolution = {en: ResolutionTagEn.resolution_type(seldResolution.gr), gr: seldResolution.gr};
                            if (panel.status == "Ανοιχτό") {
                                panel.comment = "undefined";
                                $scope.comment = panel.comment;
                            }
                            update();
                            if ((panel.status.gr == 'Σε εκτέλεση' && $scope.assignissues == false && panel.component != $scope.selectedComponent && $scope.allclosedissues == false) || (panel.status.gr == 'Ολοκληρωμένο' && (($scope.closedissues == false && $scope.allclosedissues == false) || ($scope.closedissues == true && panel.component != $scope.component)))) {
                                setTimeout(function () {
                                    $(e.target).closest(".timeline-item-active").remove();
                                    $scope.activePanel = -1;
                                    $scope.currentactive = -1;
                                }, 3000);
                            }
                            $scope.selectedStatus = panel.status;
                            $scope.selectedResolution = panel.resolution;
                        }
                    } else if ($scope.selectedStatus.gr == 'Ολοκληρωμένο') {
                        if (panel.comment == undefined || panel.comment == "") {
                            panel.comment = "undefined";
                        }
                        if (panel.status == "Ανοιχτό") {
                            panel.comment = "undefined";
                            $scope.comment = panel.comment;
                        }
                        if ($scope.selectedStatus.gr != panel.status.gr || $scope.selectedComponent != panel.component || panel.comment != $scope.comment || $scope.selectedResolution.en != panel.resolution.en || $scope.selectedResolution.gr != panel.resolution.gr || $scope.duplicof != panel.duplicof || $scope.selectedPriority.gr != panel.priority.gr || $scope.selectedSeverity.gr != panel.severity.gr) {
                            $scope.comment = panel.comment;
                            panel.priority = {en: PriorityTagEn.priority_type(seldpriority.gr), gr: seldpriority.gr};
                            panel.severity = {en: SeverityTagEn.severity_type(seldseverity.gr), gr: seldseverity.gr};
                            panel.resolution = {en: ResolutionTagEn.resolution_type(seldResolution.gr), gr: seldResolution.gr};
                            if (panel.status == "Ανοιχτό") {
                                panel.status = "undefined";
                                $scope.comment = panel.comment;
                            }
                            update();
                            if ((panel.status.gr == 'Σε εκτέλεση' && $scope.assignissues == false && panel.component != $scope.selectedComponent && $scope.allclosedissues == false) || (panel.status.gr == 'Ολοκληρωμένο' && (($scope.closedissues == false && $scope.allclosedissues == false) || ($scope.closedissues == true && panel.component != $scope.component)))) {
                                setTimeout(function () {
                                    $(e.target).closest(".timeline-item-active").remove();
                                    $scope.activePanel = -1;
                                    $scope.currentactive = -1;
                                }, 3000);
                            }
                            $scope.selectedStatus = panel.status;
                            $scope.selectedResolution = panel.resolution;
                        }
                    }

                } else {
                    $scope.valid = false;
                    $cookieStore.remove("uuid");
                    $cookieStore.remove("city");
                    $cookieStore.remove("role");
                    $cookieStore.remove("department");
                    $cookieStore.remove("email");
                    $cookieStore.remove("username");
                    $cookieStore.remove("bug_token");
                }
            };
        }
    }]);