var app = angular.module('scApp', ['mgcrea.ngStrap', 'scapp.controllers', 'scissuemapapp.scissuemapctrl', 'scwebsubmit.controllers', 'overviewapp.controllers',
    'searchapp.controllers', 'scapp.services',
    'ngResource', 'ngRoute', 'ui-leaflet', 'angular-loading-bar',
    'ngAnimate', 'pascalprecht.translate', 'ngCookies', 'countTo']);

app.config(function ($routeProvider, $locationProvider, $anchorScrollProvider,
        cfpLoadingBarProvider) {

    $anchorScrollProvider.disableAutoScrolling();

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
        templateUrl: 'scmapcontent.html',
        controller: 'mainOverviewController'
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

app.run(['$rootScope', '$http','$location', function ($rootScope, $http,$location) {
        var url_path = $location.absUrl().split("//");
        var sub_domain = url_path[1].split(".");

        //sub_domain[0] = "testcity1";
        
        //'http://localhost:8383/sensecity-web/config/testcity1.json'
        var mainInfo = $http.get('../config/'+sub_domain[0]+'.json').success(function (response) {


            
            
            $rootScope.Variables = {
                city_name: sub_domain[0],
                lat_center: response.lat_center,
                long_center: response.long_center,
                img_logo: "images/city_logos/" + response.city_name + ".jpg",
                bugzilla_products: response.bugzilla_products,
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
                host: response.host
            };

            return $rootScope;
        });

    }]);