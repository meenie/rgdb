angular.module('rgdb.addGifs', [])
    .config(function(stateHelperProvider) {
        stateHelperProvider.addState('mainLayout.addGifs', {
            views: {
                "main@mainLayout": { // Points to the ui-view="main" in main-layout.tpl.html
                    controller: 'AddGifCtrl as Ctrl',
                    templateUrl: 'addGifs/template.tpl.html'
                }
            }
        });
    })

    .controller('AddGifCtrl', function($scope, $q, gifsFirebase, localStorageService) {
        var Ctrl = this,
            baseGif = {
                url: '',
                keywordsText: ''
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

        Ctrl.fileExists = true;

        Ctrl.addGif = function() {
            Ctrl.fileExists = true;
            if (gifsFirebase.checkGifExists($scope.gif.url)) {
                toastr.error('This GIF already exists within the database.', 'Redundancy is Redundant');

                return;
            }
            var check = checkImageExists($scope.gif.url);

            check.then(function() {
                gifsFirebase.addGif({
                    keywords: $scope.gif.keywordsText.split(',').map(function(val) {
                        return val.trim();
                    }),
                    url: $scope.gif.url
                });
                $scope.gif = angular.copy(baseGif);
                toastr.success('GIF has been added to the database!', 'Success!');
            }, function() {
                Ctrl.fileExists = false;
                toastr.error('Sorry, that URL does not exist. Please check and try again', 'Ruh Roh!');
            });
        };

        $scope.gif = {};

        $scope.$watch('gif.url', function(val) {
            val = val == null ? '' : val;
            localStorageService.add('gifUrl', val);
        });

        $scope.$watch('gif.keywordsText', function(val) {
            val = val == null ? '' : val;
            localStorageService.add('gifKeywordsText', val);
        });

        $scope.gif.url = localStorageService.get('gifUrl') !== null ? localStorageService.get('gifUrl') : '';
        $scope.gif.keywordsText = localStorageService.get('gifKeywordsText') !== null ? localStorageService.get('gifKeywordsText') : '';
    })
;