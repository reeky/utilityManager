<?php

namespace App\Http\Controllers;

use App\Http\Requests;
use App\Models\Permission;
use App\Models\Setting;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use App\Models\Role;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function meter()
    {
//        return 0;
        return view('meter');
    }

    public function index()
    {
            return view('home')
                ->with('date',Carbon::now())->with('app-title','App');
    }

    public function welcome()
    {
        if(Gate::check('edit_topic')){
            return view('welcome')
                ->with('date',Carbon::now());
        } else {
            return view('restricted');
        }
    }

    public function roles()
    {
        return Role::with('permissions')->get();
    }

    public function setting()
    {
        return Setting::all();
    }
}
