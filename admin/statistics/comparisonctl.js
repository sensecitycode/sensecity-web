var app = angular.module('comparison', ['ngCookies']);

app.controller('comparisonctl', ['$scope', '$http', '$cookieStore', '$q', '$rootScope', '$location', function ($scope, $http, $cookieStore, $q, $rootScope, $location) {

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

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;

        $scope.tday = today;

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

        var nadminurl;
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
                municipality_list: response.municipality_list,
                municipality_domain: response.municipality_domain,
                issue_type_en_short: response.issue_type_en_short,
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

                    function comparison(municipality, mun_index) {
                        $http.get($rootScope.Variables.APIADMIN + "/issue?city=" + $("#mun" + mun_index).val() + "&startdate=" + $("#startdate").val() + "&enddate=" + $("#enddate").val() + "&status=IN_PROGRESS|RESOLVED&image_field=0&sort=-1&limit=500&resolution=FIXED|INVALID|DUPLICATED", {headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).then(function (response) {
                            var count_resolved = 0;
                            var count_progress = 0;
                            var count_confirmed = 0;
                            var cnt_fixed = 0;
                            var cnt_invalid = 0;
                            var cnt_duplicated = 0;
                            var cnt = 0;

                            $scope.issues = response.data;

                            var count = [];
                            for (var j = 0; j <= $rootScope.Variables.issue_type_en_short.length; j++) {
                                count[j] = 0;
                            }


                            for (var i = 0; i < response.data.length; i++) {
                                if (response.data[i].resolution == "FIXED") {
                                    cnt_fixed++;
                                    var data_index = $rootScope.Variables.issue_type_en_short.indexOf(response.data[i].issue);
                                    count[data_index] = count[data_index] + 1;
                                    count_resolved++;
                                } else if (response.data[i].resolution == "INVALID") {
                                    cnt_invalid++;
                                    var data_index = $rootScope.Variables.issue_type_en_short.indexOf(response.data[i].issue);
                                    count[data_index] = count[data_index] + 1;
                                    count_resolved++;
                                } else if (response.data[i].resolution == "DUPLICATED") {
                                    cnt_duplicated++;
                                    var data_index = $rootScope.Variables.issue_type_en_short.indexOf(response.data[i].issue);
                                    count[data_index] = count[data_index] + 1;
                                    count_resolved++;
                                } else {
                                    cnt++;
                                    count_progress++;
                                }
                            }

                            var max = -1;
                            var min = 1000000000;
                            var value;
                            var value1;

                            for (var i = 0; i < $rootScope.Variables.issue_type_gr.length; i++) {
                                if (max < count[i]) {
                                    max = count[i];
                                    value = $rootScope.Variables.issue_type_gr[i];
                                }
                                if (min > count[i]) {
                                    min = count[i];
                                    value1 = $rootScope.Variables.issue_type_gr[i];
                                }
                            }

                            if (mun_index == 1) {
                                $scope.fr1 = value;
                                $scope.max1 = max;
                                $scope.lfr1 = value1;
                                $scope.min1 = min;
                            } else {
                                $scope.fr2 = value;
                                $scope.max2 = max;
                                $scope.lfr2 = value1;
                                $scope.min2 = min;
                            }

                            var nvd3Charts = function () {

                                var myColors = ['#90EE90', '#CD5C5C', "#00BFDD", "#FF702A"];
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

                                        d3.select('#chart-' + municipality + mun_index + '2 svg').datum(exampleData()).call(chart); //εδώ παίζεις μπάλα

                                        nv.utils.windowResize(chart.update);

                                        return chart;
                                    });

                                    //Each bar represents a single discrete quantity.
                                    function exampleData() {
                                        return [{
                                                key: "Cumulative Return",
                                                values: [{
                                                        "label": "Αποκατεστημένα",
                                                        "value": cnt_fixed
                                                    }, {
                                                        "label": "Εσφαλμένες αναφορές",
                                                        "value": cnt_invalid
                                                    }, {
                                                        "label": "Αναφορά σε άλλο αίτημα",
                                                        "value": cnt_duplicated
                                                    }]
                                            }];

                                    }

                                };
                                var startChart9 = function () {
                                    //Regular pie chart example
                                    nv.addGraph(function () {
                                        var chart = nv.models.pieChart().x(function (d) {
                                            return d.label;
                                        }).y(function (d) {
                                            return d.value;
                                        }).showLabels(true).color(d3.scale.myColors().range());
                                        ;

                                        d3.select("#chart-" + municipality + mun_index + "1 svg").datum(exampleData()).transition().duration(350).call(chart);

                                        return chart;
                                    });

                                    //Donut chart example
                                    nv.addGraph(function () {
                                        var chart = nv.models.pieChart().x(function (d) {
                                            return d.label;
                                        }).y(function (d) {
                                            return d.value;
                                        }).showLabels(true)//Display pie labels
                                                .labelThreshold(.05)//Configure the minimum slice size for labels to show up
                                                .labelType("percent")//Configure what type of data to show in the label. Can be "key", "value" or "percent"
                                                .donut(true)//Turn on Donut mode. Makes pie chart look tasty!
                                                .donutRatio(0.35)//Configure how big you want the donut hole size to be.
                                                .color(d3.scale.myColors().range());
                                        ;

//                                        d3.select("#chart-" + municipality + mun_index + "3 svg").datum(exampleData()).transition().duration(350).call(chart);
//
//                                        return chart;
                                    });

                                    //Pie chart example data. Note how there is only a single array of key-value pairs.
                                    function exampleData() {
                                        return [{
                                                "label": "Ολοκληρωμένα",
                                                "value": count_resolved
                                            }, {
                                                "label": "Σε εξέλιξη",
                                                "value": count_progress
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
                                        startChart9();
                                    }
                                };
                            }();

                            nvd3Charts.init();
                            $scope.nloaded3[mun_index - 1] = false;
                        });

                        $http.get(nadminurl + "/feelings?city=" + $("#mun" + mun_index).val() + "&startdate=" + $("#startdate").val() + "&enddate=" + $("#enddate").val(), {headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).then(function (response) {
                            var count_happy = 0;
                            var count_angry = 0;
                            var count_neutral = 0;

                            for (var i = 0; i < response.data.length; i++) {
                                if (response.data[i].issue == "happy") {
                                    count_happy++;
                                } else if (response.data[i].issue == "angry") {
                                    count_angry++;
                                } else
                                    count_neutral++;
                            }

                            var nvd3Charts = function () {


                                var myColors = ['#90EE90', '#CD5C5C', "#FF8C00"];
                                d3.scale.myColors = function () {
                                    return d3.scale.ordinal().range(myColors);
                                };



                                var startChart9 = function () {
                                    //Regular pie chart example
                                    nv.addGraph(function () {
                                        var chart = nv.models.pieChart().x(function (d) {
                                            return d.label;
                                        }).y(function (d) {
                                            return d.value;
                                        }).showLabels(true).color(d3.scale.myColors().range());
                                        ;
                                        d3.select("#chart-" + municipality + mun_index + "3 svg").datum(exampleData()).transition().duration(350).call(chart);

                                        return chart;
                                    });

                                    //Donut chart example
                                    nv.addGraph(function () {
                                        var chart = nv.models.pieChart().x(function (d) {
                                            return d.label;
                                        }).y(function (d) {
                                            return d.value;
                                        }).showLabels(true)//Display pie labels
                                                .labelThreshold(.05)//Configure the minimum slice size for labels to show up
                                                .labelType("percent")//Configure what type of data to show in the label. Can be "key", "value" or "percent"
                                                .donut(true)//Turn on Donut mode. Makes pie chart look tasty!
                                                .donutRatio(0.35)//Configure how big you want the donut hole size to be.
                                                .color(d3.scale.myColors().range());
                                        ;

                                        d3.select("#chart-" + municipality + mun_index + "3 svg").datum(exampleData()).transition().duration(350).call(chart);

                                        return chart;
                                    });

                                    //Pie chart example data. Note how there is only a single array of key-value pairs.



                                    function exampleData() {
                                        return [{
                                                "label": "Χαρούμενοι",
                                                "value": count_happy
                                            }, {
                                                "label": "Εκνευρισμένοι",
                                                "value": count_angry
                                            }, {
                                                "label": "Ουδέτεροι",
                                                "value": count_neutral
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


                                        startChart9();
                                    }
                                };

                            }();

                            nvd3Charts.init();

                            $scope.nloaded1[mun_index - 1] = false;
                        });

                        $scope.nloaded2[mun_index - 1] = false;
                    }

                    $("#search_btn").click("on", function () {
                        $scope.nloaded1 = [];
                        $scope.nloaded2 = [];
                        $scope.nloaded3 = [];
                        $scope.nloaded1[0] = true;
                        $scope.nloaded1[1] = true;
                        $scope.nloaded2[0] = true;
                        $scope.nloaded2[1] = true;
                        $scope.nloaded3[0] = true;
                        $scope.nloaded3[1] = true;
                        $scope.municipality1 = $("#mun1").val();
                        $scope.municipality2 = $("#mun2").val();
                        comparison($scope.municipality1, 1);
                        comparison($scope.municipality2, 2);
                    });
                });
    }]);