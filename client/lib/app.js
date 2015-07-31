angular.module('AlertDemoGenerator', [
    'angular-meteor',
    'ui.router'
]);

function onReady() {
    angular.bootstrap(document, ['AlertDemoGenerator']);
}

if (Meteor.isCordova)
    angular.element(document).on("deviceready", onReady);
else
    angular.element(document).ready(onReady);
