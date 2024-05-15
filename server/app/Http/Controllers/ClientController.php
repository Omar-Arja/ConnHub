<?php

namespace App\Http\Controllers;

use App\Models\Usertype;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function CreateClientProfile(Request $request)
    {
        $user = $request->user();

        if ($user->usertype_name == 'Pending') {
            $user->usertype_id = Usertype::getUsertypeId('Client');
            $user->save();

            return response()->json([
                'status' => 'success',
                'message' => 'Client profile created successfully'
            ], 200);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized'
            ], 401);
        }
    }

    public function getClientProfile(Request $request)
    {
        $user = $request->user();

        if ($user->usertype_name == 'Client') {
            return response()->json([
                'status' => 'success',
                'profile' => $user,
            ]);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }
}
