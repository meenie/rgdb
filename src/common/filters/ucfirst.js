angular.module('ucfirst', [])
    .filter('ucfirst', function() {
        return function(text) {
            return text.split(' ').map(function(word) {
                return word.charAt(0).toUpperCase() + word.substring(1);
            }).join(' ');
        };
    });