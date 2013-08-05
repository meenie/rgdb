angular.module('gifsFirebase', ['firebase', 'LocalStorageModule'])
    .constant('FIREBASE_URL', 'https://rgdb.firebaseio.com/gifs')
    .factory('gifsFirebase', function ($q, $rootScope, angularFireCollection, FIREBASE_URL, filterFilter, localStorageService) {
        var gifsRef,
            gifs,
            init = function(reInitialise) {
                var deferred = $q.defer();
                if (! gifsRef || reInitialise) {
                    if (localStorageService.get('gifs')) {
                        gifs = localStorageService.get('gifs');
                        gifsRef = angularFireCollection(FIREBASE_URL);
                        deferred.resolve(publicFns);
                    } else {
                        gifsRef = angularFireCollection(FIREBASE_URL, function(data) {
                            gifs = _.toArray(data.val());
                            localStorageService.add('gifs', gifs);
                            deferred.resolve(publicFns);
                        });
                    }
                } else {
                    deferred.resolve(publicFns);
                }

                return deferred.promise;
            },
            publicFns = {
                checkGifExists: function (url) {
                    return filterFilter(gifs, url).length > 0;
                },
                getGifs: function() {
                    return gifs;
                },
                addGif: function (data) {
                    gifsRef.add(data);
                }
            };

        var eventsRef = new Firebase(FIREBASE_URL);

        eventsRef.on('child_added', function (data) {
            var gif = data.val();
            if (! _.find(gifs, {'url': gif.url})) {
                localStorageService.remove('gifs');
                init(true);
            }
        });

        eventsRef.on('child_removed', function () {
            localStorageService.remove('gifs');
            init(true);
        });

        eventsRef.on('child_changed', function () {
            localStorageService.remove('gifs');
            init(true);
        });

        return {
            init: init
        };
    })
;