import * as angular from 'angular';

angular.module('baggageExample', [])
    .directive('myDirective', function () {
        return {
            restrict: 'E',
            templateUrl: './my-directive.html',
            link: function (scope) {
                scope.foo = 'world!!';
            }
        }
    });
