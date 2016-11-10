var appControllers = angular.module('scissuemapapp.scissuemapctrl', []);

appControllers.controller('scissuemapctrl',['$scope','$location','EndPointService','BugService','ToGrService','Issue2MapService','FixPoints2MapService','FixPointsMarkerService',
                                      function($scope,$location,EndPointService,BugService,ToGrService,Issue2MapService,FixPoints2MapService,FixPointsMarkerService){

    var icons = {
      garbage: {
        type: 'awesomeMarker',
        prefix: 'fa',
        icon: 'trash-o',
        markerColor: 'green'
      },
      "road-contructor": {
        type: 'awesomeMarker',
        prefix: 'fa',
        icon: 'road',
        markerColor: 'cadetblue'
      },
      plumbing: {
        type: 'awesomeMarker',
        prefix: 'fa',
        icon: 'umbrella',
        markerColor: 'darkpuple'
      },
      lighting: {
        type: 'awesomeMarker',
        prefix: 'fa',
        icon: 'lightbulb-o',
        markerColor: 'orange'
      },
      angry: {
        type: 'awesomeMarker',
        prefix: 'fa',
        icon: 'frown-o',
        markerColor: 'lightgreen',
        iconColor: 'darkgreen'
      },
      neutral: {
        type: 'awesomeMarker',
        prefix: 'fa',
        icon: 'meh-o',
        markerColor: 'lightgreen',
        iconColor: 'darkgreen'
      },
      happy: {
        type: 'awesomeMarker',
        prefix: 'fa',
        icon: 'smile-o',
        markerColor: 'lightgreen',
        iconColor: 'darkgreen'
      },
      staticGarbage: {
        type: 'extraMarker',
        icon: 'fa-trash-o',
        prefix: 'fa',
        markerColor: 'green',
        shape: 'square'
      },
      staticGarbageRecycle: {
        type: 'extraMarker',
        prefix: 'fa',
        icon: 'fa-trash-o',
        markerColor: 'cyan',
        shape: 'square'
      },
      staticLighting: {
        type: 'extraMarker',
        prefix: 'fa',
        icon: 'fa-lightbulb-o',
        markerColor: 'yellow',
        shape: 'square'
      }
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
        }
    };

    $scope.center ={};
    $scope.markers ={};

    $scope.submit = "";
    $scope.assignment = "---";
    $scope.completion = "---";

    //parse ?issue_id from URL
    var issue_id = $location.search().issue_id;

    Issue2MapService.get({issueID:issue_id}, function(issue) {
		
		console.log(issue);
		
		$scope.issue_image = issue.image_name;
		$scope.center = {lat:issue.loc.coordinates[1],lng:issue.loc.coordinates[0],zoom:16};
		$scope.markers = [{"lat":issue.loc.coordinates[1],"lng":issue.loc.coordinates[0],"icon":icons[issue.issue]}];

		if (issue.issue == "garbage" || "lighting"){
			var type;
			if (issue.issue=="lighting")
			{
				type = "fotistiko";
			} else {
				type = issue.issue;
			}

			FixPoints2MapService.query({long:issue.loc.coordinates[0],lat:issue.loc.coordinates[1],type:type}, function(fix_points) {
				angular.forEach(fix_points, function(value,key) {
					var icon = FixPointsMarkerService.icon(value);
					$scope.markers.push({"lat":value.loc.coordinates[1],"lng":value.loc.coordinates[0],"icon":icons[icon]});
				});
			});
		}

		var issue_name_new;
		
		
		
		switch(issue.issue){
			case "garbage":
				if(localStorage.getItem("language") === 'en'){
					issue_name_new = 'Cleaning Problem';
				}else{
					issue_name_new = "Πρόβλημα Καθαριότητας";
				}
				break;
			case "lighting":
				if(localStorage.getItem("language") === 'en'){
					issue_name_new = 'Lighting Problem';
				}else{
					issue_name_new = "Πρόβλημα Φωτισμού";
				}
				break;
			case "plumbing":
				if(localStorage.getItem("language") === 'en'){
					issue_name_new = 'Plumbing Problem';
				}else{
					issue_name_new = "Προβλήματα ύδρευσης";
				}
				break;
			case "road-contructor":
				if(localStorage.getItem("language") === 'en'){
					issue_name_new = 'Street/Sidewalk Problem';
				}else{
					issue_name_new = "Πρόβλημα Δρόμου/Πεζοδρομίου";
				}
			case "protection-policy":
				if(localStorage.getItem("language") === 'en'){
					issue_name_new = 'Protection Policy';
				}else{
					issue_name_new = "Πολιτική Προστασία";
				}
			case "green":
				if(localStorage.getItem("language") === 'en'){
					issue_name_new = 'Green';
				}else{
					issue_name_new = "Πράσινο";
				}
				break;
			default:
				break;
		}
      
		$scope.issue_name_new = issue_name_new;
		$scope.issue_value_desc = issue.value_desc;
    });


    //progress-bar percentage
    var params1 = { "ids":issue_id ,
          "include_fields":["component","cf_sensecityissue","status","id","alias","summary","creation_time","whiteboard","resolution"]};
    var obj1 =
      {
          "method": "Bug.get",
          "params": [params1],
          "id": 1
      };
    BugService.search(obj1, function(result) {
      moment.locale('el');
      var local_time_sub = moment(result[0].creation_time).format('LLL');
      $scope.submit = local_time_sub;
      var width;
      switch(result[0].status){
        case "CONFIRMED":
          width = "16%";
          break;
        case "IN_PROGRESS":
          width = "50%";
          break;
        case "RESOLVED":
          width = "100%";
          break;
      }
      $scope.barwidth = width;
    });

    //progress info
    var params2 = { "ids":issue_id};
    var obj2 =
      {
          "method": "Bug.history",
          "params": [params1],
          "id": 1
      };
    BugService.search(obj2, function(result) {
      moment.locale('el');

      var local_time_assign = null;
      var time_assign = null;
      var time_compl = null;

      for (i = 0; i < result[0].history.length; i++)
      {
        for (j = 0; j <result[0].history[i].changes.length; j++)
        {
          if (result[0].history[i].changes[j].added == "IN_PROGRESS")
          {
            time_assign = result[0].history[i].when;
          }
        }
      }

      if (time_assign !== null)
      {
        local_time_assign = moment(time_assign).format('LLL');
        $scope.assignment = local_time_assign;
      }



      for (i = 0; i < result[0].history.length; i++)
      {
        for (j = 0; j <result[0].history[i].changes.length; j++)
        {
          if (result[0].history[i].changes[j].added == "RESOLVED")
          {
            time_compl = result[0].history[i].when;
          }
          if (result[0].history[i].changes[j].field_name == "resolution")
          {
            $scope.resol = result[0].history[i].changes[j].added;
          }
        }
      }

      if (time_compl !== null)
      {
        var local_time_compl = moment(time_compl).format('LLL');
        switch($scope.resol){
          case "FIXED":
            if(localStorage.getItem("language") === 'en'){
              new_resol = 'Fixed';
            }else{
              new_resol = "Αποκατάσταση";
            }
            break;
          case "INVALID":
            if(localStorage.getItem("language") === 'en'){
              new_resol = 'Invalid';
            }else{
              new_resol = "Εσφαλμένο αίτημα";
            }
            break;
          case "WONTFIX":
            if(localStorage.getItem("language") === 'en'){
              new_resol = 'Will not Fix';
            }else{
              new_resol = "Μη αποκατάσταση";
            }
            break;
          case "DUPLICATE":
            if(localStorage.getItem("language") === 'en'){
              new_resol = 'Already reported in other issue';
            }else{
              new_resol = "Εχει ήδη αναφερθεί στο παρελθόν";
            }
            break;
        }
        //$('#completion').replaceWith("("+new_resol+")<br />"+local_time_compl);
        $scope.completion = "("+new_resol+")\n"+local_time_compl;
        console.log($scope.completion);
        // $('#completion').html('');
        // $('#completion').html("("+new_resol+")<br />"+local_time_compl);
      }
    });

}]);
