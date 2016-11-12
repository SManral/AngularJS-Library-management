angular.module('myApp', ['ui.router'])

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: 'partials/login.html',
            controller: 'LoginController'
        })
    $urlRouterProvider.otherwise('/login');
});
 