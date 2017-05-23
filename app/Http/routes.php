<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/


Route::group(['middleware' => ['before'=>'auth']], function(){
    Route::resource('users','UserController');
    Route::resource('roles','RolesController');
    Route::resource('permissions','PermissionsController');
    Route::resource('readings','ReadingsController');
    Route::resource('accounts','AccountController');

    Route::post('updateReading/{id}', ['as' => 'update_reading', 'uses' => 'AccountController@updateReading']);
    Route::post('updateTopup/{id}', ['as' => 'update_topup', 'uses' => 'AccountController@updateTopup']);
    Route::post('updateTopupStatus/{id}', ['as' => 'updateTopupStatus', 'uses' => 'AccountController@updateTopupStatus']);


    Route::get('/permissions/{roleId}/role', ['as' => 'get_all_permissions_for_role', 'uses' => 'PermissionsController@permissions']);
    Route::post('/permission/{roleId}/{permissionId}/delete', ['as' => 'delete_permissions_for_role', 'uses' => 'PermissionsController@deleteRolePermission']);
    Route::post('/permissions/permission_role', ['as' => 'store_permissions_for_role', 'uses' => 'PermissionsController@storePermissions']);
    Route::post('/user/add/role', ['as' => 'add_new-role_to_user', 'uses' => 'UserController@userAddRole']);
    Route::post('/user/remove/role', ['as' => 'remove-role_from_user', 'uses' => 'UserController@userRemoveRole']);
    Route::post('/user/changepass/{userId}', ['as' => 'password_changer', 'uses' => 'UserController@changePass']);
    Route::get('/user/have/role/{userId}/{roleId}', ['as' => 'check_if_user_have_role', 'uses' => 'UserController@userHaveRole']);
    Route::post('upload-avatar', ['as' => 'upload_avatar', 'uses' => 'UploadsController@storeAvatar']);
});


Route::get('/', ['as' => 'home', 'uses' => 'HomeController@index']);
Route::get('/settings', ['as' => 'settings', 'uses' => 'HomeController@setting']);
Route::get('/user/roles/{role}', ['as' => 'user_role', 'uses' => 'UserController@checkAccess']);
Route::get('/welcome', 'HomeController@welcome');
Route::get('/userRoles/{id}', 'UserController@userRoles');


Route::auth();

Route::get('/home', 'HomeController@index');
Route::get('/meter/{id}', 'HomeController@meter');





