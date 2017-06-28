var appControllers = angular.module('searchapp.controllers', ['ngSanitize', 'pascalprecht.translate']);

function month_gr(month) {
    switch (month) {
        case "January":
            return "Ιανουάριος";
        case "February":
            return "Φεβρουάριος";
        case "March":
            return "Μάρτιος";
        case "April":
            return "Απρίλιος";
        case "May":
            return "Μάιος";
        case "June":
            return "Ιούνιος";
        case "July":
            return "Ιούλιος";
        case "August":
            return "Αύγουστος";
        case "September":
            return "Σεπτέμβριος";
        case "October":
            return "Οκτώβριος";
        case "November":
            return "Νοέμβριος";
        case "December":
            return "Δεκέμβριος";
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
                if (newVal)
                {
                    element.addClass('show');
                    return;
                }
                element.removeClass('show');
            });
        }
    };
});


appControllers.controller('searchIssueController', ['$scope', '$window', '$rootScope', '$q', '$location', 'leafletData', '$resource', '$http', '$translate', '$compile', function ($scope, $window, $rootScope, $q, $location, leafletData, $resource, $http, $translate, $compile) {
        $rootScope.overview_url = $location.path();
        $scope.categories = [{name: "", color: "", total: ""}];
        $scope.changeLanguage = function (langKey) {
            $translate.use(langKey);
            setTimeout(function () {
                $scope.layers.overlays.layer1 = {name: $translate.instant("GARBAGE_ISSUE"), type: 'group', visible: true};
                $scope.layers.overlays.layer2 = {name: $translate.instant("LIGHTNING_ISSUE"), type: 'group', visible: true};
                $scope.layers.overlays.layer3 = {name: $translate.instant("PLUMBING_ISSUE"), type: 'group', visible: true};
                $scope.layers.overlays.layer4 = {name: $translate.instant("PROTECTION_POLICY_ISSUE"), type: 'group', visible: true};
                $scope.layers.overlays.layer5 = {name: $translate.instant("ROAD_ISSUE"), type: 'group', visible: true};
                $scope.layers.overlays.layer6 = {name: $translate.instant("ENVIRONMENT_ISSUE"), type: 'group', visible: true};
                $scope.layers.overlays.layer7 = {name: $translate.instant("GREEN_ISSUE"), type: 'group', visible: true};
                $scope.layers.overlays.layer8 = {name: $translate.instant("MOOD"), type: 'group', visible: true};
                $scope.layers.overlays.layer9 = {name: $translate.instant("SENSORS"), type: 'group', visible: true};
                for (var i = 0; i < $scope.issues.length; i++) {
                    $('#issue' + i).data('content', '<i class=\"' + $scope.issues[i].class + '"\"></i>' + $translate.instant($scope.issues[i].translatev));
                }
                for (var i = 0; i < $scope.categories.length - 1; i++) {
                    $scope.categories[i].name = $translate.instant($rootScope.Variables.categories_issue[i]);
                }
                $scope.categories[$scope.categories.length - 1].name = $translate.instant("TOTAL");
                $scope.$apply();
                $('#confirmed').data('content', "<span style='margin-right:3px' class='glyphicon glyphicon-exclamation-sign'></span>" + $translate.instant('OPEN'));
                $('#inprogress').data('content', "<span style='margin-right:3px' class='glyphicon glyphicon-question-sign'></span>" + $translate.instant('IN_PROGRESS'));
                $('#resolved').data('content', "<span style='margin-right:3px' class='glyphicon glyphicon-ok-sign'></span>" + $translate.instant('RESOLVED'));
                $('#anonymous').data('content', "<span style='margin-right:3px' class='fa fa-user-circle-o'></span>" + $translate.instant('ANONYMOUS'));
                $('#smile').data('content', "<span class='fa fa-smile-o'></span>" + $translate.instant('MOODPOSITIVE'));
                $('#neutral').data('content', "<span class='fa fa-meh-o'></span>" + $translate.instant('MOODNEUTRAL'));
                $('#angry').data('content', "<span class='fa fa-frown-o'></span>" + $translate.instant('MOODNEGATIVE'));
                $('#issues').selectpicker('refresh');
                $('#states').selectpicker('refresh');
                $('#disposal').selectpicker('refresh');
                if ($translate.use() == "el") {
                    $("#reportrange").daterangepicker({
                        ranges: {
                            'Σήμερα': [moment(), moment()],
                            'Χτές': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                            'Τελευταίες 7 Ημέρες': [moment().subtract(6, 'days'), moment()],
                            'Τελευταίες 30 Ημέρες': [moment().subtract(29, 'days'), moment()],
                            'Τελευταίες 3 Ημέρες': [moment().subtract(3, 'days'), moment()],
                            'Τελευταίος Μήνας': [moment().startOf('month'), moment().endOf('month')],
                            'Προηγούμενος Μήνας': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                        },
                        opens: 'left',
                        buttonClasses: ['btn btn-default'],
                        applyClass: 'btn-small btn-primary',
                        cancelClass: 'btn-small',
                        format: 'MM.DD.YYYY',
                        separator: ' μέχρι ',
                        startDate: moment().subtract('days', 3),
                        endDate: moment(),
                        locale: {
                            applyLabel: 'OK',
                            cancelLabel: 'Ακύρωση',
                            fromLabel: 'ΑΠΟ',
                            toLabel: 'ΕΩΣ',
                            weekLabel: 'Ε',
                            customRangeLabel: 'Ημερολόγιο',
                            daysOfWeek: ['ΔΕ', 'ΤΡ', 'ΤΕ', 'ΠΕ', 'ΠΑΡ', 'ΣΑΒ', 'ΚΥΡ'],
                            monthNames: ['ΙΑΝ', 'ΦΕΒ', 'ΜΑΡ', 'ΑΠΡ', 'ΜΑΗΣ', 'ΙΟΥΝ', 'ΙΟΥΛ', 'ΑΥΓ', 'ΣΕΠ', 'ΟΚΤ', 'ΝΟΕ', 'ΔΕΚ'],
                            firstDay: moment.localeData()._week.dow
                        }
                    }, function (start, end) {
                        var sm = month_gr(start.format('MMMM D, YYYY').split(" ")[0]);
                        start = start.format('MMMM D, YYYY');
                        start = start.replace(start.split(" ")[0], sm);
                        var em = month_gr(end.format('MMMM D, YYYY').split(" ")[0]);
                        end = end.format('MMMM D, YYYY');
                        end = end.replace(end.split(" ")[0], em);
                        $('#reportrange span').html(start + ' - ' + end);
                        $(window).trigger("resize");
                    });


                    var start = moment().subtract('days', 3);
                    var end = moment();
                    var sm = month_gr(start.format('MMMM D, YYYY').split(" ")[0]);
                    start = start.format('MMMM D, YYYY');
                    start = start.replace(start.split(" ")[0], sm);
                    var em = month_gr(end.format('MMMM D, YYYY').split(" ")[0]);
                    end = end.format('MMMM D, YYYY');
                    end = end.replace(end.split(" ")[0], em);
                    $('#reportrange span').html(start + ' - ' + end);
                } else {
                    $("#reportrange").daterangepicker({
                        ranges: {
                            'Today': [moment(), moment()],
                            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                            'This Month': [moment().startOf('month'), moment().endOf('month')],
                            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                        },
                        opens: 'left',
                        buttonClasses: ['btn btn-default'],
                        applyClass: 'btn-small btn-primary',
                        cancelClass: 'btn-small',
                        format: 'MM.DD.YYYY',
                        separator: ' to ',
                        startDate: moment().subtract('days', 3),
                        endDate: moment(),
                        locale: {
                            applyLabel: 'Apply',
                            cancelLabel: 'Cancel',
                            fromLabel: 'From',
                            toLabel: 'To',
                            weekLabel: 'W',
                            customRangeLabel: 'Custom Range',
                            daysOfWeek: moment.weekdaysMin(),
                            monthNames: moment.monthsShort(),
                            firstDay: moment.localeData()._week.dow
                        }
                    }, function (start, end) {
                        $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
                    });
                    $("#reportrange span").html(moment().subtract('days', 3).format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
                }
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
        }

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
                overlay_functions1: response.overlay_functions1,
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
                alert("Η υπηρεσία δεν αναταποκρίνεται! Παρακαλώ δοκιμάστε αργότερα!");
            }
        }, 30000);
        var idt = setTimeout(function () {
            for (var i = idt; i > 0; i--)
                clearInterval(i);
        }, 10);
        leafletData.getMap().then(function (map) {
            map.scrollWheelZoom.disable();
        });
        $scope.checkAll = {
            value1: false
        };
        $scope.issue_id = "";
        $scope.criteria_selected = true;
        $scope.state = true;
        $scope.toggleState = function () {
            $scope.state = !$scope.state;
        };
        $scope.invalidateTheMap = function () {

            leafletData.getMap().then(
                    function (map) {
                        map.invalidateSize(true);
                    }
            );
        };
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
                    eval($rootScope.Variables.overlay_functions1.layer1);
                } else if (layer == 2) {
                    eval($rootScope.Variables.overlay_functions1.layer2);
                } else if (layer == 3) {
                    eval($rootScope.Variables.overlay_functions1.layer3);
                } else if (layer == 4) {
                    eval($rootScope.Variables.overlay_functions1.layer4);
                } else if (layer == 5) {
                    eval($rootScope.Variables.overlay_functions1.layer5);
                } else if (layer == 6) {
                    eval($rootScope.Variables.overlay_functions1.layer6);
                } else if (layer == 7) {
                    eval($rootScope.Variables.overlay_functions1.layer7);
                } else if (layer == 8) {
                    eval($rootScope.Variables.overlay_functions1.layer8);
                } else if (layer == 9) {
                    eval($rootScope.Variables.overlay_functions1.layer9);
                } else if (layer == 10) {
                    eval($rootScope.Variables.overlay_functions1.layer10);
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
        $scope.center = {
            lat: 37.787435,
            lng: 20.897801,
            zoom: 12
        };
        $('#issues').on('change', function () {
            setTimeout(function () {
                var wissues = $("button[data-id='issues']").attr("title").replace(/ /g, '').split(",");
                $scope.searchIssue = [];
                for (var i = 0; i < wissues.length; i++) {
                    for (var j = 0; j < $scope.allissues.length; j++) {
                        if (wissues[i] == $scope.allissues[j]) {
                            $scope.searchIssue.push($rootScope.Variables.searchIssues[j].value);
                        }
                        ;
                    }
                }
            }, 100);
        });
        $('#states').on('change', function () {
            setTimeout(function () {
                var wstate = $("button[data-id='states']").attr("title").replace(/ /g, '').split(",");
                $scope.searchState = [];
                for (var i = 0; i < wstate.length; i++) {
                    if (wstate[i] == $translate.instant("OPEN")) {
                        $scope.searchState.push("CONFIRMED");
                    } else if (wstate[i] == $translate.instant("IN_PROGRESS").replace(/ /g, '').split(",")) {
                        $scope.searchState.push("IN_PROGRESS");
                    } else if (wstate[i] == $translate.instant("RESOLVED")) {
                        $scope.searchState.push("RESOLVED");
                    } else if (wstate[i] == $translate.instant("ANONYMOUS")) {
                        $scope.searchState.push("Anonymous");
                    } else {
                        $scope.searchState.push("Καταστάσεις");
                    }
                }
            }, 100);
        });
        $('#disposal').on('change', function () {
            setTimeout(function () {
                var wdisposal = $("button[data-id='disposal']").attr("title").replace(/ /g, '').split(",");
                $scope.searchFeeling = [];
                for (var i = 0; i < wdisposal.length; i++) {
                    if (wdisposal[i] == $translate.instant("MOODPOSITIVE")) {
                        $scope.searchFeeling.push("happy");
                    } else if (wdisposal[i] == $translate.instant("MOODNEUTRAL")) {
                        $scope.searchFeeling.push("neutral");
                    } else if (wdisposal[i] == $translate.instant("MOODNEGATIVE")) {
                        $scope.searchFeeling.push("angry");
                    } else {
                        $scope.searchFeeling.push("Διάθεση πολιτών");
                    }
                }
            }, 100);
        });

        $q.all([$rootScope.mainInfo]).then(
                function (data) {
                    $scope.issues = [];
                    for (var i = 0; i < $rootScope.Variables.categories_issue.length - 1; i++) {
                        var cat_info = {name: "", color: "", total: ""};
                        cat_info.name = $translate.instant($rootScope.Variables.categories_issue[i]);
                        cat_info.color = "badge badge-info";
                        cat_info.total = 0;
                        $scope.categories.push(cat_info);
                    }

                    $scope.categories[$rootScope.Variables.categories_issue.length - 1].name = $translate.instant("TOTAL");
                    $scope.categories[$rootScope.Variables.categories_issue.length - 1].color = "badge badge-primary";
                    $scope.categories[$rootScope.Variables.categories_issue.length - 1].total = 0;
                    $scope.categories.shift();
                    angular.copy($rootScope.Variables.searchIssues, $scope.issues);
                    for (var k = 0; k < $scope.issues.length; k++) {
                        $scope.issues[k].checked = true;
                    }
                    $scope.allissues = [];
                    for (var i = 0; i < $rootScope.Variables.searchIssues.length; i++) {
                        $scope.allissues.push($scope.$eval($rootScope.Variables.searchIssues[i].translate).replace(/ /g, ''));
                    }
                    for (i = 0; i < $scope.issues.length; i++) {
                        $scope.issues[i].translate = "'<i class=\"" + $scope.issues[i].class + "\"></i>'+(" + $scope.issues[i].translate + ");";
                        $scope.issues[i].translatev = $rootScope.Variables.searchIssues[i].translatev;
                    }
                    setTimeout(function () {
                        if ($(".select").length > 0) {
                            $(".select").selectpicker();
                            var query = window.location.toString().split('=')[1];
                            for (var i = 0; i <= $(".select").length; i++) {
                                $("#issue" + i).attr("selected", "selected");
                            }
                            $('#issues').selectpicker('refresh');
                            if (query == 4) {
                                $("#resolved").attr("selected", "selected");
                            } else {
                                $("#confirmed").attr("selected", "selected");
                                $("#inprogress").attr("selected", "selected");
                                if (query == 3) {
                                    $("#resolved").attr("selected", "selected");
                                }
                            }
                            $('#states').selectpicker('refresh');
                            $('#states').trigger('change');
                            if (query == 2) {
                                $("#smile").attr("selected", "selected");
                                $("#neutral").attr("selected", "selected");
                                $("#angry").attr("selected", "selected");
                                $('#disposal').selectpicker('refresh');
                                $('#disposal').trigger('change');
                            }
                            $(".select").on("change", function () {
                                if ($(this).val() == "" || null === $(this).val()) {
                                    if (!$(this).attr("multiple"))
                                        $(this).val("").find("option").removeAttr("selected").prop("selected", false);
                                } else {
                                    $(this).find("option[value=" + $(this).val() + "]").attr("selected", true);
                                }
                            });

                            if (query == 1 || query == 2 || query == 3 || query == 4) {
                                setTimeout(function () {
                                    $scope.submit();
                                }, 100);
                            }
                        }
                    }, 1);
                    for (var i = Object.keys($rootScope.Variables.overlay_functions1).length + 1; i <= 10; i++) {
                        $scope.removelayer(i);
                    }

                    for (var i = 1; i <= Object.keys($rootScope.Variables.overlay_functions1).length; i++) {
                        $scope.addlayer(i);
                    }

                    var icons = $rootScope.Variables.icons;
                    $scope.center = {
                        lat: $rootScope.Variables.lat_center,
                        lng: $rootScope.Variables.long_center,
                        zoom: 12
                    };
                    var counter = 0;
                    var counter1 = 0;
//                    $scope.check_criteria = function($event){
//                        $scope.searchIssue = "";
//                        $scope.searchState = "";
//                        $scope.searchFeeling = "";
//                      if($scope.checkAll.value1 == true){
//                          for (k = 0; k < $scope.issues.length; k++) {
//                             $scope.issues[k].checked = true; 
//                          }
//                          $(".ng-not-empty").click();
//                          $("label:has(.btn.btn-default)").attr("ng-model","btn btn-default active");
//                          $scope.criteria_selected = false;
//                      }else{
//                          for (k = 0; k < $scope.issues.length; k++) {
//                             $scope.issues[k].checked = false; 
//                          }
//                          $scope.searchIssue = "";
//                        $scope.searchState = "";
//                        $scope.searchFeeling = "";
//                        $("label:has(.btn.btn-default)").attr("class","btn btn-default");
//                        $('input:checkbox').not($event.currentTarget).attr("class","btn btn-default ng-valid ng-dirty ng-valid-parse ng-touched ng-empty");
//                        $('input:checkbox').not($event.currentTarget).click();   
//                        $scope.criteria_selected = true;
//                      }  
//                    };

                    $scope.activate_text = function () {
                        var state_active = true;
                        var feelings_active = true;
                        if ($scope.issue_id != "") {
                            $scope.criteria_selected = false;
                            return;
                        }
                        angular.forEach($scope.searchState, function (value, key) {
                            if (value == true) {
                                state_active = false;
                                $scope.criteria_selected = false;
                                return;
                            }
                        });
                        if (state_active == false) {
                            return;
                        }
                        angular.forEach($scope.searchFeeling, function (value, key) {
                            if (value == true) {
                                feelings_active = false;
                                $scope.criteria_selected = false;
                                return;
                            }
                        });
                        if (feelings_active == false) {
                            return;
                        }
                        var active = true;
                        for (var k = 0; k < $scope.issues.length; k++) {
                            if ($scope.issues[k].checked == true) {
                                active = false;
                                $scope.criteria_selected = active;
                                break;
                            }
                        }
                        if (active == true) {
                            $scope.criteria_selected = true;
                        }
                    };
                    $scope.activate_searchb = function () {
                        counter1++;
                        if (counter1 == 2) {
                            counter1 = 0;
                            var state_active = true;
                            var feelings_active = true;
                            if ($scope.issue_id != "") {
                                $scope.criteria_selected = false;
                                return;
                            }
                            angular.forEach($scope.searchState, function (value, key) {
                                if (value == true) {
                                    state_active = false;
                                    $scope.criteria_selected = false;
                                    return;
                                }
                            });
                            if (state_active == false) {
                                return;
                            }
                            angular.forEach($scope.searchFeeling, function (value, key) {
                                if (value == true) {
                                    feelings_active = false;
                                    $scope.criteria_selected = false;
                                    return;
                                }
                            });
                            if (feelings_active == false) {
                                return;
                            }
                            var active = true;
                            for (var k = 0; k < $scope.issues.length; k++) {
                                if ($scope.issues[k].checked == true) {
                                    active = false;
                                    $scope.criteria_selected = active;
                                    break;
                                }
                            }
                            if (active == true) {
                                $scope.criteria_selected = true;
                            }
                        }
                    };
                    $scope.checked_issue = function (index) {
                        counter++;
                        if (counter == 2) {
                            counter = 0;
                            $scope.issues[index].checked = !$scope.issues[index].checked;
                            var state_active = true;
                            var feelings_active = true;
                            if ($scope.issue_id != "") {
                                $scope.criteria_selected = false;
                                return;
                            }
                            angular.forEach($scope.searchState, function (value, key) {
                                if (value == true) {
                                    state_active = false;
                                    $scope.criteria_selected = false;
                                    return;
                                }
                            });
                            if (state_active == false) {
                                return;
                            }
                            angular.forEach($scope.searchFeeling, function (value, key) {
                                if (value == true) {
                                    feelings_active = false;
                                    $scope.criteria_selected = false;
                                    return;
                                }
                            });
                            if (feelings_active == false) {
                                return;
                            }
                            var active = true;
                            for (var k = 0; k < $scope.issues.length; k++) {
                                if ($scope.issues[k].checked == true) {
                                    active = false;
                                    $scope.criteria_selected = active;
                                    break;
                                }
                            }
                            if (active == true) {
                                $scope.criteria_selected = true;
                            }
                        }
                    };
                    var startdate = new Date();
                    startdate.setDate(startdate.getDate() - 30);
                    $scope.startISOdate = startdate;
                    $scope.endISOdate = new Date();
//need to refresh the map layer after everything is rendered, otherwise it displays empty tiles

                    $scope.$on("leafletDirectiveMarker.click", function (event, args) {
                        var marker3 = args.leafletObject;
                        var popup = marker3.getPopup();
                        var issue_name;
                        var issue_image;

                        var canfi = $q.defer();
                        var rcanfi = $resource($rootScope.Variables.APIADMIN + '/fullissue/:issueID',
                                {issueID: '@id'}, {'query': {method: 'GET', isArray: true, cancellable: true}}
                        ).query({issueID: marker3.options.issue_id}, function (resp) {
                            canfi.resolve();
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
                            if (canfi.promise.$$state.status == 0) {
                                rcanfi.$cancelRequest();
                                $scope.$apply();
                                alert("Η υπηρεσία δεν αναταποκρίνεται! Παρακαλώ δοκιμάστε αργότερα!");
                            }
                        }, 30000);
                    });
                    function maptonum(month) {
                        switch (month) {
                            case $translate.instant("JANUARY"):
                                return "01";
                            case $translate.instant("FEBRUARY"):
                                return "02";
                            case $translate.instant("MARCH"):
                                return "03";
                            case $translate.instant("APRIL"):
                                return "04";
                            case $translate.instant("MAY"):
                                return "05";
                            case $translate.instant("JUNE"):
                                return "06";
                            case $translate.instant("JULY"):
                                return "07";
                            case $translate.instant("AUGUST"):
                                return "08";
                            case $translate.instant("SEPTEMBER"):
                                return "09";
                            case $translate.instant("OCTOBER"):
                                return "10";
                            case $translate.instant("NOVEMBER"):
                                return "11";
                            case $translate.instant("DECEMBER"):
                                return "12";
                        }
                    }

                    $scope.submit = function () {
                        var date = $("#sdate").text();
                        if (date != "Διάστημα Αναζήτ.") {
                            var sdate = date.split("-")[0];
                            var edate = date.split("-")[1];
                            var csdate = sdate.split(" ");
                            var cedate = edate.split(" ");
                            $scope.markers = [];
                            $scope.startdate = csdate[2] + '-' + maptonum(csdate[0]) + '-' + ('0' + csdate[1].split(",")[0]).slice(-2);
                            $scope.enddate = cedate[3] + '-' + maptonum(cedate[1]) + '-' + ('0' + cedate[2].split(",")[0]).slice(-2);
                        }
                        var paramsObj = [];
                        var feelingsObj;
                        var states = "";
                        var feelings = "";
                        var includeAnonymous = 0;
                        var i = 0;
                        if ($scope.issue_id != "") {
                            var obj = {city: $rootScope.Variables.city_name, bug_id: $scope.issue_id};
                            var canissue = $q.defer();
                            var rcanissue = $resource($rootScope.Variables.APIURL,
                                    {}, {
                                update: {
                                    method: 'GET',
                                    cancellable: true
                                }
                            }).query(obj, function (result) {
                                canissue.resolve();
                                $scope.markers = [];
                                var issueid = result[0]._id;
                                var issuelink = "http://" + $rootScope.Variables.city_name + ".sense.city/scissuemap.html?issue=" + issueid;
                                var positionlat = result[0].loc.coordinates[1];
                                var positionlon = result[0].loc.coordinates[0];
                                var issue = result[0].issue;
                                var layer = issue;
                                var message = '';
                                if (result[0].value_desc) {
                                    message = result.value_desc;
                                } else {
                                    message = 'Μη διαθέσιμη περιγραφή';
                                }
                                var marker;
                                if (layer != 'reaction') {
                                    var lindex = $rootScope.Variables.overlay_categories.indexOf(issue) + 1;
                                } else {
                                    var lindex = $rootScope.Variables.overlay_categories.indexOf('reaction') + 1;
                                }
                                layer = "layer" + lindex;
                                if (issue == "angry" || issue == "neutral" || issue == "happy") {
                                    marker = {"layer": "" + layer + "", "lat": +positionlat, "lng": +positionlon, "icon": icons[issue], "issue_id": issueid, "message": "" + message + "<br>"};
                                } else {
                                    marker = {"layer": "" + layer + "", "lat": +positionlat, "lng": +positionlon, "icon": icons[issue], "issue_id": issueid, "message": "" + message + "<br><a href=" + issuelink + ">Δες με!</a>"};
                                }
                                if (layer != 'layer' + lindex) {
                                    marker.message = "Loading...";
                                }
                                $scope.markers.push(marker);
                            });
                            setTimeout(function () {
                                if (canissue.promise.$$state.status == 0) {
                                    rcanissue.$cancelRequest();
                                    $scope.$apply();
                                    alert("Η υπηρεσία δεν αναταποκρίνεται! Παρακαλώ δοκιμάστε αργότερα!");
                                }
                            }, 30000);
                        } else {
                            i = 0;
                            angular.forEach($scope.searchState, function (state) {
                                if (state != "Anonymous") {
                                    if (state != "Καταστάσεις") {
                                        if (i == 0) {
                                            states += state;
                                            i++;
                                        } else {
                                            states += " |" + state;
                                        }
                                    }
                                } else {
                                    includeAnonymous = 1;
                                }
                            });
                            var issue_counter = 0;
                            angular.forEach($scope.searchIssue, function (issue) {
                                if (issue == "roadconstructor") {
                                    issue = "road-constructor";
                                }
                                if (issue == "protectionpolicy") {
                                    issue = "protection-policy";
                                }
                                paramsObj.push({city: $rootScope.Variables.city_name, startdate: $scope.startdate, enddate: $scope.enddate, issue: issue, image_field: 0, status: states, resolution: "FIXED", includeAnonymous: includeAnonymous});
                            });
                            if ($scope.searchIssue == "" || $scope.searchIssue == undefined) {
                                paramsObj.push({city: $rootScope.Variables.city_name, startdate: $scope.startdate, enddate: $scope.enddate, image_field: 0, status: states, resolution: "FIXED", includeAnonymous: includeAnonymous});
                            }
                            i = 0;
                            angular.forEach($scope.searchFeeling, function (feeling) {
                                if (feeling != "Διάθεση πολιτών") {
                                    if (i == 0) {
                                        feelings += feeling;
                                        i++;
                                    } else {
                                        feelings += "|" + feeling;
                                    }
                                }
                            });
                            if (paramsObj.length == 0) {
                                if (states != "") {
                                    paramsObj.push({city: $rootScope.Variables.city_name, startdate: $scope.startdate, enddate: $scope.enddate, image_field: 0, status: states, resolution: "FIXED", includeAnonymous: includeAnonymous});
                                }
                            }

                            var promisesArray = [];
                            if (feelings != "") {
                                feelingsObj = {startdate: $scope.startdate, enddate: $scope.enddate, city: $rootScope.Variables.city_name, feeling: feelings};
                                promisesArray.push(feelingsQuery(feelingsObj));
                            }
                            for (var index = 0; index < paramsObj.length; index++) {
                                if ((paramsObj[index].status != "" && paramsObj[index].status != undefined) || (paramsObj[index].issue != "" && paramsObj[index].issue != undefined) || paramsObj[index].includeAnonymous == 1)
                                    promisesArray.push(doQuery(paramsObj[index]));
                            }

                            $q.all(promisesArray).then(function (data) {
                                var searchissues = [];
                                for (i = 0; i < data.length; i++) {
                                    for (j = 0; j < data[i].length; j++) {
                                        searchissues.push(data[i][j]);
                                    }
                                }

                                $scope.markers = [];
                                var total_problems = [];
                                for (var k = 0; k <= $rootScope.Variables.overlay_categories.length; k++) {
                                    total_problems[k] = 0;
                                }
                                angular.forEach(searchissues, function (value, key) {
                                    var issueid = value._id;
                                    var issuelink = "http://" + $rootScope.Variables.city_name + ".sense.city/scissuemap.html?issue=" + issueid;
                                    var positionlat = value.loc.coordinates[1];
                                    var positionlon = value.loc.coordinates[0];
                                    var issue = value.issue;
                                    var layer = '';
                                    if (issue == "angry" || issue == "neutral" || issue == "happy") {
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
                                    var marker;
                                    if (layer != 'reaction') {
                                        var lindex = $rootScope.Variables.overlay_categories.indexOf(issue) + 1;
                                    } else {
                                        var lindex = $rootScope.Variables.overlay_categories.indexOf('reaction') + 1;
                                    }
                                    total_problems[$rootScope.Variables.overlay_categories.length]++;
                                    total_problems[lindex - 1]++;
                                    layer = "layer" + lindex;
                                    if (issue == "angry" || issue == "neutral" || issue == "happy") {
                                        marker = {"layer": "" + layer + "", "lat": +positionlat, "lng": +positionlon, "icon": icons[issue], "issue_id": issueid, "message": "" + message + "<br>"};
                                    } else {
                                        marker = {"layer": "" + layer + "", "lat": +positionlat, "lng": +positionlon, "icon": icons[issue], "issue_id": issueid, "message": "" + message + "<br><a href=" + issuelink + ">Δες με!</a>"};
                                    }
                                    if (layer != 'layer' + lindex) {
                                        marker.message = "Loading...";
                                    }
                                    this.push(marker);
                                }, $scope.markers);
                                for (var k = 0; k < $scope.categories.length; k++) {
                                    $scope.categories[k].total = total_problems[k];
                                }
                            });
                        }
                    };
                    $scope.reset = function () {
                        var startdate = new Date();
                        startdate.setDate(startdate.getDate() - 30);
                        $scope.startISOdate = startdate;
                        $scope.endISOdate = new Date();
                        $scope.searchIssue = "";
                        $scope.searchState = "";
                        $scope.searchFeeling = "";
                        $scope.issue_id = "";
                        $scope.markers = [];
                        for (var k = 0; k < $scope.issues.length; k++) {
                            $scope.issues[k].checked = true;
                        }
                        $scope.criteria_selected = true;
                        $scope.center = {
                            lat: $rootScope.Variables.lat_center,
                            lng: $rootScope.Variables.long_center,
                            zoom: $rootScope.Variables.map_zoom
                        };
                    };
                    function doQuery(obj) {
                        var d = $q.defer();
                        var rd = $resource($rootScope.Variables.APIURL,
                                {}, {
                            update: {
                                method: 'GET',
                                isArray: true,
                                cancellable: true
                            }
                        }).update(obj, function (result) {
                            d.resolve(result);
                        });
                        setTimeout(function () {
                            if (d.promise.$$state.status == 0) {
                                rd.$cancelRequest();
                                $scope.$apply();
                                alert("Η υπηρεσία δεν αναταποκρίνεται! Παρακαλώ δοκιμάστε αργότερα!");
                            }
                        }, 30000);
                        return d.promise;
                    }

                    function feelingsQuery(obj) {
                        var d = $q.defer();
                        var rd = $resource($rootScope.Variables.feelingsURL,
                                {}, {
                            update: {
                                method: 'GET',
                                isArray: true,
                                cancellable: true
                            }
                        }).update(obj, function (result) {
                            d.resolve(result);
                        });
                        setTimeout(function () {
                            if (d.promise.$$state.status == 0) {
                                rd.$cancelRequest();
                                $scope.$apply();
                                alert("Η υπηρεσία δεν αναταποκρίνεται! Παρακαλώ δοκιμάστε αργότερα!");
                            }
                        }, 30000);
                        return d.promise;
                    }
                    $(window).trigger("resize");
                    setTimeout(function () {
                        if ($translate.use() == "el") {
                            var query = window.location.toString().split('=')[1];
                            var strdate;
                            if (query == 1 || query == 2) {
                                strdate = moment().subtract('days', 7);
                            } else if (query == 3 || query == 4) {
                                strdate = moment().startOf('year');
                            }
                            $("#reportrange").daterangepicker({
                                ranges: {
                                    'Σήμερα': [moment(), moment()],
                                    'Χτές': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                                    'Τελευταίες 7 Ημέρες': [moment().subtract(6, 'days'), moment()],
                                    'Τελευταίες 30 Ημέρες': [moment().subtract(29, 'days'), moment()],
                                    'Τελευταίες 3 Ημέρες': [moment().subtract(3, 'days'), moment()],
                                    'Τελευταίος Μήνας': [moment().startOf('month'), moment().endOf('month')],
                                    'Προηγούμενος Μήνας': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                                },
                                opens: 'left',
                                buttonClasses: ['btn btn-default'],
                                applyClass: 'btn-small btn-primary',
                                cancelClass: 'btn-small',
                                format: 'MM.DD.YYYY',
                                separator: ' μέχρι ',
                                startDate: strdate,
                                endDate: moment(),
                                locale: {
                                    applyLabel: 'OK',
                                    cancelLabel: 'Ακύρωση',
                                    fromLabel: 'ΑΠΟ',
                                    toLabel: 'ΕΩΣ',
                                    weekLabel: 'Ε',
                                    customRangeLabel: 'Ημερολόγιο',
                                    daysOfWeek: ['ΔΕ', 'ΤΡ', 'ΤΕ', 'ΠΕ', 'ΠΑΡ', 'ΣΑΒ', 'ΚΥΡ'],
                                    monthNames: ['ΙΑΝ', 'ΦΕΒ', 'ΜΑΡ', 'ΑΠΡ', 'ΜΑΗΣ', 'ΙΟΥΝ', 'ΙΟΥΛ', 'ΑΥΓ', 'ΣΕΠ', 'ΟΚΤ', 'ΝΟΕ', 'ΔΕΚ'],
                                    firstDay: moment.localeData()._week.dow
                                }
                            }, function (start, end) {
                                var sm = month_gr(start.format('MMMM D, YYYY').split(" ")[0]);
                                start = start.format('MMMM D, YYYY');
                                start = start.replace(start.split(" ")[0], sm);
                                var em = month_gr(end.format('MMMM D, YYYY').split(" ")[0]);
                                end = end.format('MMMM D, YYYY');
                                end = end.replace(end.split(" ")[0], em);
                                $('#reportrange span').html(start + ' - ' + end);
                                $(window).trigger("resize");
                            });


                            var start = strdate;
                            var end = moment();
                            var sm = month_gr(start.format('MMMM D, YYYY').split(" ")[0]);
                            start = start.format('MMMM D, YYYY');
                            start = start.replace(start.split(" ")[0], sm);
                            var em = month_gr(end.format('MMMM D, YYYY').split(" ")[0]);
                            end = end.format('MMMM D, YYYY');
                            end = end.replace(end.split(" ")[0], em);
                            $('#reportrange span').html(start + ' - ' + end);
                        } else {
                            $("#reportrange").daterangepicker({
                                ranges: {
                                    'Today': [moment(), moment()],
                                    'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                                    'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                                    'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                                    'This Month': [moment().startOf('month'), moment().endOf('month')],
                                    'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                                },
                                opens: 'left',
                                buttonClasses: ['btn btn-default'],
                                applyClass: 'btn-small btn-primary',
                                cancelClass: 'btn-small',
                                format: 'MM.DD.YYYY',
                                separator: ' to ',
                                startDate: moment().subtract('days', 3),
                                endDate: moment(),
                                locale: {
                                    applyLabel: 'Apply',
                                    cancelLabel: 'Cancel',
                                    fromLabel: 'From',
                                    toLabel: 'To',
                                    weekLabel: 'W',
                                    customRangeLabel: 'Custom Range',
                                    daysOfWeek: moment.weekdaysMin(),
                                    monthNames: moment.monthsShort(),
                                    firstDay: moment.localeData()._week.dow
                                }
                            }, function (start, end) {
                                $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
                            });
                            $("#reportrange span").html(moment().subtract('days', 3).format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
                        }
                    }, 100);
                });
    }]);