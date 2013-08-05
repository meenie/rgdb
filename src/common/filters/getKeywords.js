angular.module('getKeywords', [])
    .filter('getKeywords', function() {
        return function (data) {
            var keywords = _.flatten(data, 'keywords').reduce(function (acc, curr) {
                var check = curr.toLowerCase();
                if (typeof acc[check] == 'undefined') {
                    acc[check] = 1;
                } else {
                    acc[check] += 1;
                }

                return acc;
            }, []);

            keywords = Object.keys(keywords).sort(function (a, b) {
                if (keywords[b] === keywords[a]) {
                    return a < b ? -1 : 1;
                } else {
                    return keywords[b] - keywords[a];
                }
            });

            keywords = _.uniq(keywords, function(word) {
                return word.toLowerCase();
            });

            return keywords;
        };
    });