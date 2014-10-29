
var app = angular.module('gmailClone', [
	'ngRoute',
	'ngSanitize'
]);

app.config(function($routeProvider){
	$routeProvider
		.when('/inbox', {
			templateUrl: 'views/inbox.html',
			controller: 'InboxCtrl', 
			controllerAs: 'inbox'	// instantiate controller like an object,
									// bind to $scope under a namespace
		})
		.when('/inbox/email/:id', {
			templateUrl: 'views/email.html',
			controller: 'EmailCtrl',
			controllerAs: 'email'
		})
		.otherwise({
			redirectTo: '/inbox'
		});
});

app.run(function($rootScope){
	// listen for errors that may occur during a route change
	$rootScope.$on('$routeChangeError', function(e, currRoute, prevRoute, rejectionReason){
		console.log('Failed to change routes!');
		console.log(e, currRoute, prevRoute, rejectionReason);
	})
})