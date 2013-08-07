angular.module('tagsRequired', [])
    .directive('tagsRequired', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {
                    ctrl.$setValidity('tagsRequired', viewValue.length >= attrs.tagsRequired);

                    return viewValue;
                });
            }
        };
    })
;