var appControllers = angular.module('adminapp.adminctrl', ['ngCookies', '720kb.tooltips'])
        .constant("config", {"host": "api.sense.city", "bugzilla_host": "nam.ece.upatras.gr", "port": "4000", "bugzilla_path": "/bugzilla"});

//appControllers.config([
//  '$httpProvider',
//  function($httpProvider) {
//    $httpProvider.defaults.withCredentials = true;
//  }]);

appControllers.controller('adminController', ['$scope', '$rootScope', '$window', '$http', '$cookieStore', '$templateCache', '$compile', '$location', 'EndPointService', 'BugService', 'ToGrService', 'PriorityTag', 'SeverityTag', 'PriorityTagEn', 'SeverityTagEn', 'ResolutionTagEn', 'CommentService', 'Issue2MapService', 'FixPoints2MapService', 'Tab2BugzillaService', 'FixPointsMarkerService', 'leafletData', 'config', function ($scope, $rootScope, $window, $http, $cookieStore, $templateCache, $compile, $location, EndPointService, BugService, ToGrService, PriorityTag, SeverityTag, PriorityTagEn, SeverityTagEn, ResolutionTagEn, CommentService, Issue2MapService, FixPoints2MapService, Tab2BugzillaService, FixPointsMarkerService, leafletData, config) {
        var summary;
        var params;
        var tabchanged = 2;
        var init = 1;
        var isfixed = 0;
        var mapnloaded = true;

        $scope.isloading = true;

        $scope.duplicof = "";

        $scope.nloaded = true;

        var url_path = $location.absUrl().split("//");
        var sub_domain = url_path[1].split(".");

        var mainInfo = $http.get('../config/' + sub_domain[0] + '.json').success(function (response) {

            $rootScope.Variables = {
                city_name: sub_domain[0],
                lat_center: response.lat_center,
                long_center: response.long_center,
                img_logo: "images/city_logos/" + response.city_name + ".jpg",
                bugzilla_products: response.bugzilla_products,
                APIURL: response.APIURL,
                bugzilla: response.bugzilla,
                ALLISSUESAPIURL: response.ALLISSUESAPIURL,
                activate_user_URL: response.active_user_URL,
                APIADMIN: response.APIADMIN,
                map_zoom: 12
            };

            return $rootScope;
        });

        $scope.logout = function ($event) {
            $http.get('http://' + config.host + ':' + config.port + '/api/1.0/logout', {headers: {'x-uuid': $cookieStore.get("uuid")}}).success(function (response) {
                $cookieStore.remove("uuid");
                $cookieStore.remove("city");
                $cookieStore.remove("role");
                $cookieStore.remove("department");
                $cookieStore.remove("email");
                $cookieStore.remove("username");
                $cookieStore.remove("bug_token");
                $window.location.href = "/admin/login.html";
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

        $(window).on('resize', function () {
            if ($(".panel.panel-default").width() <= 600) { //isws prepei na checkaroume ean einai ston xarth
                isfixed = 0;
            } else {
                isfixed = 1;
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

        authorizedu();
        username();
        userole();

        $(document).on('scroll', function () {
            var bottom = $('.xn-profile').position().top;
            var outerHeight = $('.xn-profile').height();
            if ($(window).scrollTop() > bottom + outerHeight && $(window).width() > 600) {
                if (fixed == 0) {
                    $(".panel.panel-default").css({position: 'fixed', left: '58%', top: '3%', width: '40%'});
                }
            } else {
                $(".panel.panel-default").removeAttr('style');
            }
        });

        $scope.removeFixed = function () {
            if (isfixed == 0) {
                isfixed = 1;
                $(".panel.panel-default").removeAttr('style');
            } else {
                isfixed = 0;
            }
        };

        $scope.totalpages = function () {
            if (($scope.assignissues == false || $scope.closedissues == true)) {
                if (summary == "all") {
                    parameter = {"product": $cookieStore.get("city"), "component": $scope.component, "order": "bugs.bug_id desc", "status": params.status};
                } else {
                    parameter = {"product": $cookieStore.get("city"), "component": $scope.component, "order": "bugs.bug_id desc", "status": params.status, "summary": summary};
                }
            } else {
                if (summary == "all") {
                    parameter = {"product": $cookieStore.get("city"), "component": ["Τμήμα επίλυσης προβλημάτων", "Αυτοτελές τμήμα Πολιτικής Προστασίας", "Τμήμα Συγκοινωνιακού & Κυκλοφοριακού Σχεδιασμού", "Τμήμα Αποκομιδής Απορριμμάτων & Ανακυκλώσιμων Υλικών", "Τμήμα Αυτεπιστασίας Έργων Υποδομής", "Τμήμα Αυτεπιστασίας Κοινόχρηστων Χώρων, Κτιρίων & Ηλεκτροφωτισμο", "Τμήμα Ελέγχου Κοινοχρήστων Χώρων", "Τμήμα Καθαρισμού Κοινοχρήστων Χώρων & Ειδικών Συνεργείων", "Τμήμα Μελετών Έργων & Πρασίνο", "Τμήμα Οδοποιίας", "Τμήμα Πρασίνου"], "order": "bugs.bug_id desc", "status": params.status};
                } else {
                    parameter = {"product": $cookieStore.get("city"), "component": ["Τμήμα επίλυσης προβλημάτων", "Αυτοτελές τμήμα Πολιτικής Προστασίας", "Τμήμα Συγκοινωνιακού & Κυκλοφοριακού Σχεδιασμού", "Τμήμα Αποκομιδής Απορριμμάτων & Ανακυκλώσιμων Υλικών", "Τμήμα Αυτεπιστασίας Έργων Υποδομής", "Τμήμα Αυτεπιστασίας Κοινόχρηστων Χώρων, Κτιρίων & Ηλεκτροφωτισμο", "Τμήμα Ελέγχου Κοινοχρήστων Χώρων", "Τμήμα Καθαρισμού Κοινοχρήστων Χώρων & Ειδικών Συνεργείων", "Τμήμα Μελετών Έργων & Πρασίνο", "Τμήμα Οδοποιίας", "Τμήμα Πρασίνου"], "order": "bugs.bug_id desc", "status": params.status, "summary": summary};
                }
            }

            $http.post('http://' + config.host + ':' + config.port + '/api/1.0/admin/bugs/search', parameter, {headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).success(
                    function (response, status, headers, conf) {
                        $scope.total_pages = Math.ceil(response.length / 20);
                        if (init == 0) {
                            if (tabchanged == 1) {
                                tabchanged = 0;
                                $scope.refreshPages(1);
                                $scope.bugsearch();
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

        function timegr(local_time) { //edw olo
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

        $scope.changeTab = function (index) {
            if (tabchanged == 2) {
                tabchanged = 0;
            } else {
                tabchanged = 1;
            }

            if ($cookieStore.get("role") == "cityAdmin" || $cookieStore.get("role") == "sensecityAdmin") {
                $scope.tabs.activeTab = index;
                var issue = Tab2BugzillaService.issue_type(index);
                if (issue == 'all') {
                    $scope.tabs.activeTitle = "Όλα τα προβλήματα";
                    $scope.tabs.activeIcon = "fa ion-ios-analytics-outline";
                } else if (issue == 'garbage') {
                    $scope.tabs.activeTitle = "Καθαριότητας";
                    $scope.tabs.activeIcon = "fa fa-trash-o";
                } else if (issue == 'lighting') {
                    $scope.tabs.activeTitle = "Ηλεκτροφωτισμού";
                    $scope.tabs.activeIcon = "fa fa-lightbulb-o";
                } else if (issue == 'road-contructor') {
                    $scope.tabs.activeTitle = "Πεζοδρομίου/Δρόμου/Πλατείας";
                    $scope.tabs.activeIcon = "fa fa-road";
                } else if (issue == "protection-policy") {
                    $scope.tabs.activeTitle = "Πολιτικής Προστασίας";
                    $scope.tabs.activeIcon = "fa fa-shield";
                } else if (issue == "green") {
                    $scope.tabs.activeTitle = "Πρασίνου";
                    $scope.tabs.activeIcon = "fa fa-tree";
                } else if (issue == "enviroment") {
                    $scope.tabs.activeTitle = "Περιβάλλοντος";
                    $scope.tabs.activeIcon = "fa fa-leaf";
                }
                $scope.activePanel = -1;
                $scope.currentactive = -1;
//            else if (issue == 'plumbing') {
//                $scope.tabs.activeTitle = "Ύδρευσης/Αποχέτευσης";
//                $scope.tabs.activeIcon = "fa fa-umbrella";
//            }
            } else {
                $scope.tabs.activeTab = index;

                $scope.tabs.activeTitle = $scope.tabs[index].title;
                $scope.tabs.activeIcon = $scope.tabs[index].icon;
            }
        };

          $scope.full_panel = function(){
//        $(".panel-fullscreen").on("click", function () {
//            panel_fullscreen($(this).parents(".panel"));
            panel_fullscreen($(".panel.default-panel"));
            if ($scope.activePanel == -1) {
                var map = leafletData.getMap("issuesmap").then(
                        function (map) {
                            map.invalidateSize(true);
                        }

                );
            } else {
                var map = leafletData.getMap("panelmap").then(
                        function (map) {
                            map.invalidateSize(true);
                        }

                );
            }
            return false;
        }
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
                if (department == "Τμήμα Αποκομιδής Απορριμμάτων & Ανακυκλώσιμων Υλικών") {
                    $scope.tabs = [{
                            "title": "Τμήμα Αποκομιδής Απορριμμάτων & Ανακυκλώσιμων Υλικών",
                            "content": "Παρουσίαση προβλημάτων αποκομιδής απορριμμάτων & ανακυκλώσιμων υλικών",
                            "icon": "fa fa-trash-o"
                        }];
                    $scope.tabs.activeTab = 0;
                } else if (department == "Τμήμα Αυτεπιστασίας Κοινόχρηστων Χώρων, Κτιρίων & Ηλεκτροφωτισμο") {
                    $scope.tabs = [{
                            "title": "Τμήμα Αυτεπιστασίας Κοινόχρηστων Χώρων, Κτιρίων & Ηλεκτροφωτισμο",
                            "content": "Παρουσίαση προβλημάτων κοινόχρηστων χώρων κτιρίων & ηλεκτροφωτισμού",
                            "icon": "fa fa-lightbulb-o"
                        }];
                    $scope.tabs.activeTab = 1;
                } else if (department == "Τμήμα Οδοποιίας") {
                    $scope.tabs = [{
                            "title": "Τμήμα Οδοποιίας",
                            "content": "Παρουσίαση προβλημάτων Οδοποιίας",
                            "icon": "fa fa-road"
                        }];
                    $scope.tabs.activeTab = 2;
                } else if (department == "Αυτοτελές τμήμα Πολιτικής Προστασίας") {
                    $scope.tabs = [{
                            "title": "Αυτοτελές τμήμα Πολιτικής Προστασίας",
                            "content": "Παρουσίαση προβλημάτων πολιτικής προστασίας",
                            "icon": "fa fa-shield"
                        }];
                    $scope.tabs.activeTab = 3;
                } else if (department == "Τμήμα Πρασίνου") {
                    $scope.tabs = [{
                            "title": "Τμήμα Πρασίνου",
                            "content": "Παρουσίαση προβλημάτων πρασίνου",
                            "icon": "fa fa-tree"
                        }];
                    $scope.tabs.activeTab = 4;
                } else if (department == "Τμήμα Συγκοινωνιακού & Κυκλοφοριακού Σχεδιασμού") {
                    $scope.tabs = [{
                            "title": "Τμήμα Συγκοινωνιακού & Κυκλοφοριακού Σχεδιασμού",
                            "content": "Παρουσίαση προβλημάτων συγκοινωνιακού & κυκλοφοριακού σχεδιασμού",
                            "icon": "fa fa-car"
                        }];
                    $scope.tabs.activeTab = 5;
                } else if (department == "Τμήμα Αυτεπιστασίας Έργων Υποδομής") {
                    $scope.tabs = [{
                            "title": "Τμήμα Αυτεπιστασίας Έργων Υποδομής",
                            "content": "Παρουσίαση προβλημάτων αυτεπιστασίας έργων υποδομής",
                            "icon": "fa fa-university"
                        }];
                    $scope.tabs.activeTab = 6;
                } else if (department == "Τμήμα Ελέγχου Κοινοχρήστων Χώρων") {
                    $scope.tabs = [{
                            "title": "Τμήμα Ελέγχου Κοινοχρήστων Χώρων",
                            "content": "Παρουσίαση προβλημάτων κοινοχρήστων χώρων",
                            "icon": "fa fa-id-card"
                        }];
                    $scope.tabs.activeTab = 7;
                } else if (department == "Τμήμα Καθαρισμού Κοινοχρήστων Χώρων & Ειδικών Συνεργείων") {
                    $scope.tabs = [{
                            "title": "Τμήμα Καθαρισμού Κοινοχρήστων Χώρων & Ειδικών Συνεργείων",
                            "content": "Παρουσίαση προβλημάτων καθαρισμού κοινοχρήστων χώρων & ειδικών συνεργείων",
                            "icon": "fa fa-wrench"
                        }];
                    $scope.tabs.activeTab = 8;
                } else if (department == "Τμήμα Μελετών Έργων & Πρασίνο") {
                    $scope.tabs = [{
                            "title": "Τμήμα Μελετών Έργων & Πρασίνο",
                            "content": "Παρουσίαση προβλημάτων μελετών έργων & πρασίνο",
                            "icon": "fa fa-leaf"
                        }];
                    $scope.tabs.activeTab = 9;
                }
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
                $scope.tabs = [
                    {
                        "title": "Όλα τα προβλήματα",
                        "content": "Παρουσίαση όλων των δηλωμένων προβλημάτων",
                        "icon": "fa ion-ios-analytics-outline"
                    },
                    {
                        "title": "Καθαριότητας",
                        "content": "Παρουσίαση προβλημάτων καθαριότητας",
                        "icon": "fa fa-trash-o"
                    },
                    {
                        "title": "Ηλεκτροφωτισμού",
                        "content": "Παρουσίαση προβλημάτων ηλεκτροφωτισμού",
                        "icon": "fa fa-lightbulb-o"
                    },
                    {
                        "title": "Πεζοδρομίου/Δρόμου/Πλατείας",
                        "content": "Παρουσίαση προβλημάτων Πεζοδρομίου/Δρόμου/Πλατείας",
                        "icon": "fa fa-road"
                    },
                    {
                        "title": "Πολιτικής Προστασίας",
                        "content": "Παρουσίαση προβλημάτων Πολιτικής Προστασίας",
                        "icon": "fa fa-shield"
                    },
                    {
                        "title": "Πρασίνου",
                        "content": "Παρουσίαση προβλημάτων Πρασίνου",
                        "icon": "fa fa-tree"
                    },
                    {
                        "title": "Περιβάλλοντος",
                        "content": "Παρουσίαση προβλημάτων Περιβάλλοντος",
                        "icon": "fa fa-leaf"
                    }
//                    ,
//                    {
//                        "title": "Ύδρευσης/Αποχέτευσης",
//                        "content": "Παρουσίαση προβλημάτων ύδρευσης/αποχέτευσης",
//                        "icon": "fa fa-umbrella"
//                    }
                ];
                $scope.tabs.activeTab = 0;
            }

            $scope.panels = [];

            $scope.activePanel = [];
            moment.locale('el');

            $scope.closedissues = false;
            $scope.assignissues = false;
            $scope.allclosedissues = false;

            if ($cookieStore.get("city") == "patras" || $cookieStore.get("city") == "testcity1") {

                $scope.ALLcenter = {
                    lat: 38.248028,
                    lng: 21.7583104,
                    zoom: 12
                };
            } else if ($cookieStore.get("city") == "Zakynthos" || $cookieStore.get("city") == "testweb") {
                $scope.ALLcenter = {
                    lat: 37.7881600,
                    lng: 20.8090979,
                    zoom: 11
                };
            }
            $scope.ALLmarkers = [];

            if ($cookieStore.get("city") == "patras" || $cookieStore.get("city") == "testcity1") {

                $scope.center = {
                    lat: 38.248028,
                    lng: 21.7583104,
                    zoom: 12
                };
            } else if ($cookieStore.get("city") == "Zakynthos" || $cookieStore.get("city") == "testweb") {
                $scope.center = {
                    lat: 37.7881600,
                    lng: 20.8090979,
                    zoom: 11
                };
            }

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
            var icons = {
                garbage: {
                    type: 'awesomeMarker',
                    prefix: 'fa',
                    icon: 'trash-o',
                    markerColor: 'red',
                    shape: 'square'

                },
                "road-contructor": {
                    type: 'awesomeMarker',
                    prefix: 'fa',
                    icon: 'road',
                    markerColor: 'red'
                },
                plumbing: {
                    type: 'awesomeMarker',
                    prefix: 'fa',
                    icon: 'umbrella',
                    markerColor: 'red'
                },
                lighting: {
                    type: 'awesomeMarker',
                    prefix: 'fa',
                    icon: 'lightbulb-o',
                    markerColor: 'red'
                }, "protection-policy": {
                    type: 'awesomeMarker',
                    prefix: 'fa',
                    icon: 'shield',
                    markerColor: 'red'
                }, green: {
                    type: 'awesomeMarker',
                    prefix: 'fa',
                    icon: 'tree',
                    markerColor: 'red'
                }, enviroment: {
                    type: 'awesomeMarker',
                    prefix: 'fa',
                    icon: 'leaf',
                    markerColor: 'red'
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

            $scope.$on("leafletDirectiveMarker.issuesmap.click", function (event, args) {
                // Args will contain the marker name and other relevant information
                // console.log("Leaflet Click");
                // console.log(args);
                // console.log(args.model.panelid);
                // console.log($scope.panels[args.model.panelid]);
                $scope.activePanel = args.model.panelid;
                $scope.currentactive = args.model.panelid;
                $scope.linkmap($scope.panels[args.model.panelid]);
                setTimeout(function () {
                    $("html,body").scrollTop($(".timeline-item-active span").offset().top);
                }, 400);
            });

            $scope.$on("leafletDirectiveMarker.panelmap.click", function (event, args) {
                // Args will contain the marker name and other relevant information
                // console.log("Leaflet Click");
                // console.log(args);
                // console.log(args.model.panelid);
                // console.log($scope.panels[args.model.panelid]);
                $scope.activePanel = -1;
                $scope.currentactive = -1;
                // $scope.linkmap($scope.panels[args.model.panelid]);
            });

            var pageload = function (callback) {

                $scope.activePage = 1;
                $scope.startPage = 1;
                $scope.activePanel = -1;
                $scope.currentactive = -1;
                $scope.pageIndex = 1;
                $scope.isloading = true;

                if ($cookieStore.get("role") == "cityAdmin" || $cookieStore.get("role") == "sensecityAdmin") {
                    $scope.changeTab($scope.tabs.activeTab);
                } else {
                    $scope.changeTab(0);
                }

                $scope.itemClicked = function ($index, event) {
                    if ($scope.currentactive != $index) {
//                        if ($scope.currentactive != -1 && $scope.currentactive < $index) {
//                            setTimeout(function () {
//                                $("html,body").scrollTop($(event.target).offset().top - $("#activePanel").height());
//                            }, 500);
//                        } else {
                        setTimeout(function () {
                            $("html,body").scrollTop($(event.target).offset().top);
                        }, 400);

//                        }
                        $scope.activePanel = $index;
                        $scope.currentactive = $index;
                    } else {
                        $scope.activePanel = -1;
                        $scope.currentactive = -1;
                    }
                };


                var issue_type = Tab2BugzillaService.issue_type($scope.tabs.activeTab);

                $scope.component = "Τμήμα επίλυσης προβλημάτων";
                summary = "all";

                if (issue_type != "all" && ($scope.role == "sensecityAdmin" || $scope.role == "cityAdmin"))
                {
                    params.summary = issue_type;
                } else if ($scope.role == "departmentAdmin" || $scope.role == "departmentUser") {
                    if ($scope.tabs[0].title == 'Τμήμα Αποκομιδής Απορριμμάτων & Ανακυκλώσιμων Υλικών') {
                        $scope.component = "Τμήμα Αποκομιδής Απορριμμάτων & Ανακυκλώσιμων Υλικών";
                    } else if ($scope.tabs[0].title == 'Τμήμα Οδοποιίας') {
                        $scope.component = "Τμήμα Οδοποιίας";
                    } else if ($scope.tabs[0].title == 'Πεζοδρομίου/Δρόμου/Πλατείας') {
                        $scope.component = "Τμήμα πεζοδρομίου/δρόμου/πλατείας";
                    } else if ($scope.tabs[0].title == 'Αυτοτελές τμήμα Πολιτικής Προστασίας') {
                        $scope.component = "Αυτοτελές τμήμα Πολιτικής Προστασίας";
                    } else if ($scope.tabs[0].title == 'Τμήμα Πρασίνου') {
                        $scope.component = "Τμήμα Πρασίνου";
                    } else if ($scope.tabs[0].title == 'Τμήμα Συγκοινωνιακού & Κυκλοφοριακού Σχεδιασμού') {
                        $scope.component = "Τμήμα Συγκοινωνιακού & Κυκλοφοριακού Σχεδιασμού";
                    } else if ($scope.tabs[0].title == 'Τμήμα Αυτεπιστασίας Έργων Υποδομής') {
                        $scope.component = "Τμήμα Αυτεπιστασίας Έργων Υποδομής";
                    } else if ($scope.tabs[0].title == 'Τμήμα Ελέγχου Κοινοχρήστων Χώρων') {
                        $scope.component = "Τμήμα Ελέγχου Κοινοχρήστων Χώρων";
                    } else if ($scope.tabs[0].title == 'Τμήμα Πρασίνου') {
                        $scope.component = "Τμήμα Πρασίνου";
                    } else if ($scope.tabs[0].title == 'Τμήμα Καθαρισμού Κοινοχρήστων Χώρων & Ειδικών Συνεργείων') {
                        $scope.component = "Τμήμα Καθαρισμού Κοινοχρήστων Χώρων & Ειδικών Συνεργείων";
                    } else if ($scope.tabs[0].title == 'Τμήμα Μελετών Έργων & Πρασίνο') {
                        $scope.component = "Τμήμα Μελετών Έργων & Πρασίνο";
                    }
                }
                params = {"product": $cookieStore.get("city"), "component": $scope.component, "order": "bug_id DESC", "limit": "20", "include_fields": ["cf_comment", "cf_description", "component", "cf_sensecityissue", "status", "id", "alias", "summary", "creation_time", "whiteboard", "url", "resolution", "cf_mobile", "cf_email", "cf_creator", "severity", "priority"]};

                if ($scope.role == "cityAdmin" || $scope.role == "sensecityAdmin") {
                    params.status = ["CONFIRMED", "IN_PROGRESS"];
                } else if ($scope.role == "departmentAdmin" || $scope.role == "departmentUser") {
                    params.status = ["IN_PROGRESS"];
                }


                $scope.refreshPages = function (startPage, arrow_type) {
                    if (startPage < 0) {
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
                        if (($scope.startPage - 1 % 5) == 0) {
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

                $scope.totalpages();

                $scope.bugsearchinit = function () {

                    $scope.pages = '<ul style="margin-bottom: -3%;margin-top:12%" class="pagination pagination-sm pull-right"><li ng-click="totalpages();refreshPages(1,1);refresh()"><span tooltip-side="left" tooltips tooltip-template="Πρώτη σελίδα"><a href="#">«</a></span></li>'
                            + '<li ng-click="totalpages();refreshPages(startPage - 5,2);refresh()"><span tooltip-side="top" tooltips tooltip-template="Προηγούμενες σελίδες"><a  href="#"><</a></span></li>';

                    $scope.refreshPages(1);

                    $scope.pages += '<li ng-repeat="page in page_set"  ng-click="updatePage(page);refresh()" ng-class="( $index + 1 != pageIndex) ? \'\':\'active\'"><span tooltips tooltip-template><a href="#">{{page}}</a></span></li>';

                    $scope.pages += '<li ng-click="totalpages();refreshPages(startPage + 5,3);refresh()"><span tooltip-side="top" tooltips tooltip-template="Επόμενες σελίδες"><a  href="#">></a></span></li>'
                            + '<li ng-click="totalpages();refreshPages(total_pages - 4,4);refresh()"><span tooltip-side="right" tooltips tooltip-template="Τελευταία σελίδα"><a  href="#">»</a></span></li></ul>';


                    $http.post('http://' + config.host + ':' + config.port + '/api/1.0/admin/bugs/search', params, {headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).success(function (result) {


                        var total_counter = result.length;
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
                                if (($scope.startPage - 1 % 5) == 0) {
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
                            var issue_name = ToGrService.issueName(value.summary);
                            var panelTitle = ToGrService.statusTitle(value.status, value.resolution);
                            var priority = PriorityTag.priority_type(value.priority);
                            var severity = SeverityTag.severity_type(value.severity);
                            var description = CommentService.field(value.status);
                            var id = value.id;
                            var issuelink = "http://sense.city/issuemap.php?issue_id=" + value.alias;
                            var creation_time = value.creation_time;
                            var local_time = moment(creation_time).format('LLLL');
                            local_time = timegr(local_time); //edw
                            var time_fromNow = moment(creation_time).fromNow();
                            var parameter;

                            if (!(value.component == "default")) {
                                $http.post('http://' + config.host + ':' + config.port + '/api/1.0/admin/bugs/comment', {id: id}, {headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).success(
                                        function (response, status, headers, config) {
                                            counter++;
                                            var history = [];
                                            var com;
                                            for (var i = 1; i < response.bugs[Object.keys(response.bugs)[0]].comments.length; i++) {
                                                com = response.bugs[Object.keys(response.bugs)[0]].comments[i].text;
                                                if (com == "undefined") {
                                                    com = "";
                                                }
                                                var tag_pos;

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
                                                    var htime = timegr(moment(response.bugs[Object.keys(response.bugs)[0]].comments[i].time).format('LLLL')); //edw
                                                    if (response.bugs[Object.keys(response.bugs)[0]].comments[i].tags[tag_pos] == "CONFIRMED") {
                                                        history.push({"text": com, "timestamp": htime, "state": "Ανοιχτό", "style": {'color': '#e42c2c'}, "class": 'glyphicon glyphicon-exclamation-sign'});//edw
                                                    } else if (response.bugs[Object.keys(response.bugs)[0]].comments[i].tags[tag_pos] == "IN_PROGRESS") {
                                                        history.push({"text": com, "timestamp": htime, "state": "Σε εκτέλεση", "style": {'color': 'orange'}, "class": 'glyphicon glyphicon-question-sign'});//edw
                                                    } else {
                                                        history.push({"text": com, "timestamp": htime, "state": "Ολοκληρωμένο", "style": {'color': 'green'}, "class": 'glyphicon glyphicon-ok-sign'});//edw
                                                    }
                                                }
                                            }

                                            var panel =
                                                    {
                                                        "title": "#" + Object.keys(response.bugs)[0] + " (" + issue_name + "-" + value.url + ") -- " + time_fromNow, //edw
                                                        "style": panelTitle.status_style,
                                                        "icon": panelTitle.status_icon,
                                                        "time": local_time,
                                                        "issuelink": issuelink,
                                                        "issuenameGR": issue_name,
                                                        "issuenameEN": value.summary,
                                                        "creator": value.cf_creator,
                                                        "tel": value.cf_mobile,
                                                        "email": value.cf_email,
                                                        "id": Object.keys(response.bugs)[0],
                                                        "status": panelTitle.status,
                                                        "new_status": "",
                                                        "resolution": panelTitle.resolution,
                                                        "new_resolution": "",
                                                        "component": value.component,
                                                        "admin": false,
                                                        "ArrayID": key,
                                                        "priority": {en: value.priority, gr: priority},
                                                        "severity": {en: value.severity, gr: severity},
                                                        "comment": com,
                                                        "initialdesc": value.cf_description,
                                                        "mongoId": value.alias,
                                                        "history": history
                                                    };

                                            if (panel.comment == undefined) {
                                                panel.comment = '';
                                            }
                                            $scope.panels.push(panel);
                                            if (counter == total_counter) {
                                                counter = 0;
                                                $scope.panels.sort(function (a, b) {
                                                    return b.id - a.id;
                                                });
                                                $scope.isloading = false;
                                                $(window).resize();
                                                if ($scope.isloading == false && mapnloaded == false) {
                                                    $scope.nloaded = false;
                                                }
                                            }

                                            Issue2MapService.query({issueID: panel.mongoId[0]}, function (issue) {
                                                map_counter++;
                                                if (issue[0] != undefined) {
                                                    for (i = 0; i < $scope.panels.length; i++) {
                                                        if ($scope.panels[i].mongoId[0] == issue[0]._id) {
                                                            if (issue[0].image_name != "" && issue[0].image_name != "no-image") {
                                                                $scope.panels[i].image = issue[0].image_name;
                                                            } else {
                                                                $scope.panels[i].image = "../images/EmptyBox-Phone.png";
                                                            }
                                                        }
                                                    }
                                                    $scope.center = {lat: issue[0].loc.coordinates[1], lng: issue[0].loc.coordinates[0], zoom: 17};
                                                    $scope.ALLmarkers.push({"lat": issue[0].loc.coordinates[1], "lng": issue[0].loc.coordinates[0], "icon": icons[panel.issuenameEN], "panelid": panel.ArrayID});
                                                }
                                                if (map_counter == total_counter) {
                                                    mapnloaded = false;
                                                    $(window).resize();
                                                    if ($scope.isloading == false && mapnloaded == false) {
                                                        $scope.nloaded = false;
                                                    }
                                                }
                                            }, function (response) {
                                                map_counter++;
                                                if (map_counter == total_counter) {
                                                    mapnloaded = false;
                                                    $(window).resize();
                                                    if ($scope.isloading == false && mapnloaded == false) {
                                                        $scope.nloaded = false;
                                                    }
                                                }
                                            });
                                        });
                            }
                        }, $scope.panels);
                    });
                };
            };

            pageload(function (callback) {
            });

            $scope.linkmap = function (panel) {

                $scope.markers = [];

                $scope.panel_issue = panel.issuenameGR;
                $scope.initial_desc = panel.initialdesc;
                Issue2MapService.query({issueID: panel.mongoId[0]}, function (issue) {
                    $scope.panel_image = issue[0].image_name;
                    $scope.center = {lat: issue[0].loc.coordinates[1], lng: issue[0].loc.coordinates[0], zoom: 17};
                    $scope.markers = [{"lat": issue[0].loc.coordinates[1], "lng": issue[0].loc.coordinates[0], "icon": icons[panel.issuenameEN]}];


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
                $scope.components = ["Τμήμα επίλυσης προβλημάτων", "Αυτοτελές τμήμα Πολιτικής Προστασίας", "Τμήμα Συγκοινωνιακού & Κυκλοφοριακού Σχεδιασμού", "Τμήμα Αποκομιδής Απορριμμάτων & Ανακυκλώσιμων Υλικών", "Τμήμα Αυτεπιστασίας Έργων Υποδομής", "Τμήμα Αυτεπιστασίας Κοινόχρηστων Χώρων, Κτιρίων & Ηλεκτροφωτισμο", "Τμήμα Ελέγχου Κοινοχρήστων Χώρων", "Τμήμα Καθαρισμού Κοινοχρήστων Χώρων & Ειδικών Συνεργείων", "Τμήμα Μελετών Έργων & Πρασίνο", "Τμήμα Οδοποιίας", "Τμήμα Πρασίνου"];
                $scope.priorities = ["Υψηλή", "Κανονική", "Χαμηλή"];
                $scope.severities = ["Κρίσιμο", "Μείζον", "Κανονικό", "Ελάσσον", "Μηδαμινό", "Βελτίωση"];

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
                        $http.post('http://' + config.host + ':' + config.port + '/api/1.0/admin/bugs/update', obj, {headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).success(function (result) {
                            $http.post('http://' + config.host + ':' + config.port + '/api/1.0/admin/bugs/comment/add', {"comment": $scope.comment, "id": obj.ids[0]}, {headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).success(
                                    function (response, status, headers, conf) {
                                        var comp;
                                        switch (panel.component) {
                                            case "Τμήμα Αποκομιδής Απορριμμάτων & Ανακυκλώσιμων Υλικών":
                                                comp = "garbage";
                                                break;
                                            case "Τμήμα Αυτεπιστασίας Κοινόχρηστων Χώρων, Κτιρίων & Ηλεκτροφωτισμο":
                                                comp = "lighting";
                                                break;
                                            case "Τμήμα Πρασίνου":
                                                comp = "green";
                                                break;
                                            case "Τμήμα επίλυσης προβλημάτων":
                                                comp = "all";
                                                break;
                                            case "Αυτοτελές τμήμα Πολιτικής Προστασίας":
                                                comp = "protection";
                                                break;
                                            case "Τμήμα Οδοποιίας":
                                                comp = "road-contructor";
                                                break;
                                            case "Τμήμα Συγκοινωνιακού & Κυκλοφοριακού Σχεδιασμού":
                                                comp = "transport";
                                                break;
                                            case "Τμήμα Αυτεπιστασίας Έργων Υποδομής":
                                                comp = "infrastructure";
                                                break;
                                            case "Τμήμα Ελέγχου Κοινοχρήστων Χώρων":
                                                comp = "shared";
                                                break;
                                            case "Τμήμα Μελετών Έργων & Πρασίνο":
                                                comp = "studies";
                                                break;
                                            case "Τμήμα Καθαρισμού Κοινοχρήστων Χώρων & Ειδικών Συνεργείων":
                                                comp = "clean";
                                                break;
                                        }
                                        $http.post('http://' + config.host + ':' + config.port + '/api/1.0/admin/bugs/comment/tags', {"add": [panel.status.en, comp], "id": response.id}, {headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).success(
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

            $scope.toggle_closedissues = function () {
                if ($scope.closedissues == false) {
                    $scope.closedissues = true;
                    $scope.allclosedissues = false;
                    $scope.assignissues = false;
                } else {
                    $scope.closedissues = false;
                }
                $scope.activePanel = -1;
                $scope.currentactive = -1;
            };

            $scope.toggle_allclosedissues = function () {
                if ($scope.allclosedissues == false) {
                    $scope.allclosedissues = true;
                    $scope.closedissues = false;
                    $scope.assignissues = false;
                } else {
                    $scope.allclosedissues = false;
                }
                $scope.activePanel = -1;
                $scope.currentactive = -1;
            };

            $scope.toggle_inprogressissues = function () {
                if ($scope.assignissues == false) {
                    $scope.assignissues = true;
                    $scope.allclosedissues = false;
                    $scope.closedissues = false;
                } else {
                    $scope.assignissues = false;
                }
                $scope.activePanel = -1;
                $scope.currentactive = -1;
            };

            $scope.refresh = function () {
                $scope.isloading = true;
                $scope.nloaded = true;
                mapnloaded = true;
                $http.get('http://' + config.host + ':' + config.port + '/api/1.0/get', {headers: {'x-uuid': $cookieStore.get("uuid")}}).success(
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
                $scope.activePanel = -1;
                $scope.currentactive = -1;
                if ($cookieStore.get("uuid") != "undefined") {
                    $scope.panels = [];
                    $scope.ALLmarkers = [];
                    var issue_type = Tab2BugzillaService.issue_type($scope.tabs.activeTab);

                    var offset = ($scope.activePage - 1) * 20;
                    $scope.component = "Τμήμα επίλυσης προβλημάτων";
                    summary = issue_type;
                    if ($scope.role == "departmentAdmin" || $scope.role == "departmentUser") {
                        if ($scope.tabs[0].title == 'Τμήμα Αποκομιδής Απορριμμάτων & Ανακυκλώσιμων Υλικών') {
                            $scope.component = "Τμήμα Αποκομιδής Απορριμμάτων & Ανακυκλώσιμων Υλικών";
                        } else if ($scope.tabs[0].title == 'Τμήμα Οδοποιίας') {
                            $scope.component = "Τμήμα Οδοποιίας";
                        } else if ($scope.tabs[0].title == 'Πεζοδρομίου/Δρόμου/Πλατείας') {
                            $scope.component = "Τμήμα πεζοδρομίου/δρόμου/πλατείας";
                        } else if ($scope.tabs[0].title == 'Αυτοτελές τμήμα Πολιτικής Προστασίας') {
                            $scope.component = "Αυτοτελές τμήμα Πολιτικής Προστασίας";
                        } else if ($scope.tabs[0].title == 'Τμήμα Πρασίνου') {
                            $scope.component = "Τμήμα Πρασίνου";
                        } else if ($scope.tabs[0].title == 'Τμήμα Συγκοινωνιακού & Κυκλοφοριακού Σχεδιασμού') {
                            $scope.component = "Τμήμα Συγκοινωνιακού & Κυκλοφοριακού Σχεδιασμού";
                        } else if ($scope.tabs[0].title == 'Τμήμα Αυτεπιστασίας Έργων Υποδομής') {
                            $scope.component = "Τμήμα Αυτεπιστασίας Έργων Υποδομής";
                        } else if ($scope.tabs[0].title == 'Τμήμα Ελέγχου Κοινοχρήστων Χώρων') {
                            $scope.component = "Τμήμα Ελέγχου Κοινοχρήστων Χώρων";
                        } else if ($scope.tabs[0].title == 'Τμήμα Πρασίνου') {
                            $scope.component = "Τμήμα Πρασίνου";
                        } else if ($scope.tabs[0].title == 'Τμήμα Καθαρισμού Κοινοχρήστων Χώρων & Ειδικών Συνεργείων') {
                            $scope.component = "Τμήμα Καθαρισμού Κοινοχρήστων Χώρων & Ειδικών Συνεργείων";
                        } else if ($scope.tabs[0].title == 'Τμήμα Μελετών Έργων & Πρασίνο') {
                            $scope.component = "Τμήμα Μελετών Έργων & Πρασίνο";
                        }
                    }

                    if (($scope.assignissues == false || $scope.closedissues == true) && $scope.allclosedissues == false) {
                        params = {"product": $cookieStore.get("city"), "component": $scope.component, "order": "bug_id DESC", "limit": "20", "offset": offset, "include_fields": ["component", "cf_comment", "cf_description", "cf_sensecityissue", "status", "id", "alias", "summary", "creation_time", "whiteboard", "url", "resolution", "dupe_of", "cf_mobile", "cf_email", "cf_creator", "severity", "priority"]};
                    } else {
                        params = {"product": $cookieStore.get("city"), "component": ["Τμήμα επίλυσης προβλημάτων", "Αυτοτελές τμήμα Πολιτικής Προστασίας", "Τμήμα Συγκοινωνιακού & Κυκλοφοριακού Σχεδιασμού", "Τμήμα Αποκομιδής Απορριμμάτων & Ανακυκλώσιμων Υλικών", "Τμήμα Αυτεπιστασίας Έργων Υποδομής", "Τμήμα Αυτεπιστασίας Κοινόχρηστων Χώρων, Κτιρίων & Ηλεκτροφωτισμο", "Τμήμα Ελέγχου Κοινοχρήστων Χώρων", "Τμήμα Καθαρισμού Κοινοχρήστων Χώρων & Ειδικών Συνεργείων", "Τμήμα Μελετών Έργων & Πρασίνο", "Τμήμα Οδοποιίας", "Τμήμα Πρασίνου"], "order": "bug_id DESC", "limit": "20", "offset": offset, "include_fields": ["component", "cf_comment", "cf_description", "cf_sensecityissue", "status", "id", "alias", "summary", "creation_time", "whiteboard", "url", "resolution", "dupe_of", "cf_mobile", "cf_email", "cf_creator", "severity", "priority"]};
                    }
                    if (summary != "all") {
                        params.summary = summary;
                    }

                    if (($scope.closedissues == false && $scope.allclosedissues == false) || $scope.assignissues == true)
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
                        $scope.pages = '<ul style="margin-bottom: -3%;margin-top:12%" class="pagination pagination-sm pull-right"><li ng-click="totalpages();refreshPages(1,1);refresh()"><span tooltip-side="left" tooltips tooltip-template="Πρώτη σελίδα"><a href="#">«</a></span></li>'
                                + '<li ng-click="totalpages();refreshPages(startPage - 5,2);refresh()"><span tooltip-side="top" tooltips tooltip-template="Προηγούμενες σελίδες"><a  href="#"><</a></span></li>';

                        $scope.pages += '<li ng-repeat="page in page_set"  ng-click="updatePage(page);refresh()" ng-class="( $index + 1 != pageIndex) ? \'\':\'active\'"><span tooltips tooltip-template><a href="#">{{page}}</a></span></li>';

                        $scope.pages += '<li ng-click="totalpages();refreshPages(startPage + 5,3);refresh()"><span tooltip-side="top" tooltips tooltip-template="Επόμενες σελίδες"><a  href="#">></a></span></li>'
                                + '<li ng-click="totalpages();refreshPages(total_pages - 4,4);refresh()"><span tooltip-side="right" tooltips tooltip-template="Τελευταία σελίδα"><a  href="#">»</a></span></li></ul>';

                        $http.post('http://' + config.host + ':' + config.port + '/api/1.0/admin/bugs/search', params, {headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).success(function (result) {

                            var total_counter = result.length;
                            var counter = 0;
                            var map_counter = 0;
                            if (total_counter == 0) {
                                mapnloaded = false;
                                $scope.isloading = false;
                                $scope.nloaded = false;
                                $(".paging").html("");
                            } else {
                                $(".paging").html($compile($scope.pages)($scope));
                            }
                            angular.forEach(result, function (value, key) {
                                var issue_name = ToGrService.issueName(value.summary);
                                var panelTitle = ToGrService.statusTitle(value.status, value.resolution);
                                var description = CommentService.field(value.status);
                                var id = value.id;
                                var priority = PriorityTag.priority_type(value.priority);
                                var severity = SeverityTag.severity_type(value.severity);
                                var issuelink = "http://sense.city/issuemap.php?issue_id=" + value.alias;
                                var creation_time = value.creation_time;
                                var local_time = moment(creation_time).format('LLLL');
                                local_time = timegr(local_time); //edw
                                var time_fromNow = moment(creation_time).fromNow();

                                if (!(value.component == "default")) {

                                    $http.post('http://' + config.host + ':' + config.port + '/api/1.0/admin/bugs/comment', {id: id}, {headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).success(
                                            function (response, status, headers, config) {
                                                counter++;
                                                var history = [];
                                                var com;
                                                var tag_pos;
                                                for (var i = 1; i < response.bugs[Object.keys(response.bugs)[0]].comments.length; i++) {
                                                    com = response.bugs[Object.keys(response.bugs)[0]].comments[i].text;
                                                    if (com == "undefined") {
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
                                                        var htime = timegr(moment(response.bugs[Object.keys(response.bugs)[0]].comments[i].time).format('LLLL')); //edw
                                                        if (response.bugs[Object.keys(response.bugs)[0]].comments[i].tags[tag_pos] == "CONFIRMED") {
                                                            history.push({"text": com, "timestamp": htime, "state": "Ανοιχτό", "style": {'color': '#e42c2c'}, "class": 'glyphicon glyphicon-exclamation-sign'}); //edw
                                                        } else if (response.bugs[Object.keys(response.bugs)[0]].comments[i].tags[tag_pos] == "IN_PROGRESS") {
                                                            history.push({"text": com, "timestamp": htime, "state": "Σε εκτέλεση", "style": {'color': 'orange'}, "class": 'glyphicon glyphicon-question-sign'}); //edw
                                                        } else {
                                                            history.push({"text": com, "timestamp": htime, "state": "Ολοκληρωμένο", "style": {'color': 'green'}, "class": 'glyphicon glyphicon-ok-sign'}); //edw
                                                        }
                                                    }
                                                }

                                                var panel =
                                                        {
                                                            "title": "#" + Object.keys(response.bugs)[0] + " (" + issue_name + "-" + value.url + ") -- " + time_fromNow, //edw
                                                            "style": panelTitle.status_style,
                                                            "icon": panelTitle.status_icon,
                                                            "time": local_time,
                                                            "issuelink": issuelink,
                                                            "issuenameGR": issue_name,
                                                            "issuenameEN": value.summary,
                                                            "creator": value.cf_creator,
                                                            "tel": value.cf_mobile,
                                                            "email": value.cf_email,
                                                            "id": Object.keys(response.bugs)[0],
                                                            "status": panelTitle.status,
                                                            "new_status": "",
                                                            "resolution": panelTitle.resolution,
                                                            "new_resolution": "",
                                                            "component": value.component,
                                                            "admin": false,
                                                            "ArrayID": key,
                                                            "priority": {en: value.priority, gr: priority},
                                                            "severity": {en: value.severity, gr: severity},
                                                            "comment": com,
                                                            "initialdesc": value.cf_description,
                                                            "mongoId": value.alias,
                                                            "history": history
                                                        };
                                                if (panel.comment == undefined) {
                                                    panel.comment = '';
                                                }
                                                $scope.panels.push(panel);
                                                if (counter == total_counter) {
                                                    counter = 0;
                                                    $scope.panels.sort(function (a, b) {
                                                        return b.id - a.id;
                                                    });
                                                    $scope.isloading = false;
                                                    $(window).resize();
                                                    if ($scope.isloading == false && mapnloaded == false) {
                                                        $scope.nloaded = false;
                                                    }
                                                }
                                                Issue2MapService.query({issueID: panel.mongoId[0]}, function (issue) {
                                                    map_counter++;
                                                    if (issue[0] != undefined) {
                                                        for (i = 0; i < $scope.panels.length; i++) {
                                                            if ($scope.panels[i].mongoId[0] == issue[0]._id) {
                                                                if (issue[0].image_name != "" && issue[0].image_name != "no-image") {
                                                                    $scope.panels[i].image = issue[0].image_name;
                                                                } else {
                                                                    $scope.panels[i].image = "../images/EmptyBox-Phone.png";
                                                                }
                                                            }
                                                        }
                                                        $scope.center = {lat: issue[0].loc.coordinates[1], lng: issue[0].loc.coordinates[0], zoom: 17};
                                                        $scope.ALLmarkers.push({"lat": issue[0].loc.coordinates[1], "lng": issue[0].loc.coordinates[0], "icon": icons[panel.issuenameEN], "panelid": panel.ArrayID});
                                                    }
                                                    if (map_counter == total_counter) {
                                                        mapnloaded = false;
                                                        $(window).resize();
                                                        if ($scope.isloading == false && mapnloaded == false) {
                                                            $scope.nloaded = false;
                                                        }
                                                    }
                                                }, function (response) {
                                                    map_counter++;
                                                    if (map_counter == total_counter) {
                                                        mapnloaded = false;
                                                        $(window).resize();
                                                        if ($scope.isloading == false && mapnloaded == false) {
                                                            $scope.nloaded = false;
                                                        }
                                                    }
                                                });
                                            });
                                }
                            }, $scope.panels);
                        });
                    };

                    if (tabchanged == 0) {
                        $scope.bugsearch();
                    } else {
                        $scope.totalpages();
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