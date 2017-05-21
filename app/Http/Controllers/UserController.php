<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
//use Illuminate\Foundation\Auth\User;
use App\User;
use Illuminate\Support\Facades\Auth;
use App\Models\UserRole;
use App\Models\UserInfo;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Gate;

class UserController extends Controller
{
    public function checkAccess($permission)
    {

//        if(Gate::check($permission) || Gate::check('super_admin')) {
        if(Gate::check($permission)) {
            return 1;
        }else{
            return 0;
        }

    }

    public function userRemoveRole()
    {
        $role_id = Input::get('role_id');
        $user_id = Input::get('user_id');

//        UserRole::where('role_id', $role_id)->delete();
        UserRole::where('role_id', $role_id)->where('user_id',$user_id)->delete();
    }

    public function userHaveRole($userId,$roleId)
    {
        return UserRole::select('*')->where('role_id',$roleId)->where('user_id',$userId)->get();
    }

    public function userAddRole()
    {
//        return Input::all();
        $role_id = Input::get('role_id');
        $user_id = Input::get('user_id');

        $create = UserRole::create(array(
            'role_id' => $role_id,
            'user_id' => $user_id
        ));
    }

    public function userRoles($id)
    {
        return UserRole::select('*')
            ->where('user_id',$id)
            ->with('roleName')
            ->get();
    }

    public function index()
    {
//        return Auth::user()->id;
        return User::select('*')->get();
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'name' => 'bail|required|max:25',
            'email' => 'bail|required|email|unique:users',
        ]);

        $userName = Input::get('name');
        $userEmail = Input::get('email');
        $userPassword = Hash::make('Welcome123');

        $create = User::create(array(
            'name' => $userName,
            'email' => $userEmail,
            'avatar' => 'placeholder.png',
            'password' => $userPassword
        ));

    }

    public function show($id)
    {
        return User::select('*')
            ->where('id',$id)
            ->with('roles')
            ->get();
    }

    public function edit($id)
    {
        //
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'name' => 'bail|required|max:25',
            'email' => 'bail|required|email',
        ]);

        User::where('id',$id)->update(array(
            'name'=>Input::get('name'),
            'email'=>Input::get('email')
        ));
    }

    public function changePass(Request $request, $id)
    {
        $this->validate($request, [
            'newPassword' => 'bail|required',
            'confirmPassword' => 'bail|required|same:newPassword|max:16',
        ]);

        $inputPass = Input::get('newPassword');
        $newPass = Hash::make($inputPass);

        User::where('id',$id)->update(array(
            'password'=>$newPass
        ));
    }

    public function destroy($id)
    {
        User::where('id', $id)->delete();
        UserRole::where('user_id', $id)->delete();
    }
}
