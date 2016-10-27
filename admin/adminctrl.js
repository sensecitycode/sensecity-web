var appControllers = angular.module('adminapp.adminctrl', ['ngCookies']);

//appControllers.config([
//  '$httpProvider',
//  function($httpProvider) {
//    $httpProvider.defaults.withCredentials = true;
//  }]);

appControllers.controller('adminController', ['$scope', '$window', '$http', '$cookieStore', 'EndPointService', 'BugService', 'ToGrService', 'CommentService', 'Issue2MapService', 'FixPoints2MapService', 'Tab2BugzillaService', 'FixPointsMarkerService', function ($scope, $window, $http, $cookieStore, EndPointService, BugService, ToGrService, CommentService, Issue2MapService, FixPoints2MapService, Tab2BugzillaService, FixPointsMarkerService) {
        $scope.duplicof = "";
        $scope.valid = false;

        $scope.logout = function ($event) {
            $http.get('http://api.sense.city:4000/logout', {headers: {'x-uuid': $cookieStore.get("uuid")}}).success(function (response) {
                $cookieStore.remove("uuid");
                $cookieStore.remove("city");
                $cookieStore.remove("role");
                $cookieStore.remove("department");
                $cookieStore.remove("email");
                $cookieStore.remove("username");
                $window.location.href = "/admin_login/";
            });
        }

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

        if ($scope.valid) {
            $scope.dupli_change = function ($event, dupl) {
                $scope.duplicof = dupl;
            }
            if ($cookieStore.get("role") == "departmentAdmin" || $cookieStore.get("role") == "departmentUser") {
                if ($cookieStore.get("role") == "departmentAdmin") {
                    $scope.role = "departmentAdmin";
                } else {
                    $scope.role = "departmentUser";
                }
                var department = $cookieStore.get("department");
                if (department == "garbage") {
                    $scope.tabs = [{
                            "title": "Καθαριότητα",
                            "content": "Παρουσίαση προβλημάτων καθαριότητας",
                        }];
                    $scope.tabs.activeTab = "Καθαριότητα";
                } else if (department == "road-contructor") {
                    $scope.tabs = [{
                            "title": "Οδόστρωμα",
                            "content": "Παρουσίαση προβλημάτων οδοστρώματος",
                        }];
                    $scope.tabs.activeTab = "Οδόστρωμα";
                } else if (department == "lighting") {
                    $scope.tabs = [{
                            "title": "Φωτισμός",
                            "content": "Παρουσίαση προβλημάτων φωτισμού",
                        }];
                    $scope.tabs.activeTab = "Φωτισμός";
                } else if (department == "plumbing") {
                    $scope.tabs = [{
                            "title": "Ύδρευση",
                            "content": "Παρουσίαση προβλημάτων ύδρευσης/αποχέτευσης"
                        }];
                    $scope.tabs.activeTab = "Ύδρευση";
                }
            } else {
                $scope.role = "cityAdmin";
                $scope.tabs = [
                    {
                        "title": "Γενικά",
                        "content": "Παρουσίαση όλων των δηλωμένων προβλημάτων"
                    },
                    {
                        "title": "Καθαριότητα",
                        "content": "Παρουσίαση προβλημάτων καθαριότητας",
                    },
                    {
                        "title": "Φωτισμός",
                        "content": "Παρουσίαση προβλημάτων φωτισμού",
                    },
                    {
                        "title": "Ύδρευση",
                        "content": "Παρουσίαση προβλημάτων ύδρευσης/αποχέτευσης",
                    },
                    {
                        "title": "Οδόστρωμα",
                        "content": "Παρουσίαση προβλημάτων οδοστρώματος",
                    }
                ];
                $scope.tabs.activeTab = "Γενικά";
            }

            $scope.panels = [];
            // $scope.multipleActivePanels = [];
            $scope.activePanel = [];
            moment.locale('el');

            $scope.closedissues = false;
            $scope.assignissues = false;

            if ($cookieStore.get("city") == "Patra") {

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

            if ($cookieStore.get("city") == "Patra") {

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
                $scope.activePanel = [args.model.panelid];
                $scope.linkmap($scope.panels[args.model.panelid]);
            });

            $scope.$on("leafletDirectiveMarker.panelmap.click", function (event, args) {
                // Args will contain the marker name and other relevant information
                // console.log("Leaflet Click");
                // console.log(args);
                // console.log(args.model.panelid);
                // console.log($scope.panels[args.model.panelid]);
                $scope.activePanel = [-1];
                // $scope.linkmap($scope.panels[args.model.panelid]);
            });


            var pageload = function (callback) {
                var issue_type = Tab2BugzillaService.issue_type($scope.tabs.activeTab);
                // console.log(issue_type);
                var params = {"product": $cookieStore.get("city"), "order": "bug_id DESC", "include_fields": ["component", "cf_sensecityissue", "status", "id", "alias", "summary", "creation_time", "whiteboard", "url", "resolution"]};
                if (issue_type != "all")
                {
                    params.summary = issue_type;
                }

                if ($scope.closedissues === false)
                {
                    if ($scope.assignissues === true) {
                        if ($scope.role == "cityAdmin" || $scope.role == "sensecityAdmin") {
                            params.status = ["CONFIRMED", "IN_PROGRESS"];
                        } else {
                            if ($scope.role == "departmentAdmin" || $scope.role == "departmentUser") {
                                params.status = ["IN_PROGRESS"];
                            }
                        }
                    } else {
                        if ($scope.role == "cityAdmin" || $scope.role == "sensecityAdmin") {
                            params.status = ["CONFIRMED"];
                        } else {
                            if ($scope.role == "departmentAdmin" || $scope.role == "departmentUser") {
                                params.status = ["IN_PROGRESS"];
                            }
                        }
                    }
                } else {
                    if ($scope.assignissues === true) {
                        if ($scope.role == "departmentAdmin" || $scope.role == "departmentUser") {
                            params.status = ["RESOLVED", "IN_PROGRESS"];
                        } else {
                            params.status = ["CONFIRMED", "IN_PROGRESS", "RESOLVED"];
                        }
                    } else {
                        if ($scope.role == "departmentAdmin" || $scope.role == "departmentUser") {
                            params.status = ["RESOLVED", "IN_PROGRESS"];
                        } else {
                            params.status = ["CONFIRMED", "RESOLVED"];
                        }
                    }
                }
                // console.log(params);
                var obj =
                        {
                            "method": "Bug.search",
                            "params": [params],
                            "id": 1
                        };
                // console.log(obj);
                BugService.search(obj, function (result) {

                    angular.forEach(result, function (value, key) {
                        var issue_name = ToGrService.issueName(value.summary);
                        var panelTitle = ToGrService.statusTitle(value.status, value.resolution);
                        var description = CommentService.field(value.status);
                        var id = value.id;
                        var issuelink = "http://sense.city/issuemap.php?issue_id=" + value.alias;
                        var creation_time = value.creation_time;
                        var local_time = moment(creation_time).format('LLLL');
                        var time_fromNow = moment(creation_time).fromNow();

                        if (!(value.component == "_default")) {

                            var panel =
                                    {
                                        "title": "#" + id + " (" + issue_name + ") -- " + time_fromNow,
                                        "style": panelTitle.status_style,
                                        "icon": panelTitle.status_icon,
                                        "time": local_time,
                                        "issuelink": issuelink,
                                        "issuenameGR": issue_name,
                                        "issuenameEN": value.summary,
                                        "id": id,
                                        "status": panelTitle.status,
                                        "new_status": "",
                                        "resolution": panelTitle.resolution,
                                        "new_resolution": "",
                                        "component": value.component,
                                        "admin": false,
                                        "ArrayID": key,
                                        "comment": value[description],
                                        "initialdesc": value.url,
                                        "mongoId": value.alias
                                    };
                            this.push(panel);
                            Issue2MapService.get({issueID: panel.mongoId[0]}, function (issue) {
                                // $scope.panel_image = issue.image_name;
                                // $scope.center = {lat:issue.loc.coordinates[1],lng:issue.loc.coordinates[0],zoom:17};
                                $scope.ALLmarkers.push({"lat": issue.loc.coordinates[1], "lng": issue.loc.coordinates[0], "icon": icons[panel.issuenameEN], "panelid": panel.ArrayID});
                            });
                        }
                    }, $scope.panels);
                });
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
                $scope.comment = null;
                // console.log($scope.selectedStatus + $scope.selectedResolution + $scope.comment);
                // console.log(panel);
                panel.admin = true;
                // $scope.multipleActivePanels = [panel.ArrayID];

                $scope.statuses = [{"gr": "Ανοιχτό", "en": "CONFIRMED"}, {"gr": "Σε εκτέλεση", "en": "IN_PROGRESS"}, {"gr": "Ολοκληρωμένο", "en": "RESOLVED"}];
                $scope.resolutions = [{"gr": "Αποκατάσταση", "en": "FIXED"}, {"gr": "Εσφαλμένη Αναφορά", "en": "INVALID"}, {"gr": "Μη αποκατάσταση / Απόρριψη από Δήμο", "en": "WONTFIX"}, {"gr": "Έχει ήδη αναφερθεί σε άλλο αίτημα", "en": "DUPLICATE"}];
                // $scope.components = [{"gr":"Ανοιχτό","en":"CONFIRMED"},{"gr":"Σε εκτέλεση","en":"IN_PROGRESS"},{"gr":"Ολοκληρωμένο","en":"RESOLVED"}];
                $scope.components = ["Τμήμα επίλυσης προβλημάτων", "ΤΜΗΜΑ ΚΑΘΑΡΙΟΤΗΤΑΣ", "ΤΜΗΜΑ ΟΔΟΠΟΙΙΑΣ", "ΤΜΗΜΑ ΦΩΤΙΣΜΟΥ"];


                console.log("----------------------------------------------------");
                console.log(panel.status);
                $scope.selectedComponent = panel.component;
                $scope.selectedStatus = panel.status;

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
                    console.log("Panel changes to submit:");
                    console.log(panel.status);
                    console.log(panel.resolution);
                    console.log(panel.comment);
                    console.log(panel.component);


                    var bug_fieldname = CommentService.field(panel.status.en);
                    // console.log(bug_fieldname);
                    // console.log(panel);

                    var obj;
                    if (panel.status.en == "RESOLVED")
                    {
                        if (panel.resolution.en == "DUPLICATE") {
                            obj = {"ids": panel.id, "status": panel.status.en, "product": $cookieStore.get("city"), "component": panel.component, "resolution": panel.resolution.en, "dupe_of": $scope.duplicof};
                        } else {
                            obj = {"ids": panel.id, "status": panel.status.en, "product": $cookieStore.get("city"), "component": panel.component};
                        }
                    } else {
                        obj = {"ids": panel.id, "status": panel.status.en, "product": $cookieStore.get("city"), "component": panel.component};
                    }
                    if (panel.comment !== undefined && bug_fieldname !== undefined)
                    {
                        obj[bug_fieldname] = panel.comment;
                        console.log(bug_fieldname);
                        console.log(obj[bug_fieldname]);
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
                        var panelTitle = ToGrService.statusTitle(seldstatus.en, seldResolution.en);
                        panel.style = panelTitle.status_style;
                        panel.icon = panelTitle.status_icon;
                        if ($scope.role == "departmentAdmin" || $scope.role == "departmentUser") {
                            if (panel.status.en !== "IN_PROGRESS") {
                                setTimeout(function () {
                                    $(e.target).parent().parent().parent().parent().remove();
                                }, 3000);
                            }
                        } else {
                            if (panel.status.en !== "CONFIRMED") {
                                setTimeout(function () {
                                    $(e.target).parent().parent().parent().parent().remove();
                                }, 3000);
                            }
                        }
                        console.log("Result:");
                        console.log(result);
                        // $scope.refresh();
                    });
                } else {
                    $scope.valid = false;
                    $cookieStore.remove("uuid");
                    $cookieStore.remove("city");
                    $cookieStore.remove("role");
                    $cookieStore.remove("department");
                    $cookieStore.remove("email");
                    $cookieStore.remove("username");
                }
            };

            $scope.refresh = function () {
                $http.get('http://api.sense.city:4000/get', {headers: {'x-uuid': $cookieStore.get("uuid")}}).success(
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
                if ($cookieStore.get("uuid") != "undefined") {
                    $scope.panels = [];
                    $scope.ALLmarkers = [];

                    var issue_type = Tab2BugzillaService.issue_type($scope.tabs.activeTab);
                    // console.log(issue_type);
                    var params = {"product": $cookieStore.get("city"), "order": "bug_id DESC", "include_fields": ["component", "cf_sensecityissue", "status", "id", "alias", "summary", "creation_time", "whiteboard", "url", "resolution"]};
                    if (issue_type != "all")
                    {
                        params.summary = issue_type;
                    }
                    // console.log(params);
                    if ($scope.closedissues === false)
                    {
                        if ($scope.assignissues === true) {
                            if ($scope.role == "cityAdmin" || $scope.role == "sensecityAdmin") {
                                params.status = ["CONFIRMED", "IN_PROGRESS"];
                            } else {
                                if ($scope.role == "departmentAdmin" || $scope.role == "departmentUser") {
                                    params.status = ["IN_PROGRESS"];
                                }
                            }
                        } else {
                            if ($scope.role == "cityAdmin" || $scope.role == "sensecityAdmin") {
                                params.status = ["CONFIRMED"];
                            } else {
                                if ($scope.role == "departmentAdmin" || $scope.role == "departmentUser") {
                                    params.status = ["IN_PROGRESS"];
                                }
                            }
                        }
                    } else {
                        if ($scope.assignissues === true) {
                            if ($scope.role == "departmentAdmin" || $scope.role == "departmentUser") {
                                params.status = ["RESOLVED", "IN_PROGRESS"];
                            } else {
                                params.status = ["CONFIRMED", "IN_PROGRESS", "RESOLVED"];
                            }
                        } else {
                            if ($scope.role == "departmentAdmin" || $scope.role == "departmentUser") {
                                params.status = ["RESOLVED", "IN_PROGRESS"];
                            } else {
                                params.status = ["CONFIRMED", "RESOLVED"];
                            }
                        }
                    }
                    // console.log(params);
                    var obj =
                            {
                                "method": "Bug.search",
                                "params": [params],
                                "id": 1
                            };

                    BugService.search(obj, function (result) {

                        angular.forEach(result, function (value, key) {
                            var issue_name = ToGrService.issueName(value.summary);
                            var panelTitle = ToGrService.statusTitle(value.status, value.resolution);
                            var description = CommentService.field(value.status);
                            var id = value.id;
                            var issuelink = "http://sense.city/issuemap.php?issue_id=" + value.alias;
                            var creation_time = value.creation_time;
                            var local_time = moment(creation_time).format('LLLL');
                            var time_fromNow = moment(creation_time).fromNow();

                            if (!(value.component == "_default")) {
                                var panel =
                                        {
                                            "title": "#" + id + " (" + issue_name + ") -- " + time_fromNow,
                                            "style": panelTitle.status_style,
                                            "icon": panelTitle.status_icon,
                                            "time": local_time,
                                            "issuelink": issuelink,
                                            "issuenameGR": issue_name,
                                            "issuenameEN": value.summary,
                                            "id": id,
                                            "status": panelTitle.status,
                                            "new_status": "",
                                            "resolution": panelTitle.resolution,
                                            "new_resolution": "",
                                            "component": value.component,
                                            "admin": false,
                                            "ArrayID": key,
                                            "comment": value[description],
                                            "initialdesc": value.url,
                                            "mongoId": value.alias
                                        };
                                this.push(panel);
                                Issue2MapService.get({issueID: panel.mongoId[0]}, function (issue) {
                                    // $scope.panel_image = issue.image_name;
                                    // $scope.center = {lat:issue.loc.coordinates[1],lng:issue.loc.coordinates[0],zoom:17};
                                    $scope.ALLmarkers.push({"lat": issue.loc.coordinates[1], "lng": issue.loc.coordinates[0], "icon": icons[panel.issuenameEN], "panelid": panel.ArrayID});
                                });
                            }
                        }, $scope.panels);

                    });
                }
                ;
            }
        } else {
            $cookieStore.remove("uuid");
            $cookieStore.remove("city");
            $cookieStore.remove("role");
            $cookieStore.remove("department");
            $cookieStore.remove("email");
            $cookieStore.remove("username");
        }
    }]);