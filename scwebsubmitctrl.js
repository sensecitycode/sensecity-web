var appControllers = angular.module('scwebsubmit.controllers', []);

appControllers.controller('scWebSubmit', ['$scope', '$window', '$q', '$rootScope', '$log', '$location', 'leafletData', '$translate', '$http',
    function ($scope, $window, $q, $rootScope, $log, $location, leafletData, $translate, $http) {
        $scope.smsg1 = false;
        $scope.smsg2 = false;
        $scope.chkSelected_1 = false;
        $scope.chkSelected_2 = false;
        $scope.chkSelected = false;
        $scope.ecert = false;
        $scope.mcert = false;
        var ecft = 1;
        var mcft = 1;

        $scope.img_show = false;

        $scope.navClass = function (page) {
            var path = window.location.href.toString().split("/");
            var currentRoute = path[path.length - 1];
            if (currentRoute.split(".")[0] != page) {
                return false;
            } else {
                return true;
            }
        };


        $scope.changeLanguage = function (langKey) {
            $translate.use(langKey);
            setTimeout(function () {
                $("#next_button").text($translate.instant('NEXT'));
                $("#previous_button").text($translate.instant('PREVIOUS'));
                $("#btntxt").text($translate.instant('CHOOSE_PHOTO'));
                $("#finish_button").text($translate.instant('SUBMIT'));
                $('#available_issues').selectpicker('refresh');
                $('#issuetype_select').selectpicker('refresh')
            }, 100);
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

        $("#nametxt").blur(function () {
            if ($scope.NameTxt == "" || $scope.NameTxt == undefined) {
                $("#next_button").attr("class", "btn btn-default pull-right disabled");
            } else {
                if ($scope.chkSelected_2 && ($scope.MobileTxt == "" || $scope.MobileTxt == undefined)) {
                    $("#next_button").attr("class", "btn btn-default pull-right disabled");
                } else if ($scope.chkSelected_1 && ($scope.EmailTxt == "" || $scope.EmailTxt == undefined)) {
                    $("#next_button").attr("class", "btn btn-default pull-right disabled");
                } else {
                    $("#next_button").attr("class", "btn btn-default pull-right");
                }
            }
        });

        $("#emailtxt").blur(function () {
            if ($scope.NameTxt == "" || $scope.NameTxt == undefined) {
                $("#next_button").attr("class", "btn btn-default pull-right disabled");
            } else {
                if ($scope.chkSelected_2 && ($scope.MobileTxt == "" || $scope.MobileTxt == undefined)) {
                    $("#next_button").attr("class", "btn btn-default pull-right disabled");
                } else if ($scope.chkSelected_1 && ($scope.EmailTxt == "" || $scope.EmailTxt == undefined)) {
                    $("#next_button").attr("class", "btn btn-default pull-right disabled");
                } else {
                    $("#next_button").attr("class", "btn btn-default pull-right");
                }
            }
        });

        $("#mobiletxt").blur(function () {
            if ($scope.NameTxt == "" || $scope.NameTxt == undefined) {
                $("#next_button").attr("class", "btn btn-default pull-right disabled");
            } else {
                if ($scope.chkSelected_2 && ($scope.MobileTxt == "" || $scope.MobileTxt == undefined)) {
                    $("#next_button").attr("class", "btn btn-default pull-right disabled");
                } else if ($scope.chkSelected_1 && ($scope.EmailTxt == "" || $scope.EmailTxt == undefined)) {
                    $("#next_button").attr("class", "btn btn-default pull-right disabled");
                } else {
                    $("#next_button").attr("class", "btn btn-default pull-right");
                }
            }
        });

//        $("#txtaddress").change(function () {
//            if ($scope.address != "") {
//                $("#next_button").attr("class", "btn btn-default pull-right");
//            } else {
//                $("#next_button").attr("class", "btn btn-default pull-right disabled");
//            }
//        });

        $scope.chkSelected = false;
        $scope.valid = null;

        $rootScope.mainInfo = $http.get(url, {timeout: d.promise}).success(function (response) {
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

            d.resolve(response);
            return d.promise;
        });

        setTimeout(function () {
            if (d.promise.$$state.status == 0) {
                d.resolve('cancelled');
                alert("Η υπηρεσία δεν ανταποκρίνεται! Παρακαλώ δοκιμάστε αργότερα!");
            }
        }, 30000);

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

        navigator.geolocation.getCurrentPosition(function (pos) {
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

            $scope.map_center = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
                zoom: 18
            };

            $scope.$apply();
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
            leafletData.getMap("issuesmap").then(
                    function (map) {
                        map.invalidateSize(true);
                    }
            );
        };

        $scope.disable_next = function () {
            $(".btn.btn-default.pull-right").attr("class", "btn btn-default pull-right disabled");
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

            var cancg = $q.defer();

            $http.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + event.latlng.lat + "," + event.latlng.lng + "&language=el&key=AIzaSyCHBdH6Zw1z3H6NOmAaTIG2TwIPTXUhnvM", {timeout: cancg.promise}).success(function (result) {

                cancg.resolve();
                $scope.address = result.results[0].formatted_address;
                var cang1 = $q.defer();
                $http({
                    method: "GET",
                    url: $rootScope.Variables.APIADMIN + "/city_policy?coordinates=[" + event.latlng.lng + "," + event.latlng.lat + "]&issue=garbage",
                    timeout: cang1.promise
                }).success(function (msg) {
                    cang1.resolve();
                    if (msg[0].city == $rootScope.Variables.city_name) {
                        setTimeout(function () {
                            $("#next_button").attr("class", "btn btn-default pull-right");
                        }, 100);
                    } else {
                        $("#next_button").attr("class", "btn btn-default pull-right disabled");
                        alert("Η διεύθυνση που καταχωρίσατε βρίσκεται εκτός των ορίων της πόλης! Παρακαλώ καταχωρείστε έγκυρη διεύθυνση!");
                    }
                }).error(function () {

                });
                setTimeout(function () {
                    if (cang1.promise.$$state.status == 0) {
                        cancg.resolve('cancelled');
                        $scope.$apply();
                        alert("Η υπηρεσία δεν ανταποκρίνεται! Παρακαλώ δοκιμάστε αργότερα!");
                    }
                }, 30000);
            });

            setTimeout(function () {
                if (cancg.promise.$$state.status == 0) {
                    cancg.resolve('cancelled');
                    alert("Η υπηρεσία δεν ανταποκρίνεται! Παρακαλώ δοκιμάστε αργότερα!");
                }
            }, 30000);

            if ($scope.markers.length == 2 || mylocation_en == 0) {
                $scope.markers.pop();
            }
            $scope.markers.push(mainMarker);



            $scope.latlabeltxt = event.latlng.lat;
            $scope.lnglabeltxt = event.latlng.lng;
        }
        ;

        $q.all([$rootScope.mainInfo]).then(function (data) {
            $("#next_button").attr("class", "btn btn-default pull-right disabled");
            if ($scope.markers.length == 2 || mylocation_en == 0) {
                $scope.markers.pop();
            }

            leafletData.getMap("issuesmap").then(function (map) {
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
            //$scope.otherDescriptionTxt = '-';
            $scope.uploadedPhotoFile = 'no-image';

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
                if (address == 1) {
                    var address = $scope.address + "," + $rootScope.Variables.city_address;
                } else {
                    var address = $('#address').val() + "," + $rootScope.Variables.city_address;
                }
                if (address != "") {
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
                                if ($scope.markers.length == 2 || mylocation_en == 0) {
                                    $scope.markers.pop();
                                }
                                $scope.markers.push(mainMarker);
                                $scope.latlabeltxt = results[0].geometry.location.lat();
                                $scope.lnglabeltxt = results[0].geometry.location.lng();
                                leafletData.getMap("issuesmap").then(
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
                            $(".btn.btn-default.pull-right.disabled").attr("class", "btn btn-default pull-right");
                        } else {
                            $(".btn.btn-default.pull-right.disabled").attr("class", "btn btn-default pull-right");
                            $window.alert("Δεν βρέθηκαν αποτελέσματα για τη διεύθυνση που εισαγάγατε. Παρακαλώ δοκιμάστε ξανά.");
                        }
                    });
                } else {
                    $(".btn.btn-default.pull-right.disabled").attr("class", "btn btn-default pull-right");
                }
            };

            $("#subt").click(function () {
                $scope.geocode();
//                $scope.map_center = {lat: 38.246639,lng: ‎21.734573, zoom: 18};

            });

            $(document).ready(function () {

                $('#epon').on('ifToggled', function (event) {
                    if ($scope.chkSelected) {
                        $scope.showSuccessAlertName = false;
                        $scope.showSuccessAlertEmail = false;
                        $scope.chkSelected = false;
                        $("#next_button").attr("class", "btn btn-default pull-right");
                    } else {
                        $scope.showSuccessAlertName = false;
                        $scope.showSuccessAlertEmail = false;
                        $scope.NameTxt = "";
                        $scope.EmailTxt = "";
                        $scope.MobileTxt = "";
                        $scope.chkSelected = true;
                        $("#next_button").attr("class", "btn btn-default pull-right disabled");
                    }
                    $scope.$apply();
                });

                $('#chkSelected_1').on('ifToggled', function (event) {
                    if ($scope.mand_email == 'false') {
                        if ($scope.chkSelected_1) {
                            $scope.chkSelected_1 = false;
                        } else {
                            $scope.chkSelected_1 = true;
                            $scope.evalidation = false;
                        }
                        $scope.$apply();
                        if ($scope.NameTxt == "" || $scope.NameTxt == undefined) {
                            $("#next_button").attr("class", "btn btn-default pull-right disabled");
                        } else {
                            if ($scope.chkSelected_2 && ($scope.MobileTxt == "" || $scope.MobileTxt == undefined)) {
                                $("#next_button").attr("class", "btn btn-default pull-right disabled");
                            } else if ($scope.chkSelected_1 && ($scope.EmailTxt == "" || $scope.EmailTxt == undefined)) {
                                $("#next_button").attr("class", "btn btn-default pull-right disabled");
                            } else {
                                $("#next_button").attr("class", "btn btn-default pull-right");
                            }
                        }
                    }
                });

                $('#chkSelected_2').on('ifToggled', function (event) {
                    if ($scope.mand_sms == 'false') {
                        if ($scope.chkSelected_2) {
                            $scope.chkSelected_2 = false;
                        } else {
                            $scope.chkSelected_2 = true;
                            $scope.mvalidation = function () {

                            }
                        }
                        $scope.$apply();
                        if ($scope.NameTxt == "" || $scope.NameTxt == undefined) {
                            $("#next_button").attr("class", "btn btn-default pull-right disabled");
                        } else {
                            if ($scope.chkSelected_2 && ($scope.MobileTxt == "" || $scope.MobileTxt == undefined)) {
                                $("#next_button").attr("class", "btn btn-default pull-right disabled");
                            } else if ($scope.chkSelected_1 && ($scope.EmailTxt == "" || $scope.EmailTxt == undefined)) {
                                $("#next_button").attr("class", "btn btn-default pull-right disabled");
                            } else {
                                $("#next_button").attr("class", "btn btn-default pull-right");
                            }
                        }
                    }
                });

                $('#available_issues').on('change', function () {
                    var selected = $(this).find("option:selected").val();
                    var index;
                    for (var i = 0; i < $scope.availableIssues.length; i++) {
                        if ($scope.availableIssues[i].id == selected) {
                            index = i;
                            break;
                        }
                    }
                    $scope.issueTypeSelect = $scope.availableIssues[index];
                    $scope.$apply();
                    $('#issuetype_select').selectpicker('refresh');
                });

                $("#issuetype_select").on('change', function () {
                    var selected = $(this).find("option:selected").val();
                    var index;
                    for (var i = 0; i < $scope.issueTypeSelect.types.length; i++) {
                        if ($scope.issueTypeSelect.types[i].id == selected) {
                            index = i;
                            break;
                        }
                    }
                    $scope.issueSubTypeSelect = $scope.issueTypeSelect.types[index];

                    $translate($scope.issueSubTypeSelect.name).then(function (h) {
                        $scope.otherDescriptionTxt = "";
                        console.log("in issueSubTypeSelectChanged $scope.otherDescriptionTxt =" + $scope.otherDescriptionTxt);
                    }, function (translationId) {
                        //$scope.otherDescriptionTxt = translationId;
                    });
                });
            });



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
            //this executes the first time just once in the init of page
            $translate($scope.issueSubTypeSelect.name).then(function (h) {
                $scope.otherDescriptionTxt = "";
                console.log("in issueSubTypeSelectChanged $scope.otherDescriptionTxt =" + $scope.otherDescriptionTxt);
            }, function (translationId) {
                //$scope.otherDescriptionTxt = translationId;
            });

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

//            $scope.NameTxt1 = function(){
//                return $scope.NameTxt
//            }

            $scope.write_user_data = function () {
                return false;
            };

            var my_id;
            var user_id;

            $('.fileinput').on('change', function () {

                if (this.files[0].size > 5000000) {
                    $('.fileinput').val('');
                    alert("Το μέγεθος της φωτογραφίας υπερβαίνει τα 5mb! Παρακαλώ επιλέξτε φωτογραφία μικρότερου μεγέθους!");
                } else {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        $scope.img_url = e.target.result;
                        $scope.img_show = true;
                        $scope.$apply();
                    };
                    reader.readAsDataURL(this.files[0]);
                }

            });

            $scope.setStep = function (step) {

                if (step == 1) {
                    console.log("Step 1");

                    setTimeout(function () {
                        if ($scope.chkSelected) {
                            if ($scope.NameTxt == "" || $scope.NameTxt == undefined) {
                                $("#next_button").attr("class", "btn btn-default pull-right disabled");
                            } else {
                                if ($scope.chkSelected_2 && ($scope.MobileTxt == "" || $scope.MobileTxt == undefined)) {
                                    $("#next_button").attr("class", "btn btn-default pull-right disabled");
                                } else if ($scope.chkSelected_1 && ($scope.EmailTxt == "" || $scope.EmailTxt == undefined)) {
                                    $("#next_button").attr("class", "btn btn-default pull-right disabled");
                                } else {
                                    $("#next_button").attr("class", "btn btn-default pull-right");
                                }
                            }
                        }
                    }, 500);
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

//                    $scope.issue = new $resource($rootScope.Variables.APIADMIN + "issue/:id",
//		{id : "@id"	}, {
//		"update" : {
//			method : "PUT"
//		}});

                    var desc;
                    if (!$scope.isOtherSelected()) {
                        desc = $translate.instant($scope.issueSubTypeSelect.name);
                    } else {
                        desc = $scope.otherDescriptionTxt;
                    }

                    var issue = $scope.issueTypeSelect.id;

                    var device_id = 'webapp';

                    var value_desc = desc;
                    var image_name = $scope.uploadedPhotoFile; //no-image
                    if ($scope.commentstxt != undefined) {
                        $scope.anon_post = '{"loc" : { "type" : "Point",  "coordinates" : [' + $scope.lnglabeltxt + ',' + $scope.latlabeltxt + '] }, "issue" : "' + $scope.issueTypeSelect.id + '","device_id" : "' + device_id + '", "value_desc" : "' + value_desc + '","image_name" : "' + image_name + '","comments" : "' + $scope.commentstxt.replace(/\s+/g, ' ').trim() + '","city_address": "' + $scope.address + '"}';
                    } else {
                        $scope.anon_post = '{"loc" : { "type" : "Point",  "coordinates" : [' + $scope.lnglabeltxt + ',' + $scope.latlabeltxt + '] }, "issue" : "' + $scope.issueTypeSelect.id + '","device_id" : "' + device_id + '", "value_desc" : "' + value_desc + '","image_name" : "' + image_name + '","city_address": "' + $scope.address + '"}';
                    }

                    var canactp = $q.defer();
                    $http({
                        method: "POST",
                        url: $rootScope.Variables.APIADMIN + "/activate_city_policy?lat=" + $scope.latlabeltxt + "&long=" + $scope.lnglabeltxt,
                        timeout: canactp.promise
                    }).success(function (msg) {
                        canactp.resolve();
                        var msg_str = JSON.stringify(msg[0]);
                        msg = JSON.parse(msg_str);
                        $scope.mand_sms = msg.mandatory_sms;
                        if ($scope.mand_sms == 'true') {
                            $("#chkSelected_2").parent().attr("class", "icheckbox_minimal-grey checked disabled readonly");
                            $("#chkSelected_2").prop("disabled", true);
                            if (mcft == 1) {
                                mcft = 0;
                                $scope.chkSelected_2 = true;
                            }
                        }
                        $scope.mand_email = msg.mandatory_email;
                        if ($scope.mand_email == 'true') {
                            $("#chkSelected_1").parent().attr("class", "icheckbox_minimal-grey checked disabled readonly");
                            $("#chkSelected_1").prop("disabled", true);
                            if (ecft == 1) {
                                ecft = 0;
                                $scope.chkSelected_1 = true;
                            }
                        }
                        var is_anon;
                        var canactp1 = $q.defer();
                        $http({
                            method: "GET",
                            url: $rootScope.Variables.APIADMIN + "/city_policy?coordinates=[" + $scope.lnglabeltxt + "," + $scope.latlabeltxt + "]&issue=" + issue,
                            timeout: canactp1.promise
                        }).success(function (msg) {
                            canactp1.resolve();
                            is_anon = msg[0].anonymous;
                            $scope.myText = msg[0].policy_desc;
                        });

                        setTimeout(function () {
                            if (canactp1.promise.$$state.status == 0) {
                                canactp1.resolve('cancelled');
                                alert("Η υπηρεσία δεν ανταποκρίνεται! Παρακαλώ δοκιμάστε αργότερα!");
                            }
                        }, 30000);
                        if (is_anon == "false") {
                            $scope.issubmit_isseu_form = function () {
                                return false;
                            };


                            $scope.iseponymous = function () {
                                return true;
                            };

                            $scope.write_user_data = function () {
                                return true;
                            };

                            $scope.misnotverify = function () {
                                return false;
                            };

                            $scope.eisnotverify = function () {
                                return false;
                            };

//                                $scope.submit_button = false;
//                                $scope.register_button = true;
//                                $scope.verify_button = false;
//                                $scope.submit_eponymous_button = false;
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
                                return false;
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

//                                $scope.submit_button = false;
//                                $scope.register_button = false;
//                                $scope.verify_button = false;
//                                $scope.submit_eponymous_button = true;
                        }
                    });
                    setTimeout(function () {
                        if (canactp.promise.$$state.status == 0) {
                            canactp.resolve('cancelled');
                            alert("Η υπηρεσία δεν ανταποκρίνεται! Παρακαλώ δοκιμάστε αργότερα!");
                        }
                    }, 30000);
                } else if (step == 2) {
                    console.log("Step 2");

                    $scope.eisnotverify = function () {
                        return true;
                    };

                    $scope.misnotverify = function () {
                        return true;
                    };

                    $scope.evalid = null;
                    $scope.mvalid = null;

                    $scope.smsg1 = false;
                    $scope.smsg2 = false;
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
                        $scope.misnotverify = function () {
                            return false;
                        };
                        $scope.eisnotverify = function () {
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
                        $scope.is_finalsubmit = function () {
                            return false;
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
                            return true;
                        };
                        $scope.write_user_data = function () {
                            return true;
                        };

//                        if ($scope.NameTxt == "" || $scope.EmailTxt == "" || $scope.NameTxt == undefined || $scope.EmailTxt == undefined || $scope.NameTxt == null || $scope.EmailTxt == null) {
//
//                            $scope.showSuccessAlertName = true;
//
//
//                            $scope.switchBoolName = function (value) {
//                                $scope[value] = !$scope[value];
//                            };
//
//                            $scope.showSuccessAlertEmail = true;
//                            $scope.switchBoolEmail = function (value) {
//                                $scope[value] = !$scope[value];
//                            };
//
//                            return false;
//                        }


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



                        var txtpost1 = '{ "uuid" : "web-site", "name": "' + $scope.NameTxt + '", "email": "' + $scope.EmailTxt + '", "mobile":"' + $scope.MobileTxt + '"}';

                        var canactu = $q.defer();

                        return $http({
                            method: 'POST',
                            url: $rootScope.Variables.activate_user_URL,
                            timeout: canactu.promise,
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            },
                            data: txtpost1
                        }).success(function (resp) {
                            canactu.resolve();
                            //alert(JSON.stringify(resp));
//                            $scope.myText = resp.policy_description;
//                            if (resp.user_exist == "1") {
//                                $scope.submit_button = false;
//                                $scope.register_button = false;
//                                $scope.verify_button = false;
//                                $scope.submit_eponymous_button = true;
//
//                                $scope.issubmit_isseu_form = function () {
//                                    return false;
//                                };
//                                $scope.iseponymous = function () {
//                                    return false;
//                                };
//                                if(resp.mobileverified == 1){
//                                $scope.misnotverify = function () {
//                                    return true;
//                                };
//                            }else{
//                                $scope.misnotverify = function () {
//                                    return false;
//                                };
//                            }
//                            
//                            if(resp.emailverified == 1){
//                                $scope.eisnotverify = function () {
//                                    return true;
//                                };
//                            }else{
//                                $scope.eisnotverify = function () {
//                                    return false;
//                                };
//                            }
//                                $scope.is_finalsubmit = function () {
//                                    return true;
//                                };
//
//                            } else {
                            //Verify button
//                                user_id = resp._id;
//                                $scope.submit_button = false;
//                                $scope.register_button = false;
//                                $scope.verify_button = true;
//                                $scope.submit_eponymous_button = false;

                            // activate_email":"2569","activate_sms
                            var anon = JSON.stringify(resp[0]);
                            var resp_anon = JSON.parse(anon);
                            if (resp_anon.activate_email != 1) {
                                $scope.eisnotverify = function () {
                                    return true;
                                };
                                $scope.ecert = false;
                                if ($scope.chkSelected_1) {
                                    $scope.evalidation = true;
                                } else {
                                    $scope.evalidation = false;
                                }
                            } else {
                                $scope.eisnotverify = function () {
                                    return false;
                                };
                                $scope.evalidation = false;
                                $scope.evalid = true;
                            }
                            if (resp_anon.activate_sms != 1) {
                                $scope.misnotverify = function () {
                                    return true;
                                };
                                $scope.mcert = false;
                                if ($scope.chkSelected_2) {
                                    $scope.mvalidation = true;
                                } else {
                                    $scope.mvalidation = false;
                                }
                            } else {
                                $scope.misnotverify = function () {
                                    return false;
                                };
                                $scope.mvalidation = false;
                                $scope.mvalid = true;
                            }
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


                            //}

                        });
                        setTimeout(function () {
                            if (canactu.promise.$$state.status == 0) {
                                canactu.resolve('cancelled');
                                alert("Η υπηρεσία δεν ανταποκρίνεται! Παρακαλώ δοκιμάστε αργότερα!");
                            }
                        }, 30000);
                    }
                } else if (step == 3) {
                    console.log("Step 3");
//                    if ($scope.isnotverify()) {
//                        $scope.step1 = function () {
//                            return false;
//                        };
//
//                        $scope.step2 = function () {
//                            return false;
//                        };
//
//                        $scope.step3 = function () {
//                            return false;
//                        };
//
//                        $scope.step4 = function () {
//                            return false;
//                        };
//
//                        var jsonact_Data = '{ "id1" : "' + user_id + '", "id2": "web-site", "id3": "' + $scope.codeTxt + '"}';
//
//                        console.log(jsonact_Data);
//                        var d = $q.defer();
//
//                        $http({
//                            method: 'POST',
//                            url: $rootScope.Variables.activate_user_URL,
//                            headers: {
//                                'Content-Type': 'application/json; charset=utf-8'
//                            },
//                            data: jsonact_Data
//                        }).success(function (resp) {
//
//                            console.log(JSON.stringify(resp));
//
//                            $scope.submit_button = false;
//                            $scope.register_button = false;
//                            $scope.verify_button = false;
//                            $scope.submit_eponymous_button = true;
//
//                            $scope.issubmit_isseu_form = function () {
//                                return false;
//                            };
//                            $scope.iseponymous = function () {
//                                return false;
//                            };
//
//
//                            if (resp._id == undefined) {
//                                $scope.valid = false;
//                                $scope.isnotverify = function () {
//                                    return true;
//                                };
//                            } else {
//                                $scope.valid = true;
//                                $("#next_button").attr("class", "btn btn-default pull-right");
//                            }
//                        });
//                    }

                } else if (step == 4) {
                    console.log("Step 4");

                    $("#finish_button").attr("disabled", "disabled");
                    var canissue = $q.defer();
                    $http(
                            {
                                method: 'POST',
                                url: $rootScope.Variables.APIURL,
                                timeout: canissue.promise,
                                headers: {
                                    'Content-Type': 'application/json; charset=utf-8'
                                },
                                data: $scope.anon_post
                            }).success(function (resp_an) {
                        canissue.resolve();
                        var jsonData = '{ "uuid" : "web-site", "name": "' + $scope.NameTxt + '", "email": "' + $scope.EmailTxt + '", "mobile_num": "' + $scope.MobileTxt + '"}';

                        $scope.smsg1 = false;
                        $scope.smsg2 = false;

                        if ($scope.chkSelected) {
                            var canissueid = $q.defer();
                            return $http({
                                method: 'POST',
                                url: $rootScope.Variables.APIURL + resp_an._id,
                                timeout: canissueid.promise,
                                headers: {
                                    'Content-Type': 'application/json; charset=utf-8'
                                },
                                data: jsonData
                            }).success(function (resp) {
                                canissueid.resolve();
                                $scope.is_finalsubmit = function () {
                                    return true;
                                };

                                $window.location.reload();
                            });
                            setTimeout(function () {
                                if (canissueid.promise.$$state.status == 0) {
                                    canissueid.resolve('cancelled');
                                    alert("Η υπηρεσία δεν ανταποκρίνεται! Παρακαλώ δοκιμάστε αργότερα!");
                                }
                            }, 30000);
                        } else {
                            $window.location.reload();
                        }
                    });
                    setTimeout(function () {
                        if (canissue.promise.$$state.status == 0) {
                            canissue.resolve('cancelled');
                            alert("Η υπηρεσία δεν ανταποκρίνεται! Παρακαλώ δοκιμάστε αργότερα!");
                        }
                    }, 30000);
                }
            };

            $scope.last_step = function (val) {
                if (val) {
                    $scope.is_finalsubmit = function () {
                        return true;
                    };
                } else {
                    $scope.is_finalsubmit = function () {
                        return false;
                    };
                }
                $scope.$apply();
            };

            $scope.activate_email = function () {
                var canemail = $q.defer();
                $http(
                        {
                            method: 'POST',
                            url: $rootScope.Variables.APIADMIN + "/activate_user?uuid=web-site&name=" + $scope.NameTxt + "&email=" + $scope.EmailTxt,
                            timeout: canemail.promise,
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            }
                        }).success(function (resp) {
                    canemail.resolve();
                    $scope.msg1 = "Στο email " + $scope.EmailTxt + " που δηλώσατε σας έχει έρθει ο κωδικός πιστοποίησης! Σε περίπτωση που θέλετε να αλλάξετε το email σας κλείστε το παράθυρο και ξεκινήστε την διαδικασία από την αρχή!";
                    $scope.smsg1 = true;
                });

                setTimeout(function () {
                    if (canemail.promise.$$state.status == 0) {
                        canemail.resolve('cancelled');
                        alert("Η υπηρεσία δεν ανταποκρίνεται! Παρακαλώ δοκιμάστε αργότερα!");
                    }
                }, 30000);
            };

            $scope.activate_mobile = function () {
                var canmobile = $q.defer();
                $http(
                        {
                            method: 'POST',
                            url: $rootScope.Variables.APIADMIN + "/activate_user?uuid=web-site&name=" + $scope.NameTxt + "&mobile=" + $scope.MobileTxt + "&lat=" + $scope.latlabeltxt + "&long=" + $scope.lnglabeltxt + "&city=" + $rootScope.Variables.city_name,
                            timeout: canmobile.promise,
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            }
                        }).success(function (resp) {
                    $scope.msg2 = "Στο κινητό νούμερο " + $scope.MobileTxt + " που δηλώσατε σας έχει έρθει με sms ο κωδικός πιστοποίησης! Σε περίπτωση που θέλετε να αλλάξετε το κινητό νούμερο κλείστε το παράθυρο και ξεκινήστε την διαδικασία από την αρχή!";
                    $scope.smsg2 = true;
                });
                setTimeout(function () {
                    if (canmobile.promise.$$state.status == 0) {
                        canmobile.resolve('cancelled');
                        alert("Η υπηρεσία δεν ανταποκρίνεται! Παρακαλώ δοκιμάστε αργότερα!");
                    }
                }, 30000);
            };

            $scope.validate_email = function () {
                var canvalemail = $q.defer();
                $http(
                        {
                            method: 'POST',
                            url: $rootScope.Variables.APIADMIN + "/activate_email?uuid=web-site&name=" + $scope.NameTxt + "&email=" + $scope.EmailTxt + "&code=" + $scope.ecodeTxt,
                            timeout: canvalemail.promise,
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            }
                        }).success(function (resp) {
                    canvalemail.resolve();
                    if (resp != "") {
                        $scope.ecert = true;
                        $scope.msg1 = "Ο κωδικός πιστοποίησης email που δώσατε είναι σωστός.";
                        $scope.evalid = true;
                        if ($scope.chkSelected_2) {
                            if ($scope.mvalid) {
                                $("#next_button").attr("class", "btn btn-default pull-right");
                            } else {
                                $("#next_button").attr("class", "btn btn-default pull-right disabled");
                            }
                        } else {
                            $("#next_button").attr("class", "btn btn-default pull-right");
                        }
                    } else {
                        $scope.msg1 = "Ο κωδικός πιστοποίησης email που δώσατε είναι λάθος.";
                        $scope.evalid = false;
                    }
                    $scope.smsg1 = true;
                });
                setTimeout(function () {
                    if (canvalemail.promise.$$state.status == 0) {
                        canvalemail.resolve('cancelled');
                        alert("Η υπηρεσία δεν ανταποκρίνεται! Παρακαλώ δοκιμάστε αργότερα!");
                    }
                }, 30000);
            };

            $scope.validate_mobile = function () {
                var canvalmobile = $q.defer();
                $http(
                        {
                            method: 'POST',
                            url: $rootScope.Variables.APIADMIN + "/activate_mobile?uuid=web-site&mobile=" + $scope.MobileTxt + "&code=" + $scope.scodeTxt,
                            timeout: canvalmobile.promise,
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8'
                            }
                        }).success(function (resp) {
                    canvalmobile.resolve();
                    if (resp.nModified == 1) {
                        $scope.mcert = true;
                        $scope.msg2 = "Ο κωδικός πιστοποίησης κινητού που δώσατε είναι σωστός.";
                        $scope.mvalid = true;
                        if ($scope.chkSelected_1) {
                            if ($scope.evalid) {
                                $("#next_button").attr("class", "btn btn-default pull-right");
                            } else {
                                $("#next_button").attr("class", "btn btn-default pull-right disabled");
                            }
                        } else {
                            $("#next_button").attr("class", "btn btn-default pull-right");
                        }
                    } else {
                        $scope.msg2 = "Ο κωδικός πιστοποίησης κινητού που δώσατε είναι λάθος.";
                        $scope.mvalid = false;
                    }
                    $scope.smsg2 = true;
                });
                setTimeout(function () {
                    if (canvalmobile.promise.$$state.status == 0) {
                        canvalmobile.resolve('cancelled');
                        alert("Η υπηρεσία δεν ανταποκρίνεται! Παρακαλώ δοκιμάστε αργότερα!");
                    }
                }, 30000);
            };

            setTimeout(function () {
                if ($(".select").length > 0) {
                    $(".select").selectpicker();

                    $(".select").on("change", function () {
                        if ($(this).val() == "" || null === $(this).val()) {
                            if (!$(this).attr("multiple"))
                                $(this).val("").find("option").removeAttr("selected").prop("selected", false);
                        } else {
                            $(this).find("option[value=" + $(this).val() + "]").attr("selected", true);
                        }
                    });
                }
            }, 200);
            if ($("input.fileinput").length > 0)
                $("input.fileinput").bootstrapFileInput();
            setTimeout(function () {
                $("#btntxt").text($translate.instant('CHOOSE_PHOTO'));
            }, 100);
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