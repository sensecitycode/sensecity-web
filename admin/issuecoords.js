var app = angular.module('issuecoords', ['adminapp']);

app.controller('issuecoords_controller', ['$scope', '$rootScope', '$window', '$location','$cookieStore', function ($scope, $rootScope, $window, $location,$cookieStore) {

        var panorama;

        $scope.$on('$routeChangeStart', function (next, last) {
            $(window).off("resize");
            $cookieStore.remove("desc");
            $cookieStore.remove("issue");
        });

        $scope.initialize = function () {
            var issue_coords = $location.$$url.replace('/issuecoords=', '').split(",");
            var fenway = {lat: 38.246453, lng: 21.735068};
            //$window.alert(issue_coords[0] + ","+issue_coords[1]);
            //var fenway = {lat: issue_coords[0], lng: issue_coords[1]};
            var panoOptions = {
                position: fenway,
                addressControlOptions: {
                    position: google.maps.ControlPosition.BOTTOM_CENTER
                },
                fullscreenControl: false,
                linksControl: false,
                panControl: false,
                zoom: 12,
                scrollwheel: false,
                enableCloseButton: false
            };
            panorama = new google.maps.StreetViewPanorama(
                    document.getElementById('smap'), panoOptions);

            $scope.hmap = {height: $(document).height()};
            
            var issue_index = $rootScope.Variables.departments.indexOf($cookieStore.get("issue"));

                var issueMarker = new google.maps.Marker({
                    position: {"lat":parseFloat(issue_coords[0]),"lng":parseFloat(issue_coords[1])},
                    map: panorama,
                    icon: './icons/' + $cookieStore.get("issue") + '.png',
                    title: $rootScope.Variables.departments_en[issue_index],
                    visible: true
                });
                var category_index = $rootScope.Variables.departments_en.indexOf(issueMarker.title);
                issueMarker.info = new google.maps.InfoWindow({
                    content: $cookieStore.get("desc")
                });
                google.maps.event.addListener(issueMarker, 'click', function () {
                    issueMarker.info.open(panorama, issueMarker);
                });
                var myLatlng = new google.maps.LatLng(parseFloat(issue_coords[0]),parseFloat(issue_coords[1]));
//$window.alert($scope.street_view_marker.position);
                panorama.setPosition(myLatlng);
            
            setTimeout(function () {
                google.maps.event.trigger(panorama, "resize");
            }, 1);
        };

        $(window).resize(function () {
            $("#smap").css("height", $(window).height());
            google.maps.event.trigger(panorama, "resize");
        });
    }]);