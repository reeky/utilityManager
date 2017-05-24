

/*
 |--------------------------------------------------------------------------
 | Permissions controller
 |--------------------------------------------------------------------------
 |
 | This controller handles the permissions page
 |
 */

this.permissionsController = function ($scope, $http, $location, UserService, $route, DTOptionsBuilder, CSRF_TOKEN) {
    $scope.token = CSRF_TOKEN;
    $scope.toggleVisible = UserService.oringinRoute.length;
    $scope.toggle = UserService.oringinRoute;
    UserService.oringinRoute = $location.$$path;

    if($route.current.params.id) { // If the URL has a permission id
        $scope.permissionId = $route.current.params.id;
        // GET PERMISSION
        $http.get(UserService.globalRoot + "/permissions/"+$scope.permissionId)
            .then(function (response) {
                $scope.selectedPermissions = response.data;
            });
        // END GET PERMISSION

        // GET ALL PERMISSIONS
        $http.get(UserService.globalRoot + "/permissions/")
            .then(function (response) {
                $scope.allPermissions = response.data;
            });
        // END GET ALL PERMISSIONS
    }

    // ACTIVATE NEW PERMISSION
    $scope.activateNew = function(){
        // console.log(permissionId);
        $("#frm_viewPermission").hide();
        $("#frm_createPermission").show();
    }
    // ACTIVATE NEW PERMISSION END

    // LOAD PERMISSION CREATE
    $scope.loadPermissionCreate = function(){
        $("#frm_viewPermission").hide();
        $("#frm_createPermission").show();
    }
    // LOAD PERMISSION CREATE END

    // LOAD PERMISSION VIEW
    $scope.loadPermissionView = function(permissionId){
        $("#warningMessage").hide();
        $("#errorMessage").hide();
        $("#deleteRole").show();
        $("#deleteRoleConfirm").hide();
        $("#frm_viewPermission").show();
        $("#frm_createPermission").hide();
        $http.get(UserService.globalRoot + "/permissions/"+permissionId)
            .then(function (response) {
                $scope.selectedPermissions = response.data;
            });
    }
    // LOAD PERMISSION VIEW END

    //DELETE CONFIRMATION AND CANCELLATION
    $scope.confirmDelete = function(){
        $("#deleteRole").hide();
        $("#deleteRoleConfirm").show();
        $("#warningMessage").show();
        $('#warningMessage').removeClass().addClass('alert alert-block alert-warning');
        $('#warningMessage').empty();
        $('#warningMessage').append("<h6 class='alert-heading'><i class='fa fa-check-square-o'></i> The permission will be removed, some pages may not be accessible.</h6>");
    }
    $scope.cancelDelete = function(){
        $("#warningMessage").hide();
        $("#deleteRole").show();
        $("#deleteRoleConfirm").hide();
    }
    //END DELETE CONFIRMATION AND CANCELLATION

    // DELETE PERMISSION
    $scope.deletePermission = function(permissionId){

        $http.post(UserService.globalRoot + "/permissions/"+permissionId, {
            '_token': $scope._token,
            '_method': 'DELETE',
            'permission_id': permissionId
        }).success(function () {
            $("#warningMessage").hide();
            $("#errorMessage").hide();
            $('#successMessage').removeClass().addClass('alert alert-block alert-success');
            $('#successMessage').empty();
            $('#successMessage').append("<h6 class='alert-heading'><i class='fa fa-check-square-o'></i> Permission removed successfully</h6>");
            $("#successMessage").fadeTo(2000, 500).show(800, function () {
                $("#successMessage").hide('fade');
                $route.reload(); // angular re-render the location
            });
        }).error(function (error) {
            $("#warningMessage").hide();
            $('#errorMessageContent').empty();
            $('#errorMessageContent').append("<h6 class='alert-heading'><i class='fa fa-check-square-o'></i> Something went wrong</h6>");
            $("#errorMessage").show('fade');
        });
    }
    // END DELETE PERMISSION

    // EDIT PERMISSION
    $scope.editPermission = function(rolepermissionEdit){
        console.log('inside edit');
        $scope.rolepermissionToEdit = angular.copy(rolepermissionEdit);
        //var rolepermissionId = $scope.rolepermissionToEdit.id;

        $http.post(UserService.globalRoot + "/permissions/"+$scope.rolepermissionToEdit.id, {
            '_token': $scope._token,
            '_method': 'PUT',
            'id': $scope.rolepermissionToEdit.id,
            'name': $scope.rolepermissionToEdit.name,
            'description': $scope.rolepermissionToEdit.description
        }).success(function () {
            console.log('submit success '+$scope.rolepermissionToEdit.id);
            $("#warningMessage").hide();
            $("#errorMessage").hide();
            $('#successMessage').removeClass().addClass('alert alert-block alert-success');
            $('#successMessage').empty();
            $('#successMessage').append("<h6 class='alert-heading'><i class='fa fa-check-square-o'></i> Permission updated successfully</h6>");
            $("#successMessage").fadeTo(2000, 500).show(800, function () {
                $("#successMessage").hide('fade');
                $route.reload(); // angular re-render the location
            });
        }).error(function (error) {
            console.log('submit success');
            $scope.error = error;
            $("#warningMessage").hide();
            $('#errorMessage').removeClass().addClass('alert alert-block alert-danger');
            $('#errorMessageContent').empty();
            $('#errorMessageContent').append("<h6 class='alert-heading'><i class='fa fa-check-square-o'></i> Something went wrong</h6>");
            $("#errorMessage").show('fade');
        });

    }
    // END EDIT PERMISSION


    // CREATE PERMISSION
    $scope.createPermission = function(newpermission){
        $scope.newpermissions = angular.copy(newpermission);
        if($scope.newpermissions) {
            $http.post(UserService.globalRoot + "/permissions", {
                '_token': $scope._token,
                'name': $scope.newpermissions.name,
                'description': $scope.newpermissions.description
            }).success(function () {
                $scope.perm=''; //reset form to prestine
                $("#errorMessage").hide();
                $('#successMessage').removeClass().addClass('alert alert-block alert-success');
                $('#successMessage').empty();
                $('#successMessage').append("<h6 class='alert-heading'><i class='fa fa-check-square-o'></i> Permission created successfully</h6>");
                $("#successMessage").fadeTo(2000, 500).show(800, function () {
                    $("#successMessage").hide('fade');
                    $route.reload(); // angular re-render the location
                });
                $http.get(UserService.globalRoot + "/permissions/")
                    .then(function (response) {
                        $scope.allPermissions = response.data;
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
    // END CREATE PERMISSION


    // GET ALL PERMISSIONS
    $scope.getPermissions = function() {
        $http.get(UserService.globalRoot + "/permissions/")
            .then(function (response) {
                $scope.allPermissions = response.data;

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
    // END GET ALL PERMISSIONS

    $scope.getPermissions(); // get the permissions and load datatables

    // NEW ROLE FORM VALIDATION
    $(document).ready(function() {

        var $checkoutForm = $('#frm_createPermission').validate({
            // Rules for form validation
            rules: {
                name: {
                    required: true
                },
                description: {
                    required: true,
                    minlength: 1
                }
            },

            // Messages for form validation
            messages: {
                name: {
                    required: 'Please enter permission name'
                },
                description: {
                    required: 'Please enter a description',
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





