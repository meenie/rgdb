angular.module('rgdb.addGifs', [])
    .config(function(stateHelperProvider) {
        stateHelperProvider.addState('mainLayout.addGifs', {
            views: {
                "main@mainLayout": { // Points to the ui-view="main" in main-layout.tpl.html
                    controller: 'AddGifCtrl as Ctrl',
                    templateUrl: 'addGifs/template.tpl.html',
                    resolve: {
                        gifs: ['gifsFirebase', function(gifsFirebase) {
                            return gifsFirebase.init();
                        }]
                    }
                }
            }
        });
    })

    .controller('AddGifCtrl', function($scope, $q, gifs, localStorageService) {
        var Ctrl = this,
            baseGif = {
                url: '',
                keywordsText: '',
                categories: {}
            },
            checkImageExists = function(url) {
                var img = new Image(),
                    deferred = $q.defer();

                img.src = url;
                img.onerror = function() {
                    $scope.$apply(deferred.reject('nope'));
                };

                img.onload = function() {
                    $scope.$apply(deferred.resolve('yup'));
                };

                return deferred.promise;
            };

        Ctrl.categories = [
            'Disgust/Abort Thread', 'Amazed/Excited/Nailed it', 'Clapping', 'Sad/Upset/Angry', 'Agreement/Not Bad',
            'Popcorn/Dis Gun B Gud', 'Haters Gonna Hate', 'Didn\'t Read lol', 'Mind Blown', 'Upvotes',
            'Controversial (Upvote/Downvote)', 'Downvotes', 'Wut/Confused', 'Faking Interest/Cool Story Bro', 'Dancing',
            'Fuck You/U Mad Bro?', 'OP is a faggot', 'Deal With It', 'Not Giving A Fuck', 'Erections/Fapping',
            'Laughing', 'Self-Inflected', 'Cats/Pets/Animals', 'Obama', 'Children Demolition', 'Party Hard/Swag',
            'Fighting/Minor-Injury/Pranks/Slaps', '[NSFW] Boobs and Asses', 'Sports', 'Nigel Thornberry', 'Racist',
            'Feels/NoUpsetJimmies', 'Skill', 'Doctor Who', 'Community', 'Star Trek', 'Adventure Time', 'MLP',
            'Spongebob Squarepants', 'Thanks, Obama'
        ].sort();
        Ctrl.categories.push('Miscellaneous');
        Ctrl.fileExists = true;

        Ctrl.addGif = function() {
            Ctrl.fileExists = true;
            var categories = _.keys(_.pick($scope.gif.categories, function(value) {
                return value;
            }));

            categories = _.map(categories, function(val) {
                return Ctrl.categories[val];
            });

            if (categories.length === 0) {
                toastr.error('Please select at least one category');

                return;
            }

            if (gifs.checkGifExists($scope.gif.url)) {
                toastr.error('This GIF already exists within the database.', 'Redundancy is Redundant');

                return;
            }
            var check = checkImageExists($scope.gif.url);

            check.then(function() {
                gifs.addGif({
                    keywords: $scope.gif.keywordsText.split(',').map(function(val) {
                        return val.trim();
                    }),
                    url: $scope.gif.url,
                    categories: categories
                });
                $scope.gif = angular.copy(baseGif);
                toastr.success('GIF has been added to the database!', 'Success!');
            }, function() {
                Ctrl.fileExists = false;
                toastr.error('Sorry, that URL does not exist. Please check and try again', 'Ruh Roh!');
            });
        };

        $scope.gif = {};

        $scope.$watch('gif.url', function(val) {
            val = val == null ? '' : val;
            localStorageService.add('gifUrl', val);
        });

        $scope.$watch('gif.keywordsText', function(val) {
            val = val == null ? '' : val;
            localStorageService.add('gifKeywordsText', val);
        });

        $scope.$watch('gif.categories', function(val) {
            val = val == null ? {} : val;
            localStorageService.add('gifCategories', val);
        }, true);

        $scope.gif.url = localStorageService.get('gifUrl') !== null ? localStorageService.get('gifUrl') : '';
        $scope.gif.keywordsText = localStorageService.get('gifKeywordsText') !== null ? localStorageService.get('gifKeywordsText') : '';
        $scope.gif.categories = localStorageService.get('gifCategories') !== null ? localStorageService.get('gifCategories') : {};
    })
;