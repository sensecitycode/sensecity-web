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




appControllers.controller('scWebSubmit',  [ '$scope', '$log', '$location', 'leafletData', 
                                            function($scope, $log, $location, leafletData) {
	$log.debug('inside scWebSubmit controller');
	
	$scope.patras = {
			lat : 38.2466395,
			lng : 21.734574,
			zoom : 12
		};

	$scope.issueTypeSelect = null;
	$scope.issueSubTypeSelect = null ;
		

	$scope.availableIssues= [
	                   {id: '', name: 'Επιλέξτε τύπο προβλήματος', 
	                	   types: [ {id: '', name:'Επιλέξτε πρόβλημα'} ] 
	                   },	                   
	                   {id: 'garbage', name: 'Σκουπίδια', 
	                	   types: [ {id: '', name:'Επιλέξτε πρόβλημα'},
	                	            {id: '1', name:'Χαλασμένος Κάδος'},
	                	            {id: '2', name:'Γεμάτος Κάδος'},
	                	            {id: '3', name:'Έλλειψη κάδου'},
	                	            {id: 'other', name:'Άλλο'}] 
	                   },
	                   {id: 'lighting', name: 'Φωτισμός', 
	                	   types: [ {id: '', name:'Επιλέξτε πρόβλημα'},
	                	            {id: '1', name:'Καμμένος Λαμπτήρας'},
	                	            {id: '2', name:'Σπασμένος Βραχίωνας'},
	                	            {id: '3', name:'Ανεπαρκής Φωτισμός'},
	                	            {id: 'other', name:'Άλλο'}] 
	                   },
	                   {id: 'plumbing', name: 'Ύδρευση', 
	                	   types: [ {id: '', name:'Επιλέξτε πρόβλημα'},
	                	            {id: '1', name:'Βουλωμένο Φρεάτιο'},
	                	            {id: '2', name:'Σπασμένο Φρεάτιο'},
	                	            {id: 'other', name:'Άλλο'}] 
	                   },
	                   {id: 'road-contructor', name: 'Οδόστρωμα', 
	                	   types: [ {id: '', name:'Επιλέξτε πρόβλημα'},
	                	            {id: '1', name:'Σπασμένες Πλάκες'},
	                	            {id: '2', name:'Αντικείμενο που εμποδίζει'},
	                	            {id: '3', name:'Εγκαταλ. Αυτοκίνητο'},
	                	            {id: '4', name:'Λακούβα'},
	                	            {id: 'other', name:'Άλλο'}] 
	                   }
	                 ];

		
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
		
		

		var redMarker = L.AwesomeMarkers.icon({
			icon: 'info-circle',
			prefix: 'fa',
			markerColor: 'red'
		  });
	
		
		$scope.$on('leafletDirectiveMap.click', function(event, args){
		    console.log(args.leafletEvent.latlng);
		    
		    if(typeof(newMarker)==='undefined')
			{
				newMarker = new L.marker(args.leafletEvent.latlng, {icon: redMarker},{ draggable: true});
				
				leafletData.getMap().then(function(map) {
					newMarker.addTo(map);
															
				});
			}
			else 
			{
				newMarker.setLatLng(args.leafletEvent.latlng);
			}

		    $scope.latlabeltxt = args.leafletEvent.latlng.lat; 
		    $scope.lnglabeltxt = args.leafletEvent.latlng.lng; 
		});
	



}]);