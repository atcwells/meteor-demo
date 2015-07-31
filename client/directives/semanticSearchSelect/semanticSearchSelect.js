'use strict';

angular.module('AlertDemoGenerator')
  .directive('semanticSearchSelect', ['$timeout', function ($timeout) {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        items: '=',
        id: '@selectId',
        placeholder: '@',
        model: '=ngModel'
      },
      template: '<select id="{{id}}" class="ui fluid search dropdown" multiple="">' +
        '<option ng-repeat="item in items" value="{{item.value}}" class="item">{{item.label}}</option>' +
        '</select>',
      link: function (scope, element, attrs) {
        /*
         * Click handler
         */
        $timeout(function () {
          $('#' + attrs.selectId).dropdown({
            onChange: function (newVal) {
              scope.model = newVal;
              scope.$apply()
            }
          });
          $('#' + attrs.selectId).dropdown('set selected', scope.model);
        }, 200);
      }
    };
  }]);
