angular.module('keywordsRequired', [])
    .directive('keywordsRequired', function () {
        return {
            require: 'ngModel',
            link: function (scope, elm, attrs, ctrl) {
                ctrl.$parsers.unshift(function (viewValue) {
                    var words = viewValue.split(','),
                        allGood = true;

                    for (var i = 0; words.length > i; i++) {
                        if (words[i].trim() === '') {
                            allGood = false;
                        }
                    }

                    if (allGood && words.length >= attrs.keywordsRequired) {
                        // it is valid
                        ctrl.$setValidity('keywordsRequired', true);
                    } else {
                        // it is invalid, return undefined (no model update)
                        ctrl.$setValidity('keywordsRequired', false);
                    }

                    return viewValue;
                });
            }
        };
    })
;