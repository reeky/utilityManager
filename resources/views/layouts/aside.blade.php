<aside id="left-panel" ng-controller="asideController">
    <!-- User info -->
    <div class="login-info">
        <span> <!-- User image size is adjusted inside CSS, it should stay as it -->

            <a  id="show-shortcut" data-action="">
                <span>
                    {{ Auth::user()->name }}({{ Auth::user()->id }})
                </span>
            </a>

        </span>
    </div>
    <!-- end user info -->

    <!-- NAVIGATION : This navigation is also responsive-->
    <nav>
        <ul>
            <li>
                <a href="" title="Home"><i class="fa fa-lg fa-fw fa-home"></i> <span class="menu-item-parent" ng-click="home()">Home</span></a>
            </li>

            @if(Gate::check('users_admin') || Gate::check('super_admin') || Gate::check('admin'))
            <li>
                <a href="" title="Users"><i class="fa fa-lg fa-fw fa-users"></i> <span class="menu-item-parent" ng-click="users()">Users</span></a>
            </li>
            @endif

            @if(Gate::check('roles_admin') || Gate::check('super_admin') || Gate::check('admin'))
            <li>
                <a href="#"><i class="fa fa-lg fa-fw fa-table"></i> <span class="menu-item-parent">Roles and Permissions</span></a>
                <ul>
                    <li>
                        <a href="" ><span ng-click="gotoRoles()">Roles</span></a>
                    </li>

                    <li>
                        <a href="" ><span ng-click="gotoPermissions()">Permissions</span></a>
                    </li>
                </ul>
            </li>
            @endif

            @if(Gate::check('roles_admin') || Gate::check('super_admin') || Gate::check('admin'))
                <li>
                    <a href="#"><i class="fa fa-lg fa-fw fa-table"></i> <span class="menu-item-parent">Configuration</span></a>
                    <ul>
                        <li>
                            <a href="" ><span ng-click="gotoAddress()">Address</span></a>
                        </li>
                    </ul>
                </li>
            @endif

            @if(Gate::check('roles_admin') || Gate::check('super_admin') || Gate::check('admin'))
                <li>
                    <a href="#"><i class="fa fa-lg fa-fw fa-table"></i> <span class="menu-item-parent">Account</span></a>
                    <ul>
                        <li>
                            <a href="" ><span ng-click="gotoAccountList()">Accounts List</span></a>
                        </li>
                        <li>
                            <a href="" ><span ng-click="gotoAccountDetail()">Account Detail</span></a>
                        </li>
                    </ul>
                </li>
            @endif

        </ul>
    </nav>
			<span class="minifyme" data-action="minifyMenu">
				<i class="fa fa-arrow-circle-left hit"></i>
			</span>

</aside>