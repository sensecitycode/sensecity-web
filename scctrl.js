var appControllers = angular.module('scapp.controllers', ['pascalprecht.translate', 'ngCookies', 'ngAnimate']);

function default_ic(this_img) {
    var scope = angular.element("#mctl").scope();
    for (var i = 0; i < scope.allissues.length; i++) {
        if (scope.allissues[i].bug_id == this_img.dataset.bugid) {
            scope.allissues[i].class = "fa fa-" + scope.Variables.icons[scope.allissues1[i]].icon;
            scope.allissues[i].width = "80%";
            scope.allissues[i].image_name = '';
            break;
        }
    }
}

function default_im(this_img) {
    var scope = angular.element("#mctl").scope();
    for (var i = 0; i < scope.allissues.length; i++) {
        if (scope.allissues[i].bug_id == this_img.dataset.bugid) {
            scope.allissues[i].class = '';
            scope.$apply();
            break;
        }
    }
}

appControllers.controller('sensecityMainCtrl', function ($scope, $log, $location, $rootScope, $http, $window) {
    $log.debug('inside sensecityMainCtrl controller');
    $scope.scvesrion = '20160712_trunk';
    $rootScope.overview_url = $location.path();

});

appControllers.controller('mobilelinkCtl', function ($scope, $window, $http, $q, $location) {

    $scope.nloaded = true;
    var url_path = $location.absUrl().split("//");
    var sub_domain = url_path[1].split(".");
    var url;

    if (sub_domain[0].split(":").length > 1) {
        url = "./config/testcity1.json";
        sub_domain[0] = "patras";
    } else {
        url = '../config/' + sub_domain[0] + '.json';
    }

    var d = $q.defer();

    var mainInfo = $http.get(url, {timeout: d.promise}).success(function (response) {

        $scope.Variables = {
            APIADMIN: response.APIADMIN
        };

        d.resolve(response);
        return d.promise;
    });

    setTimeout(function () {
        if (d.promise.$$state.status == 0) {
            d.resolve('cancelled');
            alert("Η υπηρεσία δεν αναταποκρίνεται! Παρακαλώ δοκιμάστε αργότερα!");
        }
    }, 30000);

    var b_id = $location.absUrl().split("=")[1];

    $q.all([mainInfo]).then(function (data) {
        var canbugtoalias = $q.defer();
        $http.get($scope.Variables.APIADMIN + "/bugidtoalias/" + b_id).success(function (response) {
            canbugtoalias.resolve();
            $scope.nloaded = false;
            window.location = "http://" + sub_domain[0] + ".sense.city/scissuemap.html?issue=" + response.bugs[0].alias[0];
        });
        setTimeout(function () {
            if (canbugtoalias.promise.$$state.status == 0) {
                canbugtoalias.resolve('cancelled');
                alert("Η υπηρεσία δεν αναταποκρίνεται! Παρακαλώ δοκιμάστε αργότερα!");
            }
        }, 30000);
    });
});

