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

    .controller('AppCtrl', function($timeout, $scope, localStorageService, $state, $location) {
        var Ctrl = this;

        Ctrl.popout = function() {
            var w = window.open(chrome.extension.getURL("src/browser_action/index.html?popped-out=true"),"gc-popout-window","width=815,height=654");
            window.close();
            w.focus();
        };

        Ctrl.showPopoutButton = ! $location.search()['popped-out'];

        var onTimer,
            offTimer;
        $scope.$on('$stateChangeStart', function() {
            $timeout.cancel(offTimer);
            onTimer = $timeout(function() {
                Ctrl.loading = true;
            }, 0);
        });

        $scope.$on('$stateChangeSuccess', function() {
            $timeout.cancel(onTimer);
            offTimer = $timeout(function() {
                Ctrl.loading = false;
            }, 1000);

        });

        $scope.$on('$stateChangeError', function() {
            $timeout.cancel(timer);
            Ctrl.loading = false;
        });

        if (! localStorageService.get('init')) {
            localStorageService.add('defaultState', 'mainLayout.searchGifsByKeywords');
            localStorageService.add('defaultSearchState', 'mainLayout.searchGifsByKeywords');
            localStorageService.add('init', true);
        }

        $scope.$on('$stateChangeSuccess', function(event, toState){
            localStorageService.add('defaultState', toState.name);
            $scope.currentState = toState.name;
            if (toState.name.substr(0, 21) == 'mainLayout.searchGifs') {
                localStorageService.add('defaultSearchState', toState.name);
                $scope.defaultSearchState = toState.name;
            }
        });

        $state.transitionTo(localStorageService.get('defaultState'));
        $scope.currentState = localStorageService.get('defaultState');
        $scope.defaultSearchState = localStorageService.get('defaultSearchState');
    })
;