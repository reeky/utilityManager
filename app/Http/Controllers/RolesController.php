<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;
use App\Models\PermissionRole;

use App\Http\Requests;
use Illuminate\Support\Facades\Input;

class RolesController extends Controller
{
    public function index()
    {
        return Role::with('permissions')->get();
    }

    public function create()
    {

    }

    public function store(Request $request)
    {
//        return Input::all();
        $this->validate($request, [
            'name' => 'bail|required|unique:roles|max:35',
            'description' => 'required',
        ]);

        $roleName = Input::get('name');
        $roleDescription = Input::get('description');

        $create = Role::create(array(
            'name' => $roleName,
            'description' => $roleDescription
        ));
    }

    public function show($id)
    {
        return Role::select('id','name','description')->where('id',$id)->with('permissions')->get();
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

        Role::where('id',$id)->update(array(
            'name'=>Input::get('name'),
            'description'=>Input::get('description')
        ));
    }

    public function destroy($id)
    {
        Role::where('id', '=', $id)->delete();
        PermissionRole::where('role_id', '=', $id)->delete();
    }
}
