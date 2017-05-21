<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Models\Permission;
use App\Models\Role;
use App\Models\PermissionRole;
use Illuminate\Support\Facades\Input;


class PermissionsController extends Controller
{
    public function index()
    {
        return Permission::select('*')->orderBy('name','ASC')->get();
    }

    public function create()
    {

    }

    public function permissions($id)
    {
        return PermissionRole::select('role_id','permission_id')->where('role_id',$id)->get();
    }

    public function storePermissions()
    {
        $role_id = Input::get('role_id');
        $permission_id = Input::get('permission_id');
        $allPermissions = PermissionRole::select('*')->where('role_id',$role_id)->get();

        $result=1;

            foreach ($allPermissions as $permission) {
                if ($permission['permission_id'] == $permission_id) {
                    $result = 0;
                    break;
                } else {
                    $result = 1;
                }
            }

        if($result == 1){
            $create = PermissionRole::create(array(
                'role_id' => $role_id,
                'permission_id' => $permission_id
            ));
        }
        return $result;
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'bail|required|unique:permissions|max:25',
            'description' => 'required',
        ]);

        $permissionName = Input::get('name');
        $permissionDescription = Input::get('description');

        $create = Permission::create(array(
            'name' => $permissionName,
            'description' => $permissionDescription
        ));
    }

    public function show($id)
    {
        return Permission::select('*')->where('id',$id)->get();
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'bail|required|max:25',
            'description' => 'required',
        ]);

        Permission::where('id',$id)->update(array(
            'name'=>Input::get('name'),
            'description'=>Input::get('description')
        ));
    }

    public function destroy($id)
    {
        PermissionRole::where('permission_id', $id)->delete();
        Permission::where('id', $id)->delete();
    }

    public function deleteRolePermission($roleId,$permissionId)
    {
        PermissionRole::where('role_id', $roleId)->where('permission_id', $permissionId)->delete();
    }
}
