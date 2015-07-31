angular.module("AlertDemoGenerator").run(["$rootScope", "$state", function ($rootScope, $state) {
  $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    if (error === "AUTH_REQUIRED") {
      $state.go('/home');
    }
  });
}]);

angular.module('AlertDemoGenerator').config(['$urlRouterProvider', '$stateProvider', '$locationProvider',
  function ($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $stateProvider
      .state('configurations', {
        url: '/configurations',
        templateUrl: 'client/pages/configurations/views/configurations.ng.html',
        controller: 'ConfigurationsCtrl'
      })
      .state('normalizations', {
        url: '/normalizations',
        templateUrl: 'client/pages/normalizations/views/normalizations.ng.html',
        controller: 'NormalizationsCtrl'
      })
      .state('alerts', {
        url: '/alerts',
        templateUrl: 'client/pages/alerts/views/alerts.ng.html',
        controller: 'AlertCtrl'
      });

    $urlRouterProvider.otherwise('/home');
  }
]);
