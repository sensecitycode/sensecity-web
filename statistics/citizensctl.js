var app = angular.module('citizens', ['ngCookies']);

app.controller('citizensctl', ['$scope', '$http', '$cookieStore', '$q', '$rootScope', '$location', function ($scope, $http, $cookieStore, $q, $rootScope, $location) {
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

        var url_path = $location.absUrl().split("//");
        var sub_domain = url_path[1].split(".");
        var url;

        if (sub_domain[0].split(":").length > 1) {
            url = "../config/testcity1.json";
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
                activeTitles: response.activeTitles,
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

        $q.all([$rootScope.mainInfo]).then(
                function (data) {
                    $(document).resize();
                    $("#search_btn").click("on", function () {
                        $http.get($rootScope.Variables.APIADMIN+"/issue?city="+$rootScope.Variables.city_name+"&startdate=" + $("#txt_issue1").val() + "&enddate=" + $("#txt_issue2").val() + "&includeAnonymous=1").then(function (response) {
                            $scope.issues = response.data;
                            $scope.desktop = function () {
                                var count = 0;
                                for (i = 0; i < $scope.issues.length; i++) {
                                    if ($scope.issues[i].device_id == 'webapp') {
                                        count++;
                                    }
                                }

                                count = (count / response.data.length) * 100;
                                return count.toFixed(2);
                            }
                            $scope.auth = function () {
                                var count = 0;
                                for (i = 0; i < response.data.length; i++) {
                                    if (response.data[i].cf_authenticate == '0') {
                                        count++;
                                    }
                                }
                                count = (count / response.data.length) * 100;
                                return count.toFixed(2);
                            }


                        });
                    });
                });
    }]);