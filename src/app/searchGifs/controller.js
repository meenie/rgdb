angular.module('rgdb.searchGifs', [])
    .config(function(stateHelperProvider) {
        stateHelperProvider.addState('mainLayout.searchGifs', {
            views: {
                "main@mainLayout": { // Points to the ui-view="main" in main-layout.tpl.html
                    controller: 'SearchCtrl as Ctrl',
                    templateUrl: 'searchGifs/template.tpl.html',
                    resolve: {
                        gifs: ['gifsFirebase', function(gifsFirebase) {
                            return gifsFirebase.init();
                        }]
                    }
                }
            }
        });
    })

    .controller('SearchCtrl', function($timeout, gifs, filterFilter){
        var Ctrl = this;

        Ctrl.gifs = gifs.getGifs();

        Ctrl.searchedGifs = [];
        Ctrl.search = function() {
            if (Ctrl.filterText) {
                Ctrl.searchedGifs = filterFilter(gifs.getGifs(), Ctrl.filterText);
                if (Ctrl.searchedGifs.length === 0) {
                    toastr.info('Your search did not produce any results.', 'No Results :(');
                }
            } else {
                toastr.info('Please enter a keyword to search.', 'Oops!');
            }
        };

        Ctrl.clearSearch = function() {
            Ctrl.searchedGifs = [];
            Ctrl.filterText = '';
        };
    })
;