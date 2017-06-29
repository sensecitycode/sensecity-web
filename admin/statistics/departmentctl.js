var app = angular.module('department', ['ngCookies', '720kb.tooltips']);

app.controller('departmentctl', ['$scope', '$http', '$cookieStore', '$q', '$rootScope', '$location', '$compile', function ($scope, $http, $cookieStore, $q, $rootScope, $location, $compile) {

        var init = 0;
        $scope.nloaded = true;

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
                    var start1 = $location.absUrl().split("start=")[1].split("&")[0];
                    var end1 = $location.absUrl().split("end=")[1].split("&")[0];
                    var department = decodeURIComponent($location.absUrl().split("department=")[1].split("&start")[0]);
                    $scope.depart_title = department;

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

                    function comp_pages() {
                        $scope.pages = '<ul class="pagination pagination-sm pull-right"><li ng-click="loading();totalpages(1,1);"><span tooltip-side="top" tooltips tooltip-template="Πρώτη σελίδα"><a href="#">«</a></span></li>'
                                + '<li ng-click="loading();totalpages(startPage - 5,2)"><span tooltip-side="top" tooltips tooltip-template="Προηγούμενες σελίδες"><a  href="#"><</a></span></li>';
                        $scope.pages += '<li ng-repeat="page in page_set"  ng-click="loading();updatePage(page);refresh()" ng-class="( $index + 1 != pageIndex) ? \'\':\'active\'"><span tooltips tooltip-template><a href="#">{{page}}</a></span></li>';
                        $scope.pages += '<li ng-click="loading();totalpages(startPage + 5,3)"><span tooltip-side="top" tooltips tooltip-template="Επόμενες σελίδες"><a  href="#">></a></span></li>'
                                + '<li ng-click="loading();totalpages(total_pages - 4,4)"><span tooltip-side="top" tooltips tooltip-template="Τελευταία σελίδα"><a  href="#">»</a></span></li></ul>';
                        $(".paging").html($compile($scope.pages)($scope));
                    }

                    $scope.loading = function () {
                        $scope.nloaded = true;
                    };

                    $scope.totalpages = function (newstart, arrow) {
                        var canissue = $q.defer();
                        $scope.depart_title = department;
                        $http.get($rootScope.Variables.APIADMIN + "/issue?city=" + $rootScope.Variables.city_name + "&startdate=" + start1 + "&enddate=" + end1 + "&status=RESOLVED&image_field=0&departments=" + $scope.depart_title, {headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).then(function (response) {
                            canissue.resolve();
                            $scope.total_pages = Math.ceil(response.data.length / 20);
                            if (init == 0) {
                                $scope.refreshPages(1);
                                init = 1;
                            } else {
                                $scope.refreshPages(newstart, arrow);
                                $scope.refresh();
                            }
                            comp_pages();

                            setTimeout(function () {
                                if (canissue.promise.$$state.status == 0) {
                                    rcanissue.$cancelRequest();
                                    alert("Η υπηρεσία δεν αναταποκρίνεται! Παρακαλώ δοκιμάστε αργότερα!");
                                }
                            }, 30000);
                        });
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
                        $scope.array1D = [];
                        $http.get($rootScope.Variables.APIADMIN + "/issue?city=" + $rootScope.Variables.city_name + "&startdate=" + start1 + "&enddate=" + end1 + "&status=RESOLVED&image_field=0&sort=-1&limit=20&offset="+offset+"&departments=" + encodeURIComponent(department), {headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).then(function (response) {
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
                            $scope.date1 = $("#startdate").val();
                            $scope.date2 = $("#enddate").val();
                            var all_issues = "";
                            for (var i = 0; i < response.data.length - 1; i++) {
                                all_issues += response.data[i]._id + "|";
                            }
                            all_issues += response.data[response.data.length - 1]._id;
                            $http.get(nadminurl + "/fullissue/" + all_issues).then(function (response) {
                                for (var i = 0; i < response.data.length; i++) {
                                    var is = false;
                                    var issues = response.data[i];
                                    cnt++;
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
                                        if (tags_index != -1 && ((issues.bugs[issues.bug_id].comments[j].tags[tags_index].split(":")[1] == "RESOLVED") && (is == false))) {
                                            k1 = Date.parse(issues.bugs[issues.bug_id].comments[1].creation_time);
                                            k2 = Date.parse(issues.bugs[issues.bug_id].comments[ln - 1].creation_time);
                                            m2 = ((k2 - k1) / 86300000);
                                            meres2 = Math.floor(m2);
                                            w2 = ((k2 - k1) % 86300000) / 3600000;
                                            wres2 = Math.floor(w2);
                                            l2 = (((k2 - k1) % 86300000) % 3600000) / 60000;
                                            lepta2 = Math.floor(l2);
                                            is = true;
                                            $scope.array1D.push({
                                                status: issues.bugs[issues.bug_id].comments[j].tags[tags_index],
                                                startdate: issues.bugs[issues.bug_id].comments[1].creation_time,
                                                enddate: issues.bugs[issues.bug_id].comments[ln - 1].creation_time,
                                                diasthma: k2 - k1,
                                                problima: issues.value_desc,
                                                meres: meres2,
                                                wres: wres2,
                                                lepta: lepta2,
                                                eidos: issues.resolution,
                                                link: issues._id,
                                                bug: issues.bug_id
                                            }
                                            );
                                        }
                                    }
                                    if ((number == cnt) && ($scope.array1D.length != 0)) {
                                        $scope.array1D.sort(function (a, b) {
                                            return a.diasthma - b.diasthma;
                                        });
                                        var count = [];
                                        for (var j = 0; j <= 9; j++) {
                                            count[j] = 0;
                                        }
                                        var sumd = 0;
                                        for (var k = 0; k < $scope.array1D.length; k++) {
                                            sumd += $scope.array1D[k].diasthma;

                                        }
                                        meres = Math.floor(sumd / ($scope.array1D.length * 86400000));
                                        wres = Math.floor((sumd % ($scope.array1D.length * 86400000) / ($scope.array1D.length * 3600000)));
                                        lepta = Math.floor((sumd % ($scope.array1D.length * 86400000) % ($scope.array1D.length * 3600000)) / (60000 * $scope.array1D.length));
                                        var m = meres;
                                        m = Math.round(m / 10) * 10;
                                        if (m == 0)
                                            m = 10;
                                        var vhma = (2 * m * 86400000) / 10;
                                        for (var k = 0; k < $scope.array1D.length; k++) {
                                            if ($scope.array1D[k].diasthma <= $scope.array1D[0].diasthma + vhma)
                                                count[0]++;
                                            else if ($scope.array1D[k].diasthma <= $scope.array1D[0].diasthma + 2 * vhma)
                                                count[1]++;
                                            else if ($scope.array1D[k].diasthma <= $scope.array1D[0].diasthma + 3 * vhma)
                                                count[2]++;
                                            else if ($scope.array1D[k].diasthma <= $scope.array1D[0].diasthma + 4 * vhma)
                                                count[3]++;
                                            else if ($scope.array1D[k].diasthma <= $scope.array1D[0].diasthma + 5 * vhma)
                                                count[4]++;
                                            else if ($scope.array1D[k].diasthma <= $scope.array1D[0].diasthma + 6 * vhma)
                                                count[5]++;
                                            else if ($scope.array1D[k].diasthma <= $scope.array1D[0].diasthma + 7 * vhma)
                                                count[6]++;
                                            else if ($scope.array1D[k].diasthma <= $scope.array1D[0].diasthma + 8 * vhma)
                                                count[7]++;
                                            else if ($scope.array1D[k].diasthma <= $scope.array1D[0].diasthma + 9 * vhma)
                                                count[8]++;
                                            else
                                                count[9]++;
                                        }
                                        var nvd3Charts = function () {
                                            var myColors = ["#33414E", "#8DCA35", "#00BFDD", "#FF702A", "#DA3610",
                                                "#80CDC2", "#A6D969", "#D9EF8B", "#FFFF99", "#F7EC37", "#F46D43",
                                                "#E08215", "#D73026", "#A12235", "#8C510A", "#14514B", "#4D9220",
                                                "#542688", "#4575B4", "#74ACD1", "#B8E1DE", "#FEE0B6", "#FDB863",
                                                "#C51B7D", "#DE77AE", "#EDD3F2"];
                                            d3.scale.myColors = function () {
                                                return d3.scale.ordinal().range(myColors);
                                            };
                                            var startChart4 = function () {
                                                nv.addGraph(function () {
                                                    var chart = nv.models.discreteBarChart().x(function (d) {
                                                        return d.label;
                                                    })//Specify the data accessors.
                                                            .y(function (d) {
                                                                return d.value;
                                                            }).staggerLabels(true)//Too many bars and not enough room? Try staggering labels.
                                                            .tooltips(false)//Don't show tooltips
                                                            .showValues(true)//...instead, show the bar value right on top of each bar.
                                                            .transitionDuration(350)
                                                            .color(d3.scale.myColors().range());
                                                    ;

                                                    d3.select('#chart-4 svg').datum(exampleData()).call(chart);

                                                    nv.utils.windowResize(chart.update);
                                                    chart.xAxis//Chart x-axis settings
                                                            .axisLabel('Time (ms)').tickFormat(d3.format(',r'));
                                                    return chart;
                                                });
                                                var x = $scope.array1D[0].diasthma;
                                                var A1 = Math.round(x / 86400000);
                                                var A = A1.toString();
                                                var B1 = Math.round((x + vhma) / 86400000);
                                                var B = B1.toString();
                                                var C1 = Math.round((x + 2 * vhma) / 86400000);
                                                var C = C1.toString();
                                                var D1 = Math.round((x + 3 * vhma) / 86400000);
                                                var D = D1.toString();
                                                var E1 = Math.round((x + 4 * vhma) / 86400000);
                                                var E = E1.toString();
                                                var F1 = Math.round((x + 5 * vhma) / 86400000);
                                                var F = F1.toString();
                                                var G1 = Math.round((x + 6 * vhma) / 86400000);
                                                var G = G1.toString();
                                                var H1 = Math.round((x + 7 * vhma) / 86400000);
                                                var H = H1.toString();
                                                var I1 = Math.round((x + 8 * vhma) / 86400000);
                                                var I = I1.toString();
                                                var K1 = Math.round((x + 9 * vhma) / 86400000);
                                                var K = K1.toString();
                                                //Each bar represents a single discrete quantity.
                                                function exampleData() {
                                                    return [{
                                                            key: "Cumulative Return",
                                                            values: [{
                                                                    "label": A + '-' + B + ' M',
                                                                    "value": count[0]
                                                                }, {
                                                                    "label": B + '-' + C + ' M',
                                                                    "value": count[1]
                                                                }, {
                                                                    "label": C + '-' + D + ' M',
                                                                    "value": count[2]
                                                                }, {
                                                                    "label": D + '-' + E + ' M',
                                                                    "value": count[3]
                                                                }, {
                                                                    "label": E + '-' + F + ' M',
                                                                    "value": count[4]
                                                                }, {
                                                                    "label": F + '-' + G + ' M',
                                                                    "value": count[5]
                                                                }, {
                                                                    "label": G + '-' + H + ' M',
                                                                    "value": count[6]
                                                                }, {
                                                                    "label": H + '-' + I + ' M',
                                                                    "value": count[7]
                                                                }, {
                                                                    "label": I + '-' + K + ' M',
                                                                    "value": count[8]
                                                                }, {
                                                                    "label": K + '++' + 'M',
                                                                    "value": count[9]
                                                                }
                                                            ]
                                                        }];

                                                }

                                            };
                                            function stream_layers(n, m, o) {
                                                if (arguments.length < 3)
                                                    o = 0;
                                                function bump(a) {
                                                    var x = 1 / (.1 + Math.random()), y = 2 * Math.random() - .5, z = 10 / (.1 + Math.random());
                                                    for (var i = 0; i < m; i++) {
                                                        var w = (i / m - y) * z;
                                                        a[i] += x * Math.exp(-w * w);
                                                    }
                                                }
                                                return d3.range(n).map(function () {
                                                    var a = [], i;
                                                    for (i = 0; i < m; i++)
                                                        a[i] = o + o * Math.random();
                                                    for (i = 0; i < 5; i++)
                                                        bump(a);
                                                    return a.map(stream_index);
                                                });
                                            }
                                            function stream_index(d, i) {
                                                return {
                                                    x: i,
                                                    y: Math.max(0, d)
                                                };
                                            }
                                            return {
                                                init: function () {

                                                    startChart4();
                                                }
                                            };
                                        }();
                                        nvd3Charts.init();
                                        $(document).resize();
                                    }
                                }
                                $scope.nloaded = false;
                            });
                        });
                    };
                    $scope.refresh();
                });
    }]);