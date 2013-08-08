angular.module('rgdb.addGifs', [])
    .config(function(stateHelperProvider) {
        stateHelperProvider.addState('mainLayout.addGifs', {
            views: {
                "main@mainLayout": { // Points to the ui-view="main" in main-layout.tpl.html
                    controller: 'AddGifCtrl as Ctrl',
                    templateUrl: 'addGifs/template.tpl.html',
                    resolve: {
                        gifs: ['gifsFirebase', function(gifsFirebase) {
                            return gifsFirebase.init();
                        }]
                    }
                }
            }
        });
    })

    .controller('AddGifCtrl', function($scope, $q, gifs, localStorageService, getKeywordsFilter, gifCategories) {
        var Ctrl = this,
            baseGif = {
                url: '',
                keywordsText: '',
                categories: {}
            },
            checkImageExists = function(url) {
                var img = new Image(),
                    deferred = $q.defer();

                img.src = url;
                img.onerror = function() {
                    $scope.$apply(deferred.reject('nope'));
                };

                img.onload = function() {
                    $scope.$apply(deferred.resolve('yup'));
                };

                return deferred.promise;
            };

        Ctrl.addGif = function() {
            if (gifs.checkGifExists($scope.gif.url)) {
                toastr.error('This GIF already exists within the database.', 'Redundancy is Redundant');

                return;
            }
            var check = checkImageExists($scope.gif.url);

            check.then(function() {
                // Fix selec2 items object to just an array of strings
                $scope.gif.keywords = _.map($scope.gif.keywords, function(item) {
                    return item.text;
                });

                gifs.addGif($scope.gif);
                $scope.gif = angular.copy(baseGif);
                // Update tags list if needed
                Ctrl.keywordsSelect2.tags = getKeywordsFilter(gifs.getGifs(), false);
                toastr.success('GIF has been added to the database!', 'Success!');
            }, function() {
                Ctrl.fileExists = false;
                toastr.error('Sorry, that URL does not exist. Please check and try again', 'Ruh Roh!');
            });
        };

        Ctrl.categories = gifCategories;

        Ctrl.categoriesSelect2 = {
            placeholder: 'Select one or multiple categories',
            width: 'resolve'
        };

        Ctrl.keywordsSelect2 = {
            placeholder: 'Select add at least 2 keywords',
            width: 'resolve',
            multiple: true,
            tags: getKeywordsFilter(gifs.getGifs(), false)
        };

        Ctrl.fileExists = true;

        $scope.gif = {};

        $scope.$watch('gif.url', function(val) {
            val = val == null ? '' : val;
            localStorageService.add('gifUrl', val);
        });

        $scope.$watch('gif.keywords', function(val) {
            val = val == null ? [] : val;
            localStorageService.add('gifKeywords', val);
        });

        $scope.$watch('gif.categories', function(val) {
            val = val == null ? [] : val;
            localStorageService.add('gifCategories', val);
        }, true);

        $scope.gif.url = localStorageService.get('gifUrl') !== null ? localStorageService.get('gifUrl') : '';
        $scope.gif.keywords = localStorageService.get('gifKeywords') !== null ? localStorageService.get('gifKeywords') : [];
        $scope.gif.categories = localStorageService.get('gifCategories') !== null ? localStorageService.get('gifCategories') : [];
    })
;