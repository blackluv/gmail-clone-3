
var app = angular.module('gmailClone', [
	'ngRoute'
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
		})
});

app.factory('InboxFactory', function InboxFactory($q, $http, $location){
	var exports = {};
	exports.messages = [];

	exports.goToMessage = function(id){
		if(angular.isNumber(id)){
			// $location.path('inbox/email/' + id)
		}
	};

	exports.deleteMessage = function(id, index){
		this.messages.splice(index, 1);
	};

	// two return statements for function?
	exports.getMessages = function(){
		var dfd = $q.defer();
		return $http.get('json/emails.json')
			.success(function(data){
				exports.messages = data;
				dfd.resolve(data);
			})
			.error(function(data){
				console.log('There was an error getting emails', data);
				dfd.reject(data)
			});
		return dfd.promise;
	};

	return exports;
});

app.directive('inbox', function(){
	return {
		restrict: 'E',
		replace: true,
		scope: true,
		templateUrl: 'js/directives/inbox.tmpl.html',
		controllerAs: 'inbox',
		controller: function(InboxFactory){
			this.messages = [];
			this.goToMessage = function(id){
				InboxFactory.goToMessage(id);
			};
			this.deleteMessage = function(id, index){
				InboxFactory.deleteMessage(id, index);
			};
			InboxFactory.getMessages()
				.then(angular.bind(this, function then(){
					this.messages = InboxFactory.messages;
				}))
		},
		link: function(scope, elem, attrs, ctrl){

		}
	}
})

app.controller('InboxCtrl', function($scope, InboxFactory){
	InboxFactory.getMessages()
		.success(function(data, statusCode){
			$scope.emails = data;
		});
});

app.controller('EmailCtrl', function($scope){

});