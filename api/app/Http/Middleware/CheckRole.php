<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next, ...$roles)
    {
        if (!Auth::check()) {
            // Ako korisnik nije prijavljen
            return response('Unauthorized.', 401);
        }

        $user = Auth::user();
        if(in_array($user->role, $roles)) {
            return $next($request);
        }

        // Ako korisnik nema odgovarajuću ulogu
        return response('Forbidden.', 403);
    }
}
