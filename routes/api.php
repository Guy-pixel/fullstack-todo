<?php

use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
//Route::post('/register', function(string $username, string $password, string $email) {
//    $foundUser = User::where('username', $username)->exists();
//    if($foundUser){
//        return [
//            "status" => 409,
//            "status text" => "User Already Exists"
//        ];
//    } else {
//        $newUser = User::create([$username, $password, $email]);
//
//    }
//
//});
Route::post('/register', function(Request $request) {
    return UserController::register($request->name, $request->email, $request->password);

});

Route::post('/login', function(Request $request){
     return UserController::login($request->password, null, $request->email);
});

Route::post('/refreshtoken', function(Request $request){
    return UserController::refreshToken($request->user, $request->refreshToken);
});
