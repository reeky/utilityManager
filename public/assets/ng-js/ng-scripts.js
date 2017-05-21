var globalRoot = window.location.origin;
(function() {

    var app = angular.module("ngCMS", ["ngIdle","ngAnimate","ngRoute","ui.bootstrap","datatables"]);

    app.controller('EventsCtrl', function($scope, Idle, $route, $location) {
        $scope.events = [];

        $scope.$on('IdleStart', function() {
            // the user appears to have gone idle
        });

        $scope.$on('IdleWarn', function(e, countdown) {
            // follows after the IdleStart event, but includes a countdown until the user is considered timed out
            // the countdown arg is the number of seconds remaining until then.
            // you can change the title or display a warning dialog from here.
            // you can let them resume their session by calling Idle.watch()
            window.location = '/logout';
        });

        $scope.$on('IdleTimeout', function() {
            // the user has timed out (meaning idleDuration + timeout has passed without any activity)
            // this is where you'd log them
        });

        $scope.$on('IdleEnd', function() {
            // the user has come back from AFK and is doing stuff. if you are warning them, you can use this to hide the dialog
            $route.reload();

        });

        $scope.$on('Keepalive', function() {
            // do something to keep the user's session alive
        });

    })
        .config(function(IdleProvider, KeepaliveProvider) {
            // configure Idle settings
            IdleProvider.idle(1100); // in seconds
            // IdleProvider.timeout(10); // in seconds
            // KeepaliveProvider.interval(2); // in seconds
        })
        .run(function(Idle){
            // start watching when the app runs. also starts the Keepalive service by default.
            Idle.watch();
        });


    app.factory('UserService', function($location) {
        return {
            oringinRoute : '',
            globalUid : 451,
            globalRoot : window.location.origin,
            meterReading: 300201
        };
    });


    ////////////////////// ROUTES ///////////////////////
    app.config(function($routeProvider){

        $routeProvider
            .when("/403", {
                templateUrl: "DOM/unauthorized.html",
                controller: "homeController"
            })
            .when("/404", {
                templateUrl: "DOM/404.html",
            })
            .when("/", {
                templateUrl: "DOM/home.html",
                controller: "homeController"
            })
            .when("/home", {
                templateUrl: "DOM/home.html",
                controller: "homeController"
            })
            .when("/meter/:id", {
                templateUrl: "DOM/meter.html",
                controller: "homeController"
            })
            .when("/users", {
                resolve:{
                    "check":function($location, $http){
                        $http.get(globalRoot + "/user/roles/users_admin")
                            .then(function (response) {
                                if(response.data == 0){
                                    console.log('no permission from route');
                                    $location.path('/403');    //redirect user to 403 page.
                                }
                            });
                    }
                },
                templateUrl: "DOM/users.html",
                controller: "usersController",
            })
            .when("/roles", {
                resolve:{
                    "check":function($location, $http){
                        $http.get(globalRoot + "/user/roles/roles_admin")
                            .then(function (response) {
                                if(response.data == 0){
                                    console.log('no permission from route');
                                    $location.path('/403');    //redirect user to 403 page.
                                }
                            });
                    }
                },
                templateUrl: "DOM/createRole.html",
                controller: "rolesController"
            })
            .when("/permissions", {
                resolve:{
                    "check":function($location, $http){
                        $http.get(globalRoot + "/user/roles/permissions_admin")
                            .then(function (response) {
                                if(response.data == 0){
                                    console.log('no permission from route');
                                    $location.path('/403');    //redirect user to 403 page.
                                }
                            });
                    }
                },
                templateUrl: "DOM/viewPermission.html",
                controller: "permissionsController"
            })
            .when("/permission/:id", {
                resolve:{
                    "check":function($location, $http){
                        $http.get(globalRoot + "/user/roles/permissions_admin")
                            .then(function (response) {
                                if(response.data == 0){
                                    console.log('no permission from route');
                                    $location.path('/403');    //redirect user to 403 page.
                                }
                            });
                    }
                },
                templateUrl: "DOM/viewPermission.html",
                controller: "permissionsController"
            })
            .when("/role/:id", {
                resolve:{
                    "check":function($location, $http){
                        $http.get(globalRoot + "/user/roles/roles_admin")
                            .then(function (response) {
                                if(response.data == 0){
                                    console.log('no permission from route');
                                    $location.path('/403');    //redirect user to 403 page.
                                }
                            });
                    }
                },
                templateUrl: "DOM/viewRole.html",
                controller: "rolesController"
            })
            .when("/address", {
                resolve:{
                    "check":function($location, $http){
                        $http.get(globalRoot + "/user/roles/roles_admin")
                            .then(function (response) {
                                if(response.data == 0){
                                    console.log('no permission from route');
                                    $location.path('/403');    //redirect user to 403 page.
                                }
                            });
                    }
                },
                templateUrl: "DOM/address.html",
                controller: "addressController"
            })
            .when("/accountDetail/:id", {
                resolve:{
                    "check":function($location, $http){
                        $http.get(globalRoot + "/user/roles/roles_admin")
                            .then(function (response) {
                                if(response.data == 0){
                                    console.log('no permission from route');
                                    $location.path('/403');    //redirect user to 403 page.
                                }
                            });
                    }
                },
                templateUrl: "DOM/accountDetail.html",
                controller: "addressController"
            })
            .when("/accountList", {
                resolve:{
                    "check":function($location, $http){
                        $http.get(globalRoot + "/user/roles/roles_admin")
                            .then(function (response) {
                                if(response.data == 0){
                                    console.log('no permission from route');
                                    $location.path('/403');    //redirect user to 403 page.
                                }
                            });
                    }
                },
                templateUrl: "DOM/accountList.html",
                controller: "accountController"
            })
            .otherwise({redirectTo:"/404"});
    });
    ////////////////////// ROUTES END  ///////////////////////

////////////////////// DROPZONE DIRECTIVE  ///////////////////////
    app.directive('dropzone', function(){
        return function (scope, element, attrs) {
            var config, dropzone;

            config = scope[attrs.dropzone];

            // create a Dropzone for the element with the given options
            dropzone = new Dropzone(element[0], config.options);

            // bind the given event handlers
            angular.forEach(config.eventHandlers, function (handler, event) {
                dropzone.on(event, handler);
            });
        };
    });
////////////////////// DROPZONE DIRECTIVE END  ///////////////////////



    app.controller("asideController", asideController);
    app.controller("homeController", homeController);
    app.controller("meterController", meterController);
    app.controller("usersController", usersController);
    app.controller("rolesController", rolesController);
    app.controller("permissionsController", permissionsController);
    app.controller("addressController", addressController);
    app.controller("addressModalController", addressModalController);
    app.controller("authorsModalControllerInstance", authorsModalControllerInstance);
    app.controller("accountController", accountController);


    //////////////////// CONTROLLERS END //////////////////////

})();





