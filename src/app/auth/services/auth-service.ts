import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environment';
import { User } from '../interfaces/user.interface';
import { tap, Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
    private baseUrl = environments.baseUrl;
    private user?: User;
    
    constructor(private http: HttpClient) { }
    
    get currentUser(): User | undefined {
        if (!this.user) return undefined;
        return structuredClone(this.user);
    }

    login( email: string, password: string): Observable<User> {
        // this.http.post(``)
        return this.http.get<User>(`${this.baseUrl}/users/1`)
            .pipe(
                tap(user => this.user = user ),
                tap(user => localStorage.setItem('token', 'jkadgajsgfjah'))
            );
    }

    logout() {
        this.user = undefined;
        localStorage.clear();
    }
}