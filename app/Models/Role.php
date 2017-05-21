<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Permission;

class Role extends Model
{

    protected $fillable = ['name','description'];

    public function permissions()
    {
        return $this->belongsToMany(Permission::class)->orderBy('name');
    }

    public function assign(Permission $permission)
    {
        return $this->permissions()->save($permission);
    }
}
