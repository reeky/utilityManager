<!DOCTYPE html>
<html lang="en-us">

@include('layouts.head')

<script>
    angular.module("ngCMS").constant("CSRF_TOKEN", '{{ csrf_token() }}');
    angular.module("ngCMS").constant("USER_ID", '{{ Auth::user()->id }}');
    angular.module("ngCMS").constant("USER_NAME", '{{ Auth::user()->name }}');
</script>
<body class="desktop-detected pace-done smart-style-1" ng-app="ngCMS" >

<div id="main" role="main" ng-controller="meterController">



    <div class="center-block" style="width: 300px; background-color: grey; margin-top: 100px; border-radius: 20px; text-align: center">
        <br>
        <h2>Utility Meter</h2>
        <input id="meter_id">
        <div style="background-color: white; margin: 30px; font-size: 40px; text-align: center; color: red">
            @{{meter}}
        </div>
        <br>


        <button class="btn btn-success" ng-click="start()">Start</button>
        <button class="btn btn-danger" ng-click="stop()">Stop</button>

        <br>
    </div>

</div>

@include('layouts.scripts')
<script>

</script>
</body>

</html>