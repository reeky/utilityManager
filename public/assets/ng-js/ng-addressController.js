

/*
 |--------------------------------------------------------------------------
 | Address controller
 |--------------------------------------------------------------------------
 |
 | This controller is not used in this iteration of the application
 |
 */


this.addressController = function ($scope, $http, $location, UserService, $modal, $route, CSRF_TOKEN, $routeParams) {
    $scope.token = CSRF_TOKEN;
    $scope.toggleVisible = UserService.oringinRoute.length;
    $scope.toggle = UserService.oringinRoute;
    UserService.oringinRoute = $location.$$path;

    var currentId = $routeParams.id;

    // GET ACCOUNT INFORMATION
    $http.get(UserService.globalRoot + "/accounts/"+currentId)
        .then(function (response) {
            $scope.accounts = response.data;
        });
    // END ACCOUNT INFORMATION









    // NEW USER FORM VALIDATION
    $(document).ready(function() {

        var $checkoutForm = $('#frm_createUser1').validate({
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
    })
    // END FORM VALIDATION


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










this.addressModalController = function ($scope, $http, $animate, $modal, CSRF_TOKEN) {

    // $scope.showModal = false;
    $scope.open = function () {

        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'createAuthorModal.html',
            controller: 'authorsModalControllerInstance',
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

this.authorsModalControllerInstance = function ($scope, $http, $animate, $modalInstance, CSRF_TOKEN, USER_ID) {


    console.log('inside the modal');


    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.createAuthor = function (){
        console.log('this is the submit form');
    };


};





