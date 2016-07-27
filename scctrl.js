var appControllers = angular.module('scapp.controllers', ['pascalprecht.translate','ngCookies']);



	
	
	
appControllers.controller('sensecityMainCtrl', function($scope, $log, $location) {
	$log.debug('inside sensecityMainCtrl controller');
	$scope.scvesrion = '20160712_trunk';
	$scope.location = $location;
});


appControllers.directive('afterRender', ['$timeout', function ($timeout) {
    var def = {
        restrict: 'A',
        terminal: true,
        transclude: false,
        link: function (scope, element, attrs) {
            $timeout(scope.$eval(attrs.afterRender), 0);  //Calling a scoped method
        }
    };
    return def;
}]);



appControllers.controller('scWebSubmit',  [ '$scope', '$log', '$location', 'leafletData', 'Issue', '$translate',
                                            function($scope, $log, $location, leafletData, Issue, $translate) {
	$log.debug('inside scWebSubmit controller');
	
	$scope.patras = {
			lat : 38.2466395,
			lng : 21.734574,
			zoom : 12
		};


	$scope.availableIssues= [
	                                     
	                   {id: 'garbage', name: 'GARBAGE_ISSUE', 
	                	   types: [ 
	                	            {id: '1', name:'BROKENGARBAGE_BIN'},
	                	            {id: '2', name:'FULL_GARBAGE_BIN'},
	                	            {id: '3', name:'FAILING_GARBAGE_BIN'},
	                	            {id: 'other', name:'OTHER'}] 
	                   },
	                   {id: 'lighting', name: 'LIGHTNING_ISSUE', 
	                	   types: [ 
	                	            {id: '1', name:'GLOWING_LAMPS'},
	                	            {id: '2', name:'BROKEN_ARM'},
	                	            {id: '3', name:'INSUFFICIENT_LIGHTING'},
	                	            {id: 'other', name:'OTHER'}] 
	                   },
	                   {id: 'plumbing', name: 'PLUMBING_ISSUE', 
	                	   types: [ 
	                	            {id: '1', name:'CLOGGED_WELL'},
	                	            {id: '2', name:'BROKEN_WELL'},
	                	            {id: 'other', name:'OTHER'}] 
	                   },
	                   {id: 'road-contructor', name: 'ROAD_ISSUE', 
	                	   types: [ 
	                	            {id: '1', name:'BROKEN_PLATES'},
	                	            {id: '2', name:'OBJECT_INTERFERING'},
	                	            {id: '3', name:'ABANDONED_CAR'},
	                	            {id: '4', name:'BAD_ROAD'},
	                	            {id: 'other', name:'OTHER'}] 
	                   }
	                 ];


	$scope.issueTypeSelect = $scope.availableIssues[0];
	$scope.issueSubTypeSelect = $scope.issueTypeSelect.types[0] ;
	$scope.otherDescriptionTxt = '-';
	 
	
	
	$scope.updateCompoType = function() {
		$scope.issueSubTypeSelect = $scope.issueTypeSelect.types[0] ;
	}
		
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
	
		//need to refresh the map layer after everything is rendered, otherwise it displays empty tiles
		$scope.invalidateTheMap = function () {

			leafletData.getMap("map").then(
				    function (map) {
				    	map.invalidateSize(true);
				    }
				);
		 };
		 
		 
		 $scope.isOtherSelected = function () {
			 return true ; //$scope.issueSubTypeSelect.id ===  'other';
		 };
		 
		 $scope.issueSubTypeSelectChanged = function () {
			 
			 $translate(  $scope.issueSubTypeSelect.name ).then(function ( h ) {
				 $scope.otherDescriptionTxt = h;
					console.log("in issueSubTypeSelectChanged $scope.otherDescriptionTxt =" + $scope.otherDescriptionTxt );
				  }, function (translationId) {
					  //$scope.otherDescriptionTxt = translationId;
				  });
			 
		 }
		 
		 $scope.issueSubTypeSelectChanged();
		 
		 
		 

		 $scope.submitNewIssue = function submit() {
			 
			 $scope.issue = new Issue();

				console.log("in submitNewIssue $scope.uploadedPhotoFile = " + $scope.uploadedPhotoFile);
				
			var desc = $scope.otherDescriptionTxt;
			
			var filesSelected = $scope.uploadedPhotoFile;
			var img_base64='';
			if (filesSelected.length > 0)
			{
				var fileToLoad = filesSelected[0];		 
				var fileReader = new FileReader();		 
				fileReader.onload = function(fileLoadedEvent) 
				{
					img_base64 = fileLoadedEvent.target.result;					
				};
		 
				fileReader.readAsDataURL(fileToLoad);
			}
			
			

			 $scope.issue.issue =  $scope.issueTypeSelect.id ;
			 $scope.issue.loc =  '{ "type" : "Point",  "coordinates" : ['+$scope.latlabeltxt+','+ $scope.lnglabeltxt +'] }' ;
			 $scope.issue.device_id =  'webapp' ;
			 
			 $scope.issue.value_desc =  desc ;
			 $scope.issue.image_name =  img_base64 ;
			
			console.log('{"loc" : { "type" : "Point",  "coordinates" : ['+$scope.latlabeltxt+','+ $scope.lnglabeltxt +'] }, "issue" : "'+ $scope.issueTypeSelect.id 
					+'","device_id" : "webapp", "value_desc" : "' + $scope.issue.value_desc + '","image_name" : "'+img_base64+'" }');
			console.log( $scope.issue );

//			return $http(
//					{
//						method : 'POST',
//						url : APIEndPointService.APIURL,
//						headers : {
//							'Content-Type' : 'multipart/form-data'
//						},
//						data : {
//							prodname : $scope.course.name,
//							shortDescription : $scope.course.teaser,
//							longDescription : $scope.course.longDescription,
//							version : $scope.course.version,
//							prodIcon : $scope.course.uploadedCourseIcon,
//							prodFile : $scope.course.uploadedCourseFile,
//							categories : catidsCommaSeparated,
//						// file : $scope.file
//						},
//						transformRequest : formDataObject
//					}).success(function() {
//				$location.path("/");
//			});
		}

}]);







