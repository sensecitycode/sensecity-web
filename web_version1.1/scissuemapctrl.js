var appControllers = angular.module('scissuemapapp.scissuemapctrl', ['ngResource','ngCookies','ngAnimate','720kb.tooltips','pascalprecht.translate', 'scissuemapapp.scissuemapsrvs', 'angularUtils.directives.dirDisqus'])
        .constant("config", {"host": "api.sense.city", "port": "3000"});


appControllers.config(['$translateProvider', function ($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'config/lang_',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage('el');
        $translateProvider.useLocalStorage();
    }]);

appControllers.controller('NavCtrl', ['$scope', '$location', '$rootScope', '$translate', function ($scope, $location, $rootScope, $translate) {

        //$scope.user = $rootScope.fstoreuser;

        $scope.navClass = function (page) {
            var currentRoute = $location.path().substring(1) || 'home';
            return page === currentRoute ? 'active' : '';
        };


        $scope.changeLanguage = function (langKey) {
            $translate.use(langKey);
        };

    }]);

appControllers.controller('scissuemapctrl', ['$scope', '$rootScope', '$location', '$window', '$resource', '$http', 'ToGrService', 'config', 'leafletData',
    function ($scope, $rootScope, $location, $window, $resource, $http, ToGrService, config, leafletData) {
        $rootScope.overview_url = $location.path();
        var issue_id = window.location.toString().split('=')[1];
        var panorama;
        var svissue;
        var svtitle;
        var glat = 38.24645352266985;
        var glng = 21.735068952148438;
        var google_street_layer = false;
        var url_path = $location.absUrl().split("//");
        var sub_domain = url_path[1].split(".");
        var url;

        if( sub_domain[0].split(":").length > 1){
            url = "./config/testcity1.json";
            sub_domain[0] = "testcity1";
        }else{
            url = '../config/'+sub_domain[0]+'.json';
        }
        
        $scope.initialize = function () {
            var fenway = {lat: 38.24645352266985, lng: 21.735068952148438};
            var panoOptions = {
                position: fenway,
                addressControlOptions: {
                    position: google.maps.ControlPosition.BOTTOM_CENTER
                },
                linksControl: false,
                panControl: false,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL
                },
                fullscreenControl: false,
                enableCloseButton: false
            };
            panorama = new google.maps.StreetViewPanorama(
                    $('#streetview')[0], panoOptions);

            $(window).resize(function () {

                var position = $("#map").position();
                var width = $("#map").width();
                if (google_street_layer) {
                    $("#streetview").attr('style', 'z-index:1;width:' + width + 'px;position:absolute;height:' + $("#map").height() + 'px;');
                    google.maps.event.trigger(panorama, "resize");
                }
            });
        };
        
        $scope.change_icon = function(icon_type){
            $("#map-icons-active").attr("id","map-icons");
            if(icon_type == "Χάρτης"){
               $(".fa.fa-map").attr("id","map-icons-active");
               google_street_layer = false;
               $(".leaflet-control-zoom").css("visibility", "visible");
               $("#streetview").css('z-index', '-1');
                res();
            }else if(icon_type == "Δρόμος"){
               $(".fa.fa-street-view").attr("id","map-icons-active");
                google_street_layer = true;
                $("#streetview").css('z-index', '1');
                $(".leaflet-control-zoom").css("visibility", "hidden");
                $(window).trigger("resize");
            }else{
               $(".fa.fa-eercast").attr("id","map-icons-active"); 
               $window.open("https://www.google.gr/maps/@" + glat + "," + glng + ",198a,20y,41.27t/data=!3m1!1e3?hl=en");
            }
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
                }, googleStreetView: {
                    name: 'Google Street View',
                    type: 'xyz',
                    url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    layerOptions: {
                        showOnSelector: false,
                        attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
                    }
                }, google3dBuildings: {
                    name: 'Google 3d buildings',
                    type: 'xyz',
                    url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                    layerOptions: {
                        showOnSelector: false,
                        attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
                    }
                }
            }
        };

        $scope.center = {};
        $scope.markers = {};
        
        $scope.disqusConfig = {
            disqus_shortname: 'sense-city',
            disqus_identifier: issue_id,
            disqus_url: window.location.href
        };

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
                overlay_functions : response.overlay_functions,
                overlay_categories : response.overlay_categories,
                google_init_coords: response.google_init_coords,
                google_buildings: response.google_buildings,
                host: response.host
            };

