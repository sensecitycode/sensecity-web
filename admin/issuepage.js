var app = angular.module('issuepage', ['adminapp']);

app.controller('issuepage_controller', ['$scope', '$rootScope', '$window', '$cookieStore', '$http', '$location', 'ToGrService', 'PriorityTag', 'SeverityTag','PriorityTagEn', 'SeverityTagEn', 'ResolutionTagEn', 'FixPoints2MapService', 'FixedPointsService', 'Tab2BugzillaService', 'FixPointsMarkerService', 'CommentService','leafletData', function ($scope, $rootScope, $window, $cookieStore, $http, $location, ToGrService, PriorityTag, SeverityTag,PriorityTagEn, SeverityTagEn, ResolutionTagEn, FixPoints2MapService, FixedPointsService, Tab2BugzillaService, FixPointsMarkerService, CommentService,leafletData) {
        
        var panorama;
        var isfixed = 0;
        var small = 0;
        var nav_toggle = 0;
        var icons = $rootScope.Variables.icons;
        $scope.panel;
        $scope.full = 0;
        $scope.street = 0;
        $scope.loaded = 0;
        $scope.ALLcenter = $rootScope.Variables.center;
        $scope.ALLmarkers = [];
        
        leafletData.getMap("issuesmap").then(
                        function (map) {
                          console.log(map);
                        });
        
        var issue_id = $location.$$url.replace('/issuepage=', '');
        $scope.link = $location.absUrl();

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
        
        $scope.signout_popup = function(){
        $("#mb-signout").attr("class", "message-box animated fadeIn open");
        }

        $scope.signout_popdown = function(){
        $("#mb-signout").attr("class", "message-box animated fadeIn");
        }
        
        $("html").removeClass("body-full-height");
        
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

//            $(window).resize(function () {
//                google.maps.event.trigger(panorama, "resize");
//            });
        };

//        $(window).on('resize', function () {
//            if ($(document).width() <= 992) {
//                small = 1;
//                isfixed = 0;
//                $("#right-column").removeAttr('style');
//            } else {
//                var bottom = $('.xn-profile').position().top;
//                var outerHeight = $('.xn-profile').height();
//                if (small == 1 && $(window).scrollTop() > bottom + outerHeight) {
//                    if ($(window).scrollTop() > bottom + outerHeight && $(window).width() >= 992) {
//                        if (isfixed == 0) {
//                            $("#right-column").css({position: 'fixed', top: '4%', width: $("#right-column").width()});
//                        }
//                    } else {
//                        $("#right-column").removeAttr('style');
//                    }
//                    small = 0;
//                } else if (small == 1 && $(window).scrollTop() <= bottom + outerHeight) {
//                    small = 0;
//                }
//            }
//        });

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
            if (panoData != null) {
                $scope.link_street = "http://" + $rootScope.Variables.city_name + ".sense.city/admin/index.html#/issuecoords="+panoData.location.latLng.lat()+","+panoData.location.latLng.lng();
//                var issue_index = $rootScope.Variables.departments.indexOf($scope.panel.issue);
//                var issueMarker = new google.maps.Marker({
//                    position: panoData.location.latLng,
//                    map: panorama,
//                    icon: './icons/' + $scope.panel.issue + '.png',
//                    title: $rootScope.Variables.departments_en[issue_index],
//                    visible: true
//                });
//                var category_index = $rootScope.Variables.departments_en.indexOf(issueMarker.title);
//                issueMarker.info = new google.maps.InfoWindow({
//                    content: $scope.panel.value_desc
//                });
//                google.maps.event.addListener(issueMarker, 'click', function () {
//                    issueMarker.info.open(panorama, issueMarker);
//                });
//                $scope.street_view_marker = issueMarker;

                //panorama.setPosition($scope.street_view_marker.position);
            } else {
                $scope.street_view_marker = "ncoords";
            }
        }

        authorizedu();
        username();
        userole();
        
        $scope.nav_toggle = function(){
            if(nav_toggle == 0){
                $(".x-navigation").first().attr("class", "x-navigation x-navigation-open");
                nav_toggle = 1;
            }else{
                $(".x-navigation.x-navigation-open").attr("class", "x-navigation");
                nav_toggle = 0
            }
        }
        
        $scope.removeFixed = function () {
            if ($scope.full == 0) {
                isfixed = 1;
                $("#right-column").removeAttr('style');
                $scope.full = 1;
                panel_fullscreen($(".panel"));
            var map = leafletData.getMap("issuesmap").then(
                    function (map) {
                        map.invalidateSize(true);
                    }

            );
            } else {
                isfixed = 0;
//                var bottom = $('.xn-profile').position().top;
//                var outerHeight = $('.xn-profile').height();
//                if ($(window).scrollTop() > bottom + outerHeight && $(window).width() >= 992) {
//                    if (isfixed == 0) {
//                        $("#right-column").css({position: 'fixed', top: '4%', width: $("#right-column").width()});
//                    }
//                } else {
//                    $("#right-column").removeAttr('style');
//                }
                $scope.full = 0;
                panel_fullscreen($(".panel"));
            var map = leafletData.getMap("issuesmap").then(
                    function (map) {
                        map.invalidateSize(true);
                    }

            );
            }
        };
        $scope.removeFixeds = function () {
            if ($scope.full == 0) {
                $scope.street = 1;
                isfixed = 1;
                $("#right-column").removeAttr('style');
                $scope.full = 1;
                panel_fullscreen($(".panel"));
                setTimeout(function(){
               google.maps.event.trigger(panorama, "resize");},1);
            } else {
                $scope.street = 0;
                isfixed = 0;
//                var bottom = $('.xn-profile').position().top;
//                var outerHeight = $('.xn-profile').height();
//                if ($(window).scrollTop() > bottom + outerHeight && $(window).width() >= 992) {
//                    if (isfixed == 0) {
//
//                        $("#right-column").css({position: 'fixed', top: '4%', width: $("#right-column").width()});
//                    }
//                } else {
//                    $("#right-column").removeAttr('style');
//                }
                $scope.full = 0;
                panel_fullscreen($(".panel"));
//                setTimeout(function(){leafletData.getMap("issuesmap").then(
//                    function (map) {
//                        $window.alert(map);
//                        map.invalidateSize(true);
//                    }
//
//            );},5000);
                
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


//        $(".panel-fullscreen").click( function () {
//
//            
//        });

        if ($scope.valid) {
            var sparams = {"city": $scope.city, "bug_id": issue_id, "image_field": 1};
            $http.get($rootScope.Variables.APIADMIN+"/admin/issue", {params: sparams, headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).success(function (result) {
                var issue_name = ToGrService.issueName(result[0].issue);
                var panelTitle = ToGrService.statusTitle(result[0].status, result[0].resolution);
                var description = CommentService.field(result[0].status);
                var id = result[0].id;
                var priority = PriorityTag.priority_type(result[0].bug_priority);
                var severity = SeverityTag.severity_type(result[0].bug_severity);
                var panelTitle = ToGrService.statusTitle(result[0].status, result[0].resolution);
                var creation_time = result[0].create_at;
                var local_time = moment(creation_time).format('LLLL');
                local_time = timegr(local_time);
                var time_fromNow = moment(creation_time).fromNow();
                var activeIcon = "fa fa-" + $rootScope.Variables.icons[result[0].issue].icon;
                var status_gr;

                if( result[0].status == "CONFIRMED"){
                    status_gr = "Ανοιχτό";
                }else if(result[0].status == "IN_PROGRESS"){
                    status_gr = "Σε εκτέλεση";
                }else{
                    status_gr = "Ολοκληρωμένο";
                }
                $scope.panel = {
                    "title": "#" + result[0].bug_id + " (" + issue_name + "-" + result[0].value_desc + ") -- " + time_fromNow,
                    "style": panelTitle.status_style,
                    "issuenameGR": issue_name,
                    "issuenameEN": result[0].issue,
                    "icon": panelTitle.status_icon,
                    "time": local_time,
                    "status": { en:result[0].status, gr: status_gr},
                    "admin": false,
                    "mongoId": result[0]._id,
                    "id": result[0].bug_id,
                    "issue": result[0].issue,
                    "value_desc": result[0].value_desc,
                    "image_name": result[0].image_name,
                    "lat": result[0].loc.coordinates[1],
                    "lng": result[0].loc.coordinates[0],
                    "activeIcon": activeIcon
                };
                
                $cookieStore.put("desc",$scope.panel.value_desc);
                $cookieStore.put("issue",$scope.panel.issue);
                var issue_coords = new google.maps.LatLng($scope.panel.lat, $scope.panel.lng);
                var webService = new google.maps.StreetViewService();
                webService.getPanoramaByLocation(issue_coords, 200, checkNearestStreetView);
                
                $scope.ALLmarkers = [{"lat": $scope.panel.lat, "lng": $scope.panel.lng, "icon": icons[$scope.panel.issue]}];
                $scope.ALLcenter = {"lat": $scope.panel.lat, "lng": $scope.panel.lng, "zoom": 17};
                
                
                $scope.panel.component = result[0].bug_component;
                $scope.panel.resolution = panelTitle.resolution;
                $scope.panel.email = result[0].email;
                $scope.panel.tel = result[0].phone;
                $scope.panel.creator = result[0].name;

                $scope.panel.severity = {en: result[0].bug_severity, gr: severity};
                $scope.panel.priority = {en: result[0].bug_priority, gr: priority};

                setTimeout(function(){$(window).trigger('resize')},1000);

            $http.post($rootScope.Variables.host + '/api/1.0/admin/bugs/comment', {id: $scope.panel.id}, {headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).success(
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

                        if ($scope.panel.comment == undefined) {
                            $scope.panel.comment = '';
                        }
                        $scope.panel.history = history;
                        $scope.panel.comment = com;

                    if ($scope.panel.image_name != "" && $scope.panel.image_name != "no-image") {
                        $scope.image_width = "100%";
                        $scope.panel.image = "";
                        $scope.pclass = "";
                        $scope.panel.image = $scope.panel.image_name;
                    } else {
                        $scope.image_width = "60%";
                        $scope.panel.image = "";
                        $scope.pclass = "";
                        $scope.panel.image = $scope.panel.image_name;
                        $scope.pclass = "fa fa-" + $rootScope.Variables.icons[$scope.panel.issue].icon;
                    }
                    $scope.pimage = $scope.panel.image;
                    $scope.loaded = 1;
                    });
                    });

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

            var markersGarbage;
            var markersLightning;
            var displayFixedPoints = function () {
                
                $scope.buildings_view = function () {
                        $window.open("https://www.google.gr/maps/@" + $scope.panel.lat + "," + $scope.panel.lng + ",200a,20y,41.27t/data=!3m1!1e3?hl=en");
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

            $scope.admin = function () {

                $scope.selectedStatus = null;
                $scope.selectedResolution = null;
                $scope.panel.admin = true;
                $scope.statuses = [{"gr": "Ανοιχτό", "en": "CONFIRMED"}, {"gr": "Σε εκτέλεση", "en": "IN_PROGRESS"}, {"gr": "Ολοκληρωμένο", "en": "RESOLVED"}];
                $scope.sresolved = [{"gr": "Ανοιχτό", "en": "CONFIRMED"}, {"gr": "Ολοκληρωμένο", "en": "RESOLVED"}];
                $scope.resolutions = [{"gr": "Αποκατάσταση", "en": "FIXED"}, {"gr": "Εσφαλμένη Αναφορά", "en": "INVALID"}, {"gr": "Μη αποκατάσταση / Απόρριψη από Δήμο", "en": "WONTFIX"}, {"gr": "Έχει ήδη αναφερθεί σε άλλο αίτημα", "en": "DUPLICATE"}];
                $scope.priorities = ["Υψηλή", "Κανονική", "Χαμηλή"];
                $scope.severities = ["Κρίσιμο", "Μείζον", "Κανονικό", "Ελάσσον", "Μηδαμινό", "Βελτίωση"];
                $scope.components = $rootScope.Variables.components;
                $scope.selectedComponent = $scope.panel.component;
                $scope.selectedPriority = {en: $scope.panel.priority.en, gr: $scope.panel.priority.gr};
                $scope.selectedSeverity = {en: $scope.panel.severity.en, gr: $scope.panel.severity.gr};
                $scope.selectedResolution = {en: $scope.panel.resolution.en, gr: $scope.panel.resolution.gr};
                $scope.selectedStatus = $scope.panel.status;
                $scope.comment = $scope.panel.comment;
                $scope.duplicof = $scope.panel.duplicof;
                //$scope.duplicof = $scope.panel;


                if ($scope.panel.resolution.gr !== undefined)
                {
                    $scope.selectedResolution = {"en": $scope.panel.resolution.en, "gr": $scope.panel.resolution.gr};
                } else {
                    $scope.selectedResolution = {"en": "FIXED", "gr": "Αποκατάσταση"};
                }

            };

            $scope.initResetPanel = function (panel) {
                $scope.selectedStatus = null;
                $scope.selectedResolution = null;
            };

            $scope.resetPanel = function () {
                $scope.panel.admin = false;
                $scope.selectedStatus = null;
                $scope.selectedResolution = null;
                $scope.comment = null;
            };

            $scope.submit = function ( panel,seldstatus, seldResolution, seldcomment, seldcomponent, seldpriority, seldseverity, e) {
                $scope.pimage = "";
                $scope.pclass = "";
                if ($cookieStore.get("uuid") != undefined) {
                    
                    $scope.panel.admin = false;
                    function update() {
                        var obj;
                        if ($scope.panel.status.en == "RESOLVED")
                        {
                            if ($scope.panel.resolution.en == "DUPLICATE") {
                                obj = {"ids": [$scope.panel.id], "status": $scope.panel.status.en, "product": $cookieStore.get("city"), "component": $scope.panel.component, "resolution": $scope.panel.resolution.en, "dupe_of": $scope.duplicof, "priority": $scope.panel.priority.en, "severity": $scope.panel.severity.en, "reset_assigned_to": true};
                            } else {
                                obj = {"ids": [$scope.panel.id], "status": $scope.panel.status.en, "product": $cookieStore.get("city"), "component": $scope.panel.component, "priority": $scope.panel.priority.en, "severity": $scope.panel.severity.en, "reset_assigned_to": true};
                            }
                        } else {
                            
                            obj = {"ids": [$scope.panel.id], "status": $scope.panel.status.en, "product": $cookieStore.get("city"), "component": $scope.panel.component, "priority": $scope.panel.priority.en, "severity": $scope.panel.severity.en, "reset_assigned_to": true};
                        }
                        if ($scope.panel.status.en == "RESOLVED")
                        {
                            obj.resolution = $scope.panel.resolution.en;
                        }
                        if ($scope.panel.status.en == "CONFIRMED") {
                            $scope.comment = "undefined";
                            $scope.panel.comment = "undefined";
                        }
                        
                        $http.post($rootScope.Variables.host + '/api/1.0/admin/bugs/update', obj, {headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).success(function (result) {
                            $http.post($rootScope.Variables.host + '/api/1.0/admin/bugs/comment/add', {"comment": $scope.panel.comment, "id": obj.ids[0]}, {headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).success(
                                    function (response, status, headers, conf) {
                                        var panel_index = $rootScope.Variables.components.indexOf($scope.panel.component);
                                        var comp = $rootScope.Variables.components_en[panel_index];
                                        $http.post($rootScope.Variables.host + '/api/1.0/admin/bugs/comment/tags', {"add": [$scope.panel.status.en, comp], "id": response.id}, {headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).success(
                                                function (response, status, headers, config) {
                                                     setTimeout(function(){
                                     google.maps.event.trigger(panorama, "resize");},1);
                                                });
                                    });
                            var panelTitle = ToGrService.statusTitle(seldstatus.en, seldResolution.en);
                            $scope.panel.style = panelTitle.status_style;
                            $scope.panel.icon = panelTitle.status_icon;
                        });
                    }
                    if ($scope.selectedStatus.gr == 'Ανοιχτό') {
                        if ($scope.selectedStatus.gr != $scope.panel.status.gr) {
                            $scope.panel.priority = {en: PriorityTagEn.priority_type(seldpriority.gr), gr: seldpriority.gr};
                            $scope.panel.severity = {en: SeverityTagEn.severity_type(seldseverity.gr), gr: seldseverity.gr};
                            $scope.panel.resolution = {en: ResolutionTagEn.resolution_type(seldResolution.gr), gr: seldResolution.gr};
                            $scope.panel.status = $scope.selectedStatus;
                            $scope.panel.component = $scope.selectedComponent;
                            if ($scope.panel.status == "Ανοιχτό") {
                                $scope.panel.comment = "undefined";
                                $scope.comment = $scope.panel.comment;
                            }
                            update();
                            if (($scope.panel.status.gr == 'Σε εκτέλεση' && $scope.panel.component != $scope.selectedComponent && $scope.assignissues == false && $scope.allclosedissues == false) || ($scope.panel.status.gr == 'Ολοκληρωμένο' && (($scope.closedissues == false && $scope.allclosedissues == false) || ($scope.closedissues == true && $scope.panel.component != $scope.component)))) {
                                setTimeout(function () {
                                    $(e.target).closest(".timeline-item-active").remove();
                                    $scope.activePanel = -1;
                                    $scope.currentactive = -1;
                                }, 3000);
                            }
                        }
                    } else if ($scope.selectedStatus.gr == 'Σε εκτέλεση') {
                        if ($scope.panel.comment == undefined || $scope.panel.comment == "") {
                            $scope.panel.comment = "undefined";
                        }
                        if (seldcomment == "") {
                            seldcomment = "undefined";
                        }
                        if ($scope.selectedStatus.gr != $scope.panel.status.gr || $scope.selectedComponent != $scope.panel.component || $scope.panel.comment != seldcomment || $scope.selectedPriority.gr != $scope.panel.priority.gr || $scope.selectedSeverity.gr != $scope.panel.severity.gr) {
                            $scope.panel.comment = seldcomment;
                            $scope.panel.priority = {en: PriorityTagEn.priority_type(seldpriority.gr), gr: seldpriority.gr};
                            $scope.panel.severity = {en: SeverityTagEn.severity_type(seldseverity.gr), gr: seldseverity.gr};
                            $scope.panel.resolution = {en: ResolutionTagEn.resolution_type(seldResolution.gr), gr: seldResolution.gr};
                            $scope.panel.status = $scope.selectedStatus;
                            $scope.panel.component = $scope.selectedComponent;
                            if ($scope.panel.status == "Ανοιχτό") {
                                $scope.panel.comment = "undefined";
                                $scope.comment = $scope.panel.comment;
                            }
                            update();
                            if (($scope.panel.status.gr == 'Σε εκτέλεση' && $scope.assignissues == false && $scope.panel.component != $scope.selectedComponent && $scope.allclosedissues == false) || ($scope.panel.status.gr == 'Ολοκληρωμένο' && (($scope.closedissues == false && $scope.allclosedissues == false) || ($scope.closedissues == true && $scope.panel.component != $scope.component)))) {
                                setTimeout(function () {
                                    $(e.target).closest(".timeline-item-active").remove();
                                }, 3000);
                            }
//                            $scope.selectedStatus = $scope.panel.status;
//                            $scope.selectedResolution = $scope.panel.resolution;
                        }
                    } else if ($scope.selectedStatus.gr == 'Ολοκληρωμένο') {
                        if ($scope.panel.comment == undefined || $scope.panel.comment == "") {
                            $scope.panel.comment = "undefined";
                        }
                        if (seldcomment == "") {
                            seldcomment = "undefined";
                        }
                        if ($scope.panel.status == "Ανοιχτό") {
                            $scope.panel.comment = "undefined";
                            seldcomment = $scope.panel.comment;
                        }

//                        $window.alert( $scope.selectedResolution.en);
//                        $window.alert($scope.panel.resolution.en);
//                        $window.alert($scope.selectedStatus.gr);
//                        $window.alert($scope.panel.status.gr);
//                        $window.alert($scope.selectedComponent);
//                        $window.alert($scope.panel.component);
//                        $window.alert($scope.panel.comment);
//                        $window.alert(seldcomment);
//                        $window.alert($scope.selectedPriority.gr);
//                        $window.alert($scope.panel.priority.gr);
//                        $window.alert($scope.selectedSeverity.gr);
//                        $window.alert($scope.panel.severity.gr);
                        if ($scope.selectedStatus.gr != $scope.panel.status.gr || $scope.selectedComponent != $scope.panel.component || $scope.panel.comment != seldcomment || $scope.selectedResolution.en != $scope.panel.resolution.en || $scope.selectedResolution.gr != $scope.panel.resolution.gr || $scope.duplicof != $scope.panel.duplicof || $scope.selectedPriority.gr != $scope.panel.priority.gr || $scope.selectedSeverity.gr != $scope.panel.severity.gr) {
                            $scope.panel.comment = seldcomment;
                            $scope.panel.priority = {en: PriorityTagEn.priority_type(seldpriority.gr), gr: seldpriority.gr};
                            $scope.panel.severity = {en: SeverityTagEn.severity_type(seldseverity.gr), gr: seldseverity.gr};
                            $scope.panel.resolution = {en: ResolutionTagEn.resolution_type(seldResolution.gr), gr: seldResolution.gr};
                            $scope.panel.status = $scope.selectedStatus;
                            $scope.panel.component = $scope.selectedComponent;
                            if ($scope.panel.status == "Ανοιχτό") {
                                $scope.panel.comment = "undefined";
                                $scope.comment = $scope.panel.comment;
                            }
                            update();
                            if (($scope.panel.status.gr == 'Σε εκτέλεση' && $scope.assignissues == false && $scope.panel.component != $scope.selectedComponent && $scope.allclosedissues == false) || ($scope.panel.status.gr == 'Ολοκληρωμένο' && (($scope.closedissues == false && $scope.allclosedissues == false) || ($scope.closedissues == true && $scope.panel.component != $scope.component)))) {
                                setTimeout(function () {
                                    $(e.target).closest(".timeline-item-active").remove();
                                }, 3000);
                            }
//                            $scope.selectedStatus = $scope.panel.status;
//                            $scope.selectedResolution = $scope.panel.resolution;
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
            //$(window).resize("px");
        }
    }]);