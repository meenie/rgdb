angular.module('rgdb.searchGifs.byCategory', [])
    .config(function(stateHelperProvider) {

        stateHelperProvider.addState('mainLayout.searchGifsByCategory', {
            views: {
                "main@mainLayout": { // Points to the ui-view="main" in main-layout.tpl.html
                    controller: 'SearchByCategoryCtrl as Ctrl',
                    templateUrl: 'searchGifs/byCategory/template.tpl.html',
                    resolve: {
                        gifs: ['gifsFirebase', function(gifsFirebase) {
                            return gifsFirebase.init();
                        }]
                    }
                }
            }
        });
    })

    .controller('SearchByCategoryCtrl', function($timeout, gifs, filterFilter, localStorageService, gifCategories){
        var Ctrl = this;

        Ctrl.filterCategoryGifs = function(category) {
            Ctrl.categoryGifs = filterFilter(Ctrl.gifs, {'categories': category});
            if (Ctrl.categoryGifs.length === 0) {
                localStorageService.remove('categoryFilter');
                toastr.info('There are no GIFs under this category.', 'No Results :(');
            } else {
                window.scrollTo(0, 0);
                localStorageService.add('categoryFilter', category);
                Ctrl.categoryFilter = category;
            }
        };

        Ctrl.clearCategoryFilter = function() {
            Ctrl.categoryGifs = [];
            Ctrl.categoryFilter = '';
            localStorageService.remove('categoryFilter');
        };

        Ctrl.gifs = gifs.getGifs();
        var currentCategories = _.flatten(Ctrl.gifs, 'categories');
        Ctrl.categories = filterFilter(gifCategories, function(item) {
            return currentCategories.indexOf(item.name) > -1;
        });
        Ctrl.categoryGifs = [];
        Ctrl.categoryFilter = localStorageService.get('categoryFilter');

        if (Ctrl.categoryFilter) {
            Ctrl.filterCategoryGifs(Ctrl.categoryFilter);
        }
    })
;