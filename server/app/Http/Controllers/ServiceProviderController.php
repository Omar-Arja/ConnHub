<?php

namespace App\Http\Controllers;

use App\Models\ServiceProvider;
use Illuminate\Http\Request;
use App\Models\Usertype;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class ServiceProviderController extends Controller
{
    public function createServiceProviderProfile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'service_name' => 'required|string|max:255',
            'service_description' => 'required|string|max:255',
            'service_category' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'service_price_min' => 'nullable|numeric',
            'service_price_max' => 'nullable|numeric|gt:service_price_min',
            'calendly_link' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors(),
            ], 422);
        }

        $user = $request->user();

        if ($user->usertype_name == 'Pending') {
            $user->usertype_id = Usertype::getUsertypeId('Service Provider');
            $user->save();

            $user->serviceProvider()->create([
                'service_name' => $request->service_name,
                'service_description' => $request->service_description,
                'service_category' => $request->service_category,
                'location' => $request->location,
                'service_price_min' => $request->service_price_min,
                'service_price_max' => $request->service_price_max,
                'calendly_link' => $request->calendly_link,
            ]);

            return response()->json(['status' => 'success', 'message' => 'Service provider profile created successfully'], 200);
        } else {
            return response()->json(['status' => 'error', 'message' => 'Unauthorized'], 401);
        }
    }

    public function updateServiceProviderProfile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'service_name' => 'required|string|max:255',
            'service_description' => 'required|string|max:255',
            'service_category' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'service_price_min' => 'nullable|numeric',
            'service_price_max' => 'nullable|numeric|gt:service_price_min',
            'calendly_link' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors(),
            ], 422);
        }

        $user = $request->user();

        if ($user->usertype_name == 'ServiceProvider') {
            $user->serviceProviderProfile->update([
                'service_name' => $request->service_name,
                'service_description' => $request->service_description,
                'service_category' => $request->service_category,
                'location' => $request->location,
                'service_price_min' => $request->service_price_min,
                'service_price_max' => $request->service_price_max,
                'calendly_link' => $request->calendly_link,
            ]);

            return response()->json(['status' => 'success', 'message' => 'Service provider profile updated successfully'], 200);
        } else {
            return response()->json(['status' => 'error', 'message' => 'Unauthorized'], 401);
        }
    }

    public function getCurrentServiceProviderProfile(Request $request)
    {
        $user = Auth::user();

        if ($user->usertype_name == 'Service Provider') {
            return response()->json(['status' => 'success', 'data' => ['serviceProviderProfile' => $user->serviceProviderProfile]], 200);
        } else {
            return response()->json(['status' => 'error', 'message' => 'Unauthorized'], 401);
        }
    }

    public function getServiceProviderProfile(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['status' => 'error', 'message' => 'Service provider not found'], 404);
        }

        if ($user->usertype_name == 'Service Provider') {
            return response()->json(['status' => 'success', 'data' => [
                'user' => $user->with('serviceProvider')->first(),
            ]], 200);
        } else {
            return response()->json(['status' => 'error', 'message' => 'User is not a service provider'], 404);
        }
    }

    public function getAllServiceProviders()
    {
        $serviceProviders = User::where('usertype_id', Usertype::getUsertypeId('Service Provider'))->get();

        return response()->json(['status' => 'success', 'data' => ['serviceProviders' => $serviceProviders]], 200);
    }

    public function searchServiceProviders(Request $request)
    {
        $user = $request->user();

        if ($user->usertype_name != 'Client') {
            return response()->json(['status' => 'error', 'message' => 'Unauthorized'], 401);
        }

        $validator = Validator::make($request->all(), [
            'search_query' => 'required|string|max:255',
            'price_min' => 'nullable|numeric',
            'price_max' => 'nullable|numeric|gt:price_min',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => $validator->errors(),
            ], 422);
        }

        $serviceProviders = ServiceProvider::where(function ($query) use ($request) {
            $query->whereRaw('LOWER(service_name) LIKE ?', ['%' . strtolower($request->search_query) . '%'])
                ->orWhereRaw('LOWER(service_category) LIKE ?', ['%' . strtolower($request->search_query) . '%'])
                ->orWhereRaw('LOWER(service_description) LIKE ?', ['%' . strtolower($request->search_query) . '%'])
                ->orWhereRaw('LOWER(location) LIKE ?', ['%' . strtolower($request->search_query) . '%']);
        });

        if ($request->has('price_min')) {
            $serviceProviders->where('service_price_min', '>=', $request->price_min);
        }

        if ($request->has('price_max')) {
            $serviceProviders->where('service_price_max', '<=', $request->price_max);
        }

        $serviceProviders = $serviceProviders->get();

        return response()->json(['status' => 'success', 'data' => ['serviceProviders' => $serviceProviders]], 200);
    }
}
