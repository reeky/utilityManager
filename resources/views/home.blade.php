<!DOCTYPE html>
<html lang="en-us">

@include('layouts.head')

<script>
    angular.module("ngCMS").constant("CSRF_TOKEN", '{{ csrf_token() }}');
    angular.module("ngCMS").constant("USER_ID", '{{ Auth::user()->id }}');
    angular.module("ngCMS").constant("USER_NAME", '{{ Auth::user()->name }}');
</script>
<body class="desktop-detected pace-done smart-style-1" ng-app="ngCMS" ng-controller="EventsCtrl">

@include('layouts.navigation')
@include('layouts.aside')
<!-- END NAVIGATION -->
<!-- MAIN PANEL -->
<div id="main" role="main">

    <!-- RIBBON -->
    <div id="ribbon"></div>

    <div id="content" ng-view></div>

    <!-- END MAIN CONTENT -->

</div>
<!-- END MAIN PANEL -->

<!-- PAGE FOOTER -->
@include('layouts.footer')
<!-- END PAGE FOOTER -->



@include('layouts.scripts')
<script src="assets/js/plugin/dropzone/dropzone.min.js"></script>
<script type="text/javascript">

</script>

<script>

</script>

</body>

</html>