var appControllers = angular.module('sense.controllers', ['pascalprecht.translate']);

var mood_activated = false;
var sensors_activated = false;
var garbage_activated = false;
var light_activated = false;
var fpnft = false;
var layers_ref;
var markersGarbage;
var markersLightning;

function default_icon(this_img) {
    var scope = angular.element("#mainctl").scope();
    for (var i = 0; i < scope.lastissues.length; i++) {
        if (scope.lastissues[i].bug_id == this_img.dataset.bugid) {
            scope.lastissues[i].class = "fa fa-" + scope.Variables.icons[scope.lastissues1[i]].icon;
            scope.lastissues[i].width = "80%";
            scope.lastissues[i].image_name = '';
            break;
        }
    }
}

function default_image(this_img) {
    var scope = angular.element("#mainctl").scope();
    for (var i = 0; i < scope.lastissues.length; i++) {
        if (scope.lastissues[i].bug_id == this_img.dataset.bugid) {
            scope.lastissues[i].class = '';
            break;
        }
    }
}

function marker_image() {
    var scope = angular.element("#mainctl").scope();
    scope.icon_show = 0;
    scope.$apply();
}

appControllers.directive('sidebarDirective', function () {
    return {
        link: function (scope, element, attr) {
            scope.$watch(attr.sidebarDirective, function (newVal) {
                if (newVal) {
                    element.addClass('show');
                    return;
                }
                element.removeClass('show');
            });
        }
    };
});

appControllers.directive('sidebarDirective', function () {
    return {
        link: function (scope, element, attr) {
            scope.$watch(attr.sidebarDirective, function (newVal) {
                if (newVal) {
                    element.addClass('show');
                    return;
                }
                element.removeClass('show');
            });
        }
    };
});

appControllers.config(['$translateProvider', function ($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'config/lang_',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage('el');
        $translateProvider.useLocalStorage();
    }]);

var oft = 0;

