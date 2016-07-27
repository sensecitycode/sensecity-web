var appServices = angular.module('searchapp.services', []);

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

