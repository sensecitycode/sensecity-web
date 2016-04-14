var appControllers = angular.module('searchapp.controllers', []);


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

appControllers.controller('mainController', ['$scope','$location','APIEndPointService','DisplayIssuesService', function($scope,$location,APIEndPointService,DisplayIssuesService) {

    // sidebar scope
    $scope.state = true;
    $scope.toggleState = function() {
        $scope.state = !$scope.state;
    };

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

    $scope.center= {
        lat: 38.248028,
        lng: 21.7583104,
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


    $scope.searchIssue = "garbage";
    var startdate = new Date();
    startdate.setDate(startdate.getDate() - 30);
    $scope.startISOdate = startdate;
    $scope.endISOdate = new Date();


    $scope.submit = function() {
        $scope.startdate = $scope.startISOdate.getFullYear()+'-' + ($scope.startISOdate.getMonth()+1) + '-'+$scope.startISOdate.getDate();
        $scope.enddate = $scope.endISOdate.getFullYear()+'-' + ($scope.endISOdate.getMonth()+1) + '-'+$scope.endISOdate.getDate();
        // URL update with search params
        $location.search('startdate', $scope.startdate);
        $location.search('enddate', $scope.enddate);
        $location.search('issue', $scope.searchIssue);

        //get params from URL
        $scope.params = $location.search() ;

        $scope.searchissues = DisplayIssuesService.query($scope.params, function(){
          console.log($scope.searchissues);
          $scope.markers = [];
          angular.forEach($scope.searchissues, function(value,key) {
              var issueid = value._id; 
              var issuelink = "http://sense.city/issuemap.php?issue_id="+issueid;
              var positionlat = value.loc.coordinates[1];
              var positionlon = value.loc.coordinates[0];
              var issue = value.issue;
              var layer = '';
              if (issue=="angry"||issue=="neutral"||issue=="happy"){
                layer = 'reaction';
              }else{
                layer = issue;
              }
              var message = '';
              if (value.value_desc){
                message = value.value_desc;
              }else{
                message = 'Μη διαθέσιμη περιγραφή';
              }
              var marker = {"layer":""+layer+"","lat":+positionlat,"lng":+positionlon,"icon":icons[issue],"message":""+message+"<br><a href="+issuelink+">Δες με!</a>"};
              this.push(marker);
          }, $scope.markers);
        });
    };
}]);
