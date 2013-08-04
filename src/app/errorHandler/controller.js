angular.module('errorHandler', [])
    .config(function(stateHelperProvider) {
        stateHelperProvider.addState('modalLayout.errorHandler', {
            views: {
                "main@modalLayout": { // Points to the ui-view="main" in modal-layout.tpl.html
                    controller: 'ErrorHandlerCtrl as ErrorHandlerCtrl',
                    templateUrl: 'errorHandler/template.tpl.html'
                }
            },
            params: ['title', 'message', 'details']
        });
    })
    .config(function($httpProvider) {
        $httpProvider.responseInterceptors.push(['$q', '$injector', function($q, $injector) {
            return function (promise) {
                return promise.then(function(response) {
                    // Nothing needed here
                    return response;
                }, function(response) {
                    var $state = $injector.get('$state'),
                        $filter = $injector.get('$filter'),
                        errors = {
                            400: '400 - Bad Request',
                            403: '403 - Access Forbidden',
                            404: '404 - Not Found',
                            500: '500 - Internal Server Error',
                            0: 'CORS Error - API Not Accepting Request'
                        };
                    // Only on 404 errors will we transition to the Error State.
                    if (response.status in errors) {
                        $state.transitionTo('modalLayout.errorHandler', {
                            title: errors[response.status],
                            message: response.data.message,
                            details: $filter('json')(response)
                        });
                    }

                    return $q.reject(response);
                });
            };
        }]);
    })
    .controller('ErrorHandlerCtrl', function ErrorHandlerCtrl(titleService, $stateParams, $window) {
        var Ctrl = this;

        titleService.setTitle($stateParams.title);

        Ctrl.title = $stateParams.title;
        Ctrl.message = $stateParams.message;
        Ctrl.details = $stateParams.details;

        Ctrl.goBack = function() {
            $window.history.back();
        };
    })
;

