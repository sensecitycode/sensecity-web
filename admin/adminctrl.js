var appControllers = angular.module('adminapp.adminctrl', ['ngCookies', 'ngSanitize', 'ngCsv', '720kb.tooltips', 'adminapp', 'monospaced.qrcode'])
        .constant("config", {"host": "api.sense.city", "bugzilla_host": "nam.ece.upatras.gr", "port": "4000", "bugzilla_path": "/bugzilla"});
//appControllers.config([
//  '$httpProvider',
//  function($httpProvider) {
//    $httpProvider.defaults.withCredentials = true;
//  }]);

var search_button = 0;

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

appControllers.controller('printsearch', ['$scope', '$rootScope', '$window', '$http', '$cookieStore', function ($scope, $rootScope, $window, $http, $cookieStore) {
        var sparams = {};
        $scope.nload = true;
        if ($rootScope.assignissues != undefined) {
            if (search_button == 0) {
                if ($cookieStore.get("role") == "cityAdmin" || $cookieStore.get("department") == "sensecityAdmin") {
                    sparams.status = "CONFIRMED|IN_PROGRESS";
                } else if ($cookieStore.get("department") == "departmentAdmin" || $cookieStore.get("department") == "departmentUser") {
                    sparams.status = "IN_PROGRESS";
                }
                if (($rootScope.assignissues == false || $rootScope.closedissues == true) && $rootScope.allclosedissues == false) {
                    sparams = {"departments": $rootScope.component, "image_field": "1", "sort": "-1", "startdate": "2016-08-01"};
                } else {
                    sparams = {"departments": $rootScope.Variables.components.join("|"), "image_field": "1", "sort": "-1", "startdate": "2016-08-01"};
                }

                if (($rootScope.closedissues == false && $rootScope.allclosedissues == false) || $rootScope.assignissues == true)
                {
                    if ($cookieStore.get("role") == "cityAdmin" || $cookieStore.get("role") == "sensecityAdmin") {
                        sparams.status = "CONFIRMED|IN_PROGRESS";
                    } else if ($cookieStore.get("department") == "departmentAdmin" || $cookieStore.get("department") == "departmentUser") {
                        sparams.status = "IN_PROGRESS";
                    }
                } else {
                    if ($cookieStore.get("role") == "departmentAdmin" || $cookieStore.get("role") == "departmentUser") {
                        sparams.status = "IN_PROGRESS|RESOLVED";
                    } else if ($cookieStore.get("role") == "cityAdmin" || $cookieStore.get("role") == "sensecityAdmin") {
                        sparams.status = "CONFIRMED|IN_PROGRESS|RESOLVED";
                    }
                }
                sparams.city = $cookieStore.get("city");
                sparams.send_user = "1";
                $http.get($rootScope.Variables.host + '/api/1.0/admin/issue', {params: sparams, headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).success(function (result) {
                    $scope.printres = [];
                    for (var i = 0; i < result.length; i++) {
                        var creation_time = result[i].create_at;
                        var local_time = moment(creation_time).format("DD/MM/YYYY");
                       // local_time = timegr(local_time);
                        var cprint = {
                          "create_at" : local_time,
                          "bug_id": result[i].bug_id,
                          "email": result[i].email,
                          "phone": result[i].phone,
                          "address": result[i].bug_address,
                          "image_name": result[i].image_name,
                          "qr_link": result[i].municipality+".sense.city/scissuemap.html?issue="+result[i]._id
                        };
                        $scope.printres.push(cprint);
                    }
                    $scope.nload = false;
                });
            } else {
                var searchparams = {};
                searchparams.bug_id = $rootScope.sbugid;
                searchparams.email = $rootScope.semail;
                searchparams.mobile = $rootScope.smobile;
                searchparams.city = $rootScope.Variables.city_name;
                searchparams.image_field = "1";
                searchparams.send_user = "1";
                $http.get($rootScope.Variables.host + '/api/1.0/admin/issue', {params: searchparams, headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).success(function (result) {
                    $scope.printres = [];
                    for (var i = 0; i < result.length; i++) {
                        var creation_time = result[i].create_at;
                        var local_time = moment(creation_time).format("DD/MM/YYYY");
                        //local_time = timegr(local_time);
                        var cprint = {
                          "create_at" : local_time,
                          "bug_id": result[i].bug_id,
//                          "bug_component": result[i].bug_component,
                          "email": result[i].email,
                          "phone": result[i].phone,
                          "address": result[i].bug_address,
                          "image_name": result[i].image_name,
                          "qr_link": result[i].municipality+".sense.city/scissuemap.html?issue="+result[i]._id
                        };
                        $scope.printres.push(cprint);
                    }
                    $scope.nload = false;
                });
            }
        }
    }]);

appControllers.controller('adminController', ['$scope', '$rootScope', '$window', '$http', '$cookieStore', '$templateCache', '$compile', '$location', '$q', 'EndPointService', 'BugService', 'ToGrService', 'PriorityTag', 'SeverityTag', 'PriorityTagEn', 'SeverityTagEn', 'ResolutionTagEn', 'CommentService', 'Issue2MapService', 'FixPoints2MapService', 'FixedPointsService', 'Tab2BugzillaService', 'FixPointsMarkerService', 'leafletData', 'config', function ($scope, $rootScope, $window, $http, $cookieStore, $templateCache, $compile, $location, $q, EndPointService, BugService, ToGrService, PriorityTag, SeverityTag, PriorityTagEn, SeverityTagEn, ResolutionTagEn, CommentService, Issue2MapService, FixPoints2MapService, FixedPointsService, Tab2BugzillaService, FixPointsMarkerService, leafletData, config) {
        $("html").removeClass("body-full-height");
        $scope.$on('$routeChangeStart', function (next, last) {
            $(document).off("scroll");
            leafletData.getMap("issuesmap").then(
                    function (map) {
                        map.removeLayer(markersGarbage);
                        map.removeLayer(markersLightning);
                    });
        });
        var summary;
        var params;
        var tabchanged = 2;
        var init = 1;
        //var issue_index;
        var nav_toggle = 0;
        var isfixed = 0;
        var mapnloaded = true;
        //var small = 0;
        //var current_layer = 0;
        // var strvcounter = 0;
        var sreset = 0;
        var total_counter;
        var issues_Array = [{id: "Κωδικός Προβλήματος", department: "Τμήμα Ανάθεσης Προβλήματος", description: "Περιγραφή Προβλήματος", address: "Διεύθυνση",state: "Κατάσταση Προβλήματος", date: "Καταγραφή Προβλήματος", priority: "Προτεραιότητα Προβλήματος", severity: "Σπουδαιότητα Προβλήματος", name: "Ονοματεπώνυμο Πολίτη", telephone: "Τηλέφωνο Πολίτη", email: "E-mail Πολίτη"}];
        $scope.isloading = true;
        $scope.full = 0;
        //$scope.street = 0;
        // $scope.pimage = "";
        $scope.padmin = true;
        $scope.duplicof = "";
        $scope.nloaded = true;
        $scope.semail = "";
        $scope.smobile = "";
        $scope.sbugid = "";
        var url_path = $location.absUrl().split("//");
        var sub_domain = url_path[1].split(".");
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
//        var parameter = {params: {"login": "tolistimon@gmail.com", "password": "12345678"}};
//        $http.get('http://' + config.bugzilla_host + config.bugzilla_path + '/rest/login', parameter).success(
//                function (response, status, headers, config) {
//                    $cookieStore.put('bug_token', response.token);
//                }).error(
//                function (data, status) {
//
//                });

//                var panorama;
//                $scope.street_view_markers = [];
//                var checked_categories = [];
        function doQuery(sparams) {
            var d = $q.defer();
            $http.get($rootScope.Variables.host + '/api/1.0/admin/issue', {params: sparams, headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).success(function (result) {
                for (var j = 0; j < $scope.panels.length; j++) {
                    if ($scope.panels[j].id == sparams.bug_id) {
                        var priority = PriorityTag.priority_type(result[0].bug_priority);
                        var severity = SeverityTag.severity_type(result[0].bug_severity);
                        var state;
                        if ($scope.panels[j].status == 'CONFIRMED') {
                            state = 'ΑΝΟΙΧΤΟ';
                        } else if ($scope.panels[j].status == 'IN_PROGRESS') {
                            state = 'ΣΕ ΕΚΤΕΛΕΣΗ';
                        } else {
                            state = 'ΟΛΟΚΛΗΡΩΘΗΚΕ';
                        }
                        issues_Array[j + 1] = {id: $scope.panels[j].id, department: result[0].bug_component, description: $scope.panels[j].value_desc, address:  result[0].bug_address,state: state, date: $scope.panels[j].time, priority: priority, severity: severity, name: result[0].name, telephone: result[0].phone, email: result[0].email};
                        break;
                    }
                }
                d.resolve("");
            });
            return d.promise;
        }

        $scope.signout_popup = function () {
            $("#mb-signout").attr("class", "message-box animated fadeIn open");
        }

        $scope.signout_popdown = function () {
            $("#mb-signout").attr("class", "message-box animated fadeIn");
        }

        $scope.nav_toggle = function () {
            if (nav_toggle == 0) {
                $(".x-navigation").first().attr("class", "x-navigation x-navigation-open");
                nav_toggle = 1;
            } else {
                $(".x-navigation.x-navigation-open").attr("class", "x-navigation");
                nav_toggle = 0;
            }
        }

        $scope.geocode = function () {
            var geocoder = new google.maps.Geocoder();
            var address = $('#address').val() + "," + $rootScope.Variables.city_address;
            geocoder.geocode({'address': address}, function (results, status) {
                if (status === 'OK') {
                    if (results.length == 1) {
                        $scope.ALLcenter = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng(), zoom: 18};
                        leafletData.getMap().then(
                                function (map) {
                                    map.invalidateSize(true);
                                }
                        );
                    } else {
                        var addresses_options = "";
                        for (var l = 0; l < results.length; l++) {
                            addresses_options += "<option>" + results[l].formatted_address + "</option>";
                        }

                        $("#taddress").html(addresses_options);
                        $('#address').flexdatalist('reset');
                        $('#address').flexdatalist({
                            minLength: 0
                        });
                        $("#address-flexdatalist").focus();
                    }
                } else {
                    $window.alert("Δεν βρέθηκαν αποτελέσματα για τη διεύθυνση που εισάγατε. Παρακαλώ δοκιμάστε ξανά.");
                }
            });
        };
        $scope.csv = function () {
            var csv_promises = [];
            var l = 0;
            var deferred = $q.defer();
            angular.forEach($scope.panels, function (value, key) {
                //var sparams = {"id": value.id, "include_fields": [ "component", "status", "resolution", "cf_mobile", "cf_email", "cf_creator", "severity", "priority", "severity"]};
                var sparams = {"bug_id": value.id};
                csv_promises.push(doQuery(sparams));
            });
            $q.all(csv_promises).then(function (data) {
                return deferred.resolve(issues_Array);
            });
            return deferred.promise;
        };

//        $scope.initialize = function(){

        // var fenway = {lat: 38.246453, lng: 21.735068};             

//        var fenway = {lat: 38.27942654793131, lng:  21.76288604736328};
//                var panoOptions = {
//                position: fenway,
//                        addressControlOptions: {
//                        position: google.maps.ControlPosition.BOTTOM_CENTER
//                        },
//                        linksControl: false,
//                        panControl: false,
//                        zoomControlOptions: {
//                        style: google.maps.ZoomControlStyle.SMALL
//                        },
//                        enableCloseButton: false
//                };
//                panorama = new google.maps.StreetViewPanorama(
//                        document.getElementById('smap'), panoOptions);
//                var issue_array = [];
//                var checkOptions = []
//                for (var k = 1; k < $rootScope.Variables.departments_en.length; k++){
//        checked_categories.push(true);
//                checkOptions[k] = {
//        gmap: panorama,
//                title: $rootScope.Variables.departments_en[k],
//                id: $rootScope.Variables.departments_en[k],
//                label: $rootScope.Variables.departments_en[k],
//                action: function(){
//                var index = $rootScope.Variables.departments_en.indexOf(this.title) - 1;
//                        checked_categories[index] = !checked_categories[index];
//                        for (var i = 0; i < $scope.street_view_markers.length; i++){
//                if ($scope.street_view_markers[i] != "ncoords" && $scope.street_view_markers[i].title == this.title){
//                if (checked_categories[index] == false){
//                $scope.street_view_markers[i].setVisible(false);
//                } else{
//                $scope.street_view_markers[i].setVisible(true);
//                }
//                }
//                }
//                }
//        }
//        issue_array.push(new checkBox(checkOptions[k]));
//        }
//
//        var ddDivOptions = {
//        items: issue_array,
//                id: "myddOptsDiv"
//        }
//
//        var dropDownDiv = new dropDownOptionsDiv(ddDivOptions);
//                var dropDownOptions = {
//                gmap: panorama,
//                        name: 'Προβλήματα',
//                        id: 'ddControl',
//                        title: 'A custom drop down select with mixed elements',
//                        position: google.maps.ControlPosition.TOP_LEFT,
//                        dropDown: dropDownDiv
//                }
//
//        var dropDown = new dropDownControl(dropDownOptions);
//                $(window).resize(function() {
//
//        google.maps.event.trigger(panorama, "resize");
//        });
        // map.setStreetView(panorama);
        //   }

        $("body").on("click", ".xn-openable", function (event) {
            if ($(event.target).attr('class') == undefined || $(event.target).attr('class') == 'xn-openable active' || $(event.target).attr('class') == 'xn-openable') {
                $(this).attr("class", "xn-openable active");
            }
        });
        $("body").on("click", ".xn-openable.active", function (event) {
            if ($(event.target).attr('class') == undefined || $(event.target).attr('class') == 'xn-openable active' || $(event.target).attr('class') == 'xn-openable') {
                $(this).attr("class", "xn-openable")
            }
        });
//                $(window).on('resize', function () {
//        if ($(document).width() <= 992) {
//        small = 1;
//                isfixed = 0;
//                $("#right-column").removeAttr('style');
//        } else {
//        var bottom = $('.xn-profile').position().top;
//                var outerHeight = $('.xn-profile').height();
//                if (small == 1 && $(window).scrollTop() > bottom + outerHeight){
//        if ($(window).scrollTop() > bottom + outerHeight && $(window).width() >= 992) {
//        if (isfixed == 0){
//        $("#right-column").css({position: 'fixed', top: '4%', width : $("#right-column").width()});
//        }
//        } else {
//        $("#right-column").removeAttr('style');
//        }
//        small = 0;
//        } else if (small == 1 && $(window).scrollTop() <= bottom + outerHeight){
//        small = 0;
//        }
//        }
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

//        $scope.check_panorama = function(coords){
//        if (coords == "ncoords"){
//        return true;
//        } else{
//        return false;
//        }
//        }

        $scope.issue_search = function () {
            search_button = 1;
            var searchparams = {};
            searchparams.bug_id = $scope.sbugid;
            searchparams.email = $scope.semail;
            searchparams.mobile = $scope.smobile;
            $rootScope.sbugid = $scope.sbugid;
            $rootScope.semail = $scope.semail;
            $rootScope.smobile = $scope.smobile;
            searchparams.city = $rootScope.Variables.city_name;
            $http.get($rootScope.Variables.host + '/api/1.0/issue', {params: searchparams, headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).success(function (result) {
                $scope.total_pages = Math.ceil(result.length / 20);
                $scope.refreshPages(1);
                $scope.refresh();
            });
        }

//        function checkNearestStreetView(panoData){
//        if (strvcounter < total_counter){
//        if (panoData != null){
//
//        var issue_index = $rootScope.Variables.departments.indexOf($scope.panels[strvcounter].issue);
//                var issueMarker = new google.maps.Marker({
//                position: panoData.location.latLng,
//                        map: panorama,
//                        icon: './icons/' + $scope.panels[strvcounter].issue + '.png',
//                        title: $rootScope.Variables.departments_en[issue_index],
//                        visible: true
//                });
//                var category_index = $rootScope.Variables.departments_en.indexOf(issueMarker.title);
//                if (checked_categories[category_index] == false){
//        issueMarker.setVisible(false);
//        } else{
//        issueMarker.setVisible(true);
//        }
//        issueMarker.info = new google.maps.InfoWindow({
//        content: $scope.panels[strvcounter].value_desc
//        });
//                google.maps.event.addListener(issueMarker, 'click', function() {
//                issueMarker.info.open(panorama, issueMarker);
//                });
//                $scope.street_view_markers.push(issueMarker);
//                strvcounter++;
//                if (strvcounter < total_counter){
//        var issue_coords = new google.maps.LatLng($scope.panels[strvcounter].lat, $scope.panels[strvcounter].lng);
//                var webService = new google.maps.StreetViewService();
//                webService.getPanoramaByLocation(issue_coords, 200, checkNearestStreetView);
//        } else{
//        strvcounter = 0;
//        }
//        } else{
//        $scope.street_view_markers.push("ncoords");
//                strvcounter++;
//                if (strvcounter < total_counter){
//        var issue_coords = new google.maps.LatLng($scope.panels[strvcounter].lat, $scope.panels[strvcounter].lng);
//                var webService = new google.maps.StreetViewService();
//                webService.getPanoramaByLocation(issue_coords, 200, checkNearestStreetView);
//        } else{
//        strvcounter = 0;
//        }
//        }
//        } else{
//        strvcounter = 0;
//        }
//        }


        authorizedu();
        username();
        userole();
        $(document).on('scroll', function () {
            var bottom = $('.xn-profile').position().top;
            var outerHeight = $('.xn-profile').height();
            if ($(window).scrollTop() > bottom + outerHeight && $(window).width() >= 992) {
                if (isfixed == 0) {
                    $("#right-column").css({position: 'fixed', top: '4%', width: $("#right-column").width()});
                }
            } else {
                $("#right-column").removeAttr('style');
            }
        });
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
                panel_fullscreen($(".panel"));
                var map = leafletData.getMap("issuesmap").then(
                        function (map) {
                            map.invalidateSize(true);
                        }

                );
            }
        };
//                $scope.removeFixeds = function () {
//                if ($scope.currentactive != - 1){
//                if ($scope.full == 0) {
//                $scope.street = 1;
//                        isfixed = 1;
//                        $("#right-column").removeAttr('style');
        //$(window).resize();
//                        $(window).trigger('resize');
//                        $scope.full = 1;
//                        $scope.panel_fullscreen($(".panel"));
//                        if ($scope.activePanel == - 1) {
//                var map = leafletData.getMap("issuesmap").then(
//                        function (map) {
//                        map.invalidateSize(true);
//                        }
//
//                );
//                } else {
//                var map = leafletData.getMap("panelmap").then(
//                        function (map) {
//                        map.invalidateSize(true);
//                        }
//
//                );
//                }
//                } else {
//                $scope.street = 0;
//                        isfixed = 0;
//                        var bottom = $('.xn-profile').position().top;
//                        var outerHeight = $('.xn-profile').height();
//                        if ($(window).scrollTop() > bottom + outerHeight && $(window).width() >= 992) {
//                if (isfixed == 0){
//
//                $("#right-column").css({position: 'fixed', top: '4%', width : $("#right-column").width()});
//                }
//                } else {
//                $("#right-column").removeAttr('style');
//                }
//                $scope.full = 0;
//                        $scope.panel_fullscreen($(".panel"));
//                        if ($scope.activePanel == - 1) {
//                var map = leafletData.getMap("issuesmap").then(
//                        function (map) {
//                        map.invalidateSize(true);
//                        }
//
//                );
//                } else {
//                var map = leafletData.getMap("panelmap").then(
//                        function (map) {
//                        map.invalidateSize(true);
//                        }
//
//                );
//                }
//                }
//                }
//                };
        $scope.totalpages = function (newstart, arrow) {
//                if (params.status != undefined && params.status instanceof Array){
//                params.status = params.status.join("|");
//                }
            if (search_button == 1) {

                parameter = params;
                delete parameter['departments'];
                delete parameter['status'];
                delete parameter['sort'];
                delete parameter['limit'];
                delete parameter['offset'];
                delete parameter['image_field'];
            } else {
                if (($rootScope.allclosedissues == false && $rootScope.assignissues == false) || $rootScope.closedissues == true) {
                    if ($rootScope.closedissues == true) {
                        params.status = "CONFIRMED|IN_PROGRESS|RESOLVED";
                    } else {
                        params.status = "CONFIRMED|IN_PROGRESS";
                    }
                    if (summary == "all") {
                        parameter = {"city": $cookieStore.get("city"), "departments": $rootScope.component, "status": params.status, "startdate": "2016-08-01"};
                    } else {
                        parameter = {"city": $cookieStore.get("city"), "departments": $rootScope.component, "status": params.status, "issue": summary, "startdate": "2016-08-01"};
                    }
                } else {
                    if ($rootScope.allclosedissues == true) {
                        params.status = "CONFIRMED|IN_PROGRESS|RESOLVED";
                    } else {
                        params.status = "CONFIRMED|IN_PROGRESS";
                    }
                    if (summary == "all") {
                        parameter = {"city": $cookieStore.get("city"), "departments": $rootScope.Variables.components.join("|"), "status": params.status, "startdate": "2016-08-01"};
                    } else {
                        parameter = {"city": $cookieStore.get("city"), "departments": $rootScope.Variables.components.join("|"), "status": params.status, "issue": summary, "startdate": "2016-08-01"};
                    }
                }
            }

            $http.get($rootScope.Variables.host + '/api/1.0/issue', {params: parameter, headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).success(
                    function (response, status, headers, conf) {
                        $scope.total_pages = Math.ceil(response.length / 20);
                        if (init == 0) {
                            if (tabchanged == 1 || sreset == 1) {
                                tabchanged = 0;
                                if (sreset == 1) {
                                    params.offset = 0;
                                    sreset = 0;
                                }
                                $scope.refreshPages(1);
                                params = parameter;
                                params.limit = 20;
                                $scope.bugsearch();
                            } else {
                                $scope.refreshPages(newstart, arrow);
                                $scope.refresh();
                            }
                        } else {
                            init = 0;
                            $scope.refreshPages(1);
                            $scope.bugsearchinit();
                        }
                    }).error(
                    function (data, status) {

                    });
        };
        $scope.page_set = [];
        $scope.city = $cookieStore.get("city");

        $scope.changeTab = function (index) {
            search_button = 0;
            $scope.refreshPages(1);
            if (tabchanged == 2) {
                tabchanged = 0;
            } else {
                tabchanged = 1;
            }

            if ($cookieStore.get("role") == "cityAdmin" || $cookieStore.get("role") == "sensecityAdmin") {
                $scope.tabs.activeTab = index;
                $scope.tabs.activeTitle = $rootScope.Variables.activeTitles[index];
                $scope.tabs.activeIcon = $rootScope.Variables.activeIcons[index];
//                $scope.activePanel = - 1;
//                $scope.currentactive = - 1;
//            else if (issue == 'plumbing') {
//                $scope.tabs.activeTitle = "Ύδρευσης/Αποχέτευσης";
//                $scope.tabs.activeIcon = "fa fa-umbrella";
//            }
            } else {
                $scope.tabs.activeTab = index;
                $scope.tabs.activeTitle = $scope.tabs[index].title;
                $scope.tabs.activeIcon = $scope.tabs[index].icon;
            }

            //vale kai total_pages gia to first page
        };
//                $(document).on("click", ".panel-fullscreen", function () {
//
//        
//        return false;
//        });
        //-----------------------------------------------------------------------
//        $scope.valid = true;
//        $cookieStore.put('city','testweb');
//                            $cookieStore.put('role','sensecityAdmin');
//                            $cookieStore.put('email','tolistimon@gmail.com');
//                            $cookieStore.put('uuid','QXBvc3RvbGlz');
//                            $cookieStore.put('username','Apostolis');
//-------------------------------------------------------------------------------
        if ($scope.valid) {
            $scope.dupli_change = function ($event, dupl) {
                $scope.duplicof = dupl;
            };
            if ($cookieStore.get("role") == "departmentAdmin" || $cookieStore.get("role") == "departmentUser") {
                $scope.tabs = [];
                if ($cookieStore.get("role") == "departmentAdmin") {
                    $scope.role = "departmentAdmin";
                } else {
                    $scope.role = "departmentUser";
                }
                var department = $cookieStore.get("department");
                var dep_index = $rootScope.Variables.depUserTitles.indexOf(department);
                $scope.tabs = [{
                        "title": $rootScope.Variables.depUserTitles[dep_index],
                        "content": $rootScope.Variables.depUserContent[dep_index],
                        "icon": $rootScope.Variables.depUserIcons[dep_index]
                    }];
                $scope.tabs.activeTab = 0;
//                else if (department == "plumbing") {
//                    $scope.tabs = [{
//                            "title": "Ύδρευσης/Αποχέτευσης",
//                            "content": "Παρουσίαση προβλημάτων ύδρευσης/αποχέτευσης",
//                            "icon": "fa fa-umbrella"
//                        }];
//                    $scope.tabs.activeTab = 5;
//                }
            } else {
                $scope.role = "cityAdmin";
                $scope.tabs = $rootScope.Variables.cityAdminTabs;
                $scope.tabs.activeTab = 0;
//                    ,
//                    {
//                        "title": "Ύδρευσης/Αποχέτευσης",
//                        "content": "Παρουσίαση προβλημάτων ύδρευσης/αποχέτευσης",
//                        "icon": "fa fa-umbrella"
//                    }
            }

            $scope.issue_data = function ($index, panel, event) {
                var sparams = {"id": panel.id, "include_fields": ["component", "status", "resolution", "cf_mobile", "cf_email", "cf_creator", "severity", "priority", "severity"]};
                $http.post($rootScope.Variables.host + '/api/1.0/admin/bugs/search', sparams, {headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).success(function (result) {
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
                    $scope.itemClicked($index, event);
                    $scope.linkmap(panel);
                    $scope.nloaded = false;
                });
//                $http.post($rootScope.Variables.host + '/api/1.0/admin/bugs/comment', {id: panel.id}, {headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).success(
//                function (response, status, headers, config) {
//                var history = [];
//                        var com;
//                        var tag_pos;
//                        for (var i = 1; i < response.bugs[Object.keys(response.bugs)[0]].comments.length; i++) {
//                com = response.bugs[Object.keys(response.bugs)[0]].comments[i].text;
//                        if (com == "undefined") {
//                com = "";
//                }
//                if (com.substring(0, 7) == "*** Bug") {
//                com = "";
//                }
//
//                switch (response.bugs[Object.keys(response.bugs)[0]].comments[i].tags[0]) {
//                case "CONFIRMED":
//                        case "IN_PROGRESS":
//                        case "RESOLVED":
//                        tag_pos = 0;
//                        break;
//                        default:
//                        tag_pos = 1;
//                        break;
//                }
//
//                if (response.bugs[Object.keys(response.bugs)[0]].comments[i] != []) {
//                var htime = timegr(moment(response.bugs[Object.keys(response.bugs)[0]].comments[i].time).format('LLLL'));
//                        if (response.bugs[Object.keys(response.bugs)[0]].comments[i].tags[tag_pos] == "CONFIRMED") {
//                history.push({"text": com, "timestamp": htime, "state": "Ανοιχτό", "style": {'color': '#e42c2c'}, "class": 'glyphicon glyphicon-exclamation-sign'});
//                } else if (response.bugs[Object.keys(response.bugs)[0]].comments[i].tags[tag_pos] == "IN_PROGRESS") {
//                history.push({"text": com, "timestamp": htime, "state": "Σε εκτέλεση", "style": {'color': 'orange'}, "class": 'glyphicon glyphicon-question-sign'});
//                } else {
//                history.push({"text": com, "timestamp": htime, "state": "Ολοκληρωμένο", "style": {'color': 'green'}, "class": 'glyphicon glyphicon-ok-sign'});
//                }
//                }
//                }
//
//                if (panel.comment == undefined) {
//                panel.comment = '';
//                }
//                $scope.panels[panel.order].history = history;
//                        $scope.panels[panel.order].comment = com;
//                        $scope.itemClicked($index, event);
//                        $scope.linkmap(panel);
//                        $scope.nloaded = false;
//                });
//                Issue2MapService.query({issueID: panel.mongoId}, function (issue) {
//
//                if (issue[0] != undefined) {
//                if (issue[0].image_name != "" && issue[0].image_name != "no-image") {
//                $scope.image_width = "100%";
//                        $scope.panels[panel.order].image = "";
//                        $scope.pclass = "";
//                        $scope.panels[panel.order].image = issue[0].image_name;
//                } else {
//                $scope.image_width = "60%";
//                        $scope.panels[panel.order].image = "";
//                        $scope.pclass = "";
//                        $scope.panels[panel.order].image = issue[0].image_name;
//                        $scope.pclass = "fa fa-" + $rootScope.Variables.icons[issue[0].issue].icon;
//                }
//                $scope.pimage = $scope.panels[panel.order].image;
//                        $scope.panels[panel.order].lat = issue[0].loc.coordinates[1];
//                        $scope.panels[panel.order].lng = issue[0].loc.coordinates[0];
//                        $scope.center = {lat: issue[0].loc.coordinates[1], lng: issue[0].loc.coordinates[0], zoom: 17};
//                        $scope.ALLmarkers.push({"lat": issue[0].loc.coordinates[1], "lng": issue[0].loc.coordinates[0], "icon": icons[panel.issue], "panelid": panel.ArrayID});
//                }
//                if ($scope.street_view_markers[panel.order] != "ncoords"){
//                panorama.setPosition($scope.street_view_markers[panel.order].position);
//                }
                //               });
            }

            $scope.panels = [];
            //        $scope.activePanel = [];
            moment.locale('el');
            $rootScope.closedissues = false;
            $rootScope.assignissues = false;
            $rootScope.allclosedissues = false;
            $scope.ALLcenter = $rootScope.Variables.center;
            $scope.center = $rootScope.Variables.center;
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
            var icons = $rootScope.Variables.icons;
            $scope.$on("leafletDirectiveMarker.issuesmap.click", function (event, args) {
                // Args will contain the marker name and other relevant information
                // console.log("Leaflet Click");
                // console.log(args);
                // console.log(args.model.panelid);
                // console.log($scope.panels[args.model.panelid]);
                $scope.nloaded = true;
                $scope.issue_data(args.model.panelid, $scope.panels[args.model.panelid], event);
                //$scope.linkmap($scope.panels[args.model.panelid]);



            });
//                $scope.$on("leafletDirectiveMarker.panelmap.click", function (event, args) {
            // Args will contain the marker name and other relevant information
            // console.log("Leaflet Click");
            // console.log(args);
            // console.log(args.model.panelid);
            // console.log($scope.panels[args.model.panelid]);

            //  $scope.activePanel = - 1;
            //          $scope.currentactive = - 1;
//                $scope.pimage = "";
//                        $scope.pclass = "";
//                        displayFixedPoints();
            // $scope.linkmap($scope.panels[args.model.panelid]);
            //               });
            var layers_ref;
            var markersGarbage;
            var markersLightning;
            var displayFixedPoints = function () {
//                if ($scope.activePanel != - 1 && current_layer == 1){
//                leafletData.getMap("panelmap").then(function (map) {
//                layers_ref.removeFrom(map);
//                        map.removeLayer(markersGarbage);
//                        map.removeLayer(markersLightning);
//                });
//                }

//                $scope.buildings_view = function(){
//                if ($scope.currentactive != - 1){
//                $window.open("https://www.google.gr/maps/@" + $scope.panels[$scope.currentactive].lat + "," + $scope.panels[$scope.currentactive].lng + ",200a,20y,41.27t/data=!3m1!1e3?hl=en");
//                }
//                }

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
//                                if ($scope.activePanel == - 1){
                    leafletData.getMap("issuesmap").then(function (map) {
                        map.addLayer(markersGarbage);
                    });
//                        } else{
//                        leafletData.getMap("panelmap").then(function (map) {
//                        map.addLayer(markersGarbage);
//                        });
//                        }
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
//                                if ($scope.activePanel == - 1){
                    leafletData.getMap("issuesmap").then(function (map) {
                        map.addLayer(markersLightning);
                    });
//                        } else{
//                        leafletData.getMap("panelmap").then(function (map) {
//                        map.addLayer(markersLightning);
//                        });
//                        }
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
                    //                               if ($scope.activePanel == - 1){
                    leafletData.getMap("issuesmap").then(function (map) {
                        L.control.layers(baseLayers, overlays).addTo(map);
                        map.invalidateSize(true);
                    });
//                        } else{
//                        current_layer = 1;
//                                leafletData.getMap("panelmap").then(function (map) {
//                        layers_ref = L.control.layers(baseLayers, overlays).addTo(map); ;
//                                map.invalidateSize(true);
//                        });
//                        }
                });
            };
            $scope.refreshPages = function (startPage, arrow_type) {
                if (startPage <= 0) {
                    $scope.startPage = 1;
                } else if (startPage + 4 > $scope.total_pages) {
                    if ($scope.total_pages < 5) {

                        $scope.startPage = 1;
                    } else {
                        $scope.startPage = $scope.total_pages - 4;
                    }
                } else if ((startPage - 1) % 5 != 0 && arrow_type != 4) {
                    $scope.startPage = startPage + 5 - ($scope.total_pages % 5);
                } else {
                    $scope.startPage = startPage;
                }

                if (arrow_type == 4) {
                    if ($scope.total_pages < 5) {
                        $scope.activePage = $scope.total_pages;
                        $scope.pageIndex = $scope.total_pages;
                    } else {
                        $scope.activePage = $scope.total_pages;
                        $scope.pageIndex = 5;
                    }
                } else {
                    $scope.activePage = $scope.startPage;
                    if (($scope.startPage - 1) % 5 == 0) {
                        $scope.pageIndex = $scope.startPage % 5;
                    } else {
                        $scope.pageIndex = 5 - ($scope.total_pages - $scope.startPage) % 5;
                    }
                }

                var local_pages;
                if ($scope.total_pages < 5) {
                    local_pages = $scope.total_pages;
                } else if ($scope.total_pages < $scope.startPage + 4) {
                    local_pages = $scope.total_pages;
                } else {
                    local_pages = $scope.startPage + 4;
                }

                $scope.page_set = [];
                for (var i = $scope.startPage; i <= local_pages; i++) {
                    $scope.page_set.push(i);
                }
            };
            var pageload = function (callback) {
                $scope.activePage = 1;
                $scope.startPage = 1;
//                        $scope.activePanel = - 1;
//                        $scope.currentactive = - 1;
                $scope.pageIndex = 1;
                $scope.isloading = true;
//                        if ($cookieStore.get("role") == "cityAdmin" || $cookieStore.get("role") == "sensecityAdmin") {
//                $scope.changeTab($scope.tabs.activeTab);
//                } else {
                $scope.changeTab(0);
                //}

                $scope.enable_loading = function () {
                    $scope.nloaded = true;
                }

                $scope.itemClicked = function ($index, event) {
//                if ($window.location.href.toString().indexOf(":") != - 1){
               // $window.location.href = 'http://localhost:8383/sensecity-web/admin/index.html#/issuepage=' + $scope.panels[$index].id;
//                } else{
                  $window.location.href = 'http://' + $rootScope.Variables.city_name + '.sense.city/admin/index.html#/issuepage=' + $scope.panels[$index].id;
                    // }
                    //          if ($scope.currentactive != $index) {
//                        if ($scope.currentactive != -1 && $scope.currentactive < $index) {
//                            setTimeout(function () {
//                                $("html,body").scrollTop($(event.target).offset().top - $("#activePanel").height());
//                            }, 500);
//                        } else {
                    //         $scope.padmin = $scope.panels[$index].admin;
                    //                 $scope.pimage = $scope.panels[$index].image;
                    // panorama.setPosition(new google.maps.LatLng($scope.panels[$index].lat, $scope.panels[$index].lng));
                    //                 $scope.activePanel = $index;
                    //                 $scope.currentactive = $index;
                    //setTimeout(function () {
//                        $("html,body").scrollTop($(event.target).offset().top);
//                        }, 400);
                    //$("html,body").scrollTop($('span:contains("' + $scope.panels[$index].title + '")').offset().top);
                    //$("html,body").scrollTop($(".timeline-item-active span").offset().top);
                    // }, 400);
                    //$(window).resize();
                    //                 $(window).trigger('resize');
//                } else {
//                current_layer = 0;
//                        $scope.pimage = "";
//                        $scope.padmin = true;
//                        $scope.activePanel = - 1;
//                        $scope.currentactive = - 1;
//                }
                };
                var issue_type = Tab2BugzillaService.issue_type($scope.tabs.activeTab);
                $rootScope.component = $rootScope.Variables.components[0];
                summary = "all";
                if (issue_type != "all" && ($scope.role == "sensecityAdmin" || $scope.role == "cityAdmin"))
                {
                    params.issue = issue_type;
                } else if ($scope.role == "departmentAdmin" || $scope.role == "departmentUser") {
                    var tab_index = $rootScope.Variables.components.indexOf($scope.tabs[0].title);
                    $rootScope.component = $rootScope.Variables.components[tab_index];
                }
                params = {"departments": $rootScope.component, "image_field": "0", "sort": "-1", "startdate": "2016-08-01", "limit": "20"};
                if ($scope.role == "cityAdmin" || $scope.role == "sensecityAdmin") {
                    params.status = ["CONFIRMED", "IN_PROGRESS"];
                } else if ($scope.role == "departmentAdmin" || $scope.role == "departmentUser") {
                    params.status = ["IN_PROGRESS"];
                }

                $scope.totalpages();
                displayFixedPoints();
                $scope.bugsearchinit = function () {

                    $scope.pages = '<ul style="margin-bottom: -3%;margin-top:12%" class="pagination pagination-sm pull-right"><li ng-click="totalpages(1,1);"><span tooltip-side="left" tooltips tooltip-template="Πρώτη σελίδα"><a href="#/admin">«</a></span></li>'
                            + '<li ng-click="totalpages(startPage - 5,2)"><span tooltip-side="top" tooltips tooltip-template="Προηγούμενες σελίδες"><a  href="#/admin"><</a></span></li>';
                    $scope.refreshPages(1);
                    $scope.pages += '<li ng-repeat="page in page_set"  ng-click="updatePage(page);refresh()" ng-class="( $index + 1 != pageIndex) ? \'\':\'active\'"><span tooltips tooltip-template><a href="#/admin">{{page}}</a></span></li>';
                    $scope.pages += '<li ng-click="totalpages(startPage + 5,3)"><span tooltip-side="top" tooltips tooltip-template="Επόμενες σελίδες"><a  href="#/admin">></a></span></li>'
                            + '<li ng-click="totalpages(total_pages - 4,4)"><span tooltip-side="right" tooltips tooltip-template="Τελευταία σελίδα"><a  href="#/admin">»</a></span></li></ul>';
                    params.city = $rootScope.Variables.city_name;
                    $http.get($rootScope.Variables.host + '/api/1.0/issue', {params: params, headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).success(function (result) {
                        total_counter = result.length;
                        var counter = 0;
                        var map_counter = 0;
                        if (total_counter == 0) {
                            mapnloaded = false;
                            $scope.isloading = false;
                            $scope.nloaded = false;
                        } else {

                            $(".paging").html($compile($scope.pages)($scope));
                            $scope.updatePage = function (activePage) {

                                $scope.activePage = activePage;
                                if (($scope.startPage - 1) % 5 == 0) {
                                    $scope.pageIndex = activePage % 5;
                                } else { //When totalpages are not divided by 5
                                    $scope.pageIndex = 5 - ($scope.total_pages - activePage);
                                }
                                if ($scope.pageIndex == 0) {
                                    $scope.pageIndex = 5;
                                }
                            };
                        }

                        angular.forEach(result, function (value, key) {
                            var issue_name = ToGrService.issueName(value.issue);
                            var panelTitle = ToGrService.statusTitle(value.status, value.resolution);
                            var description = CommentService.field(value.status);
                            var id = value.id;
                            var priority = PriorityTag.priority_type(value.priority);
                            var severity = SeverityTag.severity_type(value.severity);
                            var issuelink = "http://sense.city/issuemap.php?issue_id=" + value.alias;
                            var creation_time = value.create_at;
                            var local_time = moment(creation_time).format('LLLL');
                            local_time = timegr(local_time);
                            var time_fromNow = moment(creation_time).fromNow();
                            var panel = {
                                "title": "#" + value.bug_id + " (" + issue_name + "-" + value.value_desc + ") -- " + time_fromNow,
                                "style": panelTitle.status_style,
                                "icon": panelTitle.status_icon,
                                "time": local_time,
                                "issuenameGR": issue_name,
                                "issuenameEN": value.issue,
                                "status": value.status,
                                "admin": false,
                                "ArrayID": key,
                                "order": counter,
                                "mongoId": value._id,
                                "id": value.bug_id,
                                "issue": value.issue,
                                "value_desc": value.value_desc
                            };
                            $scope.panels.push(panel);
                            $scope.panels[panel.order].lat = value.loc.coordinates[1];
                            $scope.panels[panel.order].lng = value.loc.coordinates[0];
                            $scope.center = {lat: value.loc.coordinates[1], lng: value.loc.coordinates[0], zoom: 17};
                            $scope.ALLmarkers.push({"lat": value.loc.coordinates[1], "lng": value.loc.coordinates[0], "icon": icons[value.issue], "panelid": panel.ArrayID});
                            counter++;
                        }, $scope.panels);
//                                var webService = new google.maps.StreetViewService();
//                                var issue_coords = new google.maps.LatLng($scope.panels[0].lat, $scope.panels[0].lng);
//                                webService.getPanoramaByLocation(issue_coords, 200, checkNearestStreetView);
                        $scope.isloading = false;
                        $scope.nloaded = false;
                        //$(window).resize();
                        $(window).trigger('resize');
                    });
                };
            };
            pageload(function (callback) {
            });
            var li = 0;
            $scope.linkmap = function (panel) {
                $scope.markers = [];
                // displayFixedPoints();
                $scope.panel_issue = panel.issuenameGR;
                $scope.initial_desc = panel.initialdesc;
                Issue2MapService.query({issueID: panel.mongoId}, function (issue) {
                    // $scope.panel_image = issue[0].image_name;
                    $scope.center = {lat: issue[0].loc.coordinates[1], lng: issue[0].loc.coordinates[0], zoom: 17};
                    $scope.markers = [{"lat": issue[0].loc.coordinates[1], "lng": issue[0].loc.coordinates[0], "icon": icons[panel.issue]}];
//--------FIXED POINTS
//                    if (issue[0].issue == "garbage" || "lighting") {
//                        var type;
//                        if (issue[0].issue == "lighting")
//                        {
//                            type = "fotistiko";
//                        } else {
//                            type = issue[0].issue;
//                        }
//                        
//                        FixPoints2MapService.query({long: issue[0].loc.coordinates[0], lat: issue[0].loc.coordinates[1], type: type}, function (fix_points) {
//                            angular.forEach(fix_points, function (value, key) {
//                                var icon = FixPointsMarkerService.icon(value);
//                                $scope.markers.push({"lat": value.loc.coordinates[1], "lng": value.loc.coordinates[0], "icon": icons[icon]});
//                            });
//                        });
//                    }

                });
            };
            $scope.admin = function (panel) {

                $scope.selectedStatus = null;
                $scope.selectedResolution = null;
                panel.admin = true;
                $scope.statuses = [{"gr": "Ανοιχτό", "en": "CONFIRMED"}, {"gr": "Σε εκτέλεση", "en": "IN_PROGRESS"}, {"gr": "Ολοκληρωμένο", "en": "RESOLVED"}];
                $scope.sresolved = [{"gr": "Ανοιχτό", "en": "CONFIRMED"}, {"gr": "Ολοκληρωμένο", "en": "RESOLVED"}];
                $scope.resolutions = [{"gr": "Αποκατάσταση", "en": "FIXED"}, {"gr": "Εσφαλμένη Αναφορά", "en": "INVALID"}, {"gr": "Μη αποκατάσταση / Απόρριψη από Δήμο", "en": "WONTFIX"}, {"gr": "Έχει ήδη αναφερθεί σε άλλο αίτημα", "en": "DUPLICATE"}];
                $scope.priorities = ["Υψηλή", "Κανονική", "Χαμηλή"];
                $scope.severities = ["Κρίσιμο", "Μείζον", "Κανονικό", "Ελάσσον", "Μηδαμινό", "Βελτίωση"];
                $rootScope.components = $rootScope.Variables.components;
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
                            //                       if ((panel.status.gr == 'Σε εκτέλεση' && panel.component != $scope.selectedComponent && $scope.assignissues == false && $scope.allclosedissues == false) || (panel.status.gr == 'Ολοκληρωμένο' && (($scope.closedissues == false && $scope.allclosedissues == false) || ($scope.closedissues == true && panel.component != $scope.component)))) {
//                setTimeout(function () {
//                $(e.target).closest(".timeline-item-active").remove();
//                        $scope.activePanel = - 1;
//                        $scope.currentactive = - 1;
                            //  }, 3000);
                            //               }
                            $scope.selectedStatus = panel.status;
                            $rootScope.component = panel.component;
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
//                        if ((panel.status.gr == 'Σε εκτέλεση' && $scope.assignissues == false && panel.component != $scope.selectedComponent && $scope.allclosedissues == false) || (panel.status.gr == 'Ολοκληρωμένο' && (($scope.closedissues == false && $scope.allclosedissues == false) || ($scope.closedissues == true && panel.component != $scope.component)))) {
//                setTimeout(function () {
//                $(e.target).closest(".timeline-item-active").remove();
//                        $scope.activePanel = - 1;
//                        $scope.currentactive = - 1;
//                }, 3000);
//                }
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
//                        if ((panel.status.gr == 'Σε εκτέλεση' && $scope.assignissues == false && panel.component != $scope.selectedComponent && $scope.allclosedissues == false) || (panel.status.gr == 'Ολοκληρωμένο' && (($scope.closedissues == false && $scope.allclosedissues == false) || ($scope.closedissues == true && panel.component != $scope.component)))) {
//                setTimeout(function () {
//                $(e.target).closest(".timeline-item-active").remove();
//                        $scope.activePanel = - 1;
//                        $scope.currentactive = - 1;
//                }, 3000);
//                }
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
            $scope.reset_search = function () {
                if (search_button == 1) {
                    search_button = 0;
                    sreset = 1;
                }
            }

            $scope.toggle_closedissues = function () {
                if ($rootScope.closedissues == false) {
                    $rootScope.closedissues = true;
                    $rootScope.allclosedissues = false;
                    $rootScope.assignissues = false;
                } else {
                    $rootScope.closedissues = false;
                }
//        $scope.activePanel = - 1;
//                $scope.currentactive = - 1;
            };
            $scope.toggle_allclosedissues = function () {
                if ($rootScope.allclosedissues == false) {
                    $rootScope.allclosedissues = true;
                    $rootScope.closedissues = false;
                    $rootScope.assignissues = false;
                } else {
                    $rootScope.allclosedissues = false;
                }
//                $scope.activePanel = - 1;
//                        $scope.currentactive = - 1;
            };
            $scope.toggle_inprogressissues = function () {
                if ($rootScope.assignissues == false) {
                    $rootScope.assignissues = true;
                    $rootScope.allclosedissues = false;
                    $rootScope.closedissues = false;
                } else {
                    $rootScope.assignissues = false;
                }
//                $scope.activePanel = - 1;
//                        $scope.currentactive = - 1;
            };
            $scope.refresh = function () {

//                for (var i = 0; i < $scope.street_view_markers.length; i++){
//                if ($scope.street_view_markers[i] != "ncoords"){
//                $scope.street_view_markers[i].setMap(null);
//                }
//                }
//                $scope.street_view_markers = [];
//                if (current_layer == 1){
//                current_layer = 0;
                //    displayFixedPoints();
                //  }
                $scope.isloading = true;
                $scope.nloaded = true;
                //   $scope.pimage = "";
                $scope.padmin = true
                mapnloaded = true;
                $http.get($rootScope.Variables.host + '/api/1.0/get', {headers: {'x-uuid': $cookieStore.get("uuid")}}).success(
                        function (response) {
                            if (response == "failure") {
                                $scope.valid = false;
                                $cookieStore.remove("uuid");
                                $cookieStore.remove("city");
                                $cookieStore.remove("role");
                                $cookieStore.remove("department");
                                $cookieStore.remove("email");
                                $cookieStore.remove("username");
                            }
                        });
//                        $scope.activePanel = - 1;
//                        $scope.currentactive = - 1;
                var query_component = [];
                if ($cookieStore.get("uuid") != "undefined") {
                    $scope.panels = [];
                    $scope.ALLmarkers = [];
                    var issue_type = Tab2BugzillaService.issue_type($scope.tabs.activeTab);
                    var offset = ($scope.activePage - 1) * 20;
                    $rootScope.component = $rootScope.Variables.components[0];
                    query_component = [$rootScope.component];
                    summary = issue_type;
                    if ($scope.role == "departmentAdmin" || $scope.role == "departmentUser") {
                        var tab_index = $rootScope.Variables.components.indexOf($scope.tabs[0].title);
                        $rootScope.component = $rootScope.Variables.components[tab_index];
                        query_component = [$rootScope.component];
                        summary = issue_type;
                    }
                    params = {"departments": query_component.join("|"), "image_field": "0", "sort": "-1", "startdate": "2016-08-01", "limit": "20"};
                    if ($scope.role == "cityAdmin" || $scope.role == "sensecityAdmin") {
                        params.status = ["CONFIRMED", "IN_PROGRESS"];
                    } else if ($scope.role == "departmentAdmin" || $scope.role == "departmentUser") {
                        params.status = ["IN_PROGRESS"];
                    }
                    if (($rootScope.assignissues == false || $rootScope.closedissues == true) && $rootScope.allclosedissues == false) {
                        params = {"departments": $rootScope.component, "image_field": "0", "sort": "-1", "limit": "20", "offset": offset, "startdate": "2016-08-01"};
                    } else {
                        params = {"departments": $rootScope.Variables.components.join("|"), "image_field": "0", "sort": "-1", "limit": "20", "offset": offset, "startdate": "2016-08-01"};
                    }
                    if (summary != "all") {
                        params.issue = summary;
                    }

                    if (($rootScope.closedissues == false && $rootScope.allclosedissues == false) || $rootScope.assignissues == true)
                    {
                        if ($scope.role == "cityAdmin" || $scope.role == "sensecityAdmin") {
                            params.status = ["CONFIRMED", "IN_PROGRESS"];
                        } else if ($scope.role == "departmentAdmin" || $scope.role == "departmentUser") {
                            params.status = ["IN_PROGRESS"];
                        }
                    } else {
                        if ($scope.role == "departmentAdmin" || $scope.role == "departmentUser") {
                            params.status = ["IN_PROGRESS", "RESOLVED"];
                        } else if ($scope.role == "cityAdmin" || $scope.role == "sensecityAdmin") {
                            params.status = ["CONFIRMED", "IN_PROGRESS", "RESOLVED"];
                        }
                    }

                    $scope.bugsearch = function () {
//                $(".xn-openable").first().attr("class", "xn-openable active");
                        $scope.pages = '<ul style="margin-bottom: -3%;margin-top:12%" class="pagination pagination-sm pull-right"><li ng-click="totalpages(1,1);"><span tooltip-side="left" tooltips tooltip-template="Πρώτη σελίδα"><a href="#/admin">«</a></span></li>'
                                + '<li ng-click="totalpages(startPage-5,2);"><span tooltip-side="top" tooltips tooltip-template="Προηγούμενες σελίδες"><a  href="#/admin"><</a></span></li>';
                        $scope.pages += '<li ng-repeat="page in page_set"  ng-click="updatePage(page);refresh()" ng-class="( $index + 1 != pageIndex) ? \'\':\'active\'"><span tooltips tooltip-template><a href="#/admin">{{page}}</a></span></li>';
                        $scope.pages += '<li ng-click="totalpages(startPage + 5 ,3)"><span tooltip-side="top" tooltips tooltip-template="Επόμενες σελίδες"><a  href="#/admin">></a></span></li>'
                                + '<li ng-click="totalpages(total_pages-4,4)"><span tooltip-side="right" tooltips tooltip-template="Τελευταία σελίδα"><a  href="#/admin">»</a></span></li></ul>';
                        if (search_button == 1) {
                            params.bug_id = $scope.sbugid;
                            params.email = $scope.semail;
                            params.mobile = $scope.smobile;
                            params.city = $rootScope.Variables.city_name;
                        } else {
                            delete params['bug_id'];
                            delete params['email'];
                            delete params['mobile'];
                            $scope.panels = [];
                            params.city = $rootScope.Variables.city_name;
                            if (params.status != undefined && params.status instanceof Array) {
                                params.status = params.status.join("|");
                            }
                        }
                        $http.get($rootScope.Variables.host + '/api/1.0/issue', {params: params, headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).success(function (result) {
                            if (result[0] != undefined && Object.keys(result[0]).length != 0) {
                                total_counter = result.length;
                                var counter = 0;
                                var map_counter = 0;
                                if (total_counter == 0) {
                                    mapnloaded = false;
                                    $scope.isloading = false;
                                    $scope.nloaded = false;
                                } else {
                                    $(".paging").html($compile($scope.pages)($scope));
                                    $scope.updatePage = function (activePage) {
                                        $scope.activePage = activePage;
                                        if (($scope.startPage - 1) % 5 == 0) {
                                            $scope.pageIndex = activePage % 5;
                                        } else { //When totalpages are not divided by 5
                                            $scope.pageIndex = 5 - ($scope.total_pages - activePage);
                                        }
                                        if ($scope.pageIndex == 0) {
                                            $scope.pageIndex = 5;
                                        }
                                    };
                                }
                                angular.forEach(result, function (value, key) {
                                    var issue_name = ToGrService.issueName(value.issue);
                                    var panelTitle = ToGrService.statusTitle(value.status, value.resolution);
                                    var description = CommentService.field(value.status);
                                    var id = value.id;
                                    var priority = PriorityTag.priority_type(value.priority);
                                    var severity = SeverityTag.severity_type(value.severity);
                                    //    var issuelink = "http://sense.city/issuemap.php?issue_id=" + value.alias;
                                    var creation_time = value.create_at;
                                    var local_time = moment(creation_time).format('LLLL');
                                    local_time = timegr(local_time);
                                    var time_fromNow = moment(creation_time).fromNow();
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
                                    $scope.panels.push(panel);
                                    $scope.panels[panel.order].lat = value.loc.coordinates[1];
                                    $scope.panels[panel.order].lng = value.loc.coordinates[0];
                                    $scope.center = {lat: value.loc.coordinates[1], lng: value.loc.coordinates[0], zoom: 17};
                                    $scope.ALLmarkers.push({"lat": value.loc.coordinates[1], "lng": value.loc.coordinates[0], "icon": icons[value.issue], "panelid": panel.ArrayID});
                                    counter++;
                                }, $scope.panels);
//                        var webService = new google.maps.StreetViewService();
//                        var issue_coords = new google.maps.LatLng($scope.panels[0].lat, $scope.panels[0].lng);
//                        webService.getPanoramaByLocation(issue_coords, 200, checkNearestStreetView);
                                $scope.isloading = false;
                                $scope.nloaded = false;
                                //  $(window).resize();
                                $(window).trigger('resize');
                            } else {
                                mapnloaded = false;
                                $scope.isloading = false;
                                $scope.nloaded = false;
                            }
                        });
                    };
                    if (sreset == 1) {
                        $scope.totalpages();
                    } else {
                        if (tabchanged == 0) {
                            $scope.bugsearch();
                        } else {
                            $scope.totalpages();
                        }
                    }
                }
                ;
            };
        } else {
//            $scope.ALLcenter = {
//                lat: 37.7881600,
//                lng: 20.8090979,
//                zoom: 11
//            };
//
//
//            $scope.ALLmarkers = [];
//
//            $scope.center = {
//                lat: 37.7881600,
//                lng: 20.8090979,
//                zoom: 11
//            };
//
//            $scope.defaults = {
//                scrollWheelZoom: false
//            };
//
//            $scope.layers = {
//                baselayers: {
//                    openStreetMap: {
//                        name: 'OpenStreetMap',
//                        type: 'xyz',
//                        url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
//                        layerOptions: {
//                            showOnSelector: false,
//                            attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
//                        }
//                    }
//                }
//
//            };
//
//            var redMarker = {
//                type: 'awesomeMarker',
//                icon: 'info-circle',
//                prefix: 'fa',
//                markerColor: 'red'
//            };
//            var icons = {
//                garbage: {
//                    type: 'awesomeMarker',
//                    prefix: 'fa',
//                    icon: 'trash-o',
//                    markerColor: 'red',
//                    shape: 'square'
//
//                },
//                "road-contructor": {
//                    type: 'awesomeMarker',
//                    prefix: 'fa',
//                    icon: 'road',
//                    markerColor: 'red'
//                },
//                plumbing: {
//                    type: 'awesomeMarker',
//                    prefix: 'fa',
//                    icon: 'umbrella',
//                    markerColor: 'red'
//                },
//                lighting: {
//                    type: 'awesomeMarker',
//                    prefix: 'fa',
//                    icon: 'lightbulb-o',
//                    markerColor: 'red'
//                },
//                staticGarbage: {
//                    type: 'extraMarker',
//                    icon: 'fa-trash-o',
//                    prefix: 'fa',
//                    markerColor: 'green',
//                    shape: 'square'
//                },
//                staticGarbageRecycle: {
//                    type: 'extraMarker',
//                    prefix: 'fa',
//                    icon: 'fa-trash-o',
//                    markerColor: 'cyan',
//                    shape: 'square'
//                },
//                staticLighting: {
//                    type: 'extraMarker',
//                    prefix: 'fa',
//                    icon: 'fa-lightbulb-o',
//                    markerColor: 'yellow',
//                    shape: 'square'
//                }
//
//            };
//
//            $scope.$on("leafletDirectiveMarker.issuesmap.click", function (event, args) {
            // Args will contain the marker name and other relevant information
            // console.log("Leaflet Click");
            // console.log(args);
            // console.log(args.model.panelid);
            // console.log($scope.panels[args.model.panelid]);
//                $scope.activePanel = [args.model.panelid];
//                $scope.linkmap($scope.panels[args.model.panelid]);
//            });

//            angular.extend($scope, {events: {
//                    map: {
//                        enable: ['zoomstart', 'drag', 'click', 'mousemove'],
//                        logic: 'emit'
//                    }
//                }
//            });
//            
//            $scope.$on('leafletDirectiveMap.panelmap.zoomstart', function (event) {
//
//            });

//            $(".panel-fullscreen").on("click", function () {
//                panel_fullscreen($(this).parents(".panel"));
//                var map = leafletData.getMap("panelmap").then(
//                        function (map) {
//                            map.invalidateSize(true);
//                        }
//
//                );
//                return false;
//            });
//
//            $scope.$on("leafletDirectiveMarker.panelmap.click", function (event, args) {
            // Args will contain the marker name and other relevant information
            // console.log("Leaflet Click");
            // console.log(args);
            // console.log(args.model.panelid);
            // console.log($scope.panels[args.model.panelid]);
            //               $scope.activePanel = [-1];
            // $scope.linkmap($scope.panels[args.model.panelid]);
            //           });

            //         $scope.$on("leafletDirectiveMarker.panelmap.click", function (event, args) {
            // Args will contain the marker name and other relevant information
            // console.log("Leaflet Click");
            // console.log(args);
            // console.log(args.model.panelid);
            // console.log($scope.panels[args.model.panelid]);
            // $scope.linkmap($scope.panels[args.model.panelid]);
            //       });

//            $scope.issues = ["Item 1", "Item 2"];
//
//            $scope.active = 0;
//            $scope.currentactive = 0;
//
//            $scope.itemClicked = function ($index) {
//                if ($scope.currentactive != $index) {
//                    $scope.active = $index;
//                    $scope.currentactive = $index;
//                } else {
//                    $scope.active = -1;
//                    $scope.currentactive = -1;
//                }
//            };
//            
//             var panel =
//                                    {
//                                        "title": "dsa",
//                                        "style": "dsa",
//                                        "icon": "dsa",
//                                        "time": "dsa",
//                                        "issuelink": "dsa",
//                                        "issuenameGR": "sda",
//                                        "issuenameEN": "ds",
//                                        "id": "sda",
//                                        "status": "dsa",
//                                        "new_status": "dsa",
//                                        "resolution": "dsa",
//                                        "new_resolution": "dsad",
//                                        "component": "asasd",
//                                        "admin": false,
//                                        "ArrayID": "dsads",
//                                        "comment": "dssad",
//                                        "initialdesc": "dsasd",
//                                        "mongoId": "dssad"
//                                    };
//            
//            $scope.panels = [];
//            
//            $scope.panels.push(panel);
//            
//            $scope.admin = function (panel) {
            // $scope.initResetPanel(panel);
//                $scope.selectedStatus = null;
//                $scope.selectedResolution = null;
//                $scope.comment = null;
            // console.log($scope.selectedStatus + $scope.selectedResolution + $scope.comment);
            // console.log(panel);
            //        panel.admin = true;
            // $scope.multipleActivePanels = [panel.ArrayID];

//                $scope.statuses = [{"gr": "Ανοιχτό", "en": "CONFIRMED"}, {"gr": "Σε εκτέλεση", "en": "IN_PROGRESS"}, {"gr": "Ολοκληρωμένο", "en": "RESOLVED"}];
//                $scope.resolutions = [{"gr": "Αποκατάσταση", "en": "FIXED"}, {"gr": "Εσφαλμένη Αναφορά", "en": "INVALID"}, {"gr": "Μη αποκατάσταση / Απόρριψη από Δήμο", "en": "WONTFIX"}, {"gr": "Έχει ήδη αναφερθεί σε άλλο αίτημα", "en": "DUPLICATE"}];
            // $scope.components = [{"gr":"Ανοιχτό","en":"CONFIRMED"},{"gr":"Σε εκτέλεση","en":"IN_PROGRESS"},{"gr":"Ολοκληρωμένο","en":"RESOLVED"}];
            //          $scope.components = ["Τμήμα επίλυσης προβλημάτων", "ΤΜΗΜΑ ΚΑΘΑΡΙΟΤΗΤΑΣ", "ΤΜΗΜΑ ΟΔΟΠΟΙΙΑΣ", "ΤΜΗΜΑ ΦΩΤΙΣΜΟΥ"];


//                console.log("----------------------------------------------------");
//                console.log(panel.status);
//                $scope.selectedComponent = panel.component;
//                $scope.selectedStatus = panel.status;
//
//                if (panel.resolution.gr !== undefined)
//                {
//                    $scope.selectedResolution = {"gr": panel.resolution.gr, "en": panel.resolution.en};
//                } else {
//                    $scope.selectedResolution = {"gr": "Αποκατάσταση", "en": "FIXED"};
//                }
//            };
//
//
//
//            $scope.initResetPanel = function (panel) {
//                $scope.selectedStatus = null;
//                $scope.selectedResolution = null;
//            };
//
//            $scope.resetPanel = function (panel) {
//                console.log("BEFORE:");
//                console.log($scope.selectedStatus);
//                console.log($scope.selectedResolution);
//                console.log($scope.comment);
//                panel.admin = false;
//                $scope.selectedStatus = null;
//                $scope.selectedResolution = null;
//                $scope.comment = null;
//
//                console.log("AFTER:");
//                console.log($scope.selectedStatus);
//                console.log($scope.selectedResolution);
//                console.log($scope.comment);
//            };

            $cookieStore.remove("uuid");
            $cookieStore.remove("city");
            $cookieStore.remove("role");
            $cookieStore.remove("department");
            $cookieStore.remove("email");
            $cookieStore.remove("username");
        }
    }]);