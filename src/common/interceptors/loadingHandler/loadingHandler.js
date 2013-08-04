/**
 * This module will listen to all requests/responses and trigger
 * a loading event if the total time is over Nth second(s). This event
 * could be used to trigger a "Please Wait While Page Is Loading" message.
 */
angular.module('loadingHandler', [])
    /**
     * Change this if you want the loading events triggered earlier/later
     * Default is 1 second (1000 milliseconds)
     *
     * @integer - milliseconds
     */
    .constant('FADE_IN_DELAY', 1000)
    .constant('FADE_OUT_DELAY', 1500)
    .config(function($httpProvider, FADE_IN_DELAY, FADE_OUT_DELAY) {
        var loading = false,
            numberOfRequests = 0,
            requestTimer,
            responseTimer,
            increaseRequest = function($rootScope, $timeout) {
                numberOfRequests++;
                if (! loading) {
                    loading = true;
                    $timeout.cancel(responseTimer);
                    requestTimer = $timeout(function() {
                        $rootScope.$broadcast('loadingHandler.loading', loading);
                    }, FADE_IN_DELAY);
                }
            },
            decreaseRequest = function($rootScope, $timeout) {
                if (loading) {
                    numberOfRequests--;
                    if (numberOfRequests === 0) {
                        loading = false;
                        responseTimer = $timeout(function() {
                            $timeout.cancel(requestTimer);
                            $rootScope.$broadcast('loadingHandler.loading', loading);
                        }, FADE_OUT_DELAY);
                    }
                }
            };

        $httpProvider.interceptors.push(['$q', '$rootScope', '$timeout', function($q, $rootScope, $timeout) {
            return {
                'request': function(config) {
                    increaseRequest($rootScope, $timeout);

                    return config || $q.when(config);
                },
                'requestError': function(rejection) {
                    decreaseRequest($rootScope, $timeout);

                    return $q.reject(rejection);
                },
                'response': function(response) {
                    decreaseRequest($rootScope, $timeout);

                    return response || $q.when(response);
                },
                'responseError': function(rejection) {
                    decreaseRequest($rootScope, $timeout);

                    return $q.reject(rejection);
                }
            };
        }]);
    })
;