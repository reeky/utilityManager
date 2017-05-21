this.meterController = function ($scope, $http, $location, UserService, USER_ID, $routeParams) {
    $scope.toggleVisible = UserService.oringinRoute.length;
    $scope.toggle = UserService.oringinRoute;
    UserService.oringinRoute = $location.$$path;


    $scope.meter = UserService.meterReading;
    var readingDate = 1483210800000;
    var oneDay = 86400000;

    var url = window.location.pathname;
    var currentId = url.substring(url.lastIndexOf('/') + 1);

    $http.get(UserService.globalRoot + "/accounts/"+currentId)
        .then(function (response) {
            $scope.accounts = response.data;
            if($scope.accounts[0]['status']==1){
                refreshIntervalId =setInterval(function(){
                    $scope.reloadPage();
                }, 1000);
            };
        });


    $scope.runMeter = function() {
        var units = Array(510,815,400,460,612,550,750,720,475,490,590,710,635,660,680,500,220,350);
        var unitsUsed = units[Math.floor(Math.random()*units.length)];

        UserService.meterReading = UserService.meterReading+unitsUsed;
        readingDate = readingDate+oneDay;
        $scope.meter = UserService.meterReading;
        // $scope.$apply();

        $http.post(UserService.globalRoot + "/readings", {
            '_token': $scope._token,
            // '_method': 'PUT',
            'type': 1,
            'account': currentId,
            'date': readingDate,
            'reading': unitsUsed
        }).success(function () {

        });
    };


    $scope.reloadPage = function() {

        // GET ACCOUNT INFORMATION
        $http.get(UserService.globalRoot + "/accounts/"+currentId)
            .then(function (response) {
                $scope.accounts = response.data;

                if($scope.accounts[0]['status']==1){
                        $scope.runMeter();
                };

            });
        // END ACCOUNT INFORMATION







    };

    var refreshIntervalId =setInterval(function(){
            $scope.reloadPage();
        }, 1000);

    $scope.stop = function(){
        clearInterval(refreshIntervalId);
    }

    /* later */
    // clearInterval(refreshIntervalId);

    // setInterval(function(){
    //     $scope.reloadPage();
    // }, 1000);
}





