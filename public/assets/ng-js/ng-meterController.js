


/*
 |--------------------------------------------------------------------------
 | Meter controller
 |--------------------------------------------------------------------------
 |
 | This controller handles the meter page
 |
 */


this.meterController = function ($scope, $http, $location, UserService, USER_ID, $routeParams) {
    $scope.toggleVisible = UserService.oringinRoute.length;
    $scope.toggle = UserService.oringinRoute;
    UserService.oringinRoute = $location.$$path;


    // $scope.meter = UserService.meterReading;
    var url = window.location.pathname;
    var currentId = url.substring(url.lastIndexOf('/') + 1);

    $scope.meterId = currentId;

    // check for changes in the meter reading
    var refreshIntervalId =setInterval(function(){
    $http.get(UserService.globalRoot + "/accounts/"+currentId)
        .then(function (response) {
            $scope.accounts = response.data;

            $scope.meter = $scope.accounts[0]['last_reading'];
            var readDate = $scope.accounts[0]['last_reading_date'];
            var oneDay = 86400000;

            if($scope.accounts[0]['status']==1){
                // refreshIntervalId =setInterval(function(){
                //     // $scope.reloadPage();

                var units = Array(510,815,400,460,612,550,750,720,475,490,590,710,635,660,680,500,220,350);
                var unitsUsed = units[Math.floor(Math.random()*units.length)];

                var meterReading = $scope.accounts[0]['last_reading']+unitsUsed;
                var readingDate = +readDate + +oneDay;
                $scope.meter = meterReading;
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

                $http.post(UserService.globalRoot + "/updateReading/"+currentId, {
                    '_token': $scope._token,
                    // '_method': 'PUT',
                    'lastReading': meterReading,
                    'lastReadingDate': readingDate
                }).success(function () {

                });

                if($scope.accounts[0]['topup_status']==1){

                    var remainingTopup = $scope.accounts[0]['topup']-unitsUsed;

                    console.log(remainingTopup);

                    if(remainingTopup < 0){
                        remainingTopup = 0;
                    };

                    $http.post(UserService.globalRoot + "/updateTopup/"+currentId, {
                        '_token': $scope._token,
                        // '_method': 'PUT',
                        'topup': remainingTopup
                    }).success(function () {

                    });
                };

            }else{
                // console.log('do not reload');
            };
        //     end meter check
        });
    }, 1000);


};





