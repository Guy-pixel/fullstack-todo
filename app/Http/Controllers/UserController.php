<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public static function findUser(string $name = NULL, $email = NULL): User|bool
    {
        if(isset($name)){
            return User::where('name', '=', $name)->first();
        } elseif(isset($email)){
            return User::where('email', '=', $email)->first();
        }
        return false;
    }
    public static function register(string $name, string $email, string $password)
    {
        dd('test');
        $existingName = static::findUser($name);
        $existingEmail = static::findUser(NULL ,$email);
        if($existingEmail || $existingName){
            return new \Exception('Name or Email Already in Use', 404);
        } else {
            $user = new User;
            $user->name=$name;
            $user->email=$email;
            $user->password=Hash::make($password);
            $user->save();
        }
    }
}
