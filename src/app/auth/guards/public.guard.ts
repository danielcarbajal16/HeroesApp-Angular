import { Observable, map, tap } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth-service';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate {
    constructor(private authService: AuthService, private router: Router) { }
    
    private checkAuthStatus(): boolean | Observable<boolean> {
        return this.authService.checkAuthentication().pipe(
            tap(isAuthenticated => console.log('Authenticated:', isAuthenticated)),
            tap(isAuthenticated => {
                if (isAuthenticated) {
                    this.router.navigate(['./'])
                }
            }),
            map(isAutheticated => !isAutheticated)
        )
    }
    
    canMatch(): boolean | Observable<boolean> {
        // console.log('Can Match');
        return this.checkAuthStatus();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
        // console.log('Can Activate');
        return this.checkAuthStatus();
    }
}