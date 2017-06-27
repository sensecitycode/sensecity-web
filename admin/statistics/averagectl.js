var app = angular.module('average', ['ngCookies', '720kb.tooltips']);

app.controller('averagectl', ['$scope', '$http', '$cookieStore', '$q', '$rootScope', '$location', function ($scope, $http, $cookieStore, $q, $rootScope, $location) {

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
            url = "../../config/testcity1.json";
            sub_domain[0] = "testcity1";
        } else {
            url = '../../config/' + sub_domain[0] + '.json';
        }

        $scope.today = new Date();
        var dd = $scope.today.getDate();
        var mm = $scope.today.getMonth() + 1;
        var yyyy = $scope.today.getFullYear();

        $scope.today = yyyy + '-' + mm + '-' + dd;

        $scope.user_type = "none";
        $scope.ut = -1;
        if ($location.absUrl().split("user=")[1] == 0) {
            $scope.user_type = "admin";
            $scope.ut = 0;
        } else if ($location.absUrl().split("user=")[1] == 1) {
            $scope.user_type = "user";
            $scope.ut = 1;
        }

        var d = $q.defer();

        $scope.scompl = false;
        var nadminurl;

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

            nadminurl = response.APIADMIN;
            if ($scope.user_type == "admin") {
                $rootScope.Variables.APIADMIN += "/admin";
            }

            d.resolve(response);
            return d.promise;
        });

        $q.all([$rootScope.mainInfo]).then(
                function (data) {
                    $(document).resize();
                    angular.extend($scope, {
                        array1D: {}
                    });
                    $scope.depinfo = [];

                    $("#search_btn").click("on", function () {
                        $scope.nloaded = true;
                        $scope.date1 = $("#startdate").val();
                        $scope.date2 = $("#enddate").val();
                        for (var i = 0; i < $rootScope.Variables.components.length; i++) {
                            $scope.depinfo.push({title: $rootScope.Variables.components[i], title_en: $rootScope.Variables.components_en[i]});
                        }
                        var res_issues = [];
                        var m2;
                        var w2;
                        var l2;
                        var meres2;
                        var wres2;
                        var lepta2;
                        var array1D = [];

                        for (var i = 0; i < $rootScope.Variables.components.length; i++) {
                            res_issues[i] = 0;
                            array1D[i] = [];
                        }
                        $http.get($rootScope.Variables.APIADMIN + "/issue?city=" + $rootScope.Variables.city_name + "&startdate=" + $("#startdate").val() + "&enddate=" + $("#enddate").val() + "&status=RESOLVED&image_field=0&sort=-1&limit=500", {headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).then(function (response) {

                            var number = response.data.length;
                            var cnt = 0;
                            var all_issues = "";

                            for (var i = 0; i < response.data.length - 1; i++) {
                                all_issues += response.data[i]._id + "|";
                            }
                            all_issues += response.data[response.data.length - 1]._id;
                            $http.get(nadminurl + "/fullissue/" + all_issues).then(function (response) {
                                for (var i = 0; i < response.data.length; i++) {
                                    var issues = response.data[i];
                                    var index = $rootScope.Variables.components.indexOf(issues.department);
                                    cnt++;
                                    if (index != -1) {
                                        res_issues[index]++;
                                        var ln = issues.bugs[issues.bug_id].comments.length;
                                        var k1 = new Date();
                                        var k2 = new Date();
                                        for (var j = 1; j < ln; j++) {
                                            var tags_index = -1;
                                            for (var depl = 0; depl < issues.bugs[issues.bug_id].comments[j].tags.length; depl++) {
                                                if (issues.bugs[issues.bug_id].comments[j].tags[depl].split(":")[0] == "STATUS") {
                                                    tags_index = depl;
                                                    break;
                                                }
                                            }
                                            if (tags_index != -1 && issues.bugs[issues.bug_id].comments[j].tags[tags_index] != undefined && (issues.bugs[issues.bug_id].comments[j].tags[tags_index].split(":")[1] == "RESOLVED")) {
                                                k1 = Date.parse(issues.bugs[issues.bug_id].comments[1].creation_time);
                                                k2 = Date.parse(issues.bugs[issues.bug_id].comments[ln - 1].creation_time);
                                                m2 = ((k2 - k1) / 86300000);
                                                meres2 = Math.floor(m2);
                                                w2 = ((k2 - k1) % 86300000) / 3600000;
                                                wres2 = Math.floor(w2);
                                                l2 = (((k2 - k1) % 86300000) % 3600000) / 60000;
                                                lepta2 = Math.floor(l2);
                                                array1D[index].push({
                                                    status: issues.bugs[issues.bug_id].comments[j].tags[tags_index],
                                                    startdate: issues.bugs[issues.bug_id].comments[1].creation_time,
                                                    enddate: issues.bugs[issues.bug_id].comments[ln - 1].creation_time,
                                                    diasthma: k2 - k1,
                                                    problima: issues.value_desc,
                                                    meres: meres2,
                                                    wres: wres2,
                                                    lepta: lepta2,
                                                    link: issues._id,
                                                    bug: issues.bug_id
                                                }
                                                );
                                            }
                                        }

                                        if (number == cnt) {
                                            for (var index = 0; index < $rootScope.Variables.components.length; index++) {
                                                if (array1D[index].length != 0) {
                                                    array1D[index].sort(function (a, b) {
                                                        return a.diasthma - b.diasthma;
                                                    });
                                                    var sumd = 0;

                                                    for (var k = 0; k < array1D[index].length; k++) {
                                                        sumd += array1D[index][k].diasthma;
                                                    }
                                                    var meres = Math.floor(sumd / (array1D[index].length * 86400000));
                                                    var wres = Math.floor(((sumd % (array1D[index].length * 86400000)) / (array1D[index].length * 3600000)));
                                                    var lepta = Math.floor(((sumd % (array1D[index].length * 86400000)) % (array1D[index].length * 3600000)) / (60000 * array1D[index].length));
                                                    $scope.depinfo[index] = {department: $rootScope.Variables.components[index], lresolved: array1D[index][array1D[index].length - 1], fresolved: array1D[index][0], number: res_issues[index], meres: meres, wres: wres, lepta: lepta};
                                                    setTimeout(function () {
                                                        $scope.scompl = true;
                                                        $scope.$apply();
                                                    }, 1);

                                                }
                                            }
                                            $scope.nloaded = false;
                                        }
                                    }
                                }
                            });
                        });
                    });
                });
    }]);