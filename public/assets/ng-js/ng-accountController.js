this.accountController = function ($scope, $http, $location, UserService, $modal, $route, CSRF_TOKEN, $routeParams) {
    $scope.token = CSRF_TOKEN;
    $scope.toggleVisible = UserService.oringinRoute.length;
    $scope.toggle = UserService.oringinRoute;
    UserService.oringinRoute = $location.$$path;

    var currentId = $routeParams.id;

    $scope.readings = [];

    /*
     |--------------------------------------------------------------------------
     | Account controller
     |--------------------------------------------------------------------------
     |
     | This controller controls all the functions related to accounts
     | Including the top up modal and account listing page
     |
     */

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
    };

    // GET ACCOUNT INFORMATION
    $scope.updateReading = function(){
        $http.get(UserService.globalRoot + "/accounts/"+currentId)
            .then(function (response) {
                $scope.updatedReading = response.data;
                $scope.meterReading = $scope.updatedReading[0]['last_reading'];
                $scope.topupReading = $scope.updatedReading[0]['topup'];

                if($scope.updatedReading[0]['topup_status'] == 1 && $scope.updatedReading[0]['topup'] == 0){
                    $http.post(UserService.globalRoot + "/accounts/"+currentId, {
                        '_token': $scope._token,
                        '_method': 'PUT',
                        'status': 0
                    }).success(function () {

                    });
                    // location.reload();
                }else{

                };

            });
    };
    // END ACCOUNT INFORMATION


    // This is the meter start function
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
        });
        location.reload();
    };
    // end account start

    // This is the meter stop function
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
        });
        location.reload();
    };
    //end meter stop


    // initialize the live graph

    var $chrt_border_color = "#efefef";
    var $chrt_second = "#6595b4";
    var $chrt_fourth = "#7e9d3a";


    setInterval(function(){

        $scope.updateReading();

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
                    content : "Your consumption on <b>%x</b> was <span>%y Units</span>",
                    dateFormat : "%y-%m-%d",
                    defaultTheme : false
                },
                colors : [$chrt_second],

            };

            // var plot = $.plot($("#saleschart"), [d], options2);



        };


    }, 1000);

    //    end the graph

};

    // this function controls the loading of the top up modal

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

        // this is the validation
        // validation is not utilized
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
    //    end validation

    };
    // end top up modal loading function


    // this is the controller for the modal once it has been loaded

    this.topupModalControllerInstance = function ($scope, $http, $animate, $modalInstance, $routeParams, UserService, CSRF_TOKEN, USER_ID) {


        var currentId = $routeParams.id;;

        $scope.currentID = currentId;

        $http.get(UserService.globalRoot + "/accounts/"+currentId)
            .then(function (response) {
                $scope.newAccount = response.data;
                $scope.topupStatus = $scope.newAccount[0]['topup_status'];
            });

        $scope.enableTopup = function() {
            $scope.topupStatus = 1;
            $http.post(UserService.globalRoot + "/updateTopupStatus/"+currentId, {
                '_token': $scope._token,
                'topup_status': 1
            }).success(function () {
            });
        };

        $scope.disableTopup = function() {
            $scope.topupStatus = 0;
            $http.post(UserService.globalRoot + "/updateTopupStatus/"+currentId, {
                '_token': $scope._token,
                'topup_status': 0
            }).success(function () {
            });
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.topupAccount = function (topup){
            $http.post(UserService.globalRoot + "/updateTopup/"+currentId, {
                '_token': $scope._token,
                // '_method': 'PUT',
                'topup': topup.amount
            }).success(function () {

            });

            $modalInstance.dismiss('cancel');
        };


    };

//    end modal







