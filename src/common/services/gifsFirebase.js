angular.module('gifsFirebase', ['firebase', 'LocalStorageModule'])
    .constant('FIREBASE_URL', 'https://rgdb.firebaseio.com/gifs')
    .factory('gifsFirebase', function ($rootScope, angularFireCollection, FIREBASE_URL, filterFilter) {
        var gifs = angularFireCollection(FIREBASE_URL);

        return {
            checkGifExists: function(url) {
                return filterFilter(gifs, url).length > 0;
            },
            getGifs: function() {
                return gifs;
            },
            addGif: function(data) {
                gifs.add(data);
            }
        };
    })
;