var app = angular.module('statistics', ['ngCookies']);

app.controller('statistics', ['$scope', '$http', '$cookieStore', '$q', '$rootScope', '$location', function ($scope, $http, $cookieStore, $q, $rootScope, $location) {
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
        
        $scope.nloaded = true;

        var url_path = $location.absUrl().split("//");
        var sub_domain = url_path[1].split(".");
        var url;

        if (sub_domain[0].split(":").length > 1) {
            url = "../../config/testcity1.json";
            sub_domain[0] = "testcity1";
        } else {
            url = '../../config/' + sub_domain[0] + '.json';
        }

        $scope.user_type="none";
        $scope.ut = -1;
        if($location.absUrl().split("user=")[1] == 0){
            $scope.user_type = "admin";
            $scope.ut = 0;
        }else if($location.absUrl().split("user=")[1] == 1){
            $scope.user_type = "user";
            $scope.ut = 1;
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

            if ($scope.user_type == "admin") {
                $rootScope.Variables.APIADMIN += "/admin";
            }

            d.resolve(response);
            return d.promise;
        });

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        $q.all([$rootScope.mainInfo]).then(
                function (data) {
                    $(document).resize();
                    var morrisCharts = function () {
                        $http.get($rootScope.Variables.APIADMIN + "/issue?city=" + $rootScope.Variables.city_name + "&startdate=2017-01-01&enddate=" + today + "&status=IN_PROGRESS|RESOLVED&resolution=FIXED&image_field=0&sort=-1&limit=1000", {headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).then(function (response) {
                            var issues_states = [];
                            for (var i = 0; i < $rootScope.Variables.departments.length; i++) {
                                issues_states.push([0, 0]);
                            }

                            var issue_index;
                            for (var i = 0; i < response.data.length; i++) {
                                issue_index = $rootScope.Variables.departments.indexOf(response.data[i].issue);
                                if (issue_index != -1) {
                                    if (response.data[i].status == "RESOLVED") {
                                        issues_states[issue_index][1]++;
                                        issues_states[0][1]++;
                                    } else {
                                        issues_states[issue_index][0]++;
                                        issues_states[0][0]++;
                                    }
                                }
                            }
                            var total_issues = [];
                            for (var i = 0; i < $rootScope.Variables.departments.length; i++) {
                                total_issues[$rootScope.Variables.departments[i] + '_donut'] = issues_states[i][0] + issues_states[i][1];
                                Morris.Donut({
                                    element: $rootScope.Variables.departments[i] + '_donut',
                                    data: [
                                        {label: "Ολοκληρωμένα", value: issues_states[i][1]},
                                        {label: "Σε εξέλιξη", value: issues_states[i][0]}
                                    ],
                                    formatter: function (value, data) { return value + " / "+ total_issues[this.element] },
                                    colors: ['#90EE90', '#CD5C5C']
                                });
                            }
                            $scope.nloaded = false;
                        });



                    }();
                });

    }]);