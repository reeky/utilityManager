this.asideController = function ($scope, $http, $location, UserService) {

    $scope.checkPermission = function(page,permission){
        $http.get(globalRoot + "/user/roles/"+permission)
            .then(function (response) {

                if(response.data == 1){
                    $location.path('/'+page);
                }else{
                    console.log('no permission');
                    $location.path('/403');    //redirect user to 403 page.
                }
            });
    };


    $scope.home = function(){
        $location.path('home')
    }

    $scope.users = function(){
       $scope.checkPermission('users','users_admin');
    }

    $scope.gotoRoles = function(){
        $scope.checkPermission('roles','roles_admin');
    }

    $scope.gotoPermissions = function(){
        $scope.checkPermission('permissions','permissions_admin');
    }

    $scope.gotoAddress = function(){
        $scope.checkPermission('address','roles_admin');
    }

    $scope.gotoAccountDetail = function(){
        $scope.checkPermission('accountDetail','roles_admin');
    }

    $scope.gotoAccountList = function(){
        $scope.checkPermission('accountList','roles_admin');
    }


}





