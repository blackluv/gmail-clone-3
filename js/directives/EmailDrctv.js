app.directive('email', function EmailDrctv($timeout){
	return {
		restict: 'E',
		replace: true,
		scope: true,
		templateUrl: 'js/directives/email.tmpl.html',
		controllerAs: 'email',
		controller: function($routeParams, $scope, EmailFactory){
			this.message = {};
			this.reply = function(message){
				EmailFactory.reply(message);
			};
			var getmessage = EmailFactory.getMessage($routeParams);
			if(getmessage){
				getmessage.then(angular.bind(this, function(res){
					EmailFactory.message = res;
					this.message = EmailFactory.message;
					$scope.$parent.email.title = this.message.subject;
				}));
			}
		},
		link: function(scope, elem, attrs, ctrl){
			var textarea = elem.find('.email__response-text')[0];
			scope.$watch('reply', function(newVal, oldVal){
				if(newVal === oldVal) return;
				if(newVal){
					$timeout(function(){
						textarea.focus();
					}, 0);
				}
			})
		}
	};
});


























