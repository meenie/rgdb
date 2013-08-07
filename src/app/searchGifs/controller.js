angular.module('rgdb.searchGifs', [])
    .config(function(stateHelperProvider) {
        stateHelperProvider.addState('mainLayout.searchGifsByKeywords', {
            views: {
                "main@mainLayout": { // Points to the ui-view="main" in main-layout.tpl.html
                    controller: 'SearchCtrl as Ctrl',
                    templateUrl: 'searchGifs/by-keywords.tpl.html',
                    resolve: {
                        gifs: ['gifsFirebase', function(gifsFirebase) {
                            return gifsFirebase.init();
                        }]
                    }
                }
            }
        });

        stateHelperProvider.addState('mainLayout.searchGifsByCategories', {
            views: {
                "main@mainLayout": { // Points to the ui-view="main" in main-layout.tpl.html
                    controller: 'SearchCtrl as Ctrl',
                    templateUrl: 'searchGifs/by-categories.tpl.html',
                    resolve: {
                        gifs: ['gifsFirebase', function(gifsFirebase) {
                            return gifsFirebase.init();
                        }]
                    }
                }
            }
        });
    })

    .controller('SearchCtrl', function($timeout, gifs, filterFilter, localStorageService, gifCategories){
        var Ctrl = this;

        Ctrl.search = function() {
            if (Ctrl.filterText) {
                Ctrl.searchedGifs = filterFilter(gifs.getGifs(), Ctrl.filterText);
                if (Ctrl.searchedGifs.length === 0) {
                    localStorageService.remove('filterText');
                    toastr.info('Your search did not produce any results.', 'No Results :(');
                } else {
                    localStorageService.add('filterText', Ctrl.filterText);
                }
            } else {
                toastr.info('Please enter a keyword to search.', 'Oops!');
            }
        };

        Ctrl.clearSearch = function() {
            Ctrl.searchedGifs = [];
            Ctrl.filterText = '';
            localStorageService.remove('filterText');
        };

        Ctrl.gifs = gifs.getGifs();
        Ctrl.categories = gifCategories;
        Ctrl.searchedGifs = [];
        Ctrl.filterText = localStorageService.get('filterText');

        if (Ctrl.filterText) {
            Ctrl.search();
        }
    })
;