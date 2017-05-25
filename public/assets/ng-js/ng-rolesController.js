

/*
 |--------------------------------------------------------------------------
 | Roles controller
 |--------------------------------------------------------------------------
 |
 | This controller handles the roles page
 |
 */


this.rolesController = function ($scope, $http, $location, UserService, $route, CSRF_TOKEN) {
    $scope.token = CSRF_TOKEN;
    $scope.toggleVisible = UserService.oringinRoute.length;
    $scope.toggle = UserService.oringinRoute;
    UserService.oringinRoute = $location.$$path;
    
    if($route.current.params.id) { // If the URL has a role id
        $scope.roleId = $route.current.params.id;
        // GET ROLE
        $http.get(UserService.globalRoot + "/roles/"+$scope.roleId)
            .then(function (response) {
                $scope.selectedRoles = response.data;
            });
        // END GET ROLE

        // GET ALL PERMISSIONS
        $http.get(UserService.globalRoot + "/permissions/")
            .then(function (response) {
                $scope.allPermissions = response.data;
            });
        // END GET ALL PERMISSIONS
    }
    
    $scope.confirmDelete = function(){
        $("#deleteRole").hide();
        $("#deleteRoleConfirm").show();
    }
    $scope.cancelDelete = function(){
        $("#deleteRole").show();
        $("#deleteRoleConfirm").hide();
    }

    // DELETE PERMISSION
    $scope.deletePermission = function(roleId,permissionId){

        $http.post(UserService.globalRoot + "/permission/"+roleId+"/"+permissionId+"/delete", {
            '_token': $scope._token,
            'role_id': roleId,
            'permission_id': permissionId
        }).success(function () {
            $('#permissionAlerts').removeClass().addClass('alert alert-block alert-success');
            $('#permissionAlerts').empty();
            $('#permissionAlerts').append("<h6 class='alert-heading'><i class='fa fa-check-square-o'></i> Permission removed</h6>");
            $("#permissionAlerts").fadeTo(2000, 500).show(800, function () {
                $("#permissionAlerts").hide('fade');
            });
            $http.get(UserService.globalRoot + "/roles/"+roleId)
                .then(function (response) {
                    $scope.selectedRoles = response.data;
                });
            $http.get(UserService.globalRoot + "/roles")
                .then(function (response) {
                    $scope.roles = response.data;
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
    // END DELETE PERMISSION

    // ADD PERMISSION
    $scope.addPermission = function(rleId){
        var permissionId = document.getElementById("perm").value;
        var roleId = rleId;

        $http.post(UserService.globalRoot + "/permissions/permission_role", {
            '_token': $scope._token,
            'role_id': roleId,
            'permission_id': permissionId
        }).then(function (response) {
            var result = response.data;
            if(result == 1) {
                $('#permissionAlerts').removeClass().addClass('alert alert-block alert-success');
                $('#permissionAlerts').empty();
                $('#permissionAlerts').append("<h6 class='alert-heading'><i class='fa fa-check-square-o'></i> Permission added!</h6>");
                $("#permissionAlerts").fadeTo(2000, 500).show(800, function () {
                    $("#permissionAlerts").hide('fade');
                });
                $http.get(UserService.globalRoot + "/roles/"+roleId)
                    .then(function (response) {
                        $scope.selectedRoles = response.data;
                    });
                $http.get(UserService.globalRoot + "/roles")
                    .then(function (response) {
                        $scope.roles = response.data;
                    });
            }else{
                $('#permissionAlerts').removeClass().addClass('alert alert-block alert-warning');
                $('#permissionAlerts').empty();
                $('#permissionAlerts').append("<h6 class='alert-heading'><i class='fa fa-check-square-o'></i> Permission already exists</h6>");
                $("#permissionAlerts").fadeTo(2000, 500).show(800, function () {
                    $("#permissionAlerts").hide('fade');
                });
            }
        });
    }
    // END ADD PERMISSION

    // DELETE ROLE
    $scope.deleteRole = function(){
         var roleId = $route.current.params.id;
        $http.post(UserService.globalRoot + "/roles/"+roleId, {
            '_token': $scope._token,
            '_method': 'DELETE',
            'id': roleId
        }).success(function () {
            $("#deleteMessage").fadeTo(2000, 500).show(800, function () {
                $("#deleteMessage").hide('fade');
            });
            $http.get(UserService.globalRoot + "/roles")
                .then(function (response) {
                    $scope.roles = response.data;
                });
            $("#noRole").show();
            $("#frm_createRole").hide();
        }).error(function (error) {
            console.log('delete error');
        });
    }
    // END DELETE ROLE

    // EDIT ROLE
    $scope.editRole = function(roleEdit){
        $scope.roleToEdit = angular.copy(roleEdit);
        var roleId = $scope.roleToEdit.id;

            $http.post(UserService.globalRoot + "/roles/"+roleId, {
                '_token': $scope._token,
                '_method': 'PUT',
                'id': $scope.roleToEdit.id,
                'name': $scope.roleToEdit.name,
                'description': $scope.roleToEdit.description
            }).success(function () {
                $("#errorMessage").hide();
                $("#successMessage").fadeTo(2000, 500).show(800, function () {
                    $("#successMessage").hide('fade');
                });
                $http.get(UserService.globalRoot + "/roles")
                    .then(function (response) {
                        $scope.roles = response.data;
                    });
            }).error(function (error) {
                $scope.error = error;
                $("#errorMessage").show('fade');
            });

    }
    // END EDIT ROLE

    // CREATE ROLE
    $scope.createRole = function(newrole){
        $scope.newroles = angular.copy(newrole);
        $("#errorMessage").hide();
        if($scope.newroles) {
            $http.post(UserService.globalRoot + "/roles", {
                '_token': $scope._token,
                'name': $scope.newroles.name,
                'description': $scope.newroles.description
            }).success(function () {
                $scope.role=''; //reset form to prestine
                $("#successMessage").fadeTo(2000, 500).show(800, function () {
                    $("#successMessage").hide('fade');
                });
                $http.get(UserService.globalRoot + "/roles")
                    .then(function (response) {
                        $scope.roles = response.data;
                    });
            }).error(function (error) {
                $scope.error = error;
                $("#errorMessage").show('fade');
            });
        }
    }
    // END CREATE ROLE

    // GET ROLES AND PERMISSIONS
        $http.get(UserService.globalRoot + "/roles")
            .then(function (response) {
                $scope.roles = response.data;
        });
    // END GET ROLES AND PERMISSIONS

    // TREE VIEW FUNCTIONS
    $scope.editTree = function(ulid,treeul){
            if ($('#'+ulid).is(':visible')) {
                $('#'+treeul).removeClass().addClass('fa fa-lg fa-plus-circle');
            } else {
                $('#'+treeul).removeClass().addClass('fa fa-lg fa-minus-circle');
            }
        $('#'+ulid).toggle('medium');
    }
    // END TREE VIEW FUNCTIONS

    // NEW ROLE FORM VALIDATION
    $(document).ready(function() {

        var $checkoutForm = $('#frm_createRole').validate({
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
                    required: 'Please enter role name'
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





