var appControllers = angular.module('adminapp.adminctrl', ['ngCookies', '720kb.tooltips'])
        .constant("config", {"host": "localhost", "bugzilla_host": "nam.ece.upatras.gr", "port": "8023", "bugzilla_path": "/bugzilla"});

//appControllers.config([
//  '$httpProvider',
//  function($httpProvider) {
//    $httpProvider.defaults.withCredentials = true;
//  }]);

appControllers.controller('adminController', ['$scope', '$window', '$http', '$cookieStore', '$templateCache', '$compile', 'EndPointService', 'BugService', 'ToGrService', 'CommentService', 'Issue2MapService', 'FixPoints2MapService', 'Tab2BugzillaService', 'FixPointsMarkerService', 'leafletData', 'config', function ($scope, $window, $http, $cookieStore, $templateCache, $compile, EndPointService, BugService, ToGrService, CommentService, Issue2MapService, FixPoints2MapService, Tab2BugzillaService, FixPointsMarkerService, leafletData, config) {
        var summary;
        var params;
        var tabchanged = 2;
        var init = 1;

        $scope.duplicof = "";

        $scope.logout = function ($event) {
            $http.get('http://' + config.host + ':' + config.port + '/logout', {headers: {'x-uuid': $cookieStore.get("uuid")}}).success(function (response) {
                $cookieStore.remove("uuid");
                $cookieStore.remove("city");
                $cookieStore.remove("role");
                $cookieStore.remove("department");
                $cookieStore.remove("email");
                $cookieStore.remove("username");
                $cookieStore.remove("bug_token");
                $window.location.href = "/joli/index.html";
            });
        };

        var parameter = {params: {"login": "tolistimon@gmail.com", "password": "12345678"}};
        $http.get('http://' + config.bugzilla_host + config.bugzilla_path + '/rest/login', parameter).success(
                function (response, status, headers, config) {
                    $cookieStore.put('bug_token', response.token);
                }).error(
                function (data, status) {

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

        $scope.totalpages = function () {
            if (($scope.assignissues == false || $scope.closedissues == true)) {
                if (summary == "all") {
                    parameter = {params: {"product": $cookieStore.get("city"), "component": $scope.component, "order": "bugs.bug_id desc","status": params.status}};
                } else {
                    parameter = {params: {"product": $cookieStore.get("city"), "component": $scope.component, "order": "bugs.bug_id desc","status": params.status, "summary": summary}};
                }
            } else {
                if (summary == "all") {
                    parameter = {params: {"product": $cookieStore.get("city"), "component": ["Τμήμα επίλυσης προβλημάτων", "Τμήμα πολιτικής προστασίας", "Τμήμα πρασίνου", "Τμήμα ηλεκτροφωτισμού", "Τμήμα καθαριότητας", "Τμήμα πεζοδρομίου/δρόμου/πλατείας"], "order": "bugs.bug_id desc","status": params.status}};
                } else {
                    parameter = {params: {"product": $cookieStore.get("city"), "component": ["Τμήμα επίλυσης προβλημάτων", "Τμήμα πολιτικής προστασίας", "Τμήμα πρασίνου", "Τμήμα ηλεκτροφωτισμού", "Τμήμα καθαριότητας", "Τμήμα πεζοδρομίου/δρόμου/πλατείας"], "order": "bugs.bug_id desc","status": params.status, "summary": summary}};
                }
            }

            $http.get('http://' + config.bugzilla_host + config.bugzilla_path + '/rest/bug', parameter).success(
                    function (response, status, headers, conf) {
                        $scope.total_pages = Math.ceil(response.bugs.length / 20);
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

        $scope.changeTab = function (index) {
            if (tabchanged == 2) {
                tabchanged = 0;
            } else {
                tabchanged = 1;
            }

            if ($cookieStore.get("role") == "departmentAdmin" || $cookieStore.get("role") == "sensecityAdmin") {
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

        $(".panel-fullscreen").on("click", function () {
            panel_fullscreen($(this).parents(".panel"));
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
        });
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
                if ($cookieStore.get("role") == "departmentAdmin") {
                    $scope.role = "departmentAdmin";
                } else {
                    $scope.role = "departmentUser";
                }
                var department = $cookieStore.get("department");
                if (department == "garbage") {
                    $scope.tabs = [{
                            "title": "Καθαριότητας",
                            "content": "Παρουσίαση προβλημάτων καθαριότητας",
                            "icon": "fa fa-trash-o"
                        }];
                    $scope.tabs.activeTab = 0;
                } else if (department == "lighting") {
                    $scope.tabs = [{
                            "title": "Ηλεκτροφωτισμού",
                            "content": "Παρουσίαση προβλημάτων ηλεκτροφωτισμού",
                            "icon": "fa fa-lightbulb-o"
                        }];
                    $scope.tabs.activeTab = 1;
                } else if (department == "road-contructor") {
                    $scope.tabs = [{
                            "title": "Πεζοδρομίου/Δρόμου/Πλατείας",
                            "content": "Παρουσίαση προβλημάτων Πεζοδρομίου/Δρόμου/Πλατείας",
                            "icon": "fa fa-road"
                        }];
                    $scope.tabs.activeTab = 2;
                } else if (department == "protection-policy") {
                    $scope.tabs = [{
                            "title": "Πολιτικής Προστασίας",
                            "content": "Παρουσίαση προβλημάτων πολιτικής προστασίας",
                            "icon": "fa fa-shield"
                        }];
                    $scope.tabs.activeTab = 3;
                } else if (department == "tree") {
                    $scope.tabs = [{
                            "title": "Πρασίνου",
                            "content": "Παρουσίαση προβλημάτων πρασίνου",
                            "icon": "fa fa-tree"
                        }];
                    $scope.tabs.activeTab = 4;
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
            // $scope.multipleActivePanels = [];
            $scope.activePanel = [];
            moment.locale('el');

            $scope.closedissues = false;
            $scope.assignissues = false;
            $scope.allclosedissues = false;

            if ($cookieStore.get("city") == "Patra" || $cookieStore.get("city") == "testcity1") {

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

            if ($cookieStore.get("city") == "Patra" || $cookieStore.get("city") == "testcity1") {

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

                $scope.changeTab($scope.tabs.activeTab);

                $scope.itemClicked = function ($index) {
                    if ($scope.currentactive != $index) {
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
                // console.log(issue_type);
                if (issue_type != "all" && ($scope.role == "sensecityAdmin" || $scope.role == "cityAdmin"))
                {
                    params.summary = issue_type;
                } else if ($scope.role == "departmentAdmin" || $scope.role == "departmentUser") {
                    if ($scope.tabs[0].title == 'Καθαριότητας') {
                        $scope.component = "Τμήμα καθαριότητας";
                    } else if ($scope.tabs[0].title == 'Ηλεκτροφωτισμού') {
                        $scope.component = "Τμήμα ηλεκτροφωτισμού";
                    } else if ($scope.tabs[0].title == 'Πεζοδρομίου/Δρόμου/Πλατείας') {
                        $scope.component = "Τμήμα πεζοδρομίου/δρόμου/πλατείας";
                    } else if ($scope.tabs[0].title == 'Πολιτικής Προστασίας') {
                        $scope.component = "Τμήμα πολιτικής προστασίας";
                    } else if ($scope.tabs[0].title == 'Πρασίνου') {
                        $scope.component = "Τμήμα πρασίνου";
                    }
                }
                params = {"product": $cookieStore.get("city"), "component": $scope.component, "order": "bug_id DESC", "limit": "20", "include_fields": ["cf_comment", "cf_description", "component", "cf_sensecityissue", "status", "id", "alias", "summary", "creation_time", "whiteboard", "url", "resolution"]};

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

                    //$templateCache.put('pages', pages);
                };

                $scope.totalpages();

                $scope.bugsearchinit = function () {

                    $scope.pages = '<ul style="margin-bottom: -3%;margin-top:12%" class="pagination pagination-sm pull-right"><li ng-click="totalpages();refreshPages(1,1);refresh()"><span tooltip-side="left" tooltips tooltip-template="Πρώτη σελίδα"><a href="#">«</a></span></li>'
                            + '<li ng-click="totalpages();refreshPages(startPage - 5,2);refresh()"><span tooltip-side="top" tooltips tooltip-template="Προηγούμενες σελίδες"><a  href="#"><</a></span></li>';

                    $scope.refreshPages(1);

                    $scope.pages += '<li ng-repeat="page in page_set"  ng-click="updatePage(page);refresh()" ng-class="( $index + 1 != pageIndex) ? \'\':\'active\'"><span tooltips tooltip-template><a href="#">{{page}}</a></span></li>';

                    $scope.pages += '<li ng-click="totalpages();refreshPages(startPage + 5,3);refresh()"><span tooltip-side="top" tooltips tooltip-template="Επόμενες σελίδες"><a  href="#">></a></span></li>'
                            + '<li ng-click="totalpages();refreshPages(total_pages - 4,4);refresh()"><span tooltip-side="right" tooltips tooltip-template="Τελευταία σελίδα"><a  href="#">»</a></span></li></ul>';

                    $(".test").html($compile($scope.pages)($scope));
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
                    // console.log(params);
                    var obj =
                            {
                                "method": "Bug.search",
                                "params": [params],
                                "id": 1
                            };
                    // console.log(obj);

                    BugService.search(obj, function (result) {

                        var total_counter = result.length;
                        var counter = 0;

                        angular.forEach(result, function (value, key) {
                            var issue_name = ToGrService.issueName(value.summary);
                            var panelTitle = ToGrService.statusTitle(value.status, value.resolution);
                            var description = CommentService.field(value.status);
                            var id = value.id;
                            var issuelink = "http://sense.city/issuemap.php?issue_id=" + value.alias;
                            var creation_time = value.creation_time;
                            var local_time = moment(creation_time).format('LLLL');
                            var time_fromNow = moment(creation_time).fromNow();
                            var parameter;

                            if (!(value.component == "default")) {
                                $http.get('http://' + config.bugzilla_host + config.bugzilla_path + '/rest/bug/' + id + '/comment', {"token": $cookieStore.get('bug_token')}).success(
                                        function (response, status, headers, config) {
                                            counter++;
                                            var panel =
                                                    {
                                                        "title": "#" + Object.keys(response.bugs)[0] + " (" + issue_name + ") -- " + time_fromNow,
                                                        "style": panelTitle.status_style,
                                                        "icon": panelTitle.status_icon,
                                                        "time": local_time,
                                                        "issuelink": issuelink,
                                                        "issuenameGR": issue_name,
                                                        "issuenameEN": value.summary,
                                                        "id": Object.keys(response.bugs)[0],
                                                        "status": panelTitle.status,
                                                        "new_status": "",
                                                        "resolution": panelTitle.resolution,
                                                        "new_resolution": "",
                                                        "component": value.component,
                                                        "admin": false,
                                                        "ArrayID": key,
                                                        "comment": response.bugs[Object.keys(response.bugs)[0]].comments.pop().text,
                                                        "initialdesc": value.cf_description,
                                                        "mongoId": value.alias
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
                                            }
                                            Issue2MapService.get({issueID: panel.mongoId[0]}, function (issue) {
                                                $scope.panel_image = issue.image_name;
                                                $scope.center = {lat: issue.loc.coordinates[1], lng: issue.loc.coordinates[0], zoom: 17};
                                                $scope.ALLmarkers.push({"lat": issue.loc.coordinates[1], "lng": issue.loc.coordinates[0], "icon": icons[panel.issuenameEN], "panelid": panel.ArrayID});
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
                // console.log(panel);

                $scope.markers = [];
                // console.log(panel);
                // console.log(panel.mongoId);
                // console.log(panel.mongoId[0]);
                $scope.panel_issue = panel.issuenameGR;
                $scope.initial_desc = panel.initialdesc;
                Issue2MapService.get({issueID: panel.mongoId[0]}, function (issue) {
                    $scope.panel_image = issue.image_name;
                    $scope.center = {lat: issue.loc.coordinates[1], lng: issue.loc.coordinates[0], zoom: 17};
                    $scope.markers = [{"lat": issue.loc.coordinates[1], "lng": issue.loc.coordinates[0], "icon": icons[panel.issuenameEN]}];

                    if (issue.issue == "garbage" || "lighting") {
                        var type;
                        if (issue.issue == "lighting")
                        {
                            type = "fotistiko";
                        } else {
                            type = issue.issue;
                        }

                        FixPoints2MapService.query({long: issue.loc.coordinates[0], lat: issue.loc.coordinates[1], type: type}, function (fix_points) {
                            angular.forEach(fix_points, function (value, key) {
                                var icon = FixPointsMarkerService.icon(value);
                                // console.log(icon);
                                // console.log(icons[icon]);
                                $scope.markers.push({"lat": value.loc.coordinates[1], "lng": value.loc.coordinates[0], "icon": icons[icon]});
                            });
                        });
                    }

                });


            };

            $scope.admin = function (panel) {

                // $scope.initResetPanel(panel);
                $scope.selectedStatus = null;
                $scope.selectedResolution = null;

                // console.log($scope.selectedStatus + $scope.selectedResolution + $scope.comment);
                // console.log(panel);
                panel.admin = true;
                // $scope.multipleActivePanels = [panel.ArrayID];

                $scope.statuses = [{"gr": "Ανοιχτό", "en": "CONFIRMED"}, {"gr": "Σε εκτέλεση", "en": "IN_PROGRESS"}, {"gr": "Ολοκληρωμένο", "en": "RESOLVED"}];
                $scope.resolutions = [{"gr": "Αποκατάσταση", "en": "FIXED"}, {"gr": "Εσφαλμένη Αναφορά", "en": "INVALID"}, {"gr": "Μη αποκατάσταση / Απόρριψη από Δήμο", "en": "WONTFIX"}, {"gr": "Έχει ήδη αναφερθεί σε άλλο αίτημα", "en": "DUPLICATE"}];
                // $scope.components = [{"gr":"Ανοιχτό","en":"CONFIRMED"},{"gr":"Σε εκτέλεση","en":"IN_PROGRESS"},{"gr":"Ολοκληρωμένο","en":"RESOLVED"}];
                $scope.components = ["Τμήμα επίλυσης προβλημάτων", "Τμήμα καθαριότητας", "Τμήμα ηλεκτροφωτισμού", "Τμήμα πεζοδρομίου/δρόμου/πλατείας", "Τμήμα πολιτικής προστασίας", "Τμήμα πρασίνου"];//,"Τμήμα ύδρευσης"];


                console.log("----------------------------------------------------");
                console.log(panel.status);
                $scope.selectedComponent = panel.component;
                $scope.selectedStatus = panel.status;
                $scope.comment = panel.comment;
                $scope.duplicof = panel.duplicof;
                //$scope.duplicof = panel;
                $scope.selectedResolution = panel.resolution;


                if (panel.resolution.gr !== undefined)
                {
                    $scope.selectedResolution = {"gr": panel.resolution.gr, "en": panel.resolution.en};
                } else {
                    $scope.selectedResolution = {"gr": "Αποκατάσταση", "en": "FIXED"};
                }
            };



            $scope.initResetPanel = function (panel) {
                $scope.selectedStatus = null;
                $scope.selectedResolution = null;
            };

            $scope.resetPanel = function (panel) {
                console.log("BEFORE:");
                console.log($scope.selectedStatus);
                console.log($scope.selectedResolution);
                console.log($scope.comment);
                panel.admin = false;
                $scope.selectedStatus = null;
                $scope.selectedResolution = null;
                $scope.comment = null;

                console.log("AFTER:");
                console.log($scope.selectedStatus);
                console.log($scope.selectedResolution);
                console.log($scope.comment);
            };

            $scope.submit = function (panel, seldstatus, seldResolution, seldcomment, seldcomponent, e) {
                if ($cookieStore.get("uuid") != undefined) {
                    panel.status = seldstatus;
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

                    // console.log(bug_fieldname);
                    // console.log(panel);
                    function update() {
                        var obj;
                        if (panel.status.en == "RESOLVED")
                        {
                            if (panel.resolution.en == "DUPLICATE") {
                                obj = {"ids": [panel.id], "status": panel.status.en, "product": $cookieStore.get("city"), "component": panel.component, "resolution": panel.resolution.en, "dupe_of": $scope.duplicof};
                            } else {
                                obj = {"ids": [panel.id], "status": panel.status.en, "product": $cookieStore.get("city"), "component": panel.component};
                            }
                        } else {
                            obj = {"ids": [panel.id], "status": panel.status.en, "product": $cookieStore.get("city"), "component": panel.component};
                        }
                        if (panel.status.en == "RESOLVED")
                        {
                            obj.resolution = panel.resolution.en;
                        }
                        // console.log(obj);

                        var body =
                                {
                                    "method": "Bug.update",
                                    "params": [obj],
                                    "id": 1
                                };
                        // console.log(body);
                        BugService.search(body, function (result) {
                            if (panel.comment !== undefined)
                            {
                                $http.post('http://' + config.bugzilla_host + config.bugzilla_path + '/rest/bug/' + panel.id + '/comment', {"comment": panel.comment}, {params: {"token": $cookieStore.get('bug_token')}}).success(
                                        function (response, status, headers, conf) {
                                            $http.put('http://' + config.bugzilla_host + config.bugzilla_path + '/rest/bug/comment/' + response.id + '/tags', {"add": [panel.status.en]}, {params: {"token": $cookieStore.get('bug_token')}}).success(
                                                    function (response, status, headers, config) {
                                                    });
                                        });
                            }
                            var panelTitle = ToGrService.statusTitle(seldstatus.en, seldResolution.en);
                            panel.style = panelTitle.status_style;
                            panel.icon = panelTitle.status_icon;
                        });
                    }
                    if ($scope.selectedStatus.gr == 'Ανοιχτό') {
                        if ($scope.selectedStatus.gr != panel.status.gr) {
                            update();
                            if ((panel.status.gr == 'Σε εκτέλεση' && panel.component != $scope.component && $scope.assignissues == false) || (panel.status.gr == 'Ολοκληρωμένο' && (($scope.closedissues == false && $scope.allclosedissues == false) || ($scope.closedissues == true && panel.component != $scope.component)))) {
                                setTimeout(function () {
                                    $(e.target).closest(".timeline-item-active").remove();
                                    $scope.activePanel = -1;
                                    $scope.currentactive = -1;
                                }, 3000);
                            }
                            $scope.selectedStatus.gr = panel.status.gr;
//                                $scope.activePanel = -1;
//                                $scope.currentactive = -1;
                        }
                    } else if ($scope.selectedStatus.gr == 'Σε εκτέλεση') {
                        if ($scope.selectedStatus.gr != panel.status.gr || $scope.selectedComponent != panel.component || $scope.comment != panel.comment) {
                            $scope.comment = panel.comment;
                            update();
                            if ((panel.status.gr == 'Σε εκτέλεση' && $scope.assignissues == false && panel.component != $scope.component) || (panel.status.gr == 'Ολοκληρωμένο' && (($scope.closedissues == false && $scope.allclosedissues == false) || ($scope.closedissues == true && panel.component != $scope.component)))) {
                                setTimeout(function () {
                                    $(e.target).closest(".timeline-item-active").remove();
                                    $scope.activePanel = -1;
                                    $scope.currentactive = -1;
                                }, 3000);
                            } else {
                                $scope.selectedStatus.gr = panel.status.gr;
//                                $scope.activePanel = -1;
//                                $scope.currentactive = -1;
                            }
                        }
                    } else if ($scope.selectedStatus.gr == 'Ολοκληρωμένο') {
                        if ($scope.selectedStatus.gr != panel.status.gr || $scope.selectedComponent != panel.component || $scope.comment != panel.comment || $scope.selectedResolution != panel.resolution || $scope.duplicof != panel.duplicof) {
                            $scope.comment = panel.comment;
                            update();
                            if ((panel.status.gr == 'Σε εκτέλεση' && panel.component != $scope.component) || (panel.status.gr == 'Ολοκληρωμένο' && panel.component != $scope.component)) {
                                setTimeout(function () {
                                    $(e.target).closest(".timeline-item-active").remove();
                                    $scope.activePanel = -1;
                                    $scope.currentactive = -1;
                                }, 3000);
                            }
                            $scope.selectedStatus.gr = panel.status.gr;
//                                $scope.activePanel = -1;
//                                $scope.currentactive = -1;
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
                $http.get('http://' + config.host + ':' + config.port + '/get', {headers: {'x-uuid': $cookieStore.get("uuid")}}).success(
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
                    // console.log(issue_type);
                    var offset = ($scope.activePage - 1) * 20;
                    $scope.component = "Τμήμα επίλυσης προβλημάτων";
                    summary = issue_type;
                    if ($scope.role == "departmentAdmin" || $scope.role == "departmentUser") {
                        if ($scope.tabs[0].title == 'Καθαριότητας') {
                            $scope.component = "Τμήμα καθαριότητας";
                        } else if ($scope.tabs[0].title == 'Ηλεκτροφωτισμού') {
                            $scope.component = "Τμήμα ηλεκτροφωτισμού";
                        } else if ($scope.tabs[0].title == 'Πεζοδρομίου/Δρόμου/Πλατείας') {
                            $scope.component = "Τμήμα πεζοδρομίου/δρόμου/πλατείας";
                        } else if ($scope.tabs[0].title == 'Πολιτικής Προστασίας') {
                            $scope.component = "Τμήμα πολιτικής προστασίας";
                        } else if ($scope.tabs[0].title == 'Πρασίνου') {
                            $scope.component = "Τμήμα πρασίνου";
                        }
                    }
                    if (($scope.assignissues == false || $scope.closedissues == true) && $scope.allclosedissues == false) {
                        params = {"product": $cookieStore.get("city"), "component": $scope.component, "order": "bug_id DESC", "limit": "20", "offset": offset, "include_fields": ["component", "cf_comment", "cf_description", "cf_sensecityissue", "status", "id", "alias", "summary", "creation_time", "whiteboard", "url", "resolution", "dupe_of"]};
                    } else {
                        params = {"product": $cookieStore.get("city"), "component": ["Τμήμα επίλυσης προβλημάτων", "Τμήμα πολιτικής προστασίας", "Τμήμα πρασίνου", "Τμήμα ηλεκτροφωτισμού", "Τμήμα καθαριότητας", "Τμήμα πεζοδρομίου/δρόμου/πλατείας"], "order": "bug_id DESC", "limit": "20", "offset": offset, "include_fields": ["component", "cf_comment", "cf_description", "cf_sensecityissue", "status", "id", "alias", "summary", "creation_time", "whiteboard", "url", "resolution", "dupe_of"]};
                    }
                    if (summary != "all") {
                        params.summary = summary;
                    }
                    // console.log(params);
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


                        //$templateCache.put('pages', pages);
                        $(".test").html($compile($scope.pages)($scope));
                        //$compile('ng-include');

                        // $scope.$apply(); ng-include='{{}}'

                        var obj =
                                {
                                    "method": "Bug.search",
                                    "params": [params],
                                    "id": 1
                                };

                        BugService.search(obj, function (result) {

                            var total_counter = result.length;
                            var counter = 0;

                            angular.forEach(result, function (value, key) {

                                var issue_name = ToGrService.issueName(value.summary);
                                var panelTitle = ToGrService.statusTitle(value.status, value.resolution);
                                var description = CommentService.field(value.status);
                                var id = value.id;
                                var issuelink = "http://sense.city/issuemap.php?issue_id=" + value.alias;
                                var creation_time = value.creation_time;
                                var local_time = moment(creation_time).format('LLLL');
                                var time_fromNow = moment(creation_time).fromNow();
                                if (!(value.component == "default")) {
                                    $http.get('http://' + config.bugzilla_host + config.bugzilla_path + '/rest/bug/' + id + '/comment', {"token": $cookieStore.get('bug_token')}).success(
                                            function (response, status, headers, config) {
                                                counter++;
                                                var panel =
                                                        {
                                                            "title": "#" + Object.keys(response.bugs)[0] + " (" + issue_name + ") -- " + time_fromNow,
                                                            "style": panelTitle.status_style,
                                                            "icon": panelTitle.status_icon,
                                                            "time": local_time,
                                                            "issuelink": issuelink,
                                                            "issuenameGR": issue_name,
                                                            "issuenameEN": value.summary,
                                                            "id": Object.keys(response.bugs)[0],
                                                            "status": panelTitle.status,
                                                            "new_status": "",
                                                            "resolution": panelTitle.resolution,
                                                            "new_resolution": "",
                                                            "component": value.component,
                                                            "admin": false,
                                                            "ArrayID": key,
                                                            "comment": response.bugs[Object.keys(response.bugs)[0]].comments.pop().text,
                                                            "initialdesc": value.cf_description,
                                                            "mongoId": value.alias
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
                                                }
                                                Issue2MapService.get({issueID: panel.mongoId[0]}, function (issue) {
                                                    $scope.panel_image = issue.image_name;
                                                    $scope.center = {lat: issue.loc.coordinates[1], lng: issue.loc.coordinates[0], zoom: 17};
                                                    $scope.ALLmarkers.push({"lat": issue.loc.coordinates[1], "lng": issue.loc.coordinates[0], "icon": icons[panel.issuenameEN], "panelid": panel.ArrayID});
                                                });
                                            });
                                }
                            }, $scope.panels);
                        });
                    };

                    // console.log(params);
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