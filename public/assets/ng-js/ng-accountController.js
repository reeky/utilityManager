this.accountController = function ($scope, $http, $location, UserService, $modal, $route, CSRF_TOKEN, $routeParams) {
    $scope.token = CSRF_TOKEN;
    $scope.toggleVisible = UserService.oringinRoute.length;
    $scope.toggle = UserService.oringinRoute;
    UserService.oringinRoute = $location.$$path;

    var currentId = $routeParams.id;

    // GET ACCOUNT INFORMATION
    $http.get(UserService.globalRoot + "/accounts/")
        .then(function (response) {
            $scope.accounts = response.data;
        });
    // END ACCOUNT INFORMATION


    $scope.accountdetail = function (id) {
        console.log('this is the detail function');
        $location.path('/accountDetail/'+id);
    }

};





