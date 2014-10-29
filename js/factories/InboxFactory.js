app.factory('InboxFactory', function InboxFactory($q, $http, $location){
	var exports = {};
	exports.messages = [];

	exports.goToMessage = function(id){
		if(angular.isNumber(id)){
			console.log('inbox/email/' + id)
			$location.path('inbox/email/' + id)
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