var appControllers = angular.module('scwebsubmit.controllers', ['pascalprecht.translate','ngCookies']);



appControllers.controller('scWebSubmit',  [ '$scope', '$rootScope', '$log', '$location', 'leafletData', 'Issue', '$translate', '$http', 'APIEndPointService',
                                            function($scope, $rootScope, $log, $location, leafletData, Issue, $translate, $http, APIEndPointService) {
	$log.debug('inside scWebSubmit controller');

	
	$scope.map_center = {
			lat : $rootScope.Variables.lat_center,
			lng : $rootScope.Variables.long_center,
			zoom : $rootScope.Variables.map_zoom
		};


	$scope.availableIssues= [
	                                     
	                   {id: 'garbage', name: 'GARBAGE_ISSUE', 
	                	   types: [ 
	                	            {id: '1', name:'BROKENGARBAGE_BIN'},
	                	            {id: '2', name:'BULKY_ITEMS'},
	                	            {id: '3', name:'CUT_BRANCHES'},
									{id: '4', name:'DEBRIS'},
									{id: '5', name:'SQUARE_CLEANING'},
									{id: '6', name:'MOTORIZED_SCANNING'},
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
	                	            {id: '1', name:'POTHOLES'},
	                	            {id: '2', name:'BROKEN_PLATES'},
	                	            {id: '3', name:'ABANDONED_CAR'},
	                	            {id: '4', name:'OCCUPATION_PAVEMENT'},
									{id: '5', name:'BROKEN_BENCH'},
									{id: '6', name:'BOTCHERY'},
	                	            {id: 'other', name:'OTHER'}] 
	                   },
	                   {id: 'protection-policy', name: 'PROTECTION_POLICY_ISSUE', 
	                	   types: [ {id: 'other', name:'OTHER'}] 
	                   },
	                   {id: 'green', name: 'GREEN_ISSUE', 
	                	   types: [ 
	                	            {id: '1', name:'CUTTING_GRASS'},
	                	            {id: '2', name:'TREE_PRUNING'},
	                	            {id: '3', name:'RODENT'},	                	            
	                	            {id: 'other', name:'OTHER'}] 
	                   }
	                 ];


	$scope.issueTypeSelect = $scope.availableIssues[0];
	$scope.issueSubTypeSelect = $scope.issueTypeSelect.types[0] ;
	$scope.otherDescriptionTxt = '-';
	$scope.uploadedPhotoFile = 'no-image';
	
	
	$scope.stateChanged = function(){
	
		if($scope.chkSelected){ 
		
			
			console.log("");
			
			
			
			
			$scope.NameTxt = "Kostas";
			$scope.EmailTxt = "kostas.bakoulias@gmail.com";
			$scope.MobileTxt = "6974037897";
			
			
		}else{
			$scope.NameTxt = "";
			$scope.EmailTxt = "";
			$scope.MobileTxt = "";
			
		}
		
	}
	
	
	
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
	
		
		$scope.newMarker = null;
		$scope.latlabeltxt = null;
		
		$scope.$on('leafletDirectiveMap.click', function(event, args){
		    console.log(args.leafletEvent.latlng);
		    
		    if( $scope.newMarker === null)
			{
				console.log(" 1 newMarker.addTo(map) "  );
				$scope.newMarker = new L.marker(args.leafletEvent.latlng, {icon: redMarker},{ draggable: true});
				
				leafletData.getMap().then(function(map) {
					$scope.newMarker.addTo(map);
					console.log(" 2newMarker.addTo(map) "  );
															
				});
			}
			else 
			{
				$scope.newMarker.setLatLng(args.leafletEvent.latlng);
				console.log(" else newMarker.addTo(map) "  );
			}

		    $scope.latlabeltxt = args.leafletEvent.latlng.lat; 
		    $scope.lnglabeltxt = args.leafletEvent.latlng.lng; 
		});
	
		//need to refresh the map layer after everything is rendered, otherwise it displays empty tiles
		$scope.invalidateTheMap = function () {

			leafletData.getMap().then(
				    function (map) {
				    	map.invalidateSize( true );
				    }
				);
		 };
		 
		 
		$scope.submit_button = true;
		$scope.register_button = false;
		$scope.verify_button = false;
		$scope.submit_eponymous_button = false;
			
			
		$scope.issubmit_isseu_form = function(){
			return true;
		}
		 
		 $scope.isOtherSelected = function () {
			 return $scope.issueSubTypeSelect.id ===  'other';
		 };
		 
		 //translate immediately when change
		 $scope.issueSubTypeSelectChanged = function () {
			 
			 $translate(  $scope.issueSubTypeSelect.name ).then(function ( h ) {
				 $scope.otherDescriptionTxt = h;
					console.log("in issueSubTypeSelectChanged $scope.otherDescriptionTxt =" + $scope.otherDescriptionTxt );
				  }, function (translationId) {
					  //$scope.otherDescriptionTxt = translationId;
				  });
			 
		 }
		 //this executes the first time just once in the init of page
		 $scope.issueSubTypeSelectChanged();
		 
		 /*$scope.submit_Eponymous = function submit(){
				
			var txtpost = '{ "uuid" : "web-site", "name": "'+$scope.NameTxt+'", "email": "'+$scope.EmailTxt+'", "mobile_num": "'+$scope.MobileTxt+'", "permission" :  { "send_issues": "true" , "communicate_with": {"email" : "'+$("#btn_settings_ans_email").is(":checked").toString()+'", "sms" : "'+$("#btn_settings_ans_sms").is(":checked").toString()+'"}}}';    
			
			console.log(txtpost);
			
			
			return $http({
				method : 'POST',
				url : $rootScope.Variables.active_user_URL,
				headers : {
					'Content-Type' : 'application/json; charset=utf-8'
				},
				data : txtpost 
			}).success(function(resp) {
						
						console.log(resp);
						$scope.myText = resp.policy_description;
						
						$scope.issubmit_isseu_form = function(){
							 return false;
						 }
						 
						$scope.iseponymous = function(){
							 return true;
						 }
						
						$scope.submit_button = false;
						
						
						$scope.submit_button = false;
						$scope.register_button = true;
						$scope.verify_button = false;
						$scope.submit_eponymous_button = false;
						
						//$location.path("/test1");
					}); 
			 
			 
			 
			 
			 
			 
			 
			 
			
		 }*/
		 
		 
		 
		 
		 
		 
		 
		 
		 
		$scope.setStep = function(step){
           console.log("=================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>    " + step);
			if(step==1){
			   
				console.log("step 1");
				
				$scope.issue = new Issue();
			 
				var desc = $scope.otherDescriptionTxt;
			
				$scope.issue.issue =  $scope.issueTypeSelect.id ;
				//$scope.issue.loc =  '{ "type" : "Point",  "coordinates" : ['+$scope.lnglabeltxt+','+ $scope.latlabeltxt +'] }' ;
				$scope.issue.device_id =  'webapp' ;
			 
				$scope.issue.value_desc =  desc ;
				$scope.issue.image_name =  $scope.uploadedPhotoFile ; //no-image
			
				var txtpost = '{"loc" : { "type" : "Point",  "coordinates" : ['+$scope.lnglabeltxt+','+ $scope.latlabeltxt +'] }, "issue" : "'+ $scope.issueTypeSelect.id +'","device_id" : "'+$scope.issue.device_id+'", "value_desc" : "' + $scope.issue.value_desc + '","image_name" : "' + $scope.issue.image_name  + '" }' ;	
			
				console.log( txtpost );			
				console.log("--------------------------------------");
				console.log($rootScope.Variables.APIURL);
				console.log("--------------------------------------");
			
				return $http(
				{
					method : 'POST',
					url : $rootScope.Variables.APIURL,
					headers : {
						'Content-Type' : 'application/json; charset=utf-8'
					},
					data : txtpost 
				}).success(function(resp) {
					console.log(resp);
					
					$scope.myText = resp.policy_description;
						
					console.log("Submit ok!");
						
					$scope.issubmit_isseu_form = function(){
						 return false;
					 }
						 
					$scope.iseponymous = function(){
						 return true;
					}
						
					$scope.submit_button = false;
					
					$scope.submit_button = false;
					$scope.register_button = true;
					$scope.verify_button = false;
					$scope.submit_eponymous_button = false;

				});
			}else if(step==2){
				
				console.log("step 2");
				console.log($scope.NameTxt);
				console.log($scope.EmailTxt);
				console.log($scope.MobileTxt);
				console.log(element(by.id('chkSelected_1')).value());
				console.log(element(by.id('chkSelected_2')).value());
				
			
			
				var txtpost1 = '{ "uuid" : "web-site", "name": "'+$scope.NameTxt+'", "email": "'+$scope.EmailTxt+'", "mobile_num": "'+$scope.MobileTxt+'", "permission" :  { "send_issues": "true" , "communicate_with": {"email" : "'+$("#btn_settings_ans_email").is(":checked").toString()+'", "sms" : "'+$("#btn_settings_ans_sms").is(":checked").toString()+'"}}}';    
				
				console.log(txtpost1);
			
				return $http({
					method : 'POST',
					url : $rootScope.Variables.active_user_URL,
					headers : {
						'Content-Type' : 'application/json; charset=utf-8'
					},
					data : txtpost1 
				}).success(function(resp) {
						
					console.log(resp);
					$scope.myText = resp.policy_description;
						
					$scope.issubmit_isseu_form = function(){
						return false;
					}
						 
					$scope.iseponymous = function(){
						return true;
					}
						
					$scope.submit_button = false;
						
					$scope.submit_button = false;
					$scope.register_button = true;
					$scope.verify_button = false;
					$scope.submit_eponymous_button = false;
						
				}); 
			}
		   
		   
		   
		   
		   
        }
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 
		 /*
		 
		 
		 $scope.submitNewIssue = function submit() {
			 $scope.issue = new Issue();
			 
			 var desc = $scope.otherDescriptionTxt;
			
			 $scope.issue.issue =  $scope.issueTypeSelect.id ;
			 //$scope.issue.loc =  '{ "type" : "Point",  "coordinates" : ['+$scope.lnglabeltxt+','+ $scope.latlabeltxt +'] }' ;
			 $scope.issue.device_id =  'webapp' ;
			 
			 $scope.issue.value_desc =  desc ;
			 $scope.issue.image_name =  $scope.uploadedPhotoFile ; //no-image
			
			
		var txtpost = '{"loc" : { "type" : "Point",  "coordinates" : ['+$scope.lnglabeltxt+','+ $scope.latlabeltxt +'] }, "issue" : "'+ $scope.issueTypeSelect.id 
			+'","device_id" : "'+$scope.issue.device_id+'", "value_desc" : "' + $scope.issue.value_desc + '","image_name" : "' + $scope.issue.image_name  + '" }' ;	
			
			console.log( txtpost );			
			console.log("--------------------------------------");
			console.log($rootScope.Variables.APIURL);
			console.log("--------------------------------------");
			
			
			return $http(
					{
						method : 'POST',
						url : $rootScope.Variables.APIURL,
						headers : {
							'Content-Type' : 'application/json; charset=utf-8'
						},
						data : txtpost 
						
					}).success(function(resp) {
						
						console.log(resp);
						
						
						$scope.myText = resp.policy_description;
						
						console.log("Submit ok!");
						
						$scope.issubmit_isseu_form = function(){
							 return false;
						 }
						 
						$scope.iseponymous = function(){
							 return true;
						 }
						
						$scope.submit_button = false;
						
						
						$scope.submit_button = false;
						$scope.register_button = true;
						$scope.verify_button = false;
						$scope.submit_eponymous_button = false;
						
						//$location.path("/test1");
					});
		}*/

}]);




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


//the following directive automatically takes the file and translates it to base64
appControllers.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
                scope.$apply(function(){
                	
                	
                	var filesSelected = element[0].files[0];
                    //modelSetter(scope, element[0].files[0]);
                    if (filesSelected.size > 0)
    				{
    					console.log('size>0' );
    					var base64image_name='';
    					var fileToLoad = filesSelected;		 
    					r = new FileReader();

    				      r.onloadend = function(e) { //callback after files finish loading
    				    	base64image_name = e.target.result;
    				       
    				        console.log(base64image_name.replace(/^data:image\/(png|jpg);base64,/, "")); //replace regex if you want to rip off the base 64 "header"
    				        //here you can send data over your server as desired
    				        modelSetter(scope, base64image_name );
    				        
    				      }
    				      r.readAsDataURL(fileToLoad); //once defined all callbacks, begin reading the file
    				}
                    
                });
            });
        }
    };
}]);