appControllers.controller(
        'senseController',
        [
            '$scope',
            '$window',
            '$rootScope', '$http',
            '$q', '$location', 'leafletData',
            '$interval',
            '$translate',
            '$resource',
            '$compile',
            function ($scope, $window, $rootScope, $http, $q, $location, leafletData,
                    $interval,
                    $translate, $resource, $compile) {

                var canceller = [];
                var rcanceller = [null];
                for (var k = 0; k < 6; k++) {
                    canceller[k] = $q.defer();
                }
                $rootScope.overview_url = $location.path();
                var idt = setTimeout(function () {
                    for (var i = idt; i > 0; i--)
                        clearInterval(i);
                }, 10);

                $scope.changeLanguage = function (langKey) {
                    $translate.use(langKey);
                    setTimeout(function () {
                        $scope.displayFixedPoints();
                        $scope.layers.overlays.layer1 = {name: $translate.instant("GARBAGE_ISSUE"), type: 'group', visible: true};
                        $scope.layers.overlays.layer2 = {name: $translate.instant("LIGHTNING_ISSUE"), type: 'group', visible: true};
                        $scope.layers.overlays.layer3 = {name: $translate.instant("PLUMBING_ISSUE"), type: 'group', visible: true};
                        $scope.layers.overlays.layer4 = {name: $translate.instant("PROTECTION_POLICY_ISSUE"), type: 'group', visible: true};
                        $scope.layers.overlays.layer5 = {name: $translate.instant("ROAD_ISSUE"), type: 'group', visible: true};
                        $scope.layers.overlays.layer6 = {name: $translate.instant("ENVIRONMENT_ISSUE"), type: 'group', visible: true};
                        $scope.layers.overlays.layer7 = {name: $translate.instant("GREEN_ISSUE"), type: 'group', visible: true};
                        $scope.layers.overlays.layer8 = {name: $translate.instant("MOOD"), type: 'group', visible: mood_activated};
                        $scope.layers.overlays.layer9 = {name: $translate.instant("SENSORS"), type: 'group', visible: sensors_activated};
                    }, 100);
                };

                $scope.navClass = function (page) {
                    var path = window.location.href.toString().split("/");
                    var currentRoute = path[path.length - 1];
                    if (currentRoute.split(".")[0] != page) {
                        return false;
                    } else {
                        return true;
                    }

//            if(){
//                    return false;
//                }else{
//            return true;
//        }
                };

//              $(document).ready(function(){
//                $.getScript("js/plugins/jquery/jquery.min.js");
//                    $.getScript("js/plugins/jquery/jquery-ui.min.js");
//                    $.getScript("js/plugins/bootstrap/bootstrap.min.js");
//                    $.getScript("js/plugins/icheck/icheck.min.js");
//                    $.getScript("js/plugins/mcustomscrollbar/jquery.mCustomScrollbar.min.js");
//                    $.getScript("js/plugins/scrolltotop/scrolltopcontrol.js");
//                    $.getScript("js/plugins/sparkline/jquery.sparkline.min.js");
//                    $.getScript("js/plugins/rickshaw/d3.v3.js");
//                    $.getScript("js/plugins/rickshaw/rickshaw.min.js");
//                    $.getScript("js/plugins/bootstrap/bootstrap-datepicker.js");
//                    $.getScript("js/plugins/owl/owl.carousel.min.js");
//                    $.getScript("js/plugins/moment.min.js");
//                    $.getScript("js/plugins/daterangepicker/daterangepicker.js");
//                    $.getScript("js/plugins.js");
//                    $.getScript("js/actions.js");
//                });
//   

//                             function page_content_onresize1(){
//    $(".page-content,.content-frame-body,.content-frame-right,.content-frame-left").css("width","").css("height","");
//
//    var content_minus = 0;
//    content_minus = ($(".page-container-boxed").length > 0) ? 40 : content_minus;
//    content_minus += ($(".page-navigation-top-fixed").length > 0) ? 50 : 0;
//    
//    var content = $(".page-content");
//    var sidebar = $(".page-sidebar");
//    
//    if(content.height() < $(document).height() - content_minus){        
//        content.height($(document).height() - content_minus);
//        //$(".xn-title").height($(window).height() - $(".page-sidebar").height());
//    }        
//    
//    if(sidebar.height() > content.height()){        
//        content.height(sidebar.height());
//    }
////    content.height(0);
//    if($(window).width() > 1024){
//        
//        if($(".page-sidebar").hasClass("scroll")){
//            if($("body").hasClass("page-container-boxed")){
//                var doc_height = $(document).height() - 40;
//            }else{
//                var doc_height = $(window).height();
//            }
//           $(".page-sidebar").height(doc_height);
//          
//       }
//       
//        if($(".content-frame-body").height() < $(document).height()-162){
//            $(".content-frame-body,.content-frame-right,.content-frame-left").height($(document).height()-162);            
//        }else{
//            $(".content-frame-right,.content-frame-left").height($(".content-frame-body").height());
//        }
//        
//        $(".content-frame-left").show();
//        $(".content-frame-right").show();
//    }else{
//        $(".content-frame-body").height($(".content-frame").height()-80);
//        $(".xn-title").removeAttr("style");
//        if($(".page-sidebar").hasClass("scroll"))
//           $(".page-sidebar").css("height","");
//    }
//    
//    if($(window).width() < 1200){
//        if($("body").hasClass("page-container-boxed")){
//            $("body").removeClass("page-container-boxed").data("boxed","1");
//        }
//    }else{
//        if($("body").data("boxed") === "1"){
//            $("body").addClass("page-container-boxed").data("boxed","");
//        }
//    }
//}
//
//       function onresize1(timeout){    
//    timeout = timeout ? timeout : 200;
//
//    setTimeout(function(){
//        page_content_onresize1();
//    },timeout);
//    
//}

//if($rootScope.test == 1){
//    $rootScope.test = 0;
//                        $(".x-navigation li").click(function(event){ 
//        event.stopPropagation();
//        
//        var li = $(this);
//                
//            if(li.children("ul").length > 0 || li.children(".panel").length > 0 || $(this).hasClass("xn-profile") > 0){
//                if(li.hasClass("active")){
//                    li.removeClass("active");
//                    //li.find("li.active").removeClass("active");
//                }else
//                    li.addClass("active");
//                    
//               onresize1();
//                
//                if($(this).hasClass("xn-profile") > 0)
//                    return true;
//                else
//                    return false;
//            }                                     
//    });
//    }

//       if( $rootScope.aft == 0){
//           $rootScope.aft = 0;
//        $(document).on("click",".xn-openable",function(event){
//            $(this).attr("class", "xn-openable active");
//        });
//        
//        $(document).on("click",".xn-openable.active",function(event){
//            $(this).attr("class", "xn-openable");
//        });
//        
//        $(document).on("click",".x-navigation-control",function(event){
//            $(this).parents(".x-navigation").toggleClass("x-navigation-open");
//        });
//    }
                $scope.full = 0;

                $scope.removeFixed = function (event) {
                    if ($scope.full == 0) {
                        $("#right-column").removeAttr('style');
                        $scope.full = 1;
                        panel_fullscreen($(event.currentTarget).closest(".panel"));
                        var map = leafletData.getMap().then(
                                function (map) {
                                    map.invalidateSize(true);
                                }

                        );
                    } else {
                        $scope.full = 0;
                        panel_fullscreen($(event.currentTarget).closest(".panel"));
                        var map = leafletData.getMap().then(
                                function (map) {
                                    map.invalidateSize(true);
                                }

                        );
                    }
                };

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

                $rootScope.mainInfo = $http.get(url, {timeout: canceller.promise}).success(function (response) {

                    canceller[0].resolve();

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

                    $scope.twitter_link = response.twitter_link;
                    $scope.widget_id = response.widget_id;
                    $scope.widget_tag = response.city_name;

                    !function (d, s, id) {
                        var js, fjs = d.getElementsByTagName(s)[0], p = /^http:/.test(d.location) ? 'http' : 'https';
                        if (!d.getElementById(id)) {
                            js = d.createElement(s);
                            js.id = id;
                            js.src = p + "://platform.twitter.com/widgets.js";
                            js.setAttribute('onload', "twttr.events.bind('rendered',function(e) {$(window).trigger('resize')});");
                            fjs.parentNode.insertBefore(js, fjs);
                        }
                    }(document, "script", "twitter-wjs");

                    d.resolve(response);
                    return d.promise;
                });

                angular.extend($scope, {
                    layercontrol: {
                        icons: {
                            uncheck: "fa fa-toggle-off",
                            check: "fa fa-toggle-on"
                        }
                    },
                    layers: {
                        baselayers: {
                            openStreetMap: {
                                name: 'OpenStreetMap',
                                type: 'xyz',
                                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                                layerOptions: {
                                    showOnSelector: true,
                                    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                                    maxZoom: 19
                                }
                            },
                            googleRoadmap: {
                                name: 'Google Map + Traffic',
                                layerType: 'ROADMAP',
                                type: 'google',
                                layerOptions: {
                                    showOnSelector: true,
                                    attribution: 'xxx',
                                    maxZoom: 20
                                }
                            }, googleHybrid: {
                                name: 'Google Hybrid + Traffic',
                                layerType: 'HYBRID',
                                type: 'google',
                                layerOptions: {
                                    showOnSelector: true,
                                    attribution: 'xxx',
                                    maxZoom: 20
                                }
                            }
                        }, overlays: {
                            layer1: {name: '', type: 'group', visible: true}, layer2: {name: '', type: 'group', visible: true}, layer3: {name: '', type: 'group', visible: true}, layer4: {name: '', type: 'group', visible: true}, layer5: {name: '', type: 'group', visible: true}, layer6: {name: '', type: 'group', visible: true}, layer7: {name: '', type: 'group', visible: true}, layer8: {name: '', type: 'group', visible: false}, layer9: {name: '', type: 'group', visible: false}, layer10: {name: '', type: 'group', visible: true}}
                    },
                    addlayer: function (layer) {
                        if (layer == 1) {
                            eval($rootScope.Variables.overlay_functions.layer1);
                        } else if (layer == 2) {
                            eval($rootScope.Variables.overlay_functions.layer2);
                        } else if (layer == 3) {
                            eval($rootScope.Variables.overlay_functions.layer3);
                        } else if (layer == 4) {
                            eval($rootScope.Variables.overlay_functions.layer4);
                        } else if (layer == 5) {
                            eval($rootScope.Variables.overlay_functions.layer5);
                        } else if (layer == 6) {
                            eval($rootScope.Variables.overlay_functions.layer6);
                        } else if (layer == 7) {
                            eval($rootScope.Variables.overlay_functions.layer7);
                        } else if (layer == 8) {
                            eval($rootScope.Variables.overlay_functions.layer8);
                        } else if (layer == 9) {
                            eval($rootScope.Variables.overlay_functions.layer9);
                        } else if (layer == 10) {
                            eval($rootScope.Variables.overlay_functions.layer10);
                        }
                    },
                    removelayer: function (layer) {
                        if (layer == 1) {
                            delete this.layers.overlays.layer1;
                        } else if (layer == 2) {
                            delete this.layers.overlays.layer2;
                        } else if (layer == 3) {
                            delete this.layers.overlays.layer3;
                        } else if (layer == 4) {
                            delete this.layers.overlays.layer4;
                        } else if (layer == 5) {
                            delete this.layers.overlays.layer5;
                        } else if (layer == 6) {
                            delete this.layers.overlays.layer6;
                        } else if (layer == 7) {
                            delete this.layers.overlays.layer7;
                        } else if (layer == 8) {
                            delete this.layers.overlays.layer8;
                        } else if (layer == 9) {
                            delete this.layers.overlays.layer9;
                        } else if (layer == 10) {
                            delete this.layers.overlays.layer10;
                        }
                    }
                });

                $scope.map_center = {
                    lat: 37.787435,
                    lng: 20.897801,
                    zoom: 12
                };

                $q.all([$rootScope.mainInfo]).then(
                        function (data) {
                            $.getScript("js/plugins.js");
                            $.getScript("js/actions.js");
                            $scope.$on("leafletDirectiveMarker.click", function (event, args) {
                                if (args.model.issue_id != undefined) {

                                    var marker3 = args.leafletObject;
                                    var popup = marker3.getPopup();

                                    var issue_name;
                                    var issue_image;

                                    rcanceller[1] = $resource($rootScope.Variables.APIADMIN + '/fullissue/:issueID',
                                            {issueID: '@id'}, {'query': {method: 'GET', isArray: true, cancellable: true}}
                                    ).query({issueID: marker3.options.issue_id}, function (resp) {
                                        canceller[1].resolve();
                                        var resp_index = $rootScope.Variables.categories.indexOf(resp[0].issue);
                                        if (resp_index != -1) {
                                            issue_name = $translate.instant($rootScope.Variables.categories_issue[resp_index]);
                                        }

                                        resp[0].class = "fa fa-" + $rootScope.Variables.icons[resp[0].issue].icon;

                                        $scope.icon_show = 1;

                                        popup.setContent("<center style='width:210px' id='" + resp[0].bug_id + "_icon'></center>");
                                        popup.options.maxWidth = "auto";
                                        popup.update();
                                        $scope.icon_content = "<b>" + issue_name + "</b><br>" + resp[0].value_desc + "<br><img ng-show=\"icon_show==0\" onload='marker_image()' src=\"" + $rootScope.Variables.APIADMIN + "/image_issue?bug_id=" + resp[0].bug_id + "&resolution=small \" style=\"height:200px\"><i ng-show=\"icon_show == 1\" class='" + resp[0].class + "' style='font-size:12em;color:black'></i><br><a href=\"http://" + $rootScope.Variables.city_name + ".sense.city/scissuemap.html?issue=" + resp[0]._id + "\">" + $translate.instant("PROBLEM_PROGRESS") + "</a>";
                                        $("#" + resp[0].bug_id + "_icon").html($compile($scope.icon_content)($scope));
                                    });
                                    setTimeout(function () {
                                        if (canceller[1].promise.$$state.status == 0) {
                                            rcanceller[1].$cancelRequest();
                                            $scope.$apply();
                                            alert("Η υπηρεσία δεν ανταποκρίνεται! Παρακαλώ δοκιμάστε αργότερα!");
                                        }
                                    }, 30000);
                                }
                            });
                            leafletData.getMap().then(function (map) {
                                map.scrollWheelZoom.disable();
                            });
                            for (var i = Object.keys($rootScope.Variables.overlay_functions).length + 1; i <= 10; i++) {
                                $scope.removelayer(i);
                            }

                            for (var i = 1; i <= Object.keys($rootScope.Variables.overlay_functions).length; i++) {
                                $scope.addlayer(i);
                            }

                            $scope.lastdatesToCheck = 1000 * 60 * 60 * 24 * 7;
                            $scope.daysToCheck = 30;
                            $scope.lastissues = [];
                            $scope.markers = [];
                            $scope.fixedmarkersGarbage = [];
                            $scope.fixedmarkersLightning = [];
                            $scope.state = true;
                            $scope.toggleState = function () {
                                $scope.state = !$scope.state;
                            };


                            var icons = $rootScope.Variables.icons;

                            $scope.map_center = {
                                lat: $rootScope.Variables.lat_center,
                                lng: $rootScope.Variables.long_center,
                                zoom: $rootScope.Variables.map_zoom
                            };

                            //We use a custom Google.js that calls also the google trafic layer. Please see http://www.qtrandev.com/transit5/ for inspiration

                            $scope.$on('leafletDirectiveMap.overlayadd', function (event, o) {
                                if ($translate.instant("MOOD") == o.leafletEvent.name) {
                                    mood_activated = true;
                                } else if ($translate.instant("SENSORS") == o.leafletEvent.name) {
                                    sensors_activated = true;
                                }
                            });

                            $scope.$on('leafletDirectiveMap.overlayremove', function (event, o) {
                                if ($translate.instant("MOOD") == o.leafletEvent.name) {
                                    mood_activated = false;
                                } else if ($translate.instant("SENSORS") == o.leafletEvent.name) {
                                    sensors_activated = false;
                                }
                            });

                            var startdate = new Date(2017, 0, 1);
                            var today = new Date();

                            today = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                            today = today.getTime();
                            startdate.setDate(startdate.getDate());
                            $scope.startISOdate = startdate;
                            $scope.endISOdate = new Date();

                            $scope.submitSearchLast7days = function () {

                                $scope.calcValue7daysIssues = 0;
                                $scope.calcValue7daysEvents = 0;
                                $scope.calcValueProblemsFrom2017 = 0;
                                $scope.calcValueSolutionFrom2017 = 0;

                                $scope.startdate = $scope.startISOdate
                                        .getFullYear()
                                        + '-'
                                        + (("0" + ($scope.startISOdate.getMonth() + 1)).slice(-2))
                                        + '-' + ("0" + $scope.startISOdate.getDate()).slice(-2);
                                $scope.enddate = $scope.endISOdate
                                        .getFullYear()
                                        + '-'
                                        + (("0" + ($scope.endISOdate.getMonth() + 1)).slice(-2))
                                        + '-' + ("0" + $scope.endISOdate.getDate()).slice(-2);

                                var paramsObj = [];

                                paramsObj.push({
                                    city: $rootScope.Variables.city_name,
                                    startdate: $scope.startdate,
                                    enddate: $scope.enddate,
                                    includeAnonymous: 0,
                                    status: "CONFIRMED|IN_PROGRESS|RESOLVED",
                                    image_field: 0
                                });

                                var feelingsObj = [];

                                feelingsObj.push({
                                    city: $rootScope.Variables.city_name,
                                    startdate: $scope.startdate,
                                    enddate: $scope.enddate
                                });

                                var promisesArray = [];
                                promisesArray
                                        .push(doQuery(paramsObj[0]));
                                promisesArray.push(dofQuery(feelingsObj[0]));

                                $q
                                        .all(promisesArray)
                                        .then(
                                                function (data) {
                                                    var searchissues = [];
                                                    for (i = 0; i < data.length; i++) {
                                                        for (j = 0; j < data[i].length; j++) {
                                                            if (data[i][j].hasOwnProperty("cf_authenticate") && data[i][j].cf_authenticate == 1 && Date.parse(data[i][j].create_at) >= (today - $scope.lastdatesToCheck)) {
                                                                if (data[i][j].status != "RESOLVED") {
                                                                    searchissues.push(data[i][j]);
                                                                    $scope.calcValue7daysIssues++;
                                                                }
                                                            }
                                                            if (data[i][j].hasOwnProperty("cf_authenticate") && data[i][j].cf_authenticate == 1 && data[i][j].status == "RESOLVED" && data[i][j].resolution == "FIXED") {
                                                                $scope.calcValueSolutionFrom2017++;
                                                            }
                                                            if (data[i][j].hasOwnProperty("cf_authenticate") && data[i][j].cf_authenticate == 1) {
                                                                if (data[i][j].status != "RESOLVED") {
                                                                    $scope.calcValueProblemsFrom2017++;
                                                                } else {
                                                                    if (data[i][j].resolution == "FIXED") {
                                                                        $scope.calcValueProblemsFrom2017++;
                                                                    }
                                                                }
                                                            }
                                                            if (Date.parse(data[i][j].create_at) >= (today - $scope.lastdatesToCheck)) {
                                                                if (data[i][j].status != "RESOLVED") {
                                                                    searchissues.push(data[i][j]);
                                                                    $scope.calcValue7daysEvents++;
                                                                }
                                                            }
                                                        }
                                                    }

                                                    $scope.markers = [];
                                                    if ($rootScope.Variables.city_name == "patras") {
                                                        searchissues.push({"issue": "temperature", "value_desc": "Humidity value", "loc": {"type": "Point", "coordinates": [21.7912763, 38.2831043]}});
                                                        searchissues.push({"issue": "temperature", "value_desc": "Temperature value", "loc": {"type": "Point", "coordinates": [21.750683, 38.237351]}});

                                                    } else if ($rootScope.Variables.city_name == "london") {
                                                        searchissues.push({"issue": "humidity", "value_desc": "Humidity value", "loc": {"type": "Point", "coordinates": [-0.10797500610351562, 51.51122644944369]}});
                                                        searchissues.push({"issue": "temperature", "value_desc": "Temperature value", "loc": {"type": "Point", "coordinates": [-0.1247549057006836, 51.51610055355692]}});
                                                        searchissues.push({"issue": "temperature", "value_desc": "Temperature value", "loc": {"type": "Point", "coordinates": [-0.11132240295410155, 51.51822363035807]}});
                                                        $translate.use("en");
                                                    }
                                                    angular
                                                            .forEach(
                                                                    searchissues,
                                                                    function (
                                                                            value,
                                                                            key) {
                                                                        var issueid = value._id;
                                                                        var issuelink = "http://" + $rootScope.Variables.city_name + ".sense.city/#/issue_id=" + issueid;
                                                                        var positionlat = value.loc.coordinates[1];
                                                                        var positionlon = value.loc.coordinates[0];
                                                                        var issue = value.issue;
                                                                        var layer = '';
                                                                        var type = '';

                                                                        if (issue == "angry"
                                                                                || issue == "neutral"
                                                                                || issue == "happy") {
                                                                            layer = 'reaction';
                                                                            type = 'reaction';
                                                                        } else if (issue == "humidity" || issue == "temperature") {
                                                                            layer = 'sensors';
                                                                            type = 'sensors';
                                                                        } else {
                                                                            layer = issue;
                                                                            type = 'other';
                                                                        }

                                                                        var message = '';

                                                                        if (value.value_desc) {
                                                                            message = value.value_desc;
                                                                        } else {
                                                                            message = 'Μη διαθέσιμη περιγραφή';
                                                                        }

                                                                        if (layer != 'reaction' && layer != 'sensors') {
                                                                            var lindex = $rootScope.Variables.overlay_categories.indexOf(issue) + 1;
                                                                        } else if (layer == 'sensors') {
                                                                            var lindex = $rootScope.Variables.overlay_categories.indexOf('sensors') + 1;
                                                                        } else {
                                                                            var lindex = $rootScope.Variables.overlay_categories.indexOf('reaction') + 1;
                                                                        }


                                                                        layer = "layer" + lindex;

                                                                        var marker = {
                                                                            "layer": "" + layer + "",
                                                                            "lat": +positionlat,
                                                                            "lng": +positionlon,
                                                                            "icon": icons[issue],
                                                                            // "message" : ""
                                                                            // 		+ message
                                                                            // 		+ "<br><a href="
                                                                            // 		+ issuelink
                                                                            // 		+ ">Δες με!</a>"
                                                                            "issue_id": issueid
                                                                        };

                                                                        if (type != 'reaction' && type != 'sensors') {
                                                                            marker.message = "Loading...";
                                                                        } else {
                                                                            if (type == 'reaction') {
                                                                                marker.message = message;
                                                                            } else {
                                                                                if ($rootScope.Variables.city_name == "patras") {                     
                                                                                    if (marker.lat == 38.2831043 && marker.lng == 21.7912763) {
                                                                                        marker.message = "<div class=\"row\" style=\"width:420px\"><div class=\"col-md-6\"><iframe src=\"http://150.140.184.249:5601/goto/9cde3cbac3e22a2a987fcdfcbb2cd040?embed=true\" height='200' width='200'></iframe></div><div class=\"col-md-3\"><iframe src=\"http://150.140.184.249:5601/goto/5ae1c2902571835f5fa24215cf2f8e7c?embed=true\" height=\"200\" width=\"200\"></iframe></div></div>";
                                                                                    } else {
                                                                                        marker.message = "<div class=\"row\" style=\"width:420px\"><div class=\"col-md-6\"><iframe src=\"http://150.140.184.249:5601/goto/ae63b2234d859fe3a806b2f361479c96?embed=true\" height='200' width='200'></iframe></div><div class=\"col-md-3\"><iframe src=\"http://150.140.184.249:5601/goto/36ef254660f471bb3dd21fde81a28d56?embed=true\" height=\"200\" width=\"200\"></iframe></div></div>";
                                                                                    }
                                                                                } else {
                                                                                    marker.message = "<div class=\"row\" style=\"width:420px\"><div class=\"col-md-6\"><iframe src=\"http://150.140.184.249:5601/goto/9cde3cbac3e22a2a987fcdfcbb2cd040?embed=true\" height='200' width='200'></iframe></div><div class=\"col-md-3\"><iframe src=\"http://150.140.184.249:5601/goto/5ae1c2902571835f5fa24215cf2f8e7c?embed=true\" height=\"200\" width=\"200\"></iframe></div></div>";
                                                                                }
                                                                            }
                                                                        }

                                                                        $scope.markers.push(marker);

                                                                    },
                                                                    $scope.markers);

                                                    //$scope.markers = $scope.markers.concat( $scope.fixedmarkersLazyLoaded );
                                                });
                            };


                            function doQuery(obj) {
                                var d = $q.defer();
                                rcanceller[2] = $resource($rootScope.Variables.APIADMIN+"/issue",
                                        {}, {
                                    update: {
                                        method: 'GET',
                                        cancellable: true
                                    }
                                }).query(obj,
                                        function (result) {
                                            canceller[2].resolve();
                                            d.resolve(result);
                                        });

                                return d.promise;
                            }

                            function dofQuery(obj) {
                                var d = $q.defer();
                                rcanceller[3] = $resource($rootScope.Variables.APIADMIN+"/feelings",
                                        {}, {
                                    update: {
                                        method: 'GET',
                                        cancellable: true
                                    }
                                }).query(obj,
                                        function (result) {
                                            canceller[3].resolve();
                                            d.resolve(result);
                                        });

                                return d.promise;
                            }

                            var lsissues = 0;
                            $scope.doCalcLast6Issues = function () {
                                var theLastIssues = rcanceller[4] = $resource($rootScope.Variables.APIADMIN+"/issue",
                                        {city: $rootScope.Variables.city_name, startdate: "2017-01-01", sort: "-1", limit: "6", list_issue: "1", image_field: "1"}, {
                                    query: {
                                        method: 'GET',
                                        isArray: true,
                                        cancellable: true
                                    }
                                }).query(function () {
                                    canceller[4].resolve();
                                    if (lsissues == 1) {
                                        $scope.lastissues1 = [];
                                        counter = 0;
                                        for (var i = 0; i < theLastIssues.length; i++) {
                                            $scope.lastissues[i].value_desc = theLastIssues[i].value_desc;

                                            $scope.lastissues[i].class = "fa fa-" + $rootScope.Variables.icons[theLastIssues[i].issue].icon;
                                            $scope.lastissues[i].width = "80%";
                                            $scope.lastissues1[counter] = theLastIssues[i].issue;

                                            $scope.lastissues[i].issue1 = theLastIssues[i].issue;
                                            var cat_index = $rootScope.Variables.categories.indexOf(theLastIssues[i].issue);
                                            if (cat_index != -1) {
                                                $scope.lastissues[i].issue = $rootScope.Variables.categories_issue[cat_index];
                                            } else {
                                                $scope.lastissues[i].issue = '';
                                            }

                                            $("#image" + $scope.lastissues[i].counter).removeAttr("src");
                                            $("#image" + $scope.lastissues[i].counter).attr("src", $rootScope.Variables.APIADMIN + "/image_issue?bug_id=" + theLastIssues[i].bug_id + "&resolution=small");

                                            var today = new Date();
                                            var create_day = new Date(
                                                    theLastIssues[i].create_at);

                                            var seconds = (today
                                                    .getTime() - create_day
                                                    .getTime()) / 1000;

                                            var datediff = '';
                                            var datediffunit = '';

                                            if (seconds < 60) {
                                                datediff = seconds;
                                                datediffunit = "SECS";
                                            } else if (seconds < 3600) {
                                                datediff = Math.floor(seconds / 60);
                                                datediffunit = "MINUTES";
                                            } else if (seconds < 86400) {
                                                datediff = Math.floor(seconds / 3600);
                                                datediffunit = "HOURS";
                                            } else {
                                                datediff = Math.floor(seconds / 86400);
                                                datediffunit = "DAYS";
                                            }

                                            $scope.lastissues[i].create_at = datediff;
                                            $scope.lastissues[i].create_at_unit = datediffunit;
                                            counter++;
                                        }
                                        setTimeout(function () {
                                            $scope.$apply();
                                        }, 1);
                                    }
                                    if (lsissues == 0) {
                                        lsissues = 1;
                                        var counter = 0;
                                        $scope.lastissues1 = [];
                                        angular
                                                .forEach(
                                                        theLastIssues,
                                                        function (lastissue,
                                                                key) {

                                                            lastissue.class = "fa fa-" + $rootScope.Variables.icons[lastissue.issue].icon;
                                                            lastissue.width = "80%";

                                                            $scope.lastissues1[counter] = lastissue.issue;
                                                            var cat_index = $rootScope.Variables.categories.indexOf(lastissue.issue);
                                                            if (cat_index != -1) {
                                                                lastissue.issue = $rootScope.Variables.categories_issue[cat_index];
                                                            } else {
                                                                lastissue.issue = '';
                                                            }

                                                            lastissue.counter = counter;
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
                                                                datediff = Math.floor(seconds / 60);
                                                                datediffunit = "MINUTES";
                                                            } else if (seconds < 86400) {
                                                                datediff = Math.floor(seconds / 3600);
                                                                datediffunit = "HOURS";
                                                            } else {
                                                                datediff = Math.floor(seconds / 86400);
                                                                datediffunit = "DAYS";
                                                            }

                                                            lastissue.create_at = datediff;
                                                            lastissue.create_at_unit = datediffunit;
                                                            counter++;
                                                        });
                                        $scope.lastissues = theLastIssues;
                                        setTimeout(function () {
                                            $scope.$apply();
                                        }, 1);
                                        setTimeout(function () {
                                            if ($(".owl-carousel").length > 0 && oft == 0) {
                                                oft = 1;
                                                $(".owl-carousel").owlCarousel({mouseDrag: false, touchDrag: true, slideSpeed: 300, paginationSpeed: 400, singleItem: true, navigation: false, autoPlay: true});
                                                $(window).resize();
                                            }
                                        }, 100);
                                    }
                                });

                                // query() returns all the last 6
                                // issues


                            };

                            $scope.displayFixedPoints = function () {


                                var i = 0;

                                var theFixedPoints = $resource(
                                        'json/' + $rootScope.Variables.city_name + '.json',
                                        null,
                                        {
                                            search: {
                                                method: 'GET',
                                                headers: {'Content-Type': 'application/json'},
                                                isArray: true,
                                                cancellable: true
                                            }
                                        }
                                ).query(function () {
                                    if (fpnft) {
                                        leafletData.getMap().then(function (map) {
                                            layers_ref.removeFrom(map);
                                            map.removeLayer(markersGarbage);
                                            map.removeLayer(markersLightning);
                                        });
                                    }
                                    fpnft = true;
                                    angular.forEach(theFixedPoints, function (fixedpoint, key) {
                                        var positionlat = fixedpoint.loc.coordinates[1];
                                        var positionlon = fixedpoint.loc.coordinates[0];
                                        i++;
                                        if (fixedpoint.type === 'garbage') {
                                            var garbageIcon = 'cyanGarbageBin';
                                            var titlenote = "κάδος ανακύκλωσης";
                                            if (fixedpoint.notes[0].ANAKIKLOSI == '0') {
                                                garbageIcon = 'greenGarbageBin';
                                                titlenote = "κάδος σκουπιδιών";
                                            }

                                            var marker = new L.marker([positionlat, positionlon], {
                                                icon: L.ExtraMarkers.icon(icons[garbageIcon]),
                                                title: titlenote
                                            });

                                            $scope.fixedmarkersGarbage.push(marker);
                                        }

                                        if (fixedpoint.type === 'fotistiko') {
                                            var fixedLIcon = 'fixedLightning'
                                            var titlenote = "φωτιστικό στοιχείο";

                                            var marker = new L.marker([positionlat, positionlon], {
                                                icon: L.ExtraMarkers.icon(icons[fixedLIcon]),
                                                title: titlenote
                                            });

                                            $scope.fixedmarkersLightning.push(marker);
                                        }

                                    });


                                    markersGarbage = L.markerClusterGroup({
                                        name: 'Κάδοι',
                                        visible: false,
                                        disableClusteringAtZoom: 19,
                                        animateAddingMarkers: false,
                                        spiderfyDistanceMultiplier: true,
                                        singleMarkerMode: false,
                                        showCoverageOnHover: true,
                                        chunkedLoading: true
                                    });

                                    markersGarbage.addLayers($scope.fixedmarkersGarbage);
                                    leafletData.getMap().then(function (map) {
                                        map.addLayer(markersGarbage);
                                        map.removeLayer(markersGarbage);
                                    });

                                    markersLightning = L.markerClusterGroup({
                                        name: 'Φωτισμός',
                                        visible: false,
                                        disableClusteringAtZoom: 19,
                                        animateAddingMarkers: false,
                                        spiderfyDistanceMultiplier: true,
                                        singleMarkerMode: false,
                                        showCoverageOnHover: true,
                                        chunkedLoading: true
                                    });

                                    markersLightning.addLayers($scope.fixedmarkersLightning);

                                    leafletData.getMap().then(function (map) {
                                        map.addLayer(markersLightning);
                                        map.removeLayer(markersLightning);
                                    });

                                    var baseLayers = {
                                        //'Open Street Map': osmLayer,
                                        //'Google Maps':googleRoadmap,
                                        //'Google Maps Satellite':googleHybrid,
                                        //'Google Maps Traffic':googleTraffic
                                    };

                                    var fgarb = "<i class='fa fa-trash-o  fa-2x'></i>&nbsp;<span style='align:left'>" + $translate.instant("GARBAGE_FIXED") + "</span>";
                                    var flight = "<i class='fa fa-lightbulb-o fa-2x'></i>&nbsp;<span style='align:left'>" + $translate.instant("LIGHT_FIXED") + "</span>";

                                    var overlays = {};
                                    overlays[fgarb] = markersGarbage;
                                    overlays[flight] = markersLightning;
//                                    var overlays = {
//                                        fgarb : markersGarbage,
//                                        flight: markersLightning
//                                    };

                                    leafletData.getMap().then(function (map) {
                                        layers_ref = L.control.layers({}, overlays).addTo(map);
                                        map.invalidateSize(true);
                                    });

                                });
                            };

                            $scope.doCalcLast6Issues();
                            $scope.submitSearchLast7days();
                            $scope.displayFixedPoints();

                            // set intervals to update
                            var updtime = 5 * 60 * 1000; // every 5 minutes
                            $interval($scope.doCalcLast6Issues, updtime);
                            $interval($scope.submitSearchLast7days, updtime);
                        });
//                        setTimeout(function(){
//                            alert(JSON.stringify(canceller));
//                            if (canceller) {
//        // You could also use a $timeout timer to cancel it
//        canceller.resolve('cancelled');
//    }
//                        },5000);

                setTimeout(function () {
                    var isin = false;
                    for (var k = 0; k < 5; k++) {
                        if (canceller[k].promise.$$state.status == 0 && k != 1) {
                            isin = true;
                            if (k > 0) {
                                try {
                                    rcanceller[k].$cancelRequest();
                                    $scope.$apply();
                                } catch (e) {

                                }
                            } else {
                                canceller[k].resolve('cancelled');
                            }
                        }
                    }
                    if (isin == true) {
                        alert("Κάποιες υπηρεσίες δεν ανταποκρίνονται! Παρακαλώ δοκιμάστε αργότερα!");
                    }
                }, 30000);
            }]);