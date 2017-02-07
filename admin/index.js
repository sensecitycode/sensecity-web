var app = angular.module('MainAdmin', ['ngCookies','ngRoute','ngResource','login_fo','adminapp.adminctrl','adminapp.adminsrvs']);

app.config(function ($routeProvider, $locationProvider, $anchorScrollProvider) {
            
    $anchorScrollProvider.disableAutoScrolling();

    $routeProvider.when('/admin', {
        templateUrl: 'admin.html',
        controller: 'adminController'
    }).when('/', {
        templateUrl: 'login.html',
        controller: 'login_controller'
    }).otherwise({
        redirectTo: '/'
    });;

});

app.controller('MainController',['$rootScope','$http','$window','$location',function($rootScope,$http,$window,$location){
      var url_path = $location.absUrl().split("//");
            var sub_domain = url_path[1].split(".");
            var url;
        
        if( sub_domain[0].split(":").length > 1){
            url = "../config/testcity1.json";
            sub_domain[0] = "testcity1";
        }else{
            url = '../config/'+sub_domain[0]+'.json';
        }
        var mainInfo = $http.get(url).success(function (response) {
            
            $rootScope.Variables = {
                city_name: sub_domain[0],
                lat_center: response.lat_center,
                long_center: response.long_center,
                img_logo: "images/city_logos/" + response.city_name + ".jpg",
                bugzilla_products: response.bugzilla_products,
                APIURL: response.APIURL,
                bugzilla: response.bugzilla,
                ALLISSUESAPIURL: response.ALLISSUESAPIURL,
                activate_user_URL: response.active_user_URL,
                APIADMIN: response.APIADMIN,
                components: response.components,
                components_en : response.components_en,
                icons: response.icons,
                host: response.host,
                departments: response.departments,
                departments_en : response.departments_en,
                font_awesome_markers : response.font_awesome_markers,
                activeTitles: response.activeTitles,
                activeIcons: response.activeIcons,
                depUserTitles: response.depUserTitles,
                depUserContent: response.depUserContent,
                depUserIcons: response.depUserIcons,
                cityAdminTabs: response.cityAdminTabs,
                center: response.center,
                map_zoom: 12
            };
            
            return $rootScope;
        });   
        
}]);