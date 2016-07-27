var appControllers = angular.module('scapp.controllers', ['pascalprecht.translate','ngCookies']);



	
	
appControllers.controller('sensecityMainCtrl', function($scope, $log, $location) {
	$log.debug('inside sensecityMainCtrl controller');
	$scope.scvesrion = '20160712_trunk';
	$scope.location = $location;
});



