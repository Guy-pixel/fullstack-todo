<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public static function getUserByEmail(string $email): User|null
    {
        return User::where('email', '=', $email)->first();
    }

    public static function getUserByName(string $name): User|null
    {
        return User::where('name', '=', $name)->first();
    }

    public static function register(string $name, string $email, string $password)
    {

        $existingEmail = static::getUserByEmail($email);
        $existingName = static::getUserByName($name);
        if ($existingEmail || $existingName) {
            return 'Name or Email Already in Use';
        }
        $user = new User;
        $user->name = $name;
        $user->email = $email;
        $user->password = Hash::make($password);
        $user->save();
        return $user;
    }

    public static function login(string $password, string $name = Null, string $email = null){
        if($name==null && $email==null){
            return "No Email or Name Given";
        }
        if(isset($email)){
            $user = static::getUserByEmail($email);

        } elseif(isset($name)){
            $user = static::getUserByName($name);
        }
        if(isset($user) && Hash::check($password, $user->password)){
            $token = $user->createToken('auth_token')->accessToken;
            $refreshToken = $user->createToken('refresh_token')->accessToken;
            return response([
                'user' => $user->toArray(),
                'token' => Crypt::encryptString($token),
                'refresh_token' => Crypt::encryptString($refreshToken)
            ]);
        }
        return "We Were Unable to Find Matching Credentials";
    }
    public static function refreshToken($user, $refreshToken){
        if(!$refreshToken){
            return Exception('No refresh token found');
        }
        $email = $user->email;
        $foundUser = static::getUserByEmail($email);
        $user->getToken();
    }
}
