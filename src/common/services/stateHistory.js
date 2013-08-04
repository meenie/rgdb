angular.module('stateHistory', ['ui.state'])
    .factory('stateHistory', function ($state) {
        var stateHistory = [];

        return {
            addHistory: function(state, params) {
                stateHistory.push({
                    state: state,
                    params: params
                });
            },
            goBack: function() {
                var state = stateHistory.pop();
                $state.transitionTo(state.state, state.params);
            },
            goForward: function() {

            }
        };
    })
    .run(function($rootScope, stateHistory) {
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            stateHistory.addHistory(fromState, fromParams);
        });
    })
;