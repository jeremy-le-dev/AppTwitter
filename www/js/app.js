angular.module('starter', ['ionic'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('app', {
                url: "/app",
                abstract: true,
                templateUrl: "templates/menu.html",
                controller: ["$rootScope", "$scope", "$ionicModal", "$timeout", "$ionicHistory", "$state", "$http", "Users", function ($rootScope, $scope, $ionicModal, $timeout, $ionicHistory, $state, $http, Users) {
                    $http.get("api.php/session")
                        .success(function(data) {
                            if (data.length == 0) {
                                $state.go("app.start");
                                $rootScope.user = {};
                            } else {
                                $rootScope.user = data;
                            }
                        })
                        .error(function() {
                            $state.go("app.start");
                        });

                    $scope.myGoBack = function() {
                        if ($ionicHistory.viewHistory().forwardView != null) {
                            $ionicHistory.goBack();
                        } else {
                            $state.go('app.feeds');
                        }
                    };

                    $scope.loginData = {};
                    $ionicModal.fromTemplateUrl('templates/login.html', {
                        scope: $scope
                    }).then(function (modal) {
                        $scope.modal = modal;
                    });

                    $scope.closeLogin = function () {
                        $scope.modal.hide();
                    };

                    $scope.login = function () {
                        $scope.modal.show();
                    };

                    $scope.doLogin = function () {
                        Users.connexion($scope.loginData.email, $scope.loginData.password).then(function(data) {
                            if (data.length > 0) {
                                $scope.closeLogin();
                                $state.go("app.feeds");
                                $rootScope.user = data;
                            } else {
                                $scope.messageErreur = "Email ou mot de passe incorrecte";
                            }
                        });
                    };

                    $scope.subscribeData = {};
                    $ionicModal.fromTemplateUrl('templates/subscribe.html', {
                        scope: $scope
                    }).then(function (modal) {
                        $scope.modal2 = modal;
                    });

                    $scope.closeSubscribe = function () {
                        $scope.modal2.hide();
                    };

                    $scope.subscribe = function () {
                        $scope.modal2.show();
                    };

                    $scope.doSubscribe = function () {
                        Users.inscription($scope.subscribeData).then(function(data) {
                            $scope.closeSubscribe();
                            Users.connexion($scope.subscribeData.email, $scope.subscribeData.password).then(function(data) {
                                if (data.length > 0) {
                                    $scope.closeLogin();
                                    $state.go("app.feeds");
                                    $rootScope.user = data;
                                } else {
                                    $scope.messageErreur = "Email ou mot de passe incorrecte";
                                }
                            });
                        });
                    };


                    $scope.doLogout = function() {
                        Users.deconnexion().then(function(data) {
                            if (data == true) {
                                $rootScope.user = {};
                                $state.go("app.start");
                            }
                        })
                    };
                }]
            })

            .state('app.feeds', {
                url: "/feeds",
                views: {
                    'menuContent': {
                        templateUrl: "templates/feeds.html",
                        controller: ["$rootScope", "$scope", "Posts", function($rootScope, $scope, Posts) {
                            Posts.getAll().then(function (posts) {
                                posts.forEach(function(item) {
                                    item.heure_publication = new Date(item.heure_publication).getTime();
                                });

                                $scope.posts = posts;
                                //console.log("posts: ", $scope.posts);

                                $scope.like = function() {

                                };

                                $scope.dislike = function() {

                                };

                                $scope.iLike = function() {

                                };
                            });
                        }]
                    }
                }
            })

            .state('app.newfeed', {
                url: "/new",
                views: {
                    'menuContent': {
                        templateUrl: "templates/feed-new.html",
                        controller: ["$rootScope", "$scope", "$state", "Posts", function($rootScope, $scope, $state, Posts) {
                            $scope.post = {};
                            $scope.publierTweet = function(id, post) {
                                console.log(post);
                                Posts.addTweet(id, post).then(function(data) {
                                    console.log(data);
                                    $state.go("app.feeds");
                                });
                            };

                            $scope.previewFile = function() {
                                var file    = document.getElementById('postMedia').files[0];
                                var reader  = new FileReader();

                                reader.onloadend = function () {
                                    $scope.post.media = reader.result;
                                };

                                if (file) {
                                    reader.readAsDataURL(file);
                                } else {
                                    $scope.post.media = "";
                                }
                            }
                        }]
                    }
                }
            })

            .state('app.feed', {
                url: "/feed/:id",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/feed.html",
                        controller: ["$rootScope", "$scope", "$stateParams", "Posts", function($rootScope, $scope, $stateParams, Posts) {
                            Posts.getById($stateParams.id).then(function (post) {
                                $scope.post = post;
                                //console.log("post: ", $scope.post);
                            });
                        }]
                    }
                }
            })

            .state('app.start', {
                url: "/start",
                views: {
                    'menuContent': {
                        templateUrl: "templates/start.html"
                    }
                }
            })

            .state('app.profile', {
                url: "/profile/:id",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/profile.html",
                        controller: ["$rootScope", "$scope", "$ionicTabsDelegate", "$stateParams", "Users", "Posts", function($rootScope, $scope, $ionicTabsDelegate, $stateParams, Users, Posts) {
                            Users.getById($stateParams.id).then(function (user) {
                                $scope.userPage = user;
                                //console.log("userPage: ", $scope.userPage);
                            });

                            Posts.getByUser($stateParams.id).then(function (posts) {
                                posts.forEach(function(item) {
                                    item.heure_publication = new Date(item.heure_publication).getTime();
                                });

                                $scope.posts = posts;
                                //console.log("posts: ", $scope.posts);
                            });
                        }]
                    }
                }
            });

        $urlRouterProvider.otherwise('/app/start');
    })

    .factory('Users', function($rootScope, $http, $q) {
        return {
            getFriends: function(id) {
                var deferred = $q.defer();

                $http.get("api.php/user/"+ id +"/friends")
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function() {
                        deferred.reject("Failed to get friends");
                    });

                return deferred.promise;
            },
            getById: function(id) {
                var deferred = $q.defer();

                $http.get("api.php/user/"+id)
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function() {
                        deferred.reject("Failed to get user");
                    });

                return deferred.promise;
            },
            add: function(user) {
                // AJOUT UTILISATEUR
            },
            remove: function(id) {
                // SUPPRESSION UTILISATEUR
            },
            connexion: function(email, password) {
                var deferred = $q.defer();

                $http.get("api.php/connexion/"+email+"/"+password)
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function() {
                        deferred.reject("Failed to get connexion");
                    });

                return deferred.promise;
            },
            deconnexion: function() {
                var deferred = $q.defer();

                $http.get("api.php/deconnexion")
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function() {
                        deferred.reject("Failed to get deconnexion");
                    });

                return deferred.promise;
            },
            inscription: function(user) {
                var deferred = $q.defer();

                $http.get("api.php/inscription/"+JSON.stringify(user))
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function() {
                        deferred.reject("Failed to get inscription");
                    });

                return deferred.promise;
            }
        }
    })

    .factory('Posts', function($rootScope, $http, $q) {
        return {
            getAll: function() {
                var deferred = $q.defer();

                $http.get("api.php/tweets")
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function() {
                        deferred.reject("Failed to get tweets");
                    });

                return deferred.promise;
            },
            getById: function(id) {
                var deferred = $q.defer();

                $http.get("api.php/tweets/"+id)
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function() {
                        deferred.reject("Failed to get tweets");
                    });

                return deferred.promise;
            },
            getByUser: function(id) {
                var deferred = $q.defer();

                $http.get("api.php/tweets/user/"+id)
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function() {
                        deferred.reject("Failed to get tweets");
                    });

                return deferred.promise;
            },
            addTweet: function(id, post) {
                var deferred = $q.defer();

                $http.get("api.php/tweets/user/"+id+"/add/"+JSON.stringify(post))
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function() {
                        deferred.reject("Failed to get tweets");
                    });

                $http.post('api.php/tweets/user/'+id+'/add/', JSON.stringify(post))
                    .then(function(data) {
                        console.log(data);
                    }, function() {

                    });

                return deferred.promise;
            },
            remove: function(id) {
                // SUPPRESSION POST
            }
        }
    });

