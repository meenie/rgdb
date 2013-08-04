angular.module('parseUrl', [])
    .filter('parseUrl', function () {
        var replacements = [
            {
                //URLs starting with http://, https://, or ftp://
                search: /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim,
                replace: '<a href="$1" target="_blank">$1</a>'
            },
            {
                //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
                search: /(^|[^\/])(www\.[\S]+(\b|$))/gim,
                replace: '$1<a href="http://$2" target="_blank">$2</a>'
            },
            {
                //Change email addresses to mailto:: links.
                search: /(\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6})/gim,
                replace: '<a href="mailto:$1">$1</a>'
            }
        ];

        return function (text) {
            for (var i = 0; replacements.length > i; i++) {
                text = text.replace(replacements[i].search, replacements[i].replace);
            }

            return text;
        };
    });