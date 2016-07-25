var app = angular.module('scApp', [ 'mgcrea.ngStrap', 'scapp.controllers', 'overviewapp.controllers',
		'scapp.services', 'ngResource',  'ngRoute', 'ui-leaflet', 'angular-loading-bar',
		'ngAnimate', 'pascalprecht.translate', 'ngCookies' ]);

app.config(function($routeProvider, $locationProvider, $anchorScrollProvider,
		cfpLoadingBarProvider) {

	$anchorScrollProvider.disableAutoScrolling();

	cfpLoadingBarProvider.includeSpinner = true;
	cfpLoadingBarProvider.includeBar = true;

	$routeProvider.when('/overview', {
		templateUrl : 'overview.html',
		controller : 'overviewctrl'
	}).when('/web_report', {
		templateUrl : 'scwebsubmit.html',
		controller : 'scWebSubmit'
	}).when('/', {
		templateUrl : 'scmapcontent.html',
		controller : 'mainController'
	}).otherwise({
		redirectTo : '/'
	});

});

app.controller('NavCtrl', [ '$scope', '$location', '$rootScope', function($scope, $location, $rootScope) {
	
	//$scope.user = $rootScope.fstoreuser;
	
	$scope.navClass = function(page) {
		var currentRoute = $location.path().substring(1) || 'home';
		return page === currentRoute ? 'active' : '';
	};
	
    
} ]);
