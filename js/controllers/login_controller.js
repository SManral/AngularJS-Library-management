angular.module('myApp')
.controller('LoginController', ['$scope', '$state', function($scope, $state){
	$scope.err =false;

	//localStorage.clear();
	$scope.user = {
		'username': '',
		'password':''
	};
	$scope.login = 'Login Page';
	$scope.onlyU = function() {
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
				//alert('user');
    		window.localStorage.setItem("current_user", $scope.user.username);
        $state.go('library');
			}
			else if($scope.user.username === "admin" && $scope.user.password === "admin") {
				///alert('Librarian');

				$state.go('librarian');
			}
			else {
					alert("Enter a valid username and password")
			}
		}
	}
}]);
