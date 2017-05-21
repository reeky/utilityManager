<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Role;
use App\Models\UserRole;

class UserInfo extends Model
{
    protected $table = 'users';

    public function roles(){
        $this->hasMany('UserRole');
    }
}
