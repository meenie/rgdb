angular.module('gifsFirebase', ['firebase', 'LocalStorageModule'])
    .constant('FIREBASE_URL', 'https://rgdb.firebaseio.com/gifs')
    .factory('gifsFirebase', function ($q, angularFireCollection, FIREBASE_URL, filterFilter) {
        var gifsRef,
            gifs,
            init = function() {
                var deferred = $q.defer();
                if (! gifsRef) {
                    gifsRef = angularFireCollection(FIREBASE_URL, function(data) {
                        gifs = _.toArray(data.val());
                        deferred.resolve(publicFns);
                    });
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
                    return gifsRef;
                },
                addGif: function (data) {
                    gifsRef.add(data);
                }
            };

        return {
            init: init
        };
    })
;