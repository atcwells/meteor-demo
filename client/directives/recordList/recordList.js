'use strict';

angular.module('AlertDemoGenerator')
  .service('RecordListService', ['$meteor', function ($meteor) {
    var vm = this;
    vm.options = {
      perPage: 5,
      paginationPages: 3,
      page: 5,
      sort: {
        ci_name: 1
      }
    };
    vm.pageNumbers = [];
    vm.count = 0;
    vm.fields = null;
    vm.subscriptionHandle = null;
    vm.setPerPage = function (perPage) {
      vm.options.perPage = perPage;
      vm.configureService(vm.collectionName);
    };
    vm.setSort = function (field) {
      if (vm.options.sort[field]) {
        var newSortVal = parseInt(vm.options.sort[field]) * -1;
        vm.options.sort = {};
        vm.options.sort[field] = newSortVal;
      } else {
        vm.options.sort = {};
        vm.options.sort[field] = 1;
      }
      vm.configureService(vm.collectionName);
    };
    vm.setOptions = function (options) {
      vm.options = options;
    }
    vm.setPage = function (pageNumber) {
      vm.options.page = pageNumber;
      vm.configureService(vm.collectionName);
    };
    vm.configureService = function (collectionName, callback) {
      if (!collectionName)
        return;
      else
        vm.collectionName = collectionName;
      if (vm.subscriptionHandle != null)
        vm.subscriptionHandle.stop();

      vm.records = $meteor.collection(function () {
        var classObj = eval(collectionName[0].toUpperCase() + collectionName.slice(1, collectionName.length))
        return classObj.find({}, {
          sort: vm.options.sort
        });
      });

      $meteor.subscribe(collectionName, {
        limit: parseInt(vm.options.perPage),
        skip: parseInt((vm.options.page - 1) * vm.options.perPage),
        sort: vm.options.sort
      }).then(function (subscription) {
        if (!vm.fields) {
          vm.fields = [];
          for (var key in vm.records[0]) {
            vm.fields.push({
              label: key,
              value: key
            });
          }
        }
        vm.subscriptionHandle = subscription;
        vm.count = $meteor.object(Counts, collectionName + 'Count', false).count;
        var pages = Math.ceil(vm.count / vm.options.perPage);
        vm.pageNumbers = [];
        for (var i = 0; i < pages; i++) {
          vm.pageNumbers.push(i + 1);
        }
        if (callback) {
          //setTimeout(function () {
            //callback();
          //}, 2000)
        }
      });
    };
  }])

.directive('recordList', ['RecordListService', 'UserStateService', function (RecordListService, UserStateService) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      options: '='
    },
    template: '<div ng-transclude></div>',
    compile: function (element, attrs) {
      RecordListService.setOptions(UserStateService.getOptions('RecordList', attrs.collectionName));
      RecordListService.configureService(attrs.collectionName, function () {
        //UserStateService.state.loading = false;
      });
    }
  };
}])

.directive('recordListHeader', ['RecordListService', function (RecordListService) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      options: '=',
    },
    template: '<div class="ui grid">' +
      '<div class="fourteen wide column">' +
      '<h3>{{options.title}} ({{recordList.count}})</h3>' +
      '</div>' +
      '<div class="two wide column">' +
      '<div class="ui compact menu">' +
      '<div class="ui simple dropdown item">Per Page: {{recordList.options.perPage}}' +
      '<div class="menu">' +
      '<div class="item" ng-click="recordList.setPerPage(5)">5</div>' +
      '<div class="item" ng-click="recordList.setPerPage(10)">10</div>' +
      '<div class="item" ng-click="recordList.setPerPage(15)">15</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '<br />',
    link: function (scope, element, attrs) {
      scope.recordList = RecordListService;
    }
  };
}])

.directive('recordListBody', ['RecordListService', '$compile', function (RecordListService, $compile) {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      options: '=',
      selectId: '@',
      paginationIdentifier: '@'
    },
    template: '<div class="ui sub header">Fields</div>' +
      '<semantic-search-select ng-model="recordList.options.selectedFields" items="recordList.fields" select-id="{{selectId}}" placeholder="Select Fields"></semantic-search-select>' +
      '<table class="ui selectable celled table">' +
      '<thead>' +
      '<th ng-repeat="field in recordList.fields | inFieldArray:recordList.options.selectedFields:\'label\'">' +
      '<a ng-click="recordList.setSort(field.label)">{{field.label}}' +
      '<span class="glyphicon glyphicon-triangle-bottom" ng-show="recordList.options.sort[field.label] == 1"></span>' +
      '<span class="glyphicon glyphicon-triangle-top" ng-show="recordList.options.sort[field.label] == -1"></span>' +
      '</a>' +
      '</th>' +
      '</thead>' +
      '<tbody>' +
      '<tr ng-repeat="config in recordList.records">' +
      '<td ng-repeat="field in recordList.fields | inFieldArray:recordList.options.selectedFields:\'label\'">{{config[field.label]}}</td>' +
      '</tr>' +
      '</tbody>' +
      '<tfoot>' +
      '<tr>' +
      '<th colspan="{{recordList.fields.length}}">' +
      '<div class="ui right floated pagination menu">' +
      '<a class="icon item" ng-class="{disabled: recordList.options.page < 2}" ng-click="recordList.setPage(recordList.options.page - 1)">' +
      '<i class="left chevron icon"></i>' +
      '</a>' +
      '<a class="item" ng-show="recordList.options.page > recordList.options.paginationPages - 1" ng-click="recordList.setPage(recordList.pageNumbers[0])">{{recordList.pageNumbers[0]}}</a>' +
      '<a class="item" class="ui compact menu" ng-show="recordList.options.page > recordList.options.paginationPages" >' +
      '...' +
      '</a>' +
      '<a class="item" ng-repeat="pageNumber in recordList.pageNumbers | getPaginationPages:recordList.options.page:recordList.options.paginationPages" ng-click="recordList.setPage(pageNumber)" ng-class="{active: recordList.options.page == pageNumber}">{{pageNumber}}</a>' +
      '<a class="item" class="ui compact menu" ng-show="recordList.pageNumbers.length > recordList.options.paginationPages && recordList.options.page < recordList.pageNumbers.length - recordList.options.paginationPages" >' +
      '...' +
      '</a>' +
      '<a class="item" ng-show="recordList.pageNumbers.length > recordList.options.paginationPages"" ng-click="recordList.setPage(recordList.pageNumbers[recordList.pageNumbers.length - 1])">{{recordList.pageNumbers[recordList.pageNumbers.length - 1]}}</a>' +
      '<a class="icon item" ng-class="{disabled: recordList.options.page >= recordList.pageNumbers.length}" ng-click="recordList.setPage(recordList.options.page + 1)">' +
      '<i class="right chevron icon"></i>' +
      '</a>' +
      '</div>' +
      '</th>' +
      '</tr>' +
      '</tfoot>' +
      '</table>',
    link: function (scope, element, attrs) {
      scope.selectedFields = [
        'ci_name',
      ];
      scope.recordList = RecordListService;
    }
  };
}]);
