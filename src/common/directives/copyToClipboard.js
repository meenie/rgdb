angular.module('copyToClipboard', [])
    .directive('copyToClipboard', function() {
        return {
            link: function(scope, element, attrs) {
                var url = scope.$eval(attrs.copyToClipboard);
                element.bind('click', function() {
                    var textarea = document.createElement('textarea');
                    textarea.innerText = url;
                    document.querySelector('body').appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    textarea.parentNode.removeChild(textarea);
                    toastr.success('The URL has been copied to your clipboard!', 'Copied!');
                });
            }
        };
    })
;