angular.module('previewGif', [])
    .directive('previewGif', function() {
        return {
            template: '<div class="gif-preview">' +
                '<i class="glyphicon glyphicon-play-circle"></i>' +
                '<img ng-src="{{url}}">' +
                '</div>',
            replace: true,
            link: function(scope, element, attrs) {
                var url = scope.$eval(attrs.previewGif),
                    previewUrl = 'http://gifpreview.com?url=',
                    on = false;

                scope.url = previewUrl + url;
                element.bind('click', function() {
                    if (! on) {
                        element.addClass('playing');
                        scope.url = url;
                    } else {
                        element.removeClass('playing');
                        scope.url = previewUrl + url;
                    }
                    on = ! on;

                    scope.$digest();
                });
            }
        };
    })
;