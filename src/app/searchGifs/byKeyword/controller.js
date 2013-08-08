angular.module('rgdb.searchGifs.byKeyword', [])
    .config(function(stateHelperProvider) {
        stateHelperProvider.addState('mainLayout.searchGifsByKeyword', {
            views: {
                "main@mainLayout": { // Points to the ui-view="main" in main-layout.tpl.html
                    controller: 'SearchByKeywordCtrl as Ctrl',
                    templateUrl: 'searchGifs/byKeyword/template.tpl.html',
                    resolve: {
                        gifs: ['gifsFirebase', function(gifsFirebase) {
                            return gifsFirebase.init();
                        }]
                    }
                }
            }
        });
    })

    .controller('SearchByKeywordCtrl', function($timeout, gifs, filterFilter, localStorageService){
        var Ctrl = this;

        Ctrl.search = function() {
            if (Ctrl.filterText) {
                Ctrl.searchedGifs = filterFilter(gifs.getGifs(), {'keywords': Ctrl.filterText});
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
        Ctrl.searchedGifs = [];
        Ctrl.filterText = localStorageService.get('filterText');

        if (Ctrl.filterText) {
            Ctrl.search();
        }
    })
;