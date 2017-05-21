this.homeController = function ($scope, $http, $location, UserService, USER_ID) {
    $scope.toggleVisible = UserService.oringinRoute.length;
    $scope.toggle = UserService.oringinRoute;
    UserService.oringinRoute = $location.$$path;
    // UserService.globalRoot;

    var uId = USER_ID;

    // GET GET ALL USERS
    $http.get(UserService.globalRoot + "/settings/")
        .then(function (response) {
            $scope.settings = response.data;
            document.getElementById("app-name").innerHTML = $scope.settings[0].app_name;
            document.getElementById("app-footer").innerHTML = $scope.settings[0].app_footer_name;
        });
    // END GET ALL USERS


    $scope.cancel = function(){
        $('#errorMessage').removeClass().addClass('alert alert-block alert-danger');
        $("#errorMessage").hide();
        $('#passwordDiv').hide();
        $('#changePassButton').show();
    }

    $scope.activatePasswordChange = function(){
        $('#passwordDiv').show();
        $('#changePassButton').hide();
    }


    $scope.changePassword = function(changePass, uId){
        $scope.userInfo = angular.copy(changePass);

        if(changePass) {
            if($scope.userInfo.newPassword && $scope.userInfo.confirmPassword) {
                // console.log('info: ' + $scope.userInfo.exixtingPassword);
                // console.log('id: ' + uId);
                var newPassword = $scope.userInfo.newPassword;
                var confirmPassword = $scope.userInfo.confirmPassword;
                var userId = uId;


                $http.post(UserService.globalRoot + "/user/changepass/"+userId, {
                    '_token': $scope._token,
                    // '_method': 'PUT',
                    'id': userId,
                    'newPassword': newPassword,
                    'confirmPassword': confirmPassword
                }).success(function () {
                    $('#errorMessage').removeClass().addClass('alert alert-block alert-danger');
                    $("#errorMessage").hide();
                    $('#successMessage').removeClass().addClass('alert alert-block alert-success');
                    $('#successMessage').empty();
                    $('#successMessage').append("<h6 class='alert-heading'><i class='fa fa-check-square-o'></i> Password changed successfully</h6>");
                    $("#successMessage").fadeTo(2000, 500).show(800, function () {
                        $("#successMessage").hide('fade');
                        $('#passwordDiv').hide();
                        $('#changePassButton').show();
                        window.location.href = UserService.globalRoot+"/logout";
                    });
                }).error(function (error) {
                    $scope.error = error;
                    $("#warningMessage").hide();
                    $('#errorMessage').removeClass().addClass('alert alert-block alert-danger');
                    $('#errorMessageContent').empty();
                    $('#errorMessageContent').append("<h6 class='alert-heading'><i class='fa fa-check-square-o'></i> Something went wrong</h6>");
                    $("#errorMessage").show();
                });

            }
        }
    }


    // GET GET ALL USERS
    $http.get(UserService.globalRoot + "/users/"+uId)
        .then(function (response) {
            $scope.user = response.data;
        });
    // END GET ALL USERS

    // PASSWORD FORM VALIDATION
    $(document).ready(function() {

        var $checkoutForm = $('#frm_changePass').validate({
            // Rules for form validation
            rules: {
                newPassword: {
                    required: true,
                    minlength: 8
                },
                confirmPassword: {
                    required: true,
                    minlength: 8
                }
            },

            // Messages for form validation
            messages: {
                newPassword: {
                    required: 'Please enter new password',
                    minlength: jQuery.validator.format("At least {0} characters required!")
                },
                confirmPassword: {
                    required: 'Please enter confirm password',
                    minlength: jQuery.validator.format("At least {0} characters required!")
                }
            },

            // Do not change code below
            errorPlacement: function (error, element) {
                error.insertAfter(element.parent());
            }
        });
    })
    // PASSWORD VALIDATION

}





