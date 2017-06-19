var app = angular.module('reactions', ['ngCookies','leaflet-directive']);

app.controller('reactionsctl', ['$scope', '$http', '$cookieStore', '$q', '$rootScope', '$location', function ($scope, $http, $cookieStore, $q, $rootScope, $location) {
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
        
        var local_icons = {
                        greenIcon: {
                            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        },
                        redIcon: {
                            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]
                        },
                        orangeIcon: {
                            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
                            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                            popupAnchor: [1, -34],
                            shadowSize: [41, 41]}
                    };
                    angular.extend($scope, {
                        icons: local_icons
                    });
                    angular.extend($scope, {
                        center: {
                            lat: 20.246639,
                            lng: 21.734573,
                            zoom: 11
                        },
                        events: {
                            map: {
                                enable: ['moveend', 'popupopen'],
                                logic: 'emit'
                            },
                            marker: {
                                enable: [],
                                logic: 'emit'
                            }
                        },
                        layers: {
                            baselayers: {
                                osm: {
                                    name: 'OpenStreetMap',
                                    type: 'xyz',
                                    url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                                }
                            },
                            overlays: {
                                realworld: {
                                    name: "Αντιδράσεις Πολιτών",
                                    type: "group",
                                    visible: true
                                }
                            }
                        }
                    });
        
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

            d.resolve(response);
            return d.promise;
        });

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

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        var from = date_by_subtracting_months(today, 3);
        var dm3 = from.getDate();
        var m3 = from.getMonth() + 1;
        var yyym3 = from.getFullYear();
        var from = yyym3 + '-' + m3 + '-' + dm3;
        var start = new Date();
        start = '2017-01-01';

        today = yyyy + '-' + mm + '-' + dd;

        $q.all([$rootScope.mainInfo]).then(
                function (data) {
                    $(document).resize();
                    var icons = $rootScope.Variables.icons;
                    $scope.center = {
                        lat: $rootScope.Variables.lat_center,
                        lng: $rootScope.Variables.long_center,
                        zoom: 12
                    };
                    $("#search_btn").click("on", function () {
                        $scope.markers = [];
                        $scope.nloaded = true;
                        $http.get($rootScope.Variables.APIADMIN + "/feelings?city=" + $rootScope.Variables.city_name + "&startdate=" + $("#startdate").val() + "&enddate=" + $("#enddate").val()).then(function (response) {
                            for (var i = 0; i < response.data.length; i++) {
                                if (response.data[i].issue == 'happy') {
                                    $scope.markers.push({
                                        lat: response.data[i].loc.coordinates[1],
                                        lng: response.data[i].loc.coordinates[0],
                                        message: response.data[i].value_desc,
                                        icon: icons['happy'],
                                        layer: 'realworld'
                                    })
                                } else if (response.data[i].issue == 'angry') {
                                    $scope.markers.push({
                                        lat: response.data[i].loc.coordinates[1],
                                        lng: response.data[i].loc.coordinates[0],
                                        message: response.data[i].value_desc,
                                        icon: icons['angry'],
                                        layer: 'realworld'
                                    })
                                } else {
                                    $scope.markers.push({
                                        lat: response.data[i].loc.coordinates[1],
                                        lng: response.data[i].loc.coordinates[0],
                                        message: response.data[i].value_desc,
                                        icon: icons['neutral'],
                                        layer: 'realworld'
                                    });
                                }
                            }
                            
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

                                        d3.select("#chart-9 svg").datum(exampleData()).transition().duration(350).call(chart);

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

                                        d3.select("#chart-10 svg").datum(exampleData()).transition().duration(350).call(chart);

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
                            $scope.nloaded = false;
                        });
                    });
                });
    }]);