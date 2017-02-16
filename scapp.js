var app = angular.module('scApp', ['mgcrea.ngStrap', 'scapp.controllers', 'scissuemapapp.scissuemapctrl', 'scwebsubmit.controllers', 'sense.controllers',
    'searchapp.controllers', 'scapp.services','overviewapp.controllers',
    'ngResource', 'ngRoute', 'ui-leaflet', 'angular-loading-bar',
    'ngAnimate', 'pascalprecht.translate', 'ngCookies', 'countTo']);

app.config(function ($routeProvider, $locationProvider, $anchorScrollProvider,
        cfpLoadingBarProvider) {

    $anchorScrollProvider.disableAutoScrolling();
    
    $locationProvider.hashPrefix('!');
    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.includeBar = true;

    $routeProvider.when('/overview', {
        templateUrl: 'scmapcontent.html',
        controller: 'mainOverviewController'
    }).when('/web_report', {
        templateUrl: 'scwebsubmit.html',
        controller: 'scWebSubmit'
    }).when('/search', {
        templateUrl: 'scsearchissues.html',
        controller: 'searchIssueController'
    }).when('/all_issues', {
        templateUrl: 'all_issues.html',
        controller: 'allissuesCtrl'
    }).when('/scissuemap=:issue_id', {
        templateUrl: 'scissuemap.html',
        controller: 'scissuemapctrl'
    }).when('/', {
        templateUrl: 'sense.html',
        controller: 'senseController'
    }).otherwise({
        redirectTo: '/'
    });

});

app.controller('NavCtrl', ['$scope', '$location', '$rootScope', '$translate', function ($scope, $location, $rootScope, $translate) {

        //$scope.user = $rootScope.fstoreuser;

        $scope.navClass = function (page) {
            var currentRoute = $location.path().substring(1) || 'home';
            return page === currentRoute ? 'active' : '';
        };


        $scope.changeLanguage = function (langKey) {
            $translate.use(langKey);
        };

    }]);



app.config(['$translateProvider', function ($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'config/lang_',
            suffix: '.json'
        });

        $translateProvider.preferredLanguage('el');
        $translateProvider.useLocalStorage();
    }]);

app.run(['$rootScope', '$http','$location','$q','$window', function ($rootScope, $http,$location,$q,$window) {
        
        var url_path = $location.absUrl().split("//");
        var sub_domain = url_path[1].split(".");
        var url;

        if( sub_domain[0].split(":").length > 1){
            url = "./config/testcity1.json";
            sub_domain[0] = "testcity1";
        }else{
            url = '../config/'+sub_domain[0]+'.json';
        }
        
        var d = $q.defer();
        
        $rootScope.Variables = {
                city_name: "",
                city_address: "",
                lat_center: "",
                long_center: "",
                img_logo: "",
                icons: "",
                APIURL: "",
                components: "",
                components_en: "",
                overlays: "",
                categories: "",
                categories_issue: "",
                departments: "",
                departments_en: "",
                feelingsURL: "",
                bugzilla: "",
                ALLISSUESAPIURL: "",
                active_user_URL: "",
                activate_user_URL: "",
                APIADMIN: "",
                issue_type_en: "",
                issue_type_gr: "",
                availableIssues: "",
                searchIssues: "",
                map_zoom: "",
                overlay_functions : "",
                overlay_categories : "",
                google_init_coords: "",
                google_buildings:"",
                host: ""
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
            
            d.resolve(response);
            
            return $rootScope;
        });

        return d.promise;
    }]);