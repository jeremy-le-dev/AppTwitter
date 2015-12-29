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
                controller: ["$rootScope", "$scope", "$ionicModal", "$timeout", "$ionicHistory", function ($rootScope, $scope, $ionicModal, $timeout, $ionicHistory) {

                    $scope.myGoBack = function() {
                        $ionicHistory.goBack();
                    };

                    $rootScope.user = {
                        id: 15,
                        name: "Froment",
                        username: "Jérémy",
                        email: "jeremyfroment@yahoo.fr",
                        avatar: "img/jeremy.jpg"
                    };

                    console.log("user:", $rootScope.user);

                    $scope.loginData = {};
                    $ionicModal.fromTemplateUrl('templates/social/login.html', {
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
                        console.log('Doing login', $scope.loginData);

                        $timeout(function () {
                            $scope.closeLogin();
                        }, 1000);
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
                                $scope.posts = posts;
                                console.log("posts: ", posts);
                            });
                        }]
                    }
                }
            })

            .state('app.feed', {
                url: "/feed/:id",
                views: {
                    'menuContent' :{
                        templateUrl: "templates/feed.html",
                        controller: ["$rootScope", "$scope", "$stateParams", "post", function($rootScope, $scope, $stateParams, Posts) {
                            Posts.getById($stateParams.id).then(function (post) {
                                $scope.post = post;
                                console.log("post: ", post);
                            });
                            $scope.post = post;
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
                        resolve: {
                            user: function($stateParams, Users) {
                                return Users.getById($stateParams.id);
                            },
                            posts: function(Posts) {
                                return Posts.getAll();
                            }
                        },
                        controller: ["$rootScope", "$scope", "$ionicTabsDelegate", "user", "posts", function($rootScope, $scope, $ionicTabsDelegate, user, posts) {
                            console.log("user: ", user);
                            $scope.user = user;

                            console.log("posts: ", posts);
                            $scope.posts = posts;
                        }]
                    }
                }
            });
//
//    .state('app.fgrid', {
//      url: "/fgrid",
//      views: {
//        'menuContent' :{
//          templateUrl: "templates/social/friend-grid.html"
//        }
//      }
//    })
//
//    .state('app.flist', {
//      url: "/flist",
//      views: {
//        'menuContent' :{
//          templateUrl: "templates/social/friends.html"
//        }
//      }
//    })
//
//    .state('app.newpost', {
//      url: "/newpost",
//      views: {
//        'menuContent' :{
//          templateUrl: "templates/social/new-post.html"
//        }
//      }
//    })
//
//    .state('app.email', {
//      url: "/email",
//      views: {
//        'menuContent' :{
//          templateUrl: "templates/social/send-email.html"
//        }
//      }
//    })
//
//    .state('app.profile', {
//      url: "/profile",
//      views: {
//        'menuContent' :{
//          templateUrl: "templates/social/profile.html"
//        }
//      }
//    })
//
//    .state('app.timeline', {
//      url: "/timeline",
//      views: {
//        'menuContent' :{
//          templateUrl: "templates/social/timeline.html"
//        }
//      }
//    })
//
//    .state('app.editprofile', {
//      url: "/editprofile",
//      views: {
//        'menuContent' :{
//          templateUrl: "templates/social/profile-edit.html"
//        }
//      }
//    })
//
//
//    .state('app.profilethree', {
//      url: "/profilethree",
//      views: {
//        'menuContent' :{
//          templateUrl: "templates/social/profile3.html"
//        }
//      }
//    })
//
//    .state('app.news', {
//      url: "/news",
//      views: {
//        'menuContent' :{
//          templateUrl: "templates/social/news.html"
//        }
//      }
//    })
//


//    .state('app.viewposttwo', {
//      url: "/viewposttwo",
//      views: {
//        'menuContent' :{
//          templateUrl: "templates/social/view-post-2.html"
//        }
//      }
//    })
//
//    .state('app.invite', {
//      url: "/invite",
//      views: {
//        'menuContent' :{
//          templateUrl: "templates/social/social-invite-friend.html"
//        }
//      }
//    });

        $urlRouterProvider.otherwise('/app/start');
    })

    .factory('Users', function($rootScope, $http) {
        var users = [
            {
                id: 0,
                username: "Tammy",
                name: "Wilson",
                email: "tammywilson@kwitter.com",
                avatar: "img/67.jpg"
            },
            {
                id: 1,
                username: "Larry",
                name: "Lucas",
                email: "larrylucas@kwitter.com",
                avatar: "img/82.jpg"
            },
            {
                id: 2,
                username: "Louis",
                name: "Taylor",
                email: "louistaylor@kwitter.com",
                avatar: "img/78.jpg"
            },
            {
                id: 3,
                username: "Vicki",
                name: "Sanchez",
                email: "vickisanchez@kwitter.com",
                avatar: "img/0.jpg"
            },
            {
                id: 4,
                username: "Margie",
                name: "Jacobs",
                email: "margiejacobs@kwitter.com",
                avatar: "img/68.jpg"
            }
        ];

        return {
            getFriends: function() {
                return users;
            },
            getById: function(id) {
                return users[id];
            },
            add: function(user) {
                users.push(user);
            },
            remove: function(id) {
                users.remove(id);
            }
        }
    })

    .factory('Posts', function($rootScope, $http, $q, Users) {
        var posts = [
            {
                id: 0,
                title: "Mon premier post",
                content: "Paphius quin etiam et Cornelius senatores, ambo venenorum artibus pravis se polluisse confessi, eodem pronuntiante Maximino sunt interfecti. pari sorte etiam procurator monetae extinctus est. Sericum enim et Asbolium supra dictos, quoniam cum hortaretur passim nominare, quos vellent, adiecta religione firmarat, nullum igni vel ferro se puniri iussurum, plumbi validis ictibus interemit. et post hoe flammis Campensem aruspicem dedit, in negotio eius nullo sacramento constrictus.",
                image: "img/gemionic/gall-item-1.jpg",
                created_at: "26/10/15",
                user: Users.getById(0)
            },
            {
                id: 1,
                title: "Mon deuxieme post",
                content: "Paphius quin etiam et Cornelius senatores, ambo venenorum artibus pravis se polluisse confessi, eodem pronuntiante Maximino sunt interfecti. pari sorte etiam procurator monetae extinctus est. Sericum enim et Asbolium supra dictos, quoniam cum hortaretur passim nominare, quos vellent, adiecta religione firmarat, nullum igni vel ferro se puniri iussurum, plumbi validis ictibus interemit. et post hoe flammis Campensem aruspicem dedit, in negotio eius nullo sacramento constrictus.",
                image: "img/gemionic/gall-item-2.jpg",
                created_at: "26/10/15",
                user: Users.getById(1)
            },
            {
                id: 2,
                title: "Mon troisieme post",
                content: "Paphius quin etiam et Cornelius senatores, ambo venenorum artibus pravis se polluisse confessi, eodem pronuntiante Maximino sunt interfecti. pari sorte etiam procurator monetae extinctus est. Sericum enim et Asbolium supra dictos, quoniam cum hortaretur passim nominare, quos vellent, adiecta religione firmarat, nullum igni vel ferro se puniri iussurum, plumbi validis ictibus interemit. et post hoe flammis Campensem aruspicem dedit, in negotio eius nullo sacramento constrictus.",
                image: "img/gemionic/gall-item-3.jpg",
                created_at: "26/10/15",
                user: Users.getById(2)
            },
            {
                id: 3,
                title: "Mon quatrieme post",
                content: "Paphius quin etiam et Cornelius senatores, ambo venenorum artibus pravis se polluisse confessi, eodem pronuntiante Maximino sunt interfecti. pari sorte etiam procurator monetae extinctus est. Sericum enim et Asbolium supra dictos, quoniam cum hortaretur passim nominare, quos vellent, adiecta religione firmarat, nullum igni vel ferro se puniri iussurum, plumbi validis ictibus interemit. et post hoe flammis Campensem aruspicem dedit, in negotio eius nullo sacramento constrictus.",
                image: "img/gemionic/gall-item-4.jpg",
                created_at: "26/10/15",
                user: Users.getById(3)
            },
            {
                id: 4,
                title: "Mon cinquieme post",
                content: "Paphius quin etiam et Cornelius senatores, ambo venenorum artibus pravis se polluisse confessi, eodem pronuntiante Maximino sunt interfecti. pari sorte etiam procurator monetae extinctus est. Sericum enim et Asbolium supra dictos, quoniam cum hortaretur passim nominare, quos vellent, adiecta religione firmarat, nullum igni vel ferro se puniri iussurum, plumbi validis ictibus interemit. et post hoe flammis Campensem aruspicem dedit, in negotio eius nullo sacramento constrictus.",
                image: "img/gemionic/gall-item-5.jpg",
                created_at: "26/10/15",
                user: Users.getById(4)
            }
        ];
        var deferred = $q.defer();
        return {
            getAll: function() {
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
                $http.get("api.php/tweets/"+id)
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function() {
                        deferred.reject("Failed to get tweets");
                    });

                return deferred.promise;
            },
            getByUser: function(userId) {
                $http.get("api.php/tweets/user/"+id)
                    .success(function(data) {
                        deferred.resolve(data);
                    })
                    .error(function() {
                        deferred.reject("Failed to get tweets");
                    });

                return deferred.promise;
            },
            add: function(post) {
                posts.push(post);
            },
            remove: function(id) {
                posts.remove(id);
            }
        }
    });

