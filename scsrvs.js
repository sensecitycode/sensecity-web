var appServices = angular.module('scapp.services', []);

appServices.factory('APIEndPointService', function() {
	  return {
		  APIURL: "http://api.sense.city:3000/api/issue",
		  ALLISSUESAPIURL: "http://api.sense.city:3000/api/issues",
			bugzilla: "http://api.sense.city:3001/bugs/search",
			citykey:"patras"
	  };
});




//Issue Resource
appServices.factory('Issue', function($resource, APIEndPointService) {
	return $resource(APIEndPointService.ALLISSUESAPIURL+"/:id", 
		{id : "@id"	}, {
		"update" : {
			method : "PUT"
		}

	});
});


appServices.factory('DisplayIssuesService', function ( $resource, APIEndPointService) {
    // console.log("DisplayIssues");
    return $resource(APIEndPointService.APIURL,
        {}, {
        update: {
          method: 'GET'
          // isArray: true
        }
    });
});


appServices.factory('DisplayLast6IssuesService', function ( $resource, APIEndPointService, $rootScope) {
    // console.log("DisplayIssues");
    return $resource( APIEndPointService.APIURL + '/'+$rootScope.Variables.city_name+'?startdate=2016-03-15&sort=-1&limit=6&list_issue=1&image_field=1',
        {}, {
        update: {
          method: 'GET'
          // isArray: true
        }
    });
});


appServices.factory('DisplayLast100IssuesService', function ( $resource, APIEndPointService, $rootScope) {
    // console.log("DisplayIssues");
    return $resource( APIEndPointService.APIURL + '/'+$rootScope.Variables.city_name+'?startdate=2016-03-15&sort=-1&limit=100&list_issue=1&image_field=1',
        {}, {
        update: {
          method: 'GET'
          // isArray: true
        }
    });
});

appServices.factory('BugService', function ( $resource, APIEndPointService) {
    return $resource(
        APIEndPointService.bugzilla,
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

