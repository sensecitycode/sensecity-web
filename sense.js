var appControllers = angular.module('sense.controllers', ['pascalprecht.translate']);

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
            function ($scope, $window, $rootScope, $http, $q, $location, leafletData,
                    $interval,
                    $translate, $resource) {

                $rootScope.overview_url = $location.path();
                var idt = setTimeout(function () {
                    for (var i = idt; i > 0; i--)
                        clearInterval(i);
                }, 10);

                $scope.changeLanguage = function (langKey) {
                    $translate.use(langKey);
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
//                        $(".x-navigation li").click(function(event){  //edw
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
                                url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                                layerOptions: {
                                    showOnSelector: true,
                                    attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
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
                            layer1: {name: '', type: 'group', visible: true}, layer2: {name: '', type: 'group', visible: true}, layer3: {name: '', type: 'group', visible: true}, layer4: {name: '', type: 'group', visible: true}, layer5: {name: '', type: 'group', visible: true}, layer6: {name: '', type: 'group', visible: true}, layer7: {name: '', type: 'group', visible: true}, layer8: {name: '', type: 'group', visible: true}, layer9: {name: '', type: 'group', visible: true}, layer10: {name: '', type: 'group', visible: true}}
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

                                var marker3 = args.leafletObject;
                                var popup = marker3.getPopup();

                                var issue_name;
                                var issue_image;

                                $resource($rootScope.Variables.APIADMIN + '/fullissue/:issueID',
                                        {issueID: '@id'}, {'query': {method: 'GET', isArray: true}}
                                ).query({issueID: marker3.options.issue_id}, function (resp) {

                                    var resp_index = $rootScope.Variables.departments.indexOf(resp[0].issue);
                                    if (resp_index != -1) {
                                        issue_name = $rootScope.Variables.departments_en[resp_index];
                                    }

                                    if (resp[0].image_name == "" || resp[0].image_name == "no-image") {
                                        resp[0].class = "fa fa-" + $rootScope.Variables.icons[resp[0].issue].icon;
                                    } else {
                                        issue_image = resp[0].image_name;
                                    }
                                    if (!(resp[0].image_name === '' || resp[0].image_name === 'no-image' || resp[0].image_name === null || resp[0].image_name === undefined)) {
                                        popup.setContent("<center><b>" + issue_name + "</b><br>" + resp[0].value_desc + "<br><img src=\"" + issue_image + "\" style=\"height:200px\"><br><a href=\"http://" + $rootScope.Variables.city_name + ".sense.city/scissuemap.html?issue=" + resp[0]._id + "\">Εξέλιξη προβλήματος!</a></center>");
                                    } else {
                                        popup.setContent("<center><b>" + issue_name + "</b><br>" + resp[0].value_desc + "<br><i class='" + resp[0].class + "' style='font-size:12em;color:black'></i><br><a href=\"http://" + $rootScope.Variables.city_name + ".sense.city/scissuemap.html?issue=" + resp[0]._id + "\">Εξέλιξη προβλήματος!</a></center>");
                                    }
                                    popup.options.maxWidth = "auto";
                                    popup.update();

                                });
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
                                console.log("overlayadd event ");
                                console.log(o.leafletEvent);
                                console.log(o.leafletEvent.layer);
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
                                                            if (data[i][j].hasOwnProperty("cf_authenticate") && data[i][j].cf_authenticate == 1 && data[i][j].status == "RESOLVED") {
                                                                $scope.calcValueSolutionFrom2017++;
                                                            }
                                                            if (data[i][j].hasOwnProperty("cf_authenticate") && data[i][j].cf_authenticate == 1) {
                                                                $scope.calcValueProblemsFrom2017++;
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

                                                                        if (issue == "angry"
                                                                                || issue == "neutral"
                                                                                || issue == "happy") {
                                                                            layer = 'reaction';
                                                                        } else {
                                                                            layer = issue;
                                                                        }

                                                                        var message = '';

                                                                        if (value.value_desc) {
                                                                            message = value.value_desc;
                                                                        } else {
                                                                            message = 'Μη διαθέσιμη περιγραφή';
                                                                        }

                                                                        if (layer != 'reaction') {
                                                                            var lindex = $rootScope.Variables.overlay_categories.indexOf(issue) + 1;
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


                                                                        if (layer != 'reaction') {
                                                                            marker.message = "Loading...";
                                                                        }
                                                                        $scope.markers.push(marker);

                                                                    },
                                                                    $scope.markers);

                                                    //$scope.markers = $scope.markers.concat( $scope.fixedmarkersLazyLoaded );
                                                });
                            };


                            function doQuery(obj) {
                                var d = $q.defer();
                                $resource($rootScope.Variables.APIURL,
                                        {}, {
                                    update: {
                                        method: 'GET'
                                    }
                                }).query(obj,
                                        function (result) {
                                            d.resolve(result);
                                        });

                                return d.promise;
                            }

                            function dofQuery(obj) {
                                var d = $q.defer();
                                $resource($rootScope.Variables.feelingsURL,
                                        {}, {
                                    update: {
                                        method: 'GET'
                                    }
                                }).query(obj,
                                        function (result) {
                                            d.resolve(result);
                                        });

                                return d.promise;
                            }

                            var lsissues = 0;
                            $scope.doCalcLast6Issues = function () {
                                var theLastIssues = $resource($rootScope.Variables.APIURL,
                                        {city: $rootScope.Variables.city_name, startdate: "2017-01-01", sort: "-1", limit: "6", list_issue: "1", image_field: "1"}, {
                                    query: {
                                        method: 'GET',
                                        isArray: true
                                    }
                                }).query(function () {
                                    if (lsissues == 1) {
                                        for (var i = 0; i < theLastIssues.length; i++) {
                                            $scope.lastissues[i].value_desc = theLastIssues[i].value_desc;
                                            if (theLastIssues[i].image_name === ''
                                                    || theLastIssues[i].image_name === 'no-image'
                                                    || theLastIssues[i].image_name === null
                                                    || theLastIssues[i].image_name === undefined) {
                                                $scope.lastissues[i].class = "fa fa-" + $rootScope.Variables.icons[theLastIssues[i].issue].icon;
                                                $scope.lastissues[i].width = "80%";
                                            } else {
                                                $scope.lastissues[i].width = "100%";
                                            }

                                            var cat_index = $rootScope.Variables.categories.indexOf(theLastIssues[i].issue);
                                            if (cat_index != -1) {
                                                $scope.lastissues[i].issue = $rootScope.Variables.categories_issue[cat_index];
                                            } else {
                                                $scope.lastissues[i].issue = '';
                                            }

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
                                        }
                                    }
                                    if (lsissues == 0) {
                                        lsissues = 1;
                                        angular
                                                .forEach(
                                                        theLastIssues,
                                                        function (lastissue,
                                                                key) {
                                                            if (lastissue.image_name === ''
                                                                    || lastissue.image_name === 'no-image'
                                                                    || lastissue.image_name === null
                                                                    || lastissue.image_name === undefined) {
                                                                lastissue.class = "fa fa-" + $rootScope.Variables.icons[lastissue.issue].icon;
                                                                lastissue.width = "80%";
                                                            } else {
                                                                lastissue.width = "100%";
                                                            }

                                                            var cat_index = $rootScope.Variables.categories.indexOf(lastissue.issue);
                                                            if (cat_index != -1) {
                                                                lastissue.issue = $rootScope.Variables.categories_issue[cat_index];
                                                            } else {
                                                                lastissue.issue = '';
                                                            }

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
                                                        });
                                        $scope.lastissues = theLastIssues;
                                        setTimeout(function () {
//                                    alert(oft);
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
                                                isArray: true
                                            }
                                        }
                                ).query(function () {
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


                                    var markersGarbage = L.markerClusterGroup({
                                        name: 'Κάδοι',
                                        visible: true,
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
                                    });

                                    var markersLightning = L.markerClusterGroup({
                                        name: 'Φωτισμός',
                                        visible: true,
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
                                    });

                                    var baseLayers = {
                                        //'Open Street Map': osmLayer,
                                        //'Google Maps':googleRoadmap,
                                        //'Google Maps Satellite':googleHybrid,
                                        //'Google Maps Traffic':googleTraffic
                                    };

                                    var overlays = {
                                        "<i class='fa fa-trash-o  fa-2x'></i>&nbsp;<span style='align:left'>Κάδοι σκουπιδιών</span>": markersGarbage,
                                        "<i class='fa fa-lightbulb-o fa-2x'></i>&nbsp;<span style='align:left'>Φωτισμός</span>": markersLightning
                                    };

                                    leafletData.getMap().then(function (map) {
                                        L.control.layers({}, overlays).addTo(map);
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
            }]);