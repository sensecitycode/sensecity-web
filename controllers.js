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

appControllers.controller('mainController', ['$scope','$window','$q','DisplayIssuesService', '$rootScope', function($scope,$window,$q,DisplayIssuesService, $rootScope) {

  $scope.state = true;
  $scope.toggleState = function() {
      $scope.state = !$scope.state;
  };

  var icons = $rootScope.Variables.icons;
/*
  $scope.center= {
      lat: 38.248028,
      lng: 21.7583104,
      zoom: 12
  };*/
  
   $scope.center= {
      lat: $rootScope.Variables.lat_center,
      lng: $rootScope.Variables.long_center,
      zoom: $rootScope.Variables.map_zoom
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
      overlays: $rootScope.Variables.overlays
  };

  var startdate = new Date();
  startdate.setDate(startdate.getDate() - 30);
  $scope.startISOdate = startdate;
  $scope.endISOdate = new Date();

  $scope.submit = function() {
      $scope.startdate = $scope.startISOdate.getFullYear()+'-' + ($scope.startISOdate.getMonth()+1) + '-'+$scope.startISOdate.getDate();
      $scope.enddate = $scope.endISOdate.getFullYear()+'-' + ($scope.endISOdate.getMonth()+1) + '-'+$scope.endISOdate.getDate();
      var paramsObj= [];
      angular.forEach($scope.searchIssue, function(state,problem) {
          if (problem == "roadconstructor"){
              problem = "road-constructor";
          }
          if (state === true){
              paramsObj.push({startdate:$scope.startdate,enddate:$scope.enddate,issue:problem});
          }
      });

      var promisesArray = [];
      for (index=0; index < paramsObj.length; index++){
          promisesArray.push(doQuery(paramsObj[index]));
      }

      $q.all(promisesArray).then(function(data) {
           var searchissues = [];
           for (i=0; i < data.length; i++){
             for (j=0; j < data[i].length; j++){
                searchissues.push(data[i][j]);
             }
           }
           $scope.markers = [];
           angular.forEach(searchissues, function(value,key) {
              var issueid = value._id;
              var issuelink = "http://"+$rootScope.Variables.city_name+".sense.city/scissuemap.html#?issue_id="+ issueid;
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

  $scope.reset = function() {
    var startdate = new Date();
    startdate.setDate(startdate.getDate() - 30);
    $scope.startISOdate = startdate;
    $scope.endISOdate = new Date();
    $scope.searchIssue = "";
    $scope.searchState ="";
    $scope.markers = [];
    /*
	$scope.center= {
        lat: 38.248028,
        lng: 21.7583104,
        zoom: 12
    };
	*/
	$scope.center= {
        lat: $rootScope.Variables.lat_center,
        lng: $rootScope.Variables.long_center,
        zoom: $rootScope.Variables.map_zoom
    };
  };

  function doQuery(obj) {
     var d = $q.defer();
     DisplayIssuesService.query(obj, function(result) {
          d.resolve(result);
     });
     return d.promise;
  }

}]);