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

appServices.factory('IssuesSharingService', function() {
		var issues ="";
		var issuesService ={};

		issuesService.share = function(issue) {
				// issues.push(issue);
				issues = issue;
				console.log(issues);
		};

		issuesService.list = function() {
				return issues;
		};

		return issuesService;
});
