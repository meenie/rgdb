angular.module('stateManager', ['siteModules', 'stateHelper'])
    .config(function(
        $stateProvider,
        stateHelperProvider
    ) {
        $stateProvider
            .state('modalLayout', {
                abstract: true,
                views: {
                    'app@': { // Points to the ui-view="app" in the index.html
                        templateUrl: '_layouts/modal-layout.tpl.html'
                    }
                }
            })
            .state('mainLayout', {
                abstract: true,
                views: {
                    'app@': { // Points to the ui-view in the index.html
                        templateUrl: '_layouts/main-layout.tpl.html'
                    },
                    'navigation@mainLayout': { // Points to the ui-view="navigation" in main-layout.tpl.html
                        templateUrl: '_partials/navigation.tpl.html'
                    }
                }
            })
        ;

        angular.forEach(stateHelperProvider.getStates(), function(state) {
            $stateProvider.state(state.name, state.options);
        });
    })
;