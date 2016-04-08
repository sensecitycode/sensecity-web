var appControllers = angular.module('searchapp.controllers', []);

appControllers.controller('SidebarController', ['$scope', function($scope) {

    $scope.state = true;

    $scope.toggleState = function() {
        $scope.state = !$scope.state;
    };
	
	
	

			  
			  
			  
	
	$scope.center= {
		lat: 38.288028,
		lng: 21.7883104,
		zoom: 12
	};

				  
			  
			  
	$scope.layers= {
		baselayers: {
			openStreetMap: {
				name: 'OpenStreetMap',
				type: 'xyz',
				url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
				layerOptions: {
					showOnSelector: false,
					attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
				}
			}
		},
		overlays: {
			garbage: {
				type:'group',
				name:'Προβλήματα Σκουπιδιών',
				visible:true
			},
			lighting: {
				type:'group',
				name:'Προβλήματα Φωτισμού',
				visible:true
			},
			plumbing: {
				type:'group',
				name:'Προβλήματα Ύδρευσης',
				visible:true
			},
			"road-contructor": {
				type:'group',
				name:'Προβλήματα Οδοστρώματος',
				visible:true
			},
			reaction: {
				type:'group',
				name:'Προβλήματα Πολιτών',
				visible:true
			}
		}
	};
	
	
	

}]);

appControllers.directive('sidebarDirective', function() {
    return {
        link : function(scope, element, attr) {
            scope.$watch(attr.sidebarDirective, function(newVal) {
                  if(newVal)
                  {
                    element.addClass('show');
                    return;
                  }
                  element.removeClass('show');
            });
        }
    };
});

appControllers.controller('searchController', ['$scope','$location','APIEndPointService','DisplayIssuesService','IssuesSharingService', function($scope,$location,APIEndPointService,DisplayIssuesService,IssuesSharingService) {
	
	
	var icons = {
		garbage: {
			type: 'awesomeMarker',
				prefix: 'fa',
				  icon: 'trash-o',
				  markerColor: 'green'
				},
				"road-contructor": {
				  type: 'awesomeMarker',
				  prefix: 'fa',
				  icon: 'road',
				  markerColor: 'cadetblue'
				},
				plumbing: {
				  type: 'awesomeMarker',
				  prefix: 'fa',
				  icon: 'umbrella',
				  markerColor: 'darkpuple'
				},
				lighting: {
				  type: 'awesomeMarker',
				  prefix: 'fa',
				  icon: 'lightbulb-o',
				  markerColor: 'orange'
				},
				angry: {
				  type: 'awesomeMarker',
				  prefix: 'fa',
				  icon: 'frown-o',
				  markerColor: 'lightgreen',
				  iconColor: 'darkgreen'
				},
				neutral: {
				  type: 'awesomeMarker',
				  prefix: 'fa',
				  icon: 'meh-o',
				  markerColor: 'lightgreen',
				  iconColor: 'darkgreen'
				},
				happy: {
				  type: 'awesomeMarker',
				  prefix: 'fa',
				  icon: 'smile-o',
				  markerColor: 'lightgreen',
				  iconColor: 'darkgreen'
				}

			  };
	
    $scope.searchIssue = "garbage";
    var today = new Date();
	
	/*
	
	var _startdate = new Date();
	_startdate.setDate(_startdate.getDate() -3);         
	
	var _enddate = new Date();
    
	*/
	
	
    $scope.startISOdate = new Date(today - 1000 * 60 * 60 * 24 * 60);
    $scope.endISOdate = today;
    $scope.submit = function() {
      $scope.startdate = $scope.startISOdate.getFullYear()+'-' + ($scope.startISOdate.getMonth()+1) + '-'+$scope.startISOdate.getDate();
      $scope.enddate = $scope.endISOdate.getFullYear()+'-' + ($scope.endISOdate.getMonth()+1) + '-'+$scope.endISOdate.getDate();
      // URL update with search params
      $location.search('startdate', $scope.startdate);
      $location.search('enddate', $scope.enddate);
      $location.search('issue', $scope.searchIssue);

      $scope.params = $location.search() ;
      console.log(APIEndPointService.APIURL);
      console.log($scope.params);
	  
      // console.log($scope.params.startdate);
      // console.log($scope.params.issue);

		$scope.searchissues = DisplayIssuesService.query($scope.params, function(){
		  
		  
			$scope.markers = [];
			  
			angular.forEach($scope.searchissues, function(value,key) {				
				var positionlat = value.loc.coordinates[1];
				var positionlon = value.loc.coordinates[0];
				var issue = value.issue;
				var layer1 = '';
				
				if (issue=="angry"||issue=="neutral"||issue=="happy"){
					layer1 = 'reaction';
				}else{
					layer1 = issue;
				}
				
				var message = '';
				if (value.value_desc){
					message = value.value_desc;
				}else{
					message = 'Μη διαθέσιμη περιγραφή';
				}
				var marker = {"layer":""+layer1+"","lat":+positionlat,"lng":+positionlon,"icon":icons[issue],"message":""+message+""};
				console.log(marker);
				this.push(marker);
			}, $scope.markers);


  
  
  
		  
	  });
		
		
	

      // DisplayIssuesService.query($scope.params)
      //     .then(function(issues) {
      //         $scope.issues=issues;
      //     });
      // console.log($scope.issues);


      // call service to share search issues with mapController
      IssuesSharingService.share($scope.searchissues);
    };
	
	
	
}]);











