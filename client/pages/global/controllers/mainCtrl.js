angular.module("AlertDemoGenerator").controller("MainCtrl", ['$scope', '$state', 'UserStateService',
  function ($scope, $state, UserStateService) {
    $scope.user = UserStateService;
    $scope.state = $state;
  }
]);