appControllers.controller('allissuesCtrl', function ($scope, $rootScope, $log, $window, $http, $q, $location, $resource, $translate, $compile, BugService) {
    $log.debug('inside allissuesCtrl controller');
    $scope.nloaded = true;
    $scope.activePage = 1;
    $scope.startPage = 1;
    $scope.pageIndex = 1;
    $scope.lastissues = [];
    var init = 0;

    $scope.navClass = function (page) {
        var path = window.location.href.toString().split("/");
        var currentRoute = path[path.length - 1];
        if (currentRoute.split(".")[0] != page) {
            return false;
        } else {
            return true;
        }
    };

    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
    };

    $scope.allissues = [];
    $rootScope.overview_url = $location.path();

    $scope.doCalcAllIssues = function () {

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

        setTimeout(function () {
            if (d.promise.$$state.status == 0) {
                d.resolve('cancelled');
                alert("Η υπηρεσία δεν αναταποκρίνεται! Παρακαλώ δοκιμάστε αργότερα!");
            }
        }, 30000);

        $q.all([$rootScope.mainInfo]).then(function (data) {

            if ($rootScope.Variables.city_name == "london") {
                $translate.use("en");
            }

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

            $scope.loading = function () {
                $scope.nloaded = true;
            }

            function comp_pages() {
                $scope.pages = '<ul class="pagination pagination-sm pull-right"><li ng-click="loading();totalpages(1,1);"><span tooltip-side="top" tooltips tooltip-template="Πρώτη σελίδα"><a href="#">«</a></span></li>'
                        + '<li ng-click="loading();totalpages(startPage - 5,2)"><span tooltip-side="top" tooltips tooltip-template="Προηγούμενες σελίδες"><a  href="#"><</a></span></li>';
                if (init == 0) {
                    init = 1;
                    $scope.refreshPages(1);
                }
                $scope.pages += '<li ng-repeat="page in page_set"  ng-click="loading();updatePage(page);refresh()" ng-class="( $index + 1 != pageIndex) ? \'\':\'active\'"><span tooltips tooltip-template><a href="#">{{page}}</a></span></li>';
                $scope.pages += '<li ng-click="loading();totalpages(startPage + 5,3)"><span tooltip-side="top" tooltips tooltip-template="Επόμενες σελίδες"><a  href="#">></a></span></li>'
                        + '<li ng-click="loading();totalpages(total_pages - 4,4)"><span tooltip-side="top" tooltips tooltip-template="Τελευταία σελίδα"><a  href="#">»</a></span></li></ul>';
                $(".paging").html($compile($scope.pages)($scope));
            }

            $scope.totalpages = function (newstart, arrow) {
                var canissue = $q.defer();
                var rcanissue = $resource($rootScope.Variables.APIADMIN + '/issue?city=' + $rootScope.Variables.city_name + '&startdate=2018-01-01&sort=-1&list_issue=1',
                        {}, {
                    update: {
                        method: 'GET',
                        isArray: true,
                        cancellable: true
                    }
                }).update(function (response) {
                    canissue.resolve();
                    $scope.total_pages = Math.ceil(response.length / 20);
                    if (init == 0) {
                        $scope.refreshPages(1);
                    } else {
                        $scope.refreshPages(newstart, arrow);
                        $scope.refresh();
                    }
                    comp_pages();
                });

                setTimeout(function () {
                    if (canissue.promise.$$state.status == 0) {
                        rcanissue.$cancelRequest();
                        alert("Η υπηρεσία δεν αναταποκρίνεται! Παρακαλώ δοκιμάστε αργότερα!");
                    }
                }, 30000);
            };

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

            $scope.totalpages();

            $scope.page_set = [];

            $scope.refresh = function () {

                var offset = ($scope.activePage - 1) * 20;

                var canissue1 = $q.defer();
                var rcanissue1;
                var tmpIssues = rcanissue1 = $resource($rootScope.Variables.APIADMIN + '/issue?city=' + $rootScope.Variables.city_name + '&startdate=2018-01-01&sort=-1&limit=20&offset=' + offset + '&list_issue=1&image_field=1',
                        {}, {
                    update: {
                        method: 'GET',
                        isArray: true,
                        cancellable: true
                    }
                }).update(function (response) {
                    canissue1.resolve();
                    var counter = 0;
                    $scope.allissues1 = [];
                    angular
                            .forEach(
                                    tmpIssues,
                                    function (lastissue,
                                            key) {
                                        // console.log("key=
                                        // " + key + ",
                                        // lastissue.issue="
                                        // +
                                        // lastissue.issue);

                                        lastissue.class = "fa fa-" + $rootScope.Variables.icons[lastissue.issue].icon;
                                        lastissue.width = "80%";

                                        $scope.allissues1[counter] = lastissue.issue;

                                        var cat_index = $rootScope.Variables.categories.indexOf(lastissue.issue);
                                        if (cat_index != -1) {
                                            lastissue.issue = $rootScope.Variables.categories_issue[cat_index];
                                        } else {
                                            lastissue.issue = '';
                                        }

                                        lastissue.image_name = $rootScope.Variables.APIADMIN + "/image_issue?bug_id=" + lastissue.bug_id + "&resolution=small";

                                        var today = new Date();
                                        var create_day = new Date(
                                                lastissue.create_at);

                                        var seconds = (today
                                                .getTime() - create_day
                                                .getTime()) / 1000;
                                        var datediff = '';
                                        var datediffunit = '';

                                        if (seconds < 60) {
                                            datediff = seconds;
                                            datediffunit = "SECS";
                                        } else if (seconds < 3600) {
                                            datediff = Math
                                                    .floor(seconds / 60);
                                            datediffunit = "MINUTES";
                                        } else if (seconds < 86400) {
                                            datediff = Math
                                                    .floor(seconds / 3600);
                                            datediffunit = "HOURS";
                                        } else {
                                            datediff = Math
                                                    .floor(seconds / 86400);
                                            datediffunit = "DAYS";

                                        }
                                        lastissue.create_at = datediff;
                                        lastissue.create_at_unit = datediffunit;

                                        /*
                                         var bugParams =
                                         {
                                         "method": "Bug.get",
                                         "params": [{"ids":lastissue._id,"include_fields":["component","cf_sensecityissue","status","id","alias","summary","creation_time","whiteboard","resolution","last_change_time"]}],
                                         "id": 1
                                         };
                                         BugService.search(bugParams, function(result) {
                                         switch (result[0].status) {
                                         case 'CONFIRMED':
                                         result.status = 'CONFIRMED';
                                         break;
                                         case 'IN_PROGRESS':
                                         result.status = 'IN_PROGRESS';
                                         break;
                                         case 'RESOLVED':
                                         result.status = 'RESOLVED';
                                         break;
                                         }
                                         lastissue.status = result.status;
                                         });
                                         
                                         */

                                        counter++;
                                    });
                    $scope.allissues = tmpIssues;
                    $(window).trigger("resize");
                    $scope.nloaded = false;
                });

                setTimeout(function () {
                    if (canissue1.promise.$$state.status == 0) {
                        rcanissue1.$cancelRequest();
                        $scope.$apply();
                        alert("Η υπηρεσία δεν αναταποκρίνεται! Παρακαλώ δοκιμάστε αργότερα!");
                    }
                }, 30000);

                //$scope.allissues = tmpIssues;
            };

            $scope.refresh();
        });
    };

    $scope.doCalcAllIssues();

});