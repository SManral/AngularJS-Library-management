angular.module('myApp')
.controller('LoginController', ['$scope', function($scope){
	$scope.err =false;
	$scope.user = {
		'username': '',
		'password':''
	};
	$scope.login = 'Login Page';
	$scope.onlyU = function() {debugger;
		if(typeof $scope.user.username !== 'undefined') {
			$scope.user.username.toLowerCase();
			if($scope.user.username[0] != "u" || $scope.user.username != "admin" ){
				$scope.err = true;
			}
			else 
				$scope.err =false;
		}
	}
	$scope.login = function(form) {
		if(!form.$invalid) {
			$scope.user.username.toLowerCase();
			if($scope.user.username[0] === "u" && $scope.user.password !== "") {
				alert('user');
			}
			else if($scope.user.username === "admin" && $scope.user.password === "admin") {
				alert('Librarian');
			}
			else {
					alert("Enter a valid username and password")
			}
		}
	}
}]);