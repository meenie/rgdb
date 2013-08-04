angular.module('selectText', [])
    .directive('selectText', function() {
        return {
            link: function(scope, element, attrs) {
                element.bind('click', function() {
                    element[0].select();
                });
            }
        };
    })
;