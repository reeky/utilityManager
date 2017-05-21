<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Role;

class UserRole extends Model
{
    protected $table = 'role_user';
    protected $fillable = ['role_id','user_id'];

    public function roleName()
    {
        return $this->hasOne('App\Models\Role','id','role_id');
    }
}
