<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Foundation\Auth\User;

use App\Http\Requests;
use Illuminate\Support\Facades\Input;

class UploadsController extends Controller
{
    public function storeAvatar(Request $request)
    {
//        return response($request->all());
        $time = time();
        if(Input::hasFile('avatarFile')){
            $uploadedProfilePic = Input::file('avatarFile');
            $profilePicExtension = $uploadedProfilePic->getClientOriginalExtension();
            $profilePic = $time.'.'.$profilePicExtension;
            $profilePicFile = Input::file('avatarFile');
            $profilePicFile->move('assets/img/avatars',$profilePic);
        }else{
            $profilePic = 'dummyManPic.jpg';
        };

        $id = Input::get('uId');

        User::where('id',$id)->update(array(
            'avatar'=>$profilePic
        ));
    }
}
