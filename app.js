angular.module('myApp', ['ui.router'])

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('login', {
            url: "/login",
            templateUrl: 'partials/login.html',
            controller: 'LoginController'
        })
        .state('library', {
            url: "/library",
            templateUrl: 'partials/library.html',
            controller: 'LibraryController'
        })
    $urlRouterProvider.otherwise('/login');
});
