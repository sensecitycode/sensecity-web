var appControllers = angular.module('scwebsubmit.controllers', ['pascalprecht.translate', 'ngCookies']);



appControllers.controller('scWebSubmit', ['$scope', '$window', '$q', '$rootScope', '$log', '$location', 'leafletData', 'Issue', '$translate', '$http',
    function ($scope, $window, $q, $rootScope, $log, $location, leafletData, Issue, $translate, $http) {
        $log.debug('inside scWebSubmit controller');
        $rootScope.overview_url = $location.path();
        $scope.markers = [];
        var mylocation_en = 0;

        var idt = setTimeout(function () {
            for (var i = idt; i > 0; i--)
                clearInterval(i);
        }, 10);
        
        leafletData.getMap("issuesmap").then(function (map) {
                                        map.scrollWheelZoom.disable();
                                    });
        
        navigator.geolocation.getCurrentPosition(function(pos){
            var mylocation_marker = {
                                lat: pos.coords.latitude,
                                lng: pos.coords.longitude,
                                icon: {
                                    type: 'awesomeMarker',
                                    prefix: 'fa',
                                    icon: 'smile-o',
                                    markerColor: 'blue'
                                }
                            };
            $scope.markers.unshift(mylocation_marker);
            mylocation_en = 1;
            
        });

        $scope.latlabeltxt = null;

        $scope.showSuccessAlertName = false;
        $scope.showSuccessAlertEmail = false;
        $scope.coords_search = 0;
        $scope.address = "";

        $scope.map_center = {
            lat: 37.787435,
            lng: 20.897801,
            zoom: 12
        };

        $scope.openStreetMap = {
            name: 'OpenStreetMap',
            type: 'xyz',
            url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            layerOptions: {
                showOnSelector: true,
                attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
                maxZoom: 19
            }
        };




        //We use a custom Google.js that calls also the google trafic layer. Please see http://www.qtrandev.com/transit5/ for inspiration

        var googleRoadmap = {
            name: 'Google Map + Traffic',
            layerType: 'ROADMAP',
            type: 'google',
            layerOptions: {
                showOnSelector: true,
                attribution: 'xxx',
                maxZoom: 20
            }
        };

        var googleHybrid = {
            name: 'Google Hybrid + Traffic',
            layerType: 'HYBRID',
            type: 'google',
            layerOptions: {
                showOnSelector: true,
                attribution: 'xxx',
                maxZoom: 20
            }
        };


        $scope.layers = {
            baselayers: {
                openStreetMap: $scope.openStreetMap,
                gR: googleRoadmap,
                gH: googleHybrid

            },
            overlays: {

            }
        };

        $scope.invalidateTheMap = function () {
            leafletData.getMap().then(
                    function (map) {
                        map.invalidateSize(true);
                    }
            );
        };
        
        $scope.disable_next = function(){
            $scope.coords_search = 1;
        };

        function onmapclick(event) {
            //newMarker = new L.marker(event.latlng, {icon: redMarker}, {draggable: true});
            var mainMarker = {
                lat: event.latlng.lat,
                lng: event.latlng.lng,
                icon: {
                    type: 'awesomeMarker',
                    prefix: 'fa',
                    icon: 'info-circle',
                    markerColor: 'red'
                }
            };
            
            $http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+event.latlng.lat+","+event.latlng.lng+"&language=el&key=AIzaSyCHBdH6Zw1z3H6NOmAaTIG2TwIPTXUhnvM").success(function(result){
                $scope.address = result.results[0].formatted_address;
            });
            
            if($scope.markers.length == 2 || mylocation_en == 0){
            $scope.markers.pop();
        }
            $scope.markers.push(mainMarker);
            


            $scope.latlabeltxt = event.latlng.lat;
            $scope.lnglabeltxt = event.latlng.lng;
        };

        $q.all($rootScope.mainInfo).then(function (data) {

            leafletData.getMap().then(function (map) {
                map.on('click', onmapclick);
            });

            $scope.map_center = {
                lat: $rootScope.Variables.lat_center,
                lng: $rootScope.Variables.long_center,
                zoom: $rootScope.Variables.map_zoom
            };


            $scope.availableIssues = $rootScope.Variables.availableIssues;


            $scope.issueTypeSelect = $scope.availableIssues[0];
            $scope.issueSubTypeSelect = $scope.issueTypeSelect.types[0];
            $scope.otherDescriptionTxt = '-';
            $scope.uploadedPhotoFile = 'no-image';


            $scope.stateChanged = function () {

                if ($scope.chkSelected) {
                    $scope.showSuccessAlertName = false;
                    $scope.showSuccessAlertEmail = false;

                } else {
                    $scope.showSuccessAlertName = false;
                    $scope.showSuccessAlertEmail = false;
                    $scope.NameTxt = "";
                    $scope.EmailTxt = "";
                    $scope.MobileTxt = "";

                }

            };


            $scope.step1 = function () {
                return false;
            };

            $scope.step2 = function () {
                return true;
            };

            $scope.step3 = function () {
                return true;
            };

            $scope.step4 = function () {
                return true;
            };

            $scope.geocode = function (address) {
                var geocoder = new google.maps.Geocoder();
                if( address == 1){
                    var address = $scope.address + "," + $rootScope.Variables.city_address;
                }else{
                    var address = $('#address').val() + "," + $rootScope.Variables.city_address;
                }
                if(address != ""){
                geocoder.geocode({'address': address}, function (results, status) {
                    if (status === 'OK') {
                        if (results.length == 1) {
                            var latlng = {lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng()};
                            var mainMarker = {
                                lat: latlng.lat,
                                lng: latlng.lng,
                                icon: {
                                    type: 'awesomeMarker',
                                    prefix: 'fa',
                                    icon: 'info-circle',
                                    markerColor: 'red'
                                }
                            };
                            $scope.map_center = {
                                lat: results[0].geometry.location.lat(),
                                lng: results[0].geometry.location.lng(),
                                zoom: 18
                            };
                            $scope.address = results[0].formatted_address;
                            if($scope.markers.length == 2 || mylocation_en == 0){
                            $scope.markers.pop();
                        }
                            $scope.markers.push(mainMarker);
                            $scope.latlabeltxt = results[0].geometry.location.lat();
                            $scope.lnglabeltxt = results[0].geometry.location.lng();
                                           leafletData.getMap().then(
                    function (map) {
                        map.invalidateSize(true);
                    }
            );
                            
                        } else {
                            var addresses_options = "";
                            for (var l = 0; l < results.length; l++) {
                                addresses_options += "<option>" + results[l].formatted_address + "</option>";
                            }
                            $("#taddress").html(addresses_options);
                            $('#address').flexdatalist('reset');
                            $('#address').flexdatalist({
                                minLength: 0
                            });

                            $("#address-flexdatalist").focus();
                               
                        }
                        $scope.coords_search = 0;
                    } else {
                        $scope.coords_search = 0;
                        $window.alert("Δεν βρέθηκαν αποτελέσματα για τη διεύθυνση που εισαγάγατε. Παρακαλώ δοκιμάστε ξανά.");
                    }
                });
            }else{
                                        $scope.coords_search = 0;
                                    }
            };

            $("#submit").click(function () {
              $scope.geocode();
//                $scope.map_center = {lat: 38.246639,lng: ‎21.734573, zoom: 18};

            });

            $scope.updateCompoType = function () {
                $scope.issueSubTypeSelect = $scope.issueTypeSelect.types[0];
            };


            $scope.$on('leafletDirectiveMap.overlayadd', function (event, o) {
                console.log("overlayadd event ");
                console.log(o.leafletEvent);
                console.log(o.leafletEvent.layer);

            });


            //need to refresh the map layer after everything is rendered, otherwise it displays empty tiles


            $scope.submit_button = true;
            $scope.register_button = false;
            $scope.verify_button = false;
            $scope.submit_eponymous_button = false;


            $scope.issubmit_isseu_form = function () {
                return true;
            };

            $scope.write_user_data = function () {
                return false;
            };

            $scope.isOtherSelected = function () {
                return $scope.issueSubTypeSelect.id === 'other';
            };

            //translate immediately when change
            $scope.issueSubTypeSelectChanged = function () {

                $translate($scope.issueSubTypeSelect.name).then(function (h) {
                    $scope.otherDescriptionTxt = h;
                    console.log("in issueSubTypeSelectChanged $scope.otherDescriptionTxt =" + $scope.otherDescriptionTxt);
                }, function (translationId) {
                    //$scope.otherDescriptionTxt = translationId;
                });

            };
            //this executes the first time just once in the init of page
            $scope.issueSubTypeSelectChanged();

            /*$scope.submit_Eponymous = function submit(){
             
             var txtpost = '{ "uuid" : "web-site", "name": "'+$scope.NameTxt+'", "email": "'+$scope.EmailTxt+'", "mobile_num": "'+$scope.MobileTxt+'", "permission" :  { "send_issues": "true" , "communicate_with": {"email" : "'+$("#btn_settings_ans_email").is(":checked").toString()+'", "sms" : "'+$("#btn_settings_ans_sms").is(":checked").toString()+'"}}}';    
             
             console.log(txtpost);
             
             
             return $http({
             method : 'POST',
             url : $rootScope.Variables.active_user_URL,
             headers : {
             'Content-Type' : 'application/json; charset=utf-8'
             },
             data : txtpost 
             }).success(function(resp) {
             
             console.log(resp);
             $scope.myText = resp.policy_description;
             
             $scope.issubmit_isseu_form = function(){
             return false;
             }
             
             $scope.iseponymous = function(){
             return true;
             }
             
             $scope.submit_button = false;
             
             
             $scope.submit_button = false;
             $scope.register_button = true;
             $scope.verify_button = false;
             $scope.submit_eponymous_button = false;
             
             //$location.path("/test1");
             }); 
             
             
             
             
             
             
             
             
             
             }*/

            $scope.write_user_data = function () {
                return false;
            };

            var my_id;
            var user_id;


            $scope.setStep = function (step) {
                if (step == 1) {

                    console.log("Step 1");

                    $scope.step1 = function () {
                        return false;
                    };

                    $scope.step2 = function () {
                        return false;
                    };

                    $scope.step3 = function () {
                        return true;
                    };

                    $scope.step4 = function () {
                        return true;
                    };

                    $scope.issue = new Issue();

                    var desc = $scope.otherDescriptionTxt;

                    $scope.issue.issue = $scope.issueTypeSelect.id;

                    $scope.issue.device_id = 'webapp';

                    $scope.issue.value_desc = desc;
                    $scope.issue.image_name = $scope.uploadedPhotoFile; //no-image

                    var txtpost = '{"loc" : { "type" : "Point",  "coordinates" : [' + $scope.lnglabeltxt + ',' + $scope.latlabeltxt + '] }, "issue" : "' + $scope.issueTypeSelect.id + '","device_id" : "' + $scope.issue.device_id + '", "value_desc" : "' + $scope.issue.value_desc + '","image_name" : "' + $scope.issue.image_name + '","comments" : "' + $scope.commentstxt + '" }';

                    return $http(
                            {
                                method: 'POST',
                                url: $rootScope.Variables.APIURL,
                                headers: {
                                    'Content-Type': 'application/json; charset=utf-8'
                                },
                                data: txtpost
                            }).success(function (resp) {
                                $http({
                method:"GET",
                url: $rootScope.Variables.APIADMIN+"/city_policy?coordinates=["+$scope.lnglabeltxt+","+$scope.latlabeltxt+"]&issue="+$scope.issueTypeSelect.id             
                                }).success(function(msg){                
                                    
                        my_id = resp._id;
                        resp.anonymous = msg[0].anonymous;
                        $scope.myText = msg[0].policy_desc;


                        if (resp.anonymous == "false") {
                            $scope.issubmit_isseu_form = function () {
                                return false;
                            };


                            $scope.iseponymous = function () {
                                return true;
                            };

                            $scope.write_user_data = function () {
                                return true;
                            };

                            $scope.isnotverify = function () {
                                return false;
                            };

                            $scope.submit_button = false;
                            $scope.register_button = true;
                            $scope.verify_button = false;
                            $scope.submit_eponymous_button = false;
                        } else {
                            $scope.issubmit_isseu_form = function () {
                                return false;
                            };

                            $scope.iseponymous = function () {
                                return false;
                            };
                            $scope.write_user_data = function () {
                                return false;
                            };
                            $scope.isnotverify = function () {
                                return false;
                            };
                            $scope.is_finalsubmit = function () {
                                return true;
                            };
                            $scope.step1 = function () {
                                return false;
                            };

                            $scope.step2 = function () {
                                return false;
                            };

                            $scope.step3 = function () {
                                return false;
                            };

                            $scope.step4 = function () {
                                return false;
                            };

                            $scope.submit_button = false;
                            $scope.register_button = false;
                            $scope.verify_button = false;
                            $scope.submit_eponymous_button = true;
                        }
                        });
                    });
                }
                else if (step == 2) {
                    console.log("Step 2");
                    if (!$scope.chkSelected) { //if you sent an issue as anonymous

                        $scope.submit_button = false;
                        $scope.register_button = false;
                        $scope.verify_button = false;
                        $scope.submit_eponymous_button = true;

                        $scope.showSuccessAlertName = false;
                        $scope.showSuccessAlertEmail = false;

                        $scope.issubmit_isseu_form = function () {
                            return false;
                        };
                        $scope.iseponymous = function () {
                            return false;
                        };
                        $scope.write_user_data = function () {
                            return false;
                        };
                        $scope.isnotverify = function () {
                            return false;
                        };
                        $scope.is_finalsubmit = function () {
                            return true;
                        };
                        $scope.step1 = function () {
                            return false;
                        };

                        $scope.step2 = function () {
                            return false;
                        };

                        $scope.step3 = function () {
                            return false;
                        };

                        $scope.step4 = function () {
                            return false;
                        };
                    } else {

                        $scope.step1 = function () {
                            return false;
                        };

                        $scope.step2 = function () {
                            return false;
                        };

                        $scope.step3 = function () {
                            return false;
                        };

                        $scope.step4 = function () {
                            return true;
                        };
                        $scope.write_user_data = function () {
                            return true;
                        };

                        if ($scope.NameTxt == "" || $scope.EmailTxt == "" || $scope.NameTxt == undefined || $scope.EmailTxt == undefined || $scope.NameTxt == null || $scope.EmailTxt == null) {


                            $scope.showSuccessAlertName = true;


                            $scope.switchBoolName = function (value) {
                                $scope[value] = !$scope[value];
                            };

                            $scope.showSuccessAlertEmail = true;
                            $scope.switchBoolEmail = function (value) {
                                $scope[value] = !$scope[value];
                            };

                            return false;
                        }


                        var chk_1;
                        var chk_2;

                        if ($scope.chkSelected_1) {
                            chk_1 = "true";
                        } else {
                            chk_1 = "false";
                        }

                        if ($scope.chkSelected_2) {
                            chk_2 = "true";
                        } else {
                            chk_2 = "false";
                        }



                        var txtpost1 = '{ "uuid" : "web-site", "name": "' + $scope.NameTxt + '", "email": "' + $scope.EmailTxt + '", "mobile_num": "' + $scope.MobileTxt + '", "permission" :  { "send_issues": "true" , "communicate_with": {"email" : "' + chk_1 + '", "sms" : "' + chk_2 + '"}}}';

                        return $http({
                            method: 'POST',
                            url: $rootScope.Variables.active_user_URL,
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            data: txtpost1
                        }).success(function (resp) {

                            $scope.myText = resp.policy_description;
                            if (resp.user_exist == "1") {

                                $scope.submit_button = false;
                                $scope.register_button = false;
                                $scope.verify_button = false;
                                $scope.submit_eponymous_button = true;

                                $scope.issubmit_isseu_form = function () {
                                    return false;
                                };
                                $scope.iseponymous = function () {
                                    return false;
                                };
                                $scope.isnotverify = function () {
                                    return false;
                                };
                                $scope.is_finalsubmit = function () {
                                    return true;
                                };

                            } else {
                                //Verify button
                                user_id = resp._id;
                                $scope.submit_button = false;
                                $scope.register_button = false;
                                $scope.verify_button = true;
                                $scope.submit_eponymous_button = false;

                                $scope.issubmit_isseu_form = function () {
                                    return false;
                                };
                                $scope.iseponymous = function () {
                                    return false;
                                };
                                $scope.isnotverify = function () {
                                    return true;
                                };
                                $scope.is_finalsubmit = function () {
                                    return false;
                                };


                            }





                        });
                    }
                } else if (step == 3) {
                    console.log("Step 3");
                    $scope.step1 = function () {
                        return false;
                    };

                    $scope.step2 = function () {
                        return false;
                    };

                    $scope.step3 = function () {
                        return false;
                    };

                    $scope.step4 = function () {
                        return false;
                    };

                    var jsonact_Data = '{ "id1" : "' + user_id + '", "id2": "web-site", "id3": "' + $scope.codeTxt + '"}';
                    
                    console.log(jsonact_Data);
                    return $http({
                        method: 'POST',
                        url: $rootScope.Variables.activate_user_URL,
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                        },
                        data: jsonact_Data
                    }).success(function (resp) {
                        console.log(JSON.stringify(resp));
                        $scope.submit_button = false;
                        $scope.register_button = false;
                        $scope.verify_button = false;
                        $scope.submit_eponymous_button = true;

                        $scope.issubmit_isseu_form = function () {
                            return false;
                        };
                        $scope.iseponymous = function () {
                            return false;
                        };
                        $scope.isnotverify = function () {
                            return false;
                        };
                        $scope.is_finalsubmit = function () {
                            return true;
                        };
                    });

                } else if (step == 4) {

                    console.log("Step 4");
                    var jsonData = '{ "uuid" : "web-site", "name": "' + $scope.NameTxt + '", "email": "' + $scope.EmailTxt + '", "mobile_num": "' + $scope.MobileTxt + '"}';
                    
                    return $http({
                        method: 'POST',
                        url: $rootScope.Variables.APIURL + my_id,
                        headers: {
                            'Content-Type': 'application/json; charset=utf-8'
                        },
                        data: jsonData
                    }).success(function (resp) {
                        $scope.issubmit_isseu_form = function () {
                            return true;
                        };
                        $scope.iseponymous = function () {
                            return false;
                        };
                        $scope.isnotverify = function () {
                            return false;
                        };
                        $scope.is_finalsubmit = function () {
                            return false;
                        };

                        $scope.issueTypeSelect = $scope.availableIssues[0];
                        $scope.issueSubTypeSelect = $scope.issueTypeSelect.types[0];
                        $scope.otherDescriptionTxt = '-';
                        $scope.uploadedPhotoFile = 'no-image';

                        $scope.latlabeltxt = "";
                        $scope.lnglabeltxt = "";
                        $scope.otherDescriptionTxt = "";
                        $scope.commentstxt = "";
                        $scope.issueTypeSelect.id = "garbage";
                        $scope.NameTxt = "";
                        $scope.EmailTxt = "";
                        $scope.MobileTxt = "";
                        $scope.chkSelected_1 = true;
                        $scope.chkSelected_2 = false;

                        $scope.chkSelected = false;

                        $scope.submit_button = true;
                        $scope.register_button = false;
                        $scope.verify_button = false;
                        $scope.submit_eponymous_button = false;

                        $scope.step1 = function () {
                            return false;
                        };

                        $scope.step2 = function () {
                            return true;
                        };

                        $scope.step3 = function () {
                            return true;
                        };

                        $scope.step4 = function () {
                            return true;
                        };
                    });
                }
            };
        });
    }]);




appControllers.directive('afterRender', ['$timeout', function ($timeout) {
        var def = {
            restrict: 'A',
            terminal: true,
            transclude: false,
            link: function (scope, element, attrs) {
                $timeout(scope.$eval(attrs.afterRender), 0);  //Calling a scoped method
            }
        };
        return def;
    }]);


//the following directive automatically takes the file and translates it to base64
appControllers.directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {


                        var filesSelected = element[0].files[0];
                        //modelSetter(scope, element[0].files[0]);
                        if (filesSelected.size > 0)
                        {
                            console.log('size>0');
                            var base64image_name = '';
                            var fileToLoad = filesSelected;
                            r = new FileReader();

                            r.onloadend = function (e) { //callback after files finish loading
                                base64image_name = e.target.result;

                                console.log(base64image_name.replace(/^data:image\/(png|jpg);base64,/, "")); //replace regex if you want to rip off the base 64 "header"
                                //here you can send data over your server as desired
                                modelSetter(scope, base64image_name);

                            };
                            r.readAsDataURL(fileToLoad); //once defined all callbacks, begin reading the file
                        }

                    });
                });
            }
        };
    }]);