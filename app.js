angular.module('myApp', ['ui.router'])

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('signUp', {
            url: "/signUp",
            templateUrl: 'partials/login.html',
            controller: 'LoginController'
        })
    $urlRouterProvider.otherwise('/signUp');
});
 