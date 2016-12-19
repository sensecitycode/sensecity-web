var app = angular.module('scApp', ['mgcrea.ngStrap', 'scapp.controllers', 'scissuemapapp.scissuemapctrl', 'scwebsubmit.controllers', 'overviewapp.controllers',
    'searchapp.controllers', 'scapp.services',
    'ngResource', 'ngRoute', 'ui-leaflet', 'angular-loading-bar',
    'ngAnimate', 'pascalprecht.translate', 'ngCookies', 'countTo']);

var translateProv;

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
        translateProv = $translateProvider;
    }]);

app.run(['$rootScope', function ($rootScope) {
        translateProv.translations('en', $rootScope.Variables.translations_en);

        translateProv.translations('el', $rootScope.Variables.translations_gr);

        translateProv.preferredLanguage('el');
        translateProv.useLocalStorage();
    }]);
