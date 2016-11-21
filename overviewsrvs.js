var appServices = angular.module('overviewapp.services', []);

appServices.factory('APIEndPointService', function() {
	  return {
		  APIURL: "http://api.sense.city:4000/api/issue",
			bugzilla: "http://api.sense.city:4001/bugs/search"
	  };
});

appServices.factory('DisplayIssuesService', function ( $resource/*, APIEndPointService*/, $rootScope) {
    // console.log("DisplayIssues");
    //return $resource(APIEndPointService.APIURL,
	return $resource($rootScope.Variables.APIURL+$rootScope.Variables.city_name,
        {}, {
        update: {
          method: 'GET'
          // isArray: true
        }
    });
});

//single full issue (with image) via ID
appServices.factory('Issue2MapService', function ( $resource/*, APIEndPointService*/ , $rootScope) {
    // console.log("DisplayIssues");
    return $resource('http://api.sense.city:4000/api/fullissue/:issueID',
        {issueID:'@id'},{query: {method: 'get', isArray: true, cancellable: true}}
	);
});

appServices.factory('DisplayLast6IssuesService', function ( $resource/*, APIEndPointService*/, $rootScope) {
    // console.log("DisplayIssues");
    return $resource($rootScope.Variables.APIURL + $rootScope.Variables.city_name + '?startdate=2016-03-15&sort=-1&limit=6&list_issue=1&image_field=1',
        {}, {
        update: {
          method: 'GET'
          // isArray: true
        }
    });
});

appServices.factory('BugService', function ( $resource/*, APIEndPointService*/, $rootScope) {
    return $resource(
        //APIEndPointService.bugzilla,
		$rootScope.Variables.bugzilla
        null,
        {
          search: {
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            isArray: true
          }
        }
    );
});

appServices.factory('FixedPointsService', function ( $resource, APIEndPointService, $rootScope) {
    return $resource(
        'json/'+$rootScope.Variables.city_name+'.json',
        null,
        {
          search: {
            method: 'GET',
            headers:{'Content-Type':'application/json'},
            isArray: true
          }
        }
    );
});