appControllers.controller('mapController', ['$scope','IssuesSharingService', function($scope,IssuesSharingService){
  var icons = {
    garbage: {
      type: 'awesomeMarker',
      prefix: 'fa',
      icon: 'trash-o',
      markerColor: 'green'
    },
    "road-contructor": {
      type: 'awesomeMarker',
      prefix: 'fa',
      icon: 'road',
      markerColor: 'cadetblue'
    },
    plumbing: {
      type: 'awesomeMarker',
      prefix: 'fa',
      icon: 'umbrella',
      markerColor: 'darkpuple'
    },
    lighting: {
      type: 'awesomeMarker',
      prefix: 'fa',
      icon: 'lightbulb-o',
      markerColor: 'orange'
    },
    angry: {
      type: 'awesomeMarker',
      prefix: 'fa',
      icon: 'frown-o',
      markerColor: 'lightgreen',
      iconColor: 'darkgreen'
    },
    neutral: {
      type: 'awesomeMarker',
      prefix: 'fa',
      icon: 'meh-o',
      markerColor: 'lightgreen',
      iconColor: 'darkgreen'
    },
    happy: {
      type: 'awesomeMarker',
      prefix: 'fa',
      icon: 'smile-o',
      markerColor: 'lightgreen',
      iconColor: 'darkgreen'
    }

  };



  $scope.issues = IssuesSharingService.list();
  console.log($scope.issues);
  $scope.markers = [];
  angular.forEach($scope.issues, function(value,key) {
      var positionlat = value.loc.coordinates[1];
      var positionlon = value.loc.coordinates[0];
      var issue = value.issue;
      var layer = '';
      if (issue=="angry"||issue=="neutral"||issue=="happy"){layer = 'reaction';}else{layer = issue;}
      var message = '';
      if (value.value_desc){message = value.value_desc;}else{message = 'Μη διαθέσιμη περιγραφή';}
      var marker = {"layer":""+layer+"","lat":+positionlat,"lng":+positionlon,"icon":icons[issue],"message":""+message+""};
      this.push(marker);
  }, $scope.markers);


  $scope.center= {
      lat: 38.288028,
      lng: 21.7883104,
      zoom: 12
  };


  $scope.layers= {

      baselayers: {
          openStreetMap: {
              name: 'OpenStreetMap',
              type: 'xyz',
              url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
              layerOptions: {
                  showOnSelector: false,
                  attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
              }
          }
      },

      overlays: {
          garbage: {
              type:'group',
              name:'Προβλήματα Σκουπιδιών',
              visible:true
          },
          lighting: {
              type:'group',
              name:'Προβλήματα Φωτισμού',
              visible:true
          },
          plumbing: {
              type:'group',
              name:'Προβλήματα Ύδρευσης',
              visible:true
          },
          "road-contructor": {
              type:'group',
              name:'Προβλήματα Οδοστρώματος',
              visible:true
          },
          reaction: {
              type:'group',
              name:'Προβλήματα Πολιτών',
              visible:true
          }
      }
  };

}]);
