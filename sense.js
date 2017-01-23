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




appControllers
        .controller(
                'senseController',
                [
                    '$scope',
                    '$window',
                    '$rootScope', '$http',
                    '$q', 'leafletData',
                    'DisplayIssuesService',
                    'Issue2MapService',
                    'DisplayLast6IssuesService',
                    'BugService',
                    'FixedPointsService',
                    'cfpLoadingBar',
                    '$interval',
                    '$translate',
                    function ($scope, $window, $rootScope, $http, $q, leafletData,
                            DisplayIssuesService,
                            Issue2MapService,
                            DisplayLast6IssuesService, BugService, FixedPointsService,
                            cfpLoadingBar,
                            $interval,
                            $translate) {
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
                                },overlays: {
                        layer1: {name: '',type: 'group',visible:true},layer2:{name: '',type: 'group',visible:true},layer3: {name: '',type: 'group',visible:true},layer4:{name: '',type: 'group',visible:true},layer5: {name: '',type: 'group',visible:true},layer6:{name: '',type: 'group',visible:true},layer7: {name: '',type: 'group',visible:true},layer8:{name: '',type: 'group',visible:true},layer9: {name: '',type: 'group',visible:true},layer10:{name: '',type: 'group',visible:true}}
                            },
                            addlayer: function (layer) {
                                            if (layer == 1) {
                                                eval($rootScope.Variables.overlay_functions.layer1);
                                            }else if( layer == 2){
                                                eval($rootScope.Variables.overlay_functions.layer2);
                                            }else if( layer == 3){
                                                eval($rootScope.Variables.overlay_functions.layer3);
                                            }else if( layer == 4){
                                                eval($rootScope.Variables.overlay_functions.layer4);
                                            }else if( layer == 5){
                                                eval($rootScope.Variables.overlay_functions.layer5);
                                            }else if( layer == 6){
                                                eval($rootScope.Variables.overlay_functions.layer6);
                                            }else if( layer == 7){
                                                eval($rootScope.Variables.overlay_functions.layer7);
                                            }else if( layer == 8){
                                                eval($rootScope.Variables.overlay_functions.layer8);
                                            }else if( layer == 9){
                                                eval($rootScope.Variables.overlay_functions.layer9);
                                            }else if( layer == 10){
                                                eval($rootScope.Variables.overlay_functions.layer10);
                                            }
                                        },
                            removelayer: function(layer){
                                            if (layer == 1) {
                                                delete this.layers.overlays.layer1;
                                            }else if( layer == 2){
                                                delete this.layers.overlays.layer2;
                                            }else if( layer == 3){
                                                delete this.layers.overlays.layer3;
                                            }else if( layer == 4){
                                                delete this.layers.overlays.layer4;
                                            }else if( layer == 5){
                                                delete this.layers.overlays.layer5;
                                            }else if( layer == 6){
                                                delete this.layers.overlays.layer6;
                                            }else if( layer == 7){
                                                delete this.layers.overlays.layer7;
                                            }else if( layer == 8){
                                                delete this.layers.overlays.layer8;
                                            }else if( layer == 9){
                                                delete this.layers.overlays.layer9;
                                            }else if( layer == 10){
                                                delete this.layers.overlays.layer10;
                                            }
                                        }
                        });                       
                 
                        $scope.map_center = {
                            lat: 37.787435,
                            lng: 20.897801,
                            zoom: 12
                        };
                        
                        $q.all($rootScope.mainInfo).then(
                                function (data) {
                                    for(var i = Object.keys($rootScope.Variables.overlay_functions).length + 1; i <= 10; i++){
                                    $scope.removelayer(i);
                                }
                                    
                                    for(var i = 1; i <= Object.keys($rootScope.Variables.overlay_functions).length; i++){
                                    $scope.addlayer(i);
                                }
                                    
                                    $scope.lastdatesToCheck = 30;
                                    $scope.lastissues = [];
                                    $scope.markers = [];
                                    $scope.fixedmarkersGarbage = [];
                                    $scope.fixedmarkersLightning = [];
                                    $scope.state = true;
                                    $scope.toggleState = function () {
                                        $scope.state = !$scope.state;
                                    };

                                    $scope.calcValue30daysIssues = '0';
                                    $scope.calcValue30daysEvents = '0';
                                    $scope.calcValueProblemsFrom2016 = '0';
                                    $scope.calcValueSolutionFrom2016 = '0';

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

                                    $scope.$on("leafletDirectiveMarker.click", function (event, args) {
                                        var marker3 = args.leafletObject;
                                        var popup = marker3.getPopup();

                                        var issue_name;
                                        var issue_image;

                                        Issue2MapService.query({issueID: marker3.options.issue_id}, function (resp) {

                                            var resp_index = $rootScope.Variables.departments.indexOf(resp[0].issue);
                                            if (resp_index != -1) {
                                                issue_name = $rootScope.Variables.departments_en[resp_index];
                                            }

                                            if (resp[0].image_name == "" || resp[0].image_name == "no-image") {
                                                issue_image = "/images/EmptyBox-Phone.png";
                                            } else {
                                                issue_image = resp[0].image_name;
                                            }

                                            popup.setContent("<center><b>" + issue_name + "</b><br>" + resp[0].value_desc + "<br><img src=\"" + issue_image + "\" style=\"height:200px\"><br><a href=\"http://" + $rootScope.Variables.city_name + ".sense.city/#/scissuemap=" + resp[0]._id + "\">Εξέλιξη προβλήματος!</a></center>");
                                            popup.update();

                                        });
                                    });

                                    var startdate = new Date();
                                    startdate.setDate(startdate.getDate() - $scope.lastdatesToCheck);
                                    $scope.startISOdate = startdate;
                                    $scope.endISOdate = new Date();

                                    $scope.submitSearchLast30days = function () {

                                        var calclast30daysIssues = 0;
                                        var calclast30daysEvents = 0;

                                        $scope.startdate = $scope.startISOdate
                                                .getFullYear()
                                                + '-'
                                                + ($scope.startISOdate.getMonth() + 1)
                                                + '-' + $scope.startISOdate.getDate();
                                        $scope.enddate = $scope.endISOdate
                                                .getFullYear()
                                                + '-'
                                                + ($scope.endISOdate.getMonth() + 1)
                                                + '-' + $scope.endISOdate.getDate();

                                        var paramsObj = [];

                                        for (var i = 0; i < $rootScope.Variables.categories.length; i++) {
                                            paramsObj.push({
                                                startdate: $scope.startdate,
                                                enddate: $scope.enddate,
                                                issue: $rootScope.Variables.categories[i],
                                                image_field: 0
                                            });
                                        }

                                        var promisesArray = [];

                                        for (index = 0; index < paramsObj.length; index++) {
                                            promisesArray
                                                    .push(doQuery(paramsObj[index]));
                                        }

                                        $q
                                                .all(promisesArray)
                                                .then(
                                                        function (data) {
                                                            var searchissues = [];

                                                            for (i = 0; i < data.length; i++) {
                                                                for (j = 0; j < data[i].length; j++) {
                                                                    searchissues
                                                                            .push(data[i][j]);
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
                                                                                    calclast30daysIssues = calclast30daysIssues + 1;
                                                                                }

                                                                                calclast30daysEvents = calclast30daysEvents + 1;
                                                                                var message = '';

                                                                                if (value.value_desc) {
                                                                                    message = value.value_desc;
                                                                                } else {
                                                                                    message = 'Μη διαθέσιμη περιγραφή';
                                                                                }
                                                                                
                                                                                if(layer != 'reaction'){
                                                                                var lindex = $rootScope.Variables.overlay_categories.indexOf(issue) + 1;
                                                                            }else{
                                                                                var lindex = $rootScope.Variables.overlay_categories.indexOf('reaction') + 1;
                                                                            }
                                                                                layer = "layer"+ lindex;
                                                                                
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
                                                            $scope.calcValue30daysIssues = calclast30daysIssues;
                                                            $scope.calcValue30daysEvents = calclast30daysEvents;
                                                        });
                                    };


                                    function doQuery(obj) {
                                        var d = $q.defer();
                                        DisplayIssuesService.query(obj,
                                                function (result) {
                                                    d.resolve(result);
                                                });

                                        return d.promise;
                                    }

                                    $scope.doCalcLast6Issues = function () {
                                        var theLastIssues = DisplayLast6IssuesService
                                                .query(function () {
                                                    angular
                                                            .forEach(
                                                                    theLastIssues,
                                                                    function (lastissue,
                                                                            key) {
                                                                        if (lastissue.image_name === ''
                                                                                || lastissue.image_name === 'no-image'
                                                                                || lastissue.image_name === null
                                                                                || lastissue.image_name === undefined) {
                                                                            lastissue.image_name = "images/EmptyBox-Phone.png";
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
                                                                        /*var bugParams =
                                                                         {
                                                                         "method": "Bug.get",
                                                                         "params": [{"ids":lastissue._id,"include_fields":["component","cf_sensecityissue","status","id","alias","summary","creation_time","whiteboard","resolution","last_change_time"]}],
                                                                         "id": 1
                                                                         };
                                                                         BugService.search(bugParams, function(result) {
                                                                         switch (result[0].status) {
                                                                         case 'CONFIRMED':
                                                                         result.status = 'CONFIRMED';
                                                                         break;
                                                                         case 'IN_PROGRESS':
                                                                         result.status = 'IN_PROGRESS';
                                                                         break;
                                                                         case 'RESOLVED':
                                                                         result.status = 'RESOLVED';
                                                                         break;
                                                                         }
                                                                         lastissue.status = result.status;
                                                                         });
                                                                         */

                                                                    });
                                                });
                                        // query() returns all the last 6
                                        // issues

                                        $scope.lastissues = theLastIssues;
                                    };

                                    $scope.doCalcFrom2016 = function () {
                                        var problemsParam =
                                                {
                                                    "method": "Bug.search",
                                                    "params": [{"product": $rootScope.Variables.bugzilla_products, "order": "bug_id DESC", "cf_issues": ["garbage", "plumbing", "lighting", "road-contructor", "green", "protection-policy", "enviroment", "road-constructor", "environment"], "status": ["CONFIRMED", "IN_PROGRESS", "RESOLVED"], "resolution": ["---", "FIXED"], "f1": "creation_ts", "o1": "greaterthan", "v1": "2016-01-01", "include_fields": ["id"]}],
                                                    "id": 1
                                                };
                                        BugService.search(problemsParam, function (result) {
                                            $scope.calcValueProblemsFrom2016 = result.length;
                                        });

                                        var solutionsParam =
                                                {
                                                    "method": "Bug.search",
                                                    "params": [{"product": $rootScope.Variables.bugzilla_products, "order": "bug_id DESC", "status": "RESOLVED", "resolution": "FIXED", "f1": "resolution", "o1": "changedafter", "v1": "2016-01-01", "include_fields": ["id"]}],
                                                    "id": 1
                                                };

                                        BugService.search(solutionsParam, function (result) {
                                            $scope.calcValueSolutionFrom2016 = result.length;
                                        });

                                    };

                                    console.log("city_name11 : " + $rootScope.Variables.city_name);

                                    $scope.displayFixedPoints = function () {

                                        console.log("city_name : " + $rootScope.Variables.city_name);

                                        var i = 0;

                                        var theFixedPoints = FixedPointsService.query(function () {
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

                                            var overlays = {
                                                "<i class='fa fa-trash-o  fa-2x'></i>&nbsp;<span style='align:left'>Κάδοι σκουπιδιών</span>": markersGarbage,
                                                "<i class='fa fa-lightbulb-o fa-2x'></i>&nbsp;<span style='align:left'>Φωτισμός</span>": markersLightning
                                            };

                                            leafletData.getMap().then(function (map) {
                                                L.control.layers($scope.layers.baseLayers, overlays).addTo(map);
                                                map.invalidateSize(true);
                                            });

                                        });
                                    };
                                    $scope.doCalcLast6Issues();
                                    $scope.submitSearchLast30days();
                                    $scope.doCalcFrom2016();
                                    $scope.displayFixedPoints();

                                    // set intervals to update
                                    var updtime = 5 * 60 * 1000; // every 5 minutes
                                    $interval($scope.doCalcLast6Issues, updtime);
                                    $interval($scope.submitSearchLast30days, updtime);
                                    $scope.$apply();
                                });
                    }]);