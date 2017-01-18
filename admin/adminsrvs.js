var appServices = angular.module('adminapp.adminsrvs', []);

//appServices.run([
//  '$cookieStore',
//  function($cookieStore) {
//  }]);

appServices.factory('EndPointService', function () {
    return {
        bugzillaURL: "http://api.sense.city:3001/bugs/search",
        APIURL: "http://api.sense.city:3000"
    };
});

appServices.factory('BugService', function ($resource, $cookieStore, EndPointService) {
    return $resource(
            EndPointService.bugzillaURL,
            null,
            {
                search: {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    isArray: true,
                    withCredentials: false
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

appServices.factory('Issue2MapService', function ($resource, $rootScope) {
    // console.log("DisplayIssues");
    return $resource($rootScope.Variables.APIADMIN + '/fullissue/:issueID',
            {issueID: '@id'},{'query': {method: 'GET', isArray: true}}
    );
});

appServices.factory('FixPoints2MapService', function ($resource, $rootScope) {
    // console.log("DisplayFixPoints");
    return $resource($rootScope.Variables.APIADMIN + '/fixed-point/:long/:lat/50/:type',
            {
                long: '@long',
                lat: '@lat',
                type: "@type"
            },{'query': {method: 'GET', isArray: true}}
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

appServices.factory('ToGrService', function () {
    return {
        issueName: function (issue_name) {
            switch (issue_name) {
                case "garbage":
                    issue_name = "Πρόβλημα Καθαριότητας";
                    break;
                case "lighting":
                    issue_name = "Πρόβλημα Φωτισμού";
                    break;
                case "plumbing":
                    issue_name = "Πρόβλημα Ύδρευσης";
                    break;
                case "road-constructor":
                    issue_name = "Πρόβλημα Δρόμου/Πεζοδρομίου/Πλατείας";
                    break;
                case "green":
                    issue_name = "Πρόβλημα Πρασίνου";
                    break;
                case "protection-policy":
                    issue_name = "Πρόβλημα Πολιτικής Προστασίας";
                    break;
                case "environment":
                    issue_name = "Πρόβλημα Περιβάλλοντος";
                    break;    
                default:
                    break;
            }
            return issue_name;
        },

        statusTitle: function (status, resolution) {
            var _status;
            var _style;
            var _icon;
            var _resolution;
            switch (status) {
                case "CONFIRMED":
                    _status = "Ανοιχτό";
                    _style = {color: '#e42c2c'};
                    _icon = "glyphicon glyphicon-exclamation-sign";
                    break;
                case "IN_PROGRESS":
                    _status = "Σε εκτέλεση";
                    _style = {color: 'orange'};
                    _icon = "glyphicon glyphicon-question-sign";
                    break;
                case "RESOLVED":
                    _style = {color: 'green'};
                    _icon = "glyphicon glyphicon-ok-sign";
                    switch (resolution) {
                        case "FIXED":
                            _resolution = "Αποκατάσταση";
                            break;
                        case "INVALID":
                            _resolution = "Εσφαλμένη Αναφορά";
                            break;
                        case "WONTFIX":
                            _resolution = "Μη αποκατάσταση / Απόρριψη από Δήμο";
                            break;
                        case "DUPLICATE":
                            _resolution = "Έχει ήδη αναφερθεί σε άλλο αίτημα";
                            break;
                    }
                    _status = "Ολοκληρωμένο";

                    break;
                default:
                    break;
            }
            return {"status": {"en": status, "gr": _status}, "status_style": _style, "status_icon": _icon, "resolution": {"en": resolution, "gr": _resolution}};

        }
    };
});

appServices.factory('CommentService', function () {
    return {
        field: function (status) {
            var field;
            var comment;
            switch (status) {
                case "CONFIRMED":
                    // field = "url";
                    break;
                case "IN_PROGRESS":
                    field = "whiteboard";
                    break;
                case "RESOLVED":
                    field = "cf_sensecityissue";
                    break;
                default:
                    break;
                    field = "cf_comment";        

            }
            return field;

        }
    };
});

appServices.factory('Tab2BugzillaService', function () {
    return{
        issue_type: function (tab) {
            var type;
            switch (tab) {
                case 0:
                    type = "all";
                    break;
                case 1:
                    type = "garbage";
                    break;
                case 2:
                    type = "lighting";
                    break;
                case 3:
                    type = "road-constructor";
                    break;
                case 4:
                    type = "protection-policy";
                    break;
                case 5:
                    type = "green";
                    break;
                case 6:
                    type = "environment";
                    break;
                case 7:
                    type = "plumbing";
                    break;
            }
            return type;
        }
    };
});

appServices.factory('PriorityTag', function () {
    return{
        priority_type: function (tab) {
            var type;
            switch (tab) {
                case "---":
                    type = "Κανονική";
                    break;
                case "High":
                    type = "Υψηλή";
                    break;
                case "Normal":
                    type = "Κανονική";
                    break;
                case "Low":
                    type = "Χαμηλή";
                    break;
            }
            return type;
        }
    };
});

appServices.factory('PriorityTagEn', function () {
    return{
        priority_type: function (tab) {
            var type;
            switch (tab) {
                case "Κανονική":
                    type = "Normal";
                    break;
                case "Υψηλή":
                    type = "High";
                    break;
                case "Χαμηλή":
                    type = "Low";
                    break;
            }
            return type;
        }
    };
});

appServices.factory('SeverityTag', function () {
    return{
        severity_type: function (tab) {
            var type;
            switch (tab) {
                case "critical":
                    type = "Κρίσιμο";
                    break;
                case "major":
                    type = "Μείζον";
                    break;
                case "normal":
                    type = "Κανονικό";
                    break;
                case "minor":
                    type = "Ελλάσον";
                    break;
                case "trivial":
                    type = "Μηδαμινό";
                    break;
                case "enhancement":
                    type = "Βελτίωση";
                    break;
            }
            return type;
        }
    };
});

appServices.factory('SeverityTagEn', function () {
    return{
        severity_type: function (tab) {
            var type;
            switch (tab) {
                case "Κρίσιμο":
                    type = "critical";
                    break;
                case "Μείζον":
                    type = "major";
                    break;
                case "Κανονικό":
                    type = "normal";
                    break;
                case "Ελλάσον":
                    type = "minor";
                    break;
                case "Μηδαμινό":
                    type = "trivial";
                    break;
                case "Βελτίωση":
                    type = "enhancement";
                    break;
            }
            return type;
        }
    };
});

appServices.factory('ResolutionTagEn', function () {
    return{
        resolution_type: function (tab) {
            var type;
            switch (tab) {
                case "Αποκατάσταση":
                    type = "FIXED";
                    break;
                case "Εσφαλμένη Αναφορά":
                    type = "INVALID";
                    break;
                case "Μη αποκατάσταση / Απόρριψη από Δήμο":
                    type = "WONTFIX";
                    break;
                case "Έχει ήδη αναφερθεί σε άλλο αίτημα":
                    type = "DUPLICATE";
                    break;
            }
            return type;
        }
    };
});
