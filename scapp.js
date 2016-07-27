var app = angular.module('scApp', [ 'mgcrea.ngStrap', 'scapp.controllers', 'overviewapp.controllers',
		'scapp.services', 'ngResource',  'ngRoute', 'ui-leaflet', 'angular-loading-bar',
		'ngAnimate', 'pascalprecht.translate', 'ngCookies' ]);

app.config(function($routeProvider, $locationProvider, $anchorScrollProvider,
		cfpLoadingBarProvider) {

	$anchorScrollProvider.disableAutoScrolling();

	cfpLoadingBarProvider.includeSpinner = true;
	cfpLoadingBarProvider.includeBar = true;

	$routeProvider.when('/overview', {
		templateUrl : 'overview.html',
		controller : 'overviewctrl'
	}).when('/web_report', {
		templateUrl : 'scwebsubmit.html',
		controller : 'scWebSubmit'
	}).when('/', {
		templateUrl : 'scmapcontent.html',
		controller : 'mainOverviewController'
	}).otherwise({
		redirectTo : '/'
	});

});

app.controller('NavCtrl', [ '$scope', '$location', '$rootScope','$translate', function($scope, $location, $rootScope,$translate) {
	
	//$scope.user = $rootScope.fstoreuser;
	
	$scope.navClass = function(page) {
		var currentRoute = $location.path().substring(1) || 'home';
		return page === currentRoute ? 'active' : '';
	};
	
	
	$scope.changeLanguage = function (langKey) {
		$translate.use(langKey);
	 };
    
} ]);



app.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('en', {
        'LONGTITUDE': 'Longtitude',
        'LATTITUDE': 'Lattitude',
        'GARBAGE_ISSUE': 'Cleaning issue',
        'LIGHTNING_ISSUE': 'Lighting issue',
        'PLUMBING_ISSUE': 'Plumbing issue',
        'ROAD_ISSUE': 'Road/Construction issue',
        'TITLE': 'What\'s happening in the city',
        'ISSUES_SINCE': 'Reported issues since',
        'SOLUTIONS_SINCE': 'Issues solved since',
        'ISSUES_LAST_X_DAYS': 'Reported issues last',
        'EVENTS_LAST_X_DAYS': 'Reported events last',
        'DAYS': 'days',
        'MOOD': 'Mood',
        'SINCE_TIME': 'since',
        'HOURS': 'hours',
        'MINUTES': 'minutes',
        'SECS': 'seconds',
        'CONFIRMED': 'Submitted',
        'IN_PROGRESS': 'Assigned/In progress',
        'RESOLVED': 'Resolved',
        'PROBLEMTYPE':'Issue type',
        'PROBLEM':'Issue',
        'SELPROBLEM': 'Select an issue',
        'OTHER':'Other',
        'BROKEN_PLATES': 'Broken Plates',
        'OBJECT_INTERFERING':'Object interfering',
        'ABANDONED_CAR':'Abandoned Car',
        'BAD_ROAD':'Bad road',
        'CLOGGED_WELL':'Clogged Well', 
        'BROKEN_WELL':'Broken Well',
        'GLOWING_LAMPS':'Glowing Lamps', 
        'BROKEN_ARM':'Broken Arm', 
        'INSUFFICIENT_LIGHTING':'Insufficient Lighting', 
        'BROKENGARBAGE_BIN':'Broken Bin', 
        'FULL_GARBAGE_BIN':'Full Garbage Bin', 
        'FAILING_GARBAGE_BIN':'Missing Garbage Bin',
        'DESCRIPTION' : 'Description',
        'PHOTO':'Photo',
        'SUBMIT':'Submit',
        'OTHERPROBWRITE':'Describe issue'
        


	
    });
   
    $translateProvider.translations('el', {
        'LONGTITUDE': 'Γεωγραφικό Μήκος',
        'LATTITUDE': 'Γεωγραφικό Πλάτος',
        'GARBAGE_ISSUE': 'Πρόβλημα Καθαριότητας',
        'LIGHTNING_ISSUE': 'Πρόβλημα Φωτισμού',
        'PLUMBING_ISSUE': 'Πρόβλημα Υδρευσης',
        'ROAD_ISSUE': 'Πρόβλημα Δρόμου/Πεζοδρομίου',
        'TITLE': 'Τι συμβαίνει στην πόλη',
        'ISSUES_SINCE': 'Προβλήματα από',
        'SOLUTIONS_SINCE': 'Λύσεις από',
        'ISSUES_LAST_X_DAYS': 'Προβλήματα τελ.',
        'EVENTS_LAST_X_DAYS': 'Συμβάντα τελ.',
        'DAYS': 'ημέρες',
        'MOOD': 'Διάθεση',
        'SINCE_TIME': 'πριν από',
        'HOURS': 'ώρες',
        'MINUTES': 'λεπτά',
        'SECS': 'δευτερόλεπτα',
        'CONFIRMED': 'Ανοιχτό',
        'IN_PROGRESS': 'Ανάθεση/Σε εκτελέση',
        'RESOLVED': 'Ολοκληρωμένο',
        'PROBLEMTYPE':'Τύπος προβλήματος',
        'PROBLEM':'Πρόβλημα',
        'SELPROBLEM': 'Select a Problem',
        'OTHER':'Άλλο',
        'BROKEN_PLATES': 'Σπασμένες Πλάκες"',
        'OBJECT_INTERFERING':'Αντικείμενο που εμποδίζει',
        'ABANDONED_CAR':'Εγκαταλ. Αυτοκίνητο',
        'BAD_ROAD':'Λακούβα',
        'CLOGGED_WELL':'Βουλωμένο Φρεάτιο', 
        'BROKEN_WELL':'Σπασμένο Φρεάτιο',
        'GLOWING_LAMPS':'Καμμένος Λαμπτήρας', 
        'BROKEN_ARM':'Σπασμένος Βραχίωνας', 
        'INSUFFICIENT_LIGHTING':'Ανεπαρκής Φωτισμός', 
        'BROKENGARBAGE_BIN':'Χαλασμένος Κάδος', 
        'FULL_GARBAGE_BIN':'Γεμάτος Κάδος', 
        'FAILING_GARBAGE_BIN':'Έλλειψη κάδου',
        'DESCRIPTION' : 'Περιγραφή',
        'PHOTO':'Φωτογραφία',
        'SUBMIT':'Αποστολή',
        'OTHERPROBWRITE':'Γράψτε το πρόβλημα'
        	
      
    });
   
    $translateProvider.preferredLanguage('el');
	      $translateProvider.useLocalStorage();
  }]);
	