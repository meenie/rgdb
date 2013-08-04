angular.module('ui.goto', ['ui.router'])
    .directive('uiGoto', function () {
        return {
            restrict: 'A',
            controller: [
                '$scope', '$element', '$attrs', '$state',
                function ($scope, $element, $attrs, $state) {
                    $element.click(function (e) {
                        e.preventDefault();
                        var state = $attrs.uiGoto;

                        var params = {};
                        if ($attrs.uiGotoParams) {
                            params = $scope.$eval($attrs.uiGotoParams);
                            if (!angular.isObject(params)) {
                                throw new Error("Parameters for uiGotoParams must be an object");
                            }
                        }

                        $scope.$apply(function () {
                            $state.transitionTo(state, angular.extend({}, $state.params, params));
                        });
                    });

                }
            ]
        };
    })
;