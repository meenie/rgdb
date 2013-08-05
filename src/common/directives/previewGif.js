angular.module('previewGif', [])
    .directive('previewGif', function() {
        return {
            restrict: 'E',
            template: '<div class="gif-preview">' +
                '<i class="glyphicon glyphicon-play-circle"></i>' +
                '<img ng-src="{{url}}" title="{{title}}">' +
                '</div>',
            replace: true,
            link: function(scope, element, attrs) {
                var url = scope.$eval(attrs.url),
                    title = scope.$eval(attrs.title),
                    previewUrl = 'http://gifpreview.com?url=',
                    on = false,
                    $img = element.find('img');

                scope.url = previewUrl + url;
                scope.title = title;
                element.attr('title', title);

                element.bind('click', function() {
                    scope.$apply(function(){
                        if (! on) {
                            element.addClass('spin');
                            scope.url = url;
                            $img.on('load', function() {
                                $img.off('load');
                                element.addClass('playing');
                                element.removeClass('spin');
                            });
                        } else {
                            element.removeClass('spin');
                            $img.off('load');
                            element.removeClass('playing');
                            scope.url = previewUrl + url;
                        }
                        on = ! on;
                    });
                });
            }
        };
    })
;