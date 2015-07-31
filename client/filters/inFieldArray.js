angular.module('AlertDemoGenerator').filter('inFieldArray', function () {
    return function (members, arr, field) {

        var filteredMembers = [];
        angular.forEach(members, function(member) {
          if (arr.indexOf(member[field]) > -1)
              filteredMembers.push(member);
        })
        return filteredMembers;
    };
});