//        var ft = 1;
//        for(var key in $route.routes){
//           $templateCache.remove($route.routes[key].templateUrl);
//           delete($route.routes[key]);
//        }
        //$templateCache.remove($route.routes["/overview"].templateUrl);
        //$templateCache.removeAll();
        //delete($route.routes);
         //       $window.alert(JSON.stringify($route.routes));
         
         var icons = $rootScope.Variables.icons;
        var position = $("#map").position();
        var width = $("#map").width();
        $("#streetview").attr('style', 'z-index:-1;width:' + width + 'px;position:absolute;height:' + $("#map").height() + 'px');

        function res() {

            var position = $("#map").position();
            var width = $("#map").width();
            if (google_street_layer) {
                $("#streetview").attr('style', 'z-index:1;width:' + width + 'px;position:absolute;height:' + $("#map").height() + 'px;');
                google.maps.event.trigger(panorama, "resize");
            }
        }
        ;

        var idt = setTimeout(function () {
            for (var i = idt; i > 0; i--)
                clearInterval(i);
        }, 10);
//        $rootScope.$on('$locationChangeStart', function (event, current, previous) {
//            var url = current.split(".");
//
//            if (url[1] == "sense") {
//                event.preventDefault();
//                document.location.href = current.split(".")[0] + ".sense.city";
//            }
//        });

        $scope.submit = "";
        $scope.assignment = "---";
        $scope.completion = "---";
        
        leafletData.getMap().then(function (map) {
            map.scrollWheelZoom.disable();
        });
        
        leafletData.getMap().then(function (map) {
//            map.on('baselayerchange', function (e) {
//                if (e.name == "Google Street View") {
//                    google_street_layer = true;
//                    $("#streetview").css('z-index', '1');
//                    $(".leaflet-control-zoom").css("visibility", "hidden");
//                    res();
//                } else {
//                    google_street_layer = false;
//                    $(".leaflet-control-zoom").css("visibility", "visible");
//                    $("#streetview").css('z-index', '-1');
//                    if (e.name == "Google 3d buildings") {
//                        $window.open("https://www.google.gr/maps/@" + glat + "," + glng + ",198a,20y,41.27t/data=!3m1!1e3?hl=en");
//                    }
//                }
//            });
        });

        function checkNearestStreetView(panoData) {
            if (panoData != null) {
                var issueMarker = new google.maps.Marker({
                    position: panoData.location.latLng,
                    map: panorama,
                    icon: './admin/icons/' + svissue + '.png',
                    title: svtitle,
                    visible: true
                });
                issueMarker.info = new google.maps.InfoWindow({
                    content: '<span style="color:black;">' + $scope.issue_value_desc + '</span>'
                });
                google.maps.event.addListener(issueMarker, 'click', function () {
                    issueMarker.info.open(panorama, issueMarker);
                });
                panorama.setPosition(panoData.location.latLng);
            }
            ;
        }

        function timeline(response) {

            $scope.comments = [];
            $scope.resp_id = response[0].bug_id;
            var tag_pos;
            var dep_pos;

            for (var i = 1; i < response[1].bugs[$scope.resp_id].comments.length; i++) {

                var day;
                var month;
                var year;
                var time;
                var color;
                var type;
                var show = true;


                var time_parse = response[1].bugs[$scope.resp_id].comments[i].time.split("-");
                day = time_parse[2].substring(0, 2);
                month = time_parse[1];


                var tag_pos;
                switch (response[1].bugs[$scope.resp_id].comments[i].tags[0]) {
                    case "CONFIRMED":
                    case "IN_PROGRESS":
                    case "RESOLVED":
                        tag_pos = 0;
                        dep_pos = 1;
                        break;
                    default:
                        tag_pos = 1;
                        dep_pos = 0;
                        break;
                }

                if (response[1].bugs[$scope.resp_id].comments[i].tags[tag_pos] == "CONFIRMED") {
                    color = {"background-color": "#e74c3c"};
                    type = "Ανοιχτο";
                } else if (response[1].bugs[$scope.resp_id].comments[i].tags[tag_pos] == "IN_PROGRESS") {
                    color = {"background-color": "#e67e22"};
                    type = "Σε εκτελεση";
                } else {
                    color = {"background-color": "#2ecc71"};
                    type = "Ολοκληρωμενο";
                }

                switch (month) {
                    case "01":
                        month = "Ιαν";
                        break;
                    case "02":
                        month = "Φεβ";
                        break;
                    case "03":
                        month = "Μαρ";
                        break;
                    case "04":
                        month = "Απρ";
                        break;
                    case "05":
                        month = "Μαη";
                        break;
                    case "06":
                        month = "Ιουν";
                        break;
                    case "07":
                        month = "Ιουλ";
                        break;
                    case "08":
                        month = "Αυγ";
                        break;
                    case "09":
                        month = "Σεπτ";
                        break;
                    case "10":
                        month = "Οκτ";
                        break;
                    case "11":
                        month = "Νοε";
                        break;
                    case "12":
                        month = "Δεκ";
                        break;
                }

                year = time_parse[0];

                time = response[1].bugs[$scope.resp_id].comments[i].time.substring(11, 19);
                var temp_time = time.substring(0, 2);
                var ntime = parseInt(temp_time);
                ntime += 2;
                if (ntime < 10) {
                    time = "0" + ntime + time.substring(2);
                } else if (ntime > 23) {
                    if (ntime == 24) {
                        ntime = 0;
                    } else {
                        ntime = 1;
                    }
                    time = "0" + ntime + time.substring(2);
                } else {
                    time = ntime + time.substring(2);
                }
                if (response[1].bugs[$scope.resp_id].comments[i].text == 'undefined') {
                    show = false;
                }
                var dep_index = $rootScope.Variables.components_en.indexOf(response[1].bugs[$scope.resp_id].comments[i].tags[dep_pos]);
                response[1].bugs[$scope.resp_id].comments[i].tags[dep_pos] = $rootScope.Variables.components[dep_index];

                var com = {
                    "content": response[1].bugs[$scope.resp_id].comments[i].text,
                    "type": type,
                    "day": day,
                    "month": month,
                    "year": year,
                    "time": time,
                    "color": color,
                    "component": response[1].bugs[$scope.resp_id].comments[i].tags[dep_pos],
                    "show": show
                };

                if (response[1].bugs[$scope.resp_id].comments[i].text.substr(2, 3) != "***") {
                    if($scope.comments.length == 0){
                        $scope.fcyear = com.year;
                    }
                    $scope.comments.push(com);
                }
            }
        }
        ;


        //parse ?issue_id from URL
        $scope.disqus_id = issue_id;
        $resource($rootScope.Variables.APIADMIN + '/fullissue/:issueID',
            {issueID: '@id'}, {'query': {method: 'GET', isArray: true}}
    ).query({issueID: issue_id}, function (issue) {
            if (issue[0].image_name != "" && issue[0].image_name != "no-image") {
                $scope.issue_image = issue[0].image_name;
            } else {
                $scope.lastissue_class = "fa fa-" + $rootScope.Variables.icons[issue[0].issue].icon + " img-text";
            }
            $scope.iclass= "fa fa-" + $rootScope.Variables.icons[issue[0].issue].icon;
            $scope.center = {lat: issue[0].loc.coordinates[1], lng: issue[0].loc.coordinates[0], zoom: 18};
            $scope.markers = [{"lat": issue[0].loc.coordinates[1], "lng": issue[0].loc.coordinates[0], "icon": icons[issue[0].issue]}];

            glat = issue[0].loc.coordinates[1];
            glng = issue[0].loc.coordinates[0];

            var issue_index = $rootScope.Variables.categories.indexOf(issue[0].issue);
            svissue = issue[0].issue;
            svtitle = $rootScope.Variables.departments_en[issue_index];

            if (issue[0].issue == "garbage" || "lighting") {
                var type;
                if (issue[0].issue == "lighting")
                {
                    type = "fotistiko";
                } else {
                    type = issue[0].issue;
                }

                $resource($rootScope.Variables.host+'/fix_point/:long/:lat/50/data',
        {
					long:'@long',
					lat:'@lat',
					type:"@type"
				}
			).query({long: issue[0].loc.coordinates[0], lat: issue[0].loc.coordinates[1], type: type}, function (fix_points) {
                    angular.forEach(fix_points, function (value, key) {
                        var icon = {
        icon: function (fixPoint) {
            var icon;
            if (fixPoint.type == "garbage")
            {
                switch (fixPoint.notes[0].ANAKIKLOSI) {
                    case "0":
                        icon = "staticGarbage";
                        break;
                    case "1":
                        icon = "staticGarbageRecycle";
                        break;
                    default:
                        break;
                }
            } else
            {
                icon = "staticLighting";
            }
            return icon;
        }
    }.icon(value);
                        $scope.markers.push({"lat": value.loc.coordinates[1], "lng": value.loc.coordinates[0], "icon": icons[icon]});
                    });
                });
            }

            var issue_name_new;

            if (issue_index != -1) {
                if (localStorage.getItem("language") === 'en') {
                    issue_name_new = $rootScope.Variables.issue_type_en[issue_index];
                } else {
                    issue_name_new = $rootScope.Variables.issue_type_gr[issue_index];
                }
            }

            $scope.issue_name_new = issue_name_new;
            $scope.issue_value_desc = issue[0].value_desc;
            var webService = new google.maps.StreetViewService();
            webService.getPanoramaByLocation({lat: issue[0].loc.coordinates[1], lng: issue[0].loc.coordinates[0]}, 200, checkNearestStreetView);

            leafletData.getMap().then(function (map) {
                map.invalidateSize(true);
            });

            timeline(issue);
            $(window).trigger("resize");
        });
        });
    }]);