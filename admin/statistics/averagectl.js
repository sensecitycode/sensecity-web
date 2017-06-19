var app = angular.module('average', ['ngCookies','720kb.tooltips']);

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
            if($scope.user_type == "admin"){
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
                    function department_stats(department, dep_index) {
                        $http.get($rootScope.Variables.APIADMIN + "/issue?city=" + $rootScope.Variables.city_name + "&startdate=" + $("#startdate").val() + "&enddate=" + $("#enddate").val() + "&status=RESOLVED&image_field=0&sort=-1&limit=500&departments=" + encodeURIComponent(department),{headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).then(function (response) {
                            var number = response.data.length;
                            var meres = 0;
                            var wres = 0;
                            var lepta = 0;
                            var m2 = 0;
                            var w2 = 0;
                            var l2 = 0;
                            var meres2 = 0;
                            var wres2 = 0;
                            var lepta2 = 0;
                            var cnt = 0;
                            var array1D = [];
                            var length = response.data.length;
                            for (var i = 0; i < response.data.length; i++) {
                                $http.get(nadminurl + "/fullissue/" + response.data[i]._id).then(function (response) {
                                    var issues = response.data;
                                    cnt++;
                                    var ln = issues[1].bugs[Object.keys(issues[1].bugs)[0]].comments.length;
                                    var k1 = new Date();
                                    var k2 = new Date();
                                    for (var j = 1; j < ln; j++) {
                                        var tags_index = -1;
                                        for (var depl = 0; depl < issues[1].bugs[Object.keys(issues[1].bugs)[0]].comments[j].tags.length; depl++) {
                                            if (issues[1].bugs[Object.keys(issues[1].bugs)[0]].comments[j].tags[depl].split(":")[0] == "STATUS") {
                                                tags_index = depl;
                                                break;
                                            }
                                        }
                                        if (tags_index != -1 && issues[1].bugs[Object.keys(issues[1].bugs)[0]].comments[j].tags[tags_index] != undefined && (issues[1].bugs[Object.keys(issues[1].bugs)[0]].comments[j].tags[tags_index].split(":")[1] == "RESOLVED")) {
                                            k1 = Date.parse(issues[1].bugs[Object.keys(issues[1].bugs)[0]].comments[1].creation_time);
                                            k2 = Date.parse(issues[1].bugs[Object.keys(issues[1].bugs)[0]].comments[ln - 1].creation_time);
                                            m2 = ((k2 - k1) / 86300000);
                                            meres2 = Math.floor(m2);
                                            w2 = ((k2 - k1) % 86300000) / 3600000;
                                            wres2 = Math.floor(w2);
                                            l2 = (((k2 - k1) % 86300000) % 3600000) / 60000;
                                            lepta2 = Math.floor(l2);
                                            array1D.push({
                                                status: issues[1].bugs[Object.keys(issues[1].bugs)[0]].comments[j].tags[tags_index],
                                                startdate: issues[1].bugs[Object.keys(issues[1].bugs)[0]].comments[1].creation_time,
                                                enddate: issues[1].bugs[Object.keys(issues[1].bugs)[0]].comments[ln - 1].creation_time,
                                                diasthma: k2 - k1,
                                                problima: issues[0].value_desc,
                                                meres: meres2,
                                                wres: wres2,
                                                lepta: lepta2,
                                                link: issues[0]._id,
                                                bug: issues[0].bug_id
                                            }
                                            );
                                        }
                                    }

                                    if ((number == cnt) && ($scope.array1D.length != 0)) {
                                        array1D.sort(function (a, b) {
                                            return a.diasthma - b.diasthma;
                                        });
                                        var sumd = 0;

                                        for (var k = 0; k < array1D.length; k++) {
                                            sumd += array1D[k].diasthma;
                                        }
                                        meres = Math.floor(sumd / (array1D.length * 86400000));
                                        wres = Math.floor(((sumd % (array1D.length * 86400000)) / (array1D.length * 3600000)));
                                        lepta = Math.floor(((sumd % (array1D.length * 86400000)) % (array1D.length * 3600000)) / (60000 * array1D.length));
                                        $scope.depinfo[dep_index] = {department: department.replace("&","%26"), lresolved: array1D[array1D.length - 1], fresolved: array1D[0], number: number, meres: meres, wres: wres, lepta: lepta};
                                        setTimeout(function(){$scope.scompl = true;},1);
                                    }
                                });
                            }
                        });
                    }
                    $("#search_btn").click("on", function () {
                        $scope.date1 = $("#startdate").val();
                        $scope.date2 = $("#enddate").val();
                        for (var i = 0; i < $rootScope.Variables.components.length; i++) {
                            department_stats($rootScope.Variables.components[i], i);
                        }
                    });
                });
    }]);
