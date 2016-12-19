var appServices = angular.module('scissuemapapp.scissuemapsrvs', []);

appServices.factory('EndPointService', function () {
    return {
        bugzillaURL: "http://api.sense.city:4001/bugs/search",
        APIURL: "http://api.sense.city:4000"
    };
});

appServices.factory('BugService', function ($resource, $rootScope) {
    return $resource(
            $rootScope.Variables.bugzilla,
            null,
            {
                search: {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    isArray: true
                }
            }
    );
});

appServices.factory('FixPointsMarkerService', function () {
    return {
        icon: function (fixPoint) {
            var icon;
            if (fixPoint.type == "garbage")
            {
                switch (fixPoint.notes[0].ANAKIKLOSI) {
                    case "0":
                        icon = "staticGarbage";
                        break;
                    case "1":
                        icon = "staticGarbageRecycle";
                        break;
                    default:
                        break;
                }
            } else
            {
                icon = "staticLighting";
            }
            return icon;
        }
    };
});

appServices.factory('FixPoints2MapService', function ($resource, $rootScope) {
    // console.log("DisplayFixPoints");
    return $resource($rootScope.Variables.APIURL + '/fix_point/:long/:lat/50/:type',
            {
                long: '@long',
                lat: '@lat',
                type: "@type"
            }
    );
});


appServices.factory('Issue2MapService', function ($resource, $rootScope) {
    // console.log("DisplayIssues");
    return $resource($rootScope.Variables.APIADMIN + '/fullissue/:issueID',
            {issueID: '@id'}, {'query': {method: 'GET', isArray: true}}
    );
});

appServices.factory('ToGrService', function ($rootScope) {
    return {
        issueName: function (issue_name) {
            var issue_index = $rootScope.Variables.departments.indexOf(issue_name);
            if (issue_index != -1) {
                issue_name = $rootScope.Variables.departments_en[issue_index];
            }
            return issue_name;
        }
    };
});
