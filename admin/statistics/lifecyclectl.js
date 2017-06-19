var app = angular.module('lifecycle', ['ngCookies']);

app.controller('lifecycle', ['$scope', '$http', '$cookieStore', '$q', '$rootScope', '$location', function ($scope, $http, $cookieStore, $q, $rootScope, $location) {
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
                issue_type_en_short: response.issue_type_en_short,
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
            
            if($scope.user_type == "admin"){
                $rootScope.Variables.APIADMIN += "/admin";
            }
            
            d.resolve(response);
            return d.promise;
        });

        function date_by_subtracting_days(date, days) {
            return new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate() - days,
                    date.getHours(),
                    date.getMinutes(),
                    date.getSeconds(),
                    date.getMilliseconds()
                    );
        }
        function date_by_subtracting_months(date, months) {
            return new Date(
                    date.getFullYear(),
                    date.getMonth() - months,
                    date.getDate(),
                    date.getHours(),
                    date.getMinutes(),
                    date.getSeconds(),
                    date.getMilliseconds()
                    );
        }
        function date_by_subtracting_years(date, years) {
            return new Date(
                    date.getFullYear() - years,
                    date.getMonth(),
                    date.getDate(),
                    date.getHours(),
                    date.getMinutes(),
                    date.getSeconds(),
                    date.getMilliseconds()
                    );
        }

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0
        var yyyy = today.getFullYear();
//Dhmioyrgw metavlhtes gia yesterday
        var yesterday = date_by_subtracting_days(today, 1);
        var dy = yesterday.getDate();
        var my = yesterday.getMonth() + 1;
        var yyyd = yesterday.getFullYear();
        var yesterday = yyyd + '-' + my + '-' + dy;
//Dhmiourgw metavlhtes gia vdomada
        var week = date_by_subtracting_days(today, 7);
        var dw = week.getDate();
        var mw = week.getMonth() + 1;
        var yyyw = week.getFullYear();
        var week = yyyw + '-' + mw + '-' + dw;
//Dhmiourgw metavlhtes gia mhna1
        var month1 = date_by_subtracting_months(today, 1)
        var dm1 = month1.getDate();
        var m1 = month1.getMonth() + 1;
        var yyym1 = month1.getFullYear();
        var month1 = yyym1 + '-' + m1 + '-' + dm1;
//Dhmiourgw metavlhtes gia mhna3
        var month3 = date_by_subtracting_months(today, 3)
        var dm3 = month3.getDate();
        var m3 = month3.getMonth() + 1;
        var yyym3 = month3.getFullYear();
        var month3 = yyym3 + '-' + m3 + '-' + dm3;
//Dhmiourgw metavlhtes gia mhna6
        var month6 = date_by_subtracting_months(today, 6)
        var dm6 = month6.getDate();
        var m6 = month6.getMonth() + 1;
        var yyym6 = month6.getFullYear();
        var month6 = yyym6 + '-' + m6 + '-' + dm6;
//Dhmiourgw metavlhtes gia xrono
        var yyyy1 = date_by_subtracting_years(today, 1)
        var dy1 = yyyy1.getDate();
        var my1 = yyyy1.getMonth() + 1;
        var year1 = yyyy1.getFullYear();
        var yyyy1 = year1 + '-' + my1 + '-' + dy1;
        today = yyyy + '-' + mm + '-' + dd;
        

        $q.all([$rootScope.mainInfo]).then(
                function(data) {
                    
                    $scope.issues = [];
                    for(var i = 0 ; i < $rootScope.Variables.issue_type_gr.length;i++){
                        $scope.issues.push({value:$rootScope.Variables.issue_type_en_short[i],title:$rootScope.Variables.issue_type_gr[i]});
                    }

                    function resolve_stats(startdate, enddate,tag) {
                        $http.get($rootScope.Variables.APIADMIN + "/issue?issue=" + $("#issue_val").val() + "&city="+$rootScope.Variables.city_name+"&startdate=" + startdate + "&enddate=" + enddate + "&status=RESOLVED&image_field=0&sort=-1&limit=500&resolution=FIXED|INVALID|DUPLICATED|WONTFIX",{headers: {'Content-Type': 'application/json', 'x-uuid': $cookieStore.get('uuid'), 'x-role': $cookieStore.get('role')}}).then(function (response) {
                            var cnt_fixed = 0;
                            var cnt_invalid = 0;
                            var cnt_duplicated = 0;
                            var cnt_wontfix = 0;
                            var cnt = 0;
                            for (var i = 0; i < response.data.length; i++) {
                                if (response.data[i].resolution == "FIXED") {
                                    cnt_fixed++;
                                } else if (response.data[i].resolution == "INVALID") {
                                    cnt_invalid++;
                                } else if (response.data[i].resolution == "DUPLICATED") {
                                    cnt_duplicated++;
                                } else if(response.data[i].resolution == "WONTFIX"){
                                    cnt_wontfix++;
                                }else
                                    cnt++;
                            }
                            var nvd3Charts = function () {
                                var myColors = ['#90EE90', '#CD5C5C', "#00BFDD", "#FF702A", "#DA3610",
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
                                        d3.select('#chart-'+tag+' svg').datum(exampleData()).call(chart);
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
                                                    },{"label": "Δεν αποκαταστάθηκαν",
                                                        "value": cnt_wontfix
                                                    }]
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
                        });
                    }
                    $("#search_btn").click("on", function () {
                        //$scope.nloaded = true;
                        resolve_stats(week,today,"w");
                        resolve_stats(month1,today,"m");
                        resolve_stats(month3,today,"3m");
                        resolve_stats(month6,today,"6m");
                        resolve_stats(yyyy1,today,"y");
                    });


                });
    }]);