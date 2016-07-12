var appControllers = angular.module('scapp.controllers', ['pascalprecht.translate','ngCookies']);



    appControllers.config(['$translateProvider', function ($translateProvider) {
      $translateProvider.translations('en', {
        'TITLE': 'What\'s happening in the city',
        'RESOLVED': 'Resolved'
      });
     
      $translateProvider.translations('el', {
        'TITLE': 'Τι συμβαίνει στην πόλη',
        'RESOLVED': 'Ολοκληρωμένο'
      });
     
      $translateProvider.preferredLanguage('el');
	      $translateProvider.useLocalStorage();
    }]);
	
	
	
    appControllers.controller('sensecityMainCtrl', function($scope, $log, $location) {
    	$log.debug('inside sensecityMainCtrl controller');
    	$scope.scvesrion = '20160712_trunk';
    	$scope.location = $location;
    });