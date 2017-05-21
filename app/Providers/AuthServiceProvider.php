<?php

namespace App\Providers;

use Illuminate\Contracts\Auth\Access\Gate as GateContract;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use App\Models\Permission;
//use App\Models\Role;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any application authentication / authorization services.
     *
     * @param  \Illuminate\Contracts\Auth\Access\Gate  $gate
     * @return void
     */
    public function boot(GateContract $gate)
    {
//        return 0;
        $this->registerPolicies($gate);
    // Added part
        foreach($this->getPermissions() as $permission){
            $gate->define($permission->name, function($user) use($permission){
               return $user->hasRole($permission->roles);
            });
        }
    // Custom part ends
    }

    public function getPermissions()
    {
        return Permission::with('roles')->get();
    }
}
