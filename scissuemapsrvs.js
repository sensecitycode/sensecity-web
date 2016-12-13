var appServices = angular.module('scissuemapapp.scissuemapsrvs', []);

appServices.factory('EndPointService', function() {
	  return {
		  bugzillaURL: "http://api.sense.city:4001/bugs/search",
			APIURL: "http://api.sense.city:4000"
	  };
});

appServices.factory('BugService', function ( $resource, $rootScope) {
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

appServices.factory('FixPointsMarkerService', function() {
    return {
        icon: function(fixPoint) {
					var icon;
					if (fixPoint.type=="garbage")
					{
						switch(fixPoint.notes[0].ANAKIKLOSI){
							case "0":
								icon = "staticGarbage";
								break;
							case "1":
								icon = "staticGarbageRecycle";
								break;
							default:
								break;
						}
					}
					else
					{
						icon = "staticLighting";
					}
					return icon;
        }
    };
});

appServices.factory('FixPoints2MapService', function ( $resource, $rootScope) {
    // console.log("DisplayFixPoints");
    return $resource($rootScope.Variables.APIURL+'/fix_point/:long/:lat/50/:type',
        {
					long:'@long',
					lat:'@lat',
					type:"@type"
				}
			);
});


appServices.factory('Issue2MapService', function ( $resource, $rootScope) {
    // console.log("DisplayIssues");
    return $resource($rootScope.Variables.APIURL+'/api/1.0/fullissue/:issueID',
        {issueID:'@id'},{'query': {method: 'GET', isArray: true}}
			);
});

appServices.factory('ToGrService', function() {
    return {
        issueName: function(issue_name) {
					switch(issue_name){
						case "garbage":
							issue_name = "Πρόβλημα Καθαριότητας";
							break;
						case "lighting":
							issue_name = "Πρόβλημα Φωτισμού";
							break;
						case "plumbing":
							issue_name = "Πρόβλημα Ύδρευσης";
							break;
						case "road-contructor":
							issue_name = "Πρόβλημα Δρόμου/Πεζοδρομίου";
							break;
						case "protection-policy":
							issue_name = "Πολιτική Προστασία";
							break;
						case "green":
							issue_name = "Πράσινο";
							break;
						default:
							break;
					}
					return issue_name;
        }
      };
});