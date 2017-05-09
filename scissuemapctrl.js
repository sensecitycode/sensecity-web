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
        

    }]);

appControllers.controller('scissuemapctrl', ['$scope', '$rootScope', '$location', '$window', '$resource', '$http','$q','$translate' ,'ToGrService', 'config', 'leafletData',
    function ($scope, $rootScope, $location, $window, $resource, $http, $q,$translate,ToGrService, config, leafletData) {
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
        var issue_index;
        $scope.smsg1 = false;
        $scope.smsg2 = false;
        $scope.chkSelected_1 = false;
        $scope.chkSelected_2 = false;
        $scope.chkSelected = false;
        $scope.ecert = false;
        $scope.mcert = false;
        var ecft = 1;
        var mcft = 1;
        
        $scope.changeLanguage = function (langKey) {
            $translate.use(langKey);
            setTimeout(function(){
               $scope.issue_name_new = $translate.instant("ISSUE")+" "+$translate.instant($rootScope.Variables.categories_issue[issue_index]); 
               $scope.$apply();
               for(var i = 0 ; i < $scope.comments.length;i++){
                   $scope.comments[i].component = $translate.instant($rootScope.Variables.components_translation[$scope.comments[i].dindex]);
                   switch ($scope.comments[i].month_num) {
                    case "01":
                        $scope.comments[i].month = $translate.instant("JAN");
                        break;
                    case "02":
                        $scope.comments[i].month = $translate.instant("FEB");
                        break;
                    case "03":
                        $scope.comments[i].month = $translate.instant("MAR");
                        break;
                    case "04":
                        $scope.comments[i].month = $translate.instant("APR");
                        break;
                    case "05":
                        $scope.comments[i].month = $translate.instant("MAY");
                        break;
                    case "06":
                        $scope.comments[i].month = $translate.instant("JUNE");
                        break;
                    case "07":
                        $scope.comments[i].month = $translate.instant("JUL");
                        break;
                    case "08":
                        $scope.comments[i].month = $translate.instant("AUG");
                        break;
                    case "09":
                        $scope.comments[i].month = $translate.instant("SEPT");
                        break;
                    case "10":
                        $scope.comments[i].month = $translate.instant("OCT");
                        break;
                    case "11":
                        $scope.comments[i].month = $translate.instant("NOV");
                        break;
                    case "12":
                        $scope.comments[i].month = $translate.instant("DEC");
                        break;
                }
               }
               $scope.$apply();
            },100);
        };
        
        $scope.setStep = function (step) {

                if (step == 1) {
                        
                        $scope.eisnotverify = function () {
                                    return true;
                                };
                                
                        $scope.misnotverify = function () {
                                    return true;
                                };
                        
                        $scope.smsg1 = false;
                        $scope.smsg2 = false;
                        
                        $scope.evalid = null;
                        $scope.mvalid = null;
                        
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
                                                
                        var canactu = $q.deffer();
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
                } else if (step == 3) {
                    var canissue = $q.deffer();
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
                            var canissueid = $q.deffer();
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
                var canemail = $q.deffer();
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
                var canmobile = $q.deffer();
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
                var canvalemail = $q.deffer();
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
                var canvalmobile = $q.deffer();
                $http(
                        {
                            method: 'POST',
                            url: $rootScope.Variables.APIADMIN + "/activate_mobile?uuid=web-site&mobile=" + $scope.MobileTxt + "&code=" + $scope.scodeTxt,
                            timeout :canvalmobile.promise,
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
        
        var p = $q.defer();
        $rootScope.mainInfo = $http.get(url,{timeout: p.promise}).success(function (response) {
            
            p.resolve();
            
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
                components_translation: response.components_translation,
                overlay_functions : response.overlay_functions,
                overlay_categories : response.overlay_categories,
                google_init_coords: response.google_init_coords,
                google_buildings: response.google_buildings,
                host: response.host
            };
            
            $scope.smsg1 = false;
                    $scope.smsg2 = false;
                        $scope.is_finalsubmit = function () {
                            return false;
                        };
                        
                        var canactp = $q.defer();
                        $http({
                        method: "POST",
                        url: $rootScope.Variables.APIADMIN + "/activate_city_policy?lat=" + $rootScope.Variables.lat_center + "&long=" + $rootScope.Variables.long_center,
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
                        setTimeout(function () {
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
                    }, 500);
                    }
                    });
                    
                    setTimeout(function () {
            if (canactp.promise.$$state.status == 0) {
                canactp.resolve('cancelled');
                alert("Η υπηρεσία δεν ανταποκρίνεται! Παρακαλώ δοκιμάστε αργότερα!");
            }
        }, 30000);

            

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
                
                var month_num = month;
                
                switch (month) {
                    case "01":
                        month = $translate.instant("JAN");
                        break;
                    case "02":
                        month = $translate.instant("FEB");
                        break;
                    case "03":
                        month = $translate.instant("MAR");
                        break;
                    case "04":
                        month = $translate.instant("APR");
                        break;
                    case "05":
                        month = $translate.instant("MAY");
                        break;
                    case "06":
                        month = $translate.instant("JUNE");
                        break;
                    case "07":
                        month = $translate.instant("JUL");
                        break;
                    case "08":
                        month = $translate.instant("AUG");
                        break;
                    case "09":
                        month = $translate.instant("SEPT");
                        break;
                    case "10":
                        month = $translate.instant("OCT");
                        break;
                    case "11":
                        month = $translate.instant("NOV");
                        break;
                    case "12":
                        month = $translate.instant("DEC");
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
                
                var dindex = $rootScope.Variables.components.indexOf(response[1].bugs[$scope.resp_id].comments[i].tags[dep_pos]);

                var com = {
                    "content": response[1].bugs[$scope.resp_id].comments[i].text,
                    "type": type,
                    "day": day,
                    "month": month,
                    "month_num": month_num,
                    "year": year,
                    "time": time,
                    "color": color,
                    "component": $translate.instant($rootScope.Variables.components_translation[dindex]),
                    "dindex": dindex,
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
        var canfi = $q.defer();
        var rcanfi = $resource($rootScope.Variables.APIADMIN + '/fullissue/:issueID',
            {issueID: '@id'}, {'query': {method: 'GET', isArray: true,cancellable:true}}
    ).query({issueID: issue_id}, function (issue) {
        canfi.resolve();
        $scope.bug_id = issue[0].bug_id;
        $scope.bug_address = issue[0].bug_address;
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

            issue_index = $rootScope.Variables.categories.indexOf(issue[0].issue);
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
                
                var canfi1 = $q.defer();
                var rcanfi1 = $resource($rootScope.Variables.host+'/fix_point/:long/:lat/50/data',
                {
					long:'@long',
					lat:'@lat',
					type:"@type"
				},{'query': {method: 'GET', isArray: true,cancellable:true}}
			).query({long: issue[0].loc.coordinates[0], lat: issue[0].loc.coordinates[1], type: type}, function (fix_points) {
                    angular.forEach(fix_points, function (value, key) {
                        canfi1.resolve();
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
                setTimeout(function () {
                            if (canfi1.promise.$$state.status == 0) {
                                rcanfi1.$cancelRequest();
                                $scope.$apply();
                                alert("Η υπηρεσία δεν αναταποκρίνεται! Παρακαλώ δοκιμάστε αργότερα!");
                            }
                        }, 30000);
            }

            var issue_name_new;

            if (issue_index != -1) {
                    issue_name_new = $translate.instant("ISSUE")+" "+$translate.instant($rootScope.Variables.categories_issue[issue_index]);
            }

            $scope.issue_name_new = issue_name_new;
            $scope.issue_value_desc = issue[0].value_desc;
            var webService = new google.maps.StreetViewService();
            webService.getPanoramaByLocation({lat: issue[0].loc.coordinates[1], lng: issue[0].loc.coordinates[0]}, 200, checkNearestStreetView);

            leafletData.getMap().then(function (map) {
                map.invalidateSize(true);
            });
            
            setTimeout(function(){timeline(issue)},1);
            $(window).trigger("resize");
        });
        setTimeout(function () {
                            if (canfi.promise.$$state.status == 0) {
                                rcanfi.$cancelRequest();
                                $scope.$apply();
                                alert("Η υπηρεσία δεν αναταποκρίνεται! Παρακαλώ δοκιμάστε αργότερα!");
                            }
                        }, 30000);
        });
        setTimeout(function () {
            if (p.promise.$$state.status == 0) {
                p.resolve('cancelled');
                alert("Η υπηρεσία δεν ανταποκρίνεται! Παρακαλώ δοκιμάστε αργότερα!");
            }
        }, 30000);
    }]);