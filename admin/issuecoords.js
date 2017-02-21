var app = angular.module('issuecoords', ['adminapp']);

app.controller('issuecoords_controller', ['$scope', '$rootScope', '$window','$location',function($scope,$rootScope,$window,$location){
    
    var panorama;
    
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
            
            $scope.hmap = {height:$(document).height()};
            setTimeout(function(){google.maps.event.trigger(panorama, "resize");},1);
        };
        
        $(window).off("resize");
        $(window).resize(function () {
                $("#smap").css("height",$(window).height());
                google.maps.event.trigger(panorama, "resize");
            });
}]);