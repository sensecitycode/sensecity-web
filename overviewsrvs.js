var appServices = angular.module('overviewapp.services', []);

appServices.factory('APIEndPointService', function() {
	  return {
		  APIURL: "http://api.sense.city:3000/api/issue"
	  };
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


appServices.factory('DisplayLast6IssuesService', function ( $resource, APIEndPointService) {
    // console.log("DisplayIssues");
    return $resource('http://api.sense.city:3000/api/issue?startdate=2016-03-15&sort=-1&limit=6&list_issue=1&image_field=1',
        {}, {
        update: {
          method: 'GET'
          // isArray: true
        }
    });
});
