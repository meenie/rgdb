angular.module('rgdb', [
        // Templates
        'templates-app',
        'templates-common',
        // Vendor Modules - Live under /vendor
        'vendorModules',
        // Common Modules - Live under /src/common
        'commonModules',
        // State Manager
        'stateManager'
    ])
    .run(function run() {
        toastr.options = {
            "positionClass": "toast-top-left"
        };
    })

    .controller('AppCtrl', function($scope, localStorageService, $state, $location) {
        var Ctrl = this;

        Ctrl.popout = function() {
            window.open(chrome.extension.getURL("src/browser_action/index.html?popped-out=true"),"gc-popout-window","width=815,height=654");
        };

        Ctrl.showPopoutButton = ! $location.search()['popped-out'];

        $scope.$on('loadingHandler.loading', function(event, loading) {
            Ctrl.loading = loading;
        });

        if (! localStorageService.get('init')) {
            localStorageService.add('defaultState', 'mainLayout.searchGifs');
            localStorageService.add('init', true);
        }

        $scope.$on('$stateChangeSuccess', function(event, toState){
            localStorageService.add('defaultState', toState.name);
            $scope.currentState = toState.name;
        });

        $state.transitionTo(localStorageService.get('defaultState'));
    })
;