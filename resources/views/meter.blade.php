<!DOCTYPE html>
<html lang="en-us">

@include('layouts.head')

<script>
    angular.module("ngCMS").constant("CSRF_TOKEN", '{{ csrf_token() }}');
    angular.module("ngCMS").constant("USER_ID", '{{ Auth::user()->id }}');
    angular.module("ngCMS").constant("USER_NAME", '{{ Auth::user()->name }}');
</script>
<body class="desktop-detected pace-done smart-style-1" ng-app="ngCMS" style="background-color: darkred">

<div id="main" role="main" ng-controller="meterController">


    <div class="center-block" style="width: 300px; background-color: darkred; margin-top: 100px; border-radius: 20px; text-align: center">
        <br>
        <h1 style="color: lightgrey; font-size: 30px">SMART METER</h1>
        <h1 style="color: lightgrey">@{{meterId}}</h1>

        <div style="background-color: white; margin: 30px; font-size: 40px; text-align: center; color: red">
            @{{meter}}
        </div>
        <br>

        <br>
    </div>

</div>

@include('layouts.scripts')
<script>

</script>
</body>

</html>