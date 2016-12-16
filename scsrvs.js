var appServices = angular.module('scapp.services', []);
/*
appServices.factory('APIEndPointService', function() {
	  return {
		  APIURL: "http://api.sense.city:4000/api/1.0/issue",
		  ALLISSUESAPIURL: "http://api.sense.city:4000/api/1.0/issues",
			bugzilla: "http://api.sense.city:4001/bugs/search"
	  };
});*/




//Issue Resource
appServices.factory('Issue', function($resource , $rootScope) {
	console.log($rootScope.Variables.APIADMIN);
	return $resource($rootScope.Variables.APIADMIN + "issue/:id",
		{id : "@id"	}, {
		"update" : {
			method : "PUT"
		}

	});
});


appServices.factory('DisplayIssuesService', function ( $resource , $rootScope) {
//    console.log("rootScope.Variables.APIURL ==================>>>>>>>>>>>>>>>>>>>>>> "+$rootScope.Variables.APIURL);
    return $resource($rootScope.Variables.APIURL+$rootScope.Variables.city_name,
        {}, {
        update: {
          method: 'GET'
          // isArray: true
        }
    });
});

appServices.factory('DisplayFeelingsService', function ( $resource , $rootScope) {
//    console.log("rootScope.Variables.APIURL ==================>>>>>>>>>>>>>>>>>>>>>> "+$rootScope.Variables.APIURL);
    return $resource($rootScope.Variables.feelingsURL,
        {}, {
        update: {
          method: 'GET'
          // isArray: true
        }
    });
});


//single full issue (with image) via ID
/*appServices.factory('Issue2MapService', function ( $resource , $rootScope) {
    // console.log("DisplayIssues");
    return $resource($rootScope.Variables.APIADMIN+'fullissue/:issueID',
        {issueID:'@id'}
			);
});*/

appServices.factory('DisplayLast6IssuesService', function ( $resource/*, APIEndPointService*/, $rootScope) {
    // console.log("DisplayIssues");
    return $resource( $rootScope.Variables.APIURL +$rootScope.Variables.city_name+'?startdate=2016-03-15&sort=-1&limit=6&list_issue=1&image_field=1',
        {}, {
        update: {
          method: 'GET'
          // isArray: true
        }
    });
});


appServices.factory('DisplayLast100IssuesService', function ( $resource/*, APIEndPointService*/, $rootScope) {
    // console.log("DisplayIssues");
    return $resource( $rootScope.Variables.APIURL + $rootScope.Variables.city_name+'?startdate=2016-03-15&sort=-1&limit=100&list_issue=1&image_field=1',
        {}, {
        update: {
          method: 'GET'
          // isArray: true
        }
    });
});

appServices.factory('BugService', function ( $resource/*, APIEndPointService*/, $rootScope) {
    return $resource(
        $rootScope.Variables.bugzilla,
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

appServices.factory('FixedPointsService', function ( $resource/*, APIEndPointService*/, $rootScope) {
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