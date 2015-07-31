'use strict';

angular.module('AlertDemoGenerator')
  .service('UserStateService', ['$meteor', function ($meteor) {
    var vm = this;
    var options = {
      RecordList: {
        normalizations: {
          perPage: 5,
          paginationPages: 3,
          page: 5,
          sort: {
            source_attribute: 1
          },
          selectedFields: [
            'normalized_attribute',
            'source_attribute'
          ]
        },
        configurations: {
          perPage: 5,
          paginationPages: 3,
          page: 5,
          sort: {
            ci_name: 1
          },
          selectedFields: [
            'ci_name',
            'topic'
          ]
        }
      }
    }
    var state = {
      loading: true,
    }
    vm.getState = function() {
      return state;
    }
    vm.getOptions = function (component, context) {
      return options[component][context];
    }
    vm.setOptions = function (component, context, options) {

    }
  }]);
