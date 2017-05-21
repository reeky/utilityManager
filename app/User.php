<?php

namespace App;

use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Models\Role;
use App\Models\UserRole;

class User extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'avatar'
    ];

    public function supervisors()
    {
        return $this->hasMany('App/Models/Supervisor');
    }

    protected $hidden = [
        'password', 'remember_token',
    ];

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    public function hasRole($role)
    {
        if(is_string($role))
        {
            return $this->roles->contains('name',$role);
        }

        return !! $role->intersect($this->roles)->count();

    }

    public function assign($role)
    {
        if(is_string($role))
        {
            return $this->roles()->save(
                Role::whereName($role)->firstOrFail()
            );
        }
    }

}
