this.accountController = function ($scope, $http, $location, UserService, $modal, $route, CSRF_TOKEN, $routeParams) {
    $scope.token = CSRF_TOKEN;
    $scope.toggleVisible = UserService.oringinRoute.length;
    $scope.toggle = UserService.oringinRoute;
    UserService.oringinRoute = $location.$$path;

    var currentId = $routeParams.id;

    $scope.readings = [];


    // GET ACCOUNT INFORMATION
    $http.get(UserService.globalRoot + "/accounts/")
        .then(function (response) {
            $scope.accounts = response.data;
        });
    // END ACCOUNT INFORMATION


    $scope.accountdetail = function (id) {
        console.log('this is the detail function');
        $location.path('/accountDetail/'+id);
        location.reload();
    }


    $scope.startMeter = function(){
        $http.post(UserService.globalRoot + "/accounts/"+currentId, {
            '_token': $scope._token,
            '_method': 'PUT',
            'status': 1
        }).success(function () {
            $http.get(UserService.globalRoot + "/accounts/"+currentId)
                .then(function (response) {
                    $scope.accounts = response.data;
                });
        })
    };

    $scope.stopMeter = function(){
        $http.post(UserService.globalRoot + "/accounts/"+currentId, {
            '_token': $scope._token,
            '_method': 'PUT',
            'status': 0
        }).success(function () {
            $http.get(UserService.globalRoot + "/accounts/"+currentId)
                .then(function (response) {
                    $scope.accounts = response.data;
                });
        })
    };


    // graph

    var $chrt_border_color = "#efefef";
    var $chrt_second = "#6595b4";
    var $chrt_fourth = "#7e9d3a";


    setInterval(function(){



        if ($("#saleschart").length) {

            var d = [];

            // GET READINGS
            $http.get(UserService.globalRoot + "/readings/"+currentId)
            // $http.get(UserService.globalRoot + "/readings/")
                .then(function (response) {
                    // $scope.readings = response.data;

                    angular.forEach($scope.readings, function(reading) {
                        this.push([reading.date,  reading.reading]);
                    }, d);

                    var plot = $.plot($("#saleschart"), [d], options2);

                    $scope.readings = response.data;


                });
            // END READINGS

            for (var i = 0; i < d.length; ++i)
                d[i][0] += 60 * 60 * 1000;

            function weekendAreas(axes) {
                var markings = [];
                var d = new Date(axes.xaxis.min);
                // go to the first Saturday
                d.setUTCDate(d.getUTCDate() - ((d.getUTCDay() + 1) % 7))
                d.setUTCSeconds(0);
                d.setUTCMinutes(0);
                d.setUTCHours(0);
                var i = d.getTime();
                do {
                    // when we don't set yaxis, the rectangle automatically
                    // extends to infinity upwards and downwards
                    markings.push({
                        xaxis : {
                            from : i,
                            to : i + 2 * 24 * 60 * 60 * 1000
                        }
                    });
                    i += 7 * 24 * 60 * 60 * 1000;
                } while (i < axes.xaxis.max);

                return markings;
            }

            var options2 = {
                xaxis : {
                    mode : "time",
                    tickLength : 5
                },
                series : {
                    lines : {
                        show : true,
                        lineWidth : 1,
                        fill : true,
                        fillColor : {
                            colors : [{
                                opacity : 0.1
                            }, {
                                opacity : 0.15
                            }]
                        }
                    },
                    //points: { show: true },
                    shadowSize : 0
                },
                selection : {
                    mode : "x"
                },
                grid : {
                    hoverable : true,
                    clickable : true,
                    tickColor : $chrt_border_color,
                    borderWidth : 0,
                    borderColor : $chrt_border_color,
                },
                tooltip : true,
                tooltipOpts : {
                    content : "Your consumption for <b>%x</b> was <span>%y Units</span>",
                    dateFormat : "%y-%m-%d",
                    defaultTheme : false
                },
                colors : [$chrt_second],

            };

            // var plot = $.plot($("#saleschart"), [d], options2);



        };


    }, 1000);

};

    this.topupModalController = function ($scope, $http, $animate, $modal, CSRF_TOKEN) {

        // $scope.showModal = false;
        $scope.open = function () {

            var modalInstance = $modal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'topupModal.html',
                controller: 'topupModalControllerInstance',
                resolve: {
                    pId: function () {
                        return $scope.projectId;
                    }
                }
            });
        };

        var $checkoutForm2 = $('#frm_createUser').validate({
            // Rules for form validation
            rules: {
                name: {
                    required: true
                },
                email: {
                    required: true,
                    email: true,
                    minlength: 1
                }
            },

            // Messages for form validation
            messages: {
                name: {
                    required: 'Please enter a name'
                },
                email: {
                    required: 'Please enter an email',
                    email: 'Please enter a valid email address',
                    minlength: jQuery.validator.format("At least {0} characters required!")
                }
            },

            // Do not change code below
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });

    };

    this.topupModalControllerInstance = function ($scope, $http, $animate, $modalInstance, CSRF_TOKEN, USER_ID) {


        console.log('inside the topup modal');


        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.createAuthor = function (){
            console.log('this is the submit form');
        };


    };







