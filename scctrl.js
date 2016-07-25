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




appControllers.controller('scWebSubmit',  [ '$scope', '$log', '$location', function($scope, $log, $location) {
	$log.debug('inside scWebSubmit controller');
	
	$scope.patras = {
			lat : 38.2466395,
			lng : 21.734574,
			zoom : 12
		};
		
		
	$scope.openStreetMap = {
			name : 'OpenStreetMap',
			type : 'xyz',
			url : 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			layerOptions : {
				showOnSelector : true,
				attribution : '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
				maxZoom: 19
			}
		};
		
  

		
		//We use a custom Google.js that calls also the google trafic layer. Please see http://www.qtrandev.com/transit5/ for inspiration
		
		var googleRoadmap = {
					name : 'Google Map + Traffic',
					layerType: 'ROADMAP',
					type : 'google',	
					layerOptions : {
						showOnSelector : true,
						attribution : 'xxx',
						maxZoom: 20
					}										
		};
		
		var googleHybrid = {
					name : 'Google Hybrid + Traffic',
					layerType: 'HYBRID',
					type : 'google',	
					layerOptions : {
						showOnSelector : true,
						attribution : 'xxx',
						maxZoom: 20
					}										
		};
		
		
		
		$scope.layers = {
			baselayers : {
				openStreetMap: $scope.openStreetMap,
				gR: googleRoadmap,
				gH: googleHybrid
				
			},
			overlays : {

			}
		};
		
		$scope.$on('leafletDirectiveMap.overlayadd', function(event, o){
				console.log( "overlayadd event " );
				console.log( o.leafletEvent );
				console.log( o.leafletEvent.layer );
				
		});
	
	
	
	
	
	
	

}]);