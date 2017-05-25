

/*
 |--------------------------------------------------------------------------
 | Users controller
 |--------------------------------------------------------------------------
 |
 | This controller handles the users page
 |
 */


this.usersController = function ($scope, $http, $location, UserService, $route, DTOptionsBuilder, CSRF_TOKEN) {
    $scope.token = CSRF_TOKEN;
    $scope.toggleVisible = UserService.oringinRoute.length;
    $scope.toggle = UserService.oringinRoute;
    UserService.oringinRoute = $location.$$path;
    $scope.csrf= CSRF_TOKEN;


    $( document ).ready(function() {
        Dropzone.autoDiscover = false;
        Dropzone.options.mydropzone = false;
        try{
            $("#avatardropzone").dropzone({
                init: function(){
                    var th = this;
                    this.on('queuecomplete', function(){
                        //ImageUpload.loadImage();  // CALL IMAGE LOADING HERE
                        setTimeout(function(){
                            th.removeAllFiles();
                            $("#dropzone").hide();

                            $http.get(UserService.globalRoot + "/users/"+UserService.globalUid)
                                .then(function (response) {
                                    $scope.selectedUsers = response.data;
                                });

                        },2000);
                    })
                },
                paramName: "avatarFile",
                url: "upload-avatar",
                maxFilesize: 0.5,
                maxFiles: 1,
                dictDefaultMessage: '<span class="text-center"><span class="font-lg visible-xs-block visible-sm-block visible-lg-block">' +
                '<span class="font-lg"><i class="fa fa-caret-right text-danger"></i> Drop avatar <span class="font-xs">to upload</span>' +
                '</span><span>&nbsp&nbsp<h4 class="display-inline"> (Or Click)</h4></span>',
                dictResponseError: 'Error uploading file!'
            });
        }
        catch(error){
            console.log("Catching " + error);
        }
    });


    // GET ALL ROLES
    $http.get(UserService.globalRoot + "/roles/")
        .then(function (response) {
            $scope.allRoles = response.data;
        });
    // END GET ALL ROLES

    // ACTIVATE NEW USER
    $scope.activateNew = function(){
        // console.log(permissionId);
        $("#dropzone").hide();
        $("#frm_viewEditUser").hide();
        $("#frm_createUser").show();
    }
    // ACTIVATE NEW USER END

    // PHOTO UPLOADER
    $scope.photoUploader = function(usersId){
        $("#dropzone").show();
        UserService.globalUid = usersId;

    }
    // PHOTO UPLOADER END

    //DELETE CONFIRMATION AND CANCELLATION
    $scope.confirmDelete = function(){
        $("#dropzone").hide();
        $("#deleteRole").hide();
        $("#deleteRoleConfirm").show();
        $("#warningMessage").show();
        $('#warningMessage').removeClass().addClass('alert alert-block alert-warning');
        $('#warningMessage').empty();
        $('#warningMessage').append("<h6 class='alert-heading'><i class='fa fa-check-square-o'></i> The user will will be removed permanently.</h6>");
    }
    $scope.cancelDelete = function(){
        $("#dropzone").hide();
        $("#warningMessage").hide();
        $("#deleteRole").show();
        $("#deleteRoleConfirm").hide();
    }
    //END DELETE CONFIRMATION AND CANCELLATION

    // LOAD USER VIEW
    $scope.loadUserView = function(userId){
        $("#dropzone").hide();
        $("#warningMessage").hide();
        $("#errorMessage").hide();
        $("#deleteRole").show();
        $("#deleteRoleConfirm").hide();
        $("#frm_viewEditUser").show();
        $("#frm_createUser").hide();
        $http.get(UserService.globalRoot + "/users/"+userId)
            .then(function (response) {
                $scope.selectedUsers = response.data;
            });
    }
    // LOAD USER VIEW END

    // ADD ROLE
    $scope.addRole = function(uId){
        var roleId = document.getElementById("rle").value;
        var userId = uId;

        $http.get(UserService.globalRoot + "/user/have/role/"+userId+"/"+roleId)
            .then(function (response) {
                $scope.roleCheck = response.data;
                if($scope.roleCheck.length == 1){
                    $('#permissionAlerts').removeClass().addClass('alert alert-block alert-warning');
                    $('#permissionAlerts').empty();
                    $('#permissionAlerts').append("<h6 class='alert-heading'><i class='fa fa-check-square-o'></i> Role already exists</h6>");
                    $("#permissionAlerts").fadeTo(2000, 500).show(800, function () {
                        $("#permissionAlerts").hide('fade');
                    });
                }else{
                    $http.post(UserService.globalRoot + "/user/add/role", {
                        '_token': $scope._token,
                        'role_id': roleId,
                        'user_id': userId
                    }).success(function () {
                        $('#permissionAlerts').removeClass().addClass('alert alert-block alert-success');
                        $('#permissionAlerts').empty();
                        $('#permissionAlerts').append("<h6 class='alert-heading'><i class='fa fa-check-square-o'></i> Role added!</h6>");
                        $("#permissionAlerts").fadeTo(2000, 500).show(800, function () {
                            $("#permissionAlerts").hide('fade');
                        });

                        $http.get(UserService.globalRoot + "/users/"+userId)
                            .then(function (response) {
                                $scope.selectedUsers = response.data;
                            });

                    }).error(function (error) {
                        $('#permissionAlerts').removeClass().addClass('alert alert-block alert-warning');
                        $('#permissionAlerts').empty();
                        $('#permissionAlerts').append("<h6 class='alert-heading'><i class='fa fa-check-square-o'></i> Something went wrong</h6>");
                        $("#permissionAlerts").fadeTo(2000, 500).show(800, function () {
                            $("#permissionAlerts").hide('fade');
                        });
                    });
                }
            });

    }
    // END ADD USER


    // EDIT USER
    $scope.editUser = function(uInfo){
        $scope.userInfo = angular.copy(uInfo);

        $http.post(UserService.globalRoot + "/users/"+$scope.userInfo.id, {
            '_token': $scope._token,
            '_method': 'PUT',
            'id': $scope.userInfo.id,
            'name': $scope.userInfo.name,
            'email': $scope.userInfo.email
        }).success(function () {
            $("#warningMessage").hide();
            $("#errorMessage").hide();
            $('#successMessage').removeClass().addClass('alert alert-block alert-success');
            $('#successMessage').empty();
            $('#successMessage').append("<h6 class='alert-heading'><i class='fa fa-check-square-o'></i> User updated successfully</h6>");
            $("#successMessage").fadeTo(2000, 500).show(800, function () {
                $("#successMessage").hide('fade');
                $route.reload(); // angular re-render the location
            });
        }).error(function (error) {
            $scope.error = error;
            $("#warningMessage").hide();
            $('#errorMessage').removeClass().addClass('alert alert-block alert-danger');
            $('#errorMessageContent').empty();
            $('#errorMessageContent').append("<h6 class='alert-heading'><i class='fa fa-check-square-o'></i> Something went wrong</h6>");
            $("#errorMessage").show('fade');
        });

    }
    // END EDIT USER


    // DELETE ROLE
    $scope.deleteUser = function(uid){
        var userId = uid;
        $http.post(UserService.globalRoot + "/users/"+userId, {
            '_token': $scope._token,
            '_method': 'DELETE',
            'id': userId
        }).success(function () {
            $scope.user=''; //reset form to prestine
            $("#errorMessage").hide();
            $('#successMessage').removeClass().addClass('alert alert-block alert-success');
            $('#successMessage').empty();
            $('#successMessage').append("<h6 class='alert-heading'><i class='fa fa-check-square-o'></i> User deleted successfully</h6>");
            $("#successMessage").fadeTo(2000, 500).show(800, function () {
                $("#successMessage").hide('fade');
                $route.reload(); // angular re-render the location
            });
        }).error(function (error) {
            $('#errorMessage').removeClass().addClass('alert alert-block alert-danger');
            $('#errorMessageContent').empty();
            $('#errorMessageContent').append("<h6 class='alert-heading'><i class='fa fa-check-square-o'></i> Something went wrong</h6>");
            $("#errorMessage").show('fade');
        });
    }
    // END DELETE USER

    // DELETE ROLE
    $scope.deleteRole = function(uId,rId){

        var roleId = rId;
        var userId = uId;

        $http.post(UserService.globalRoot + "/user/remove/role", {
            '_token': $scope._token,
            'role_id': roleId,
            'user_id': userId
        }).success(function () {
            $('#permissionAlerts').removeClass().addClass('alert alert-block alert-success');
            $('#permissionAlerts').empty();
            $('#permissionAlerts').append("<h6 class='alert-heading'><i class='fa fa-check-square-o'></i> Role removed</h6>");
            $("#permissionAlerts").fadeTo(2000, 500).show(800, function () {
                $("#permissionAlerts").hide('fade');
            });
            $http.get(UserService.globalRoot + "/users/"+userId)
                .then(function (response) {
                    $scope.selectedUsers = response.data;
                });
        }).error(function (error) {
            $('#permissionAlerts').removeClass().addClass('alert alert-block alert-danger');
            $('#permissionAlerts').empty();
            $('#permissionAlerts').append("<h6 class='alert-heading'><i class='fa fa-check-square-o'></i> Something went wrong</h6>");
            $("#permissionAlerts").fadeTo(2000, 500).show(800, function () {
                $("#permissionAlerts").hide('fade');
            });
        });
    }
    // END DELETE ROLE

    // CREATE USER
    $scope.createUser = function(newUser){
        $scope.newUser = angular.copy(newUser);
        if($scope.newUser) {
            $http.post(UserService.globalRoot + "/users", {
                '_token': $scope._token,
                'name': $scope.newUser.name,
                'email': $scope.newUser.email
            }).success(function () {
                $scope.user=''; //reset form to prestine
                $("#errorMessage").hide();
                $('#successMessage').removeClass().addClass('alert alert-block alert-success');
                $('#successMessage').empty();
                $('#successMessage').append("<h6 class='alert-heading'><i class='fa fa-check-square-o'></i> User created successfully</h6>");
                $("#successMessage").fadeTo(2000, 500).show(800, function () {
                    $("#successMessage").hide('fade');
                    $route.reload(); // angular re-render the location
                });
            }).error(function (error) {
                $scope.error = error;
                $('#errorMessage').removeClass().addClass('alert alert-block alert-danger');
                $('#errorMessageContent').empty();
                $('#errorMessageContent').append("<h6 class='alert-heading'><i class='fa fa-check-square-o'></i> Validation failed</h6>");
                $("#errorMessage").show('fade');
            });
        }
    }
    // END CREATE USER

    // GET ALL USER
    $scope.getUsers = function() {
        $http.get(UserService.globalRoot + "/users/")
            .then(function (response) {
                $scope.allUsers = response.data;

                // DATA TABLES STUFF
                angular.element(document).ready(function () {
                    var responsiveHelper_dt_basic = undefined;
                    var responsiveHelper_datatable_fixed_column = undefined;
                    var responsiveHelper_datatable_col_reorder = undefined;
                    var responsiveHelper_datatable_tabletools = undefined;

                    var breakpointDefinition = {
                        tablet: 1024,
                        phone: 480
                    };

                    // DataTables configurable options
                    $scope.dtOptions = DTOptionsBuilder.newOptions()
                        .withDisplayLength(10)
                        .withOption('bLengthChange', false);

                    $('#dt_basic').dataTable({
                        "sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-12 hidden-xs'l>r>" +
                        "t" +
                        "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-xs-12 col-sm-6'p>>",
                        "autoWidth": true,
                        "preDrawCallback": function () {
                            // Initialize the responsive datatables helper once.
                            if (!responsiveHelper_dt_basic) {
                                responsiveHelper_dt_basic = new ResponsiveDatatablesHelper($('#dt_basic'), breakpointDefinition);
                            }
                        },
                        "rowCallback": function (nRow) {
                            responsiveHelper_dt_basic.createExpandIcon(nRow);
                        },
                        "drawCallback": function (oSettings) {
                            responsiveHelper_dt_basic.respond();
                        }
                    });

                });
                // END DATA TABLES STUFF
            });
    }
    // END GET ALL USER

    $scope.getUsers(); // get the permissions and load datatables

    // NEW ROLE FORM VALIDATION
    $(document).ready(function() {

        var $checkoutForm = $('#frm_createUser').validate({
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


}





