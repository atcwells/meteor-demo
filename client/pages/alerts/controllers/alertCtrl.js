angular.module("AlertDemoGenerator").controller("AlertCtrl", ['$scope', '$meteor', '$state',
    function ($scope, $meteor, $state) {


        $scope.alerts = $meteor.collection(function () {
            return Alerts.find({});
        });
        $meteor.subscribe('alerts').then(function () {
            $scope.alertCount = $meteor.object(Counts, 'numberOfAlerts', false);
        });
        $scope.sources = $meteor.collection(function () {
            return Sources.find({});
        });
        $meteor.subscribe('sources').then(function () {
            $scope.sourceCount = $meteor.object(Counts, 'numberOfSources', false);
        });

        $scope.switchActive = function (source) {
            Sources.update(source._id, {
                $set: {
                    active: !source.active
                }
            });
        };
    }
]);
