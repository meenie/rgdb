angular.module('endsIn', [])
    .directive('endsIn', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {
                    if (viewValue && viewValue.substr(viewValue.length - attrs.endsIn.length) === attrs.endsIn) {
                        // it is valid
                        ctrl.$setValidity('endsIn', true);
                    } else {
                        // it is invalid, return undefined (no model update)
                        ctrl.$setValidity('endsIn', false);
                    }

                    return viewValue;
                });
            }
        };
    })
;