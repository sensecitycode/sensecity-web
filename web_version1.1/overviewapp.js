var app = angular.module('overviewApp', ['mgcrea.ngStrap','overviewapp.controllers','overviewapp.services','ngResource','ui-leaflet','angular-loading-bar', 'ngAnimate']);


app.config(function( cfpLoadingBarProvider) {
	

	
	cfpLoadingBarProvider.includeSpinner = true;
	cfpLoadingBarProvider.includeBar = true;
	
	
});
