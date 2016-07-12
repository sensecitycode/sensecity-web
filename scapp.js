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
	}).when('/', {
		templateUrl : 'scmapcontent.html',
		controller : 'mainController'
	}).otherwise({
		redirectTo : '/'
	});

});

