import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private http: HttpClient) { }

    private isAuthenticated = new BehaviorSubject<boolean>(false);

    login(email: string, password: string): Observable<any> {
        const credentials = { email, password };
        return this.http.post<any>('http://localhost:3001/auth/login', credentials)
            .pipe(map(response => {
                console.log('Server Response:', response);
                if (response.accessToken) {
                    console.log('Token:', response.accessToken);
                    localStorage.setItem('token', response.accessToken);
                    this.isAuthenticated.next(true); //Imposta l'autenticazione su true
                }
                return response;
            }));
    }


    register(name: String, surname: string, email: string, password: string, tel: string, address: string): Observable<any> {
        const newUser = { name, surname, email, password, tel, address };

        return this.http.post<any>('http://localhost:3001/auth/register', newUser);
    }

    logout() {
        localStorage.removeItem('token')
        this.isAuthenticated.next(false)
        return this.http.post<any>('http://localhost:3001/auth/logout', null)
    }

    getIsAuthenticated() {
        return this.isAuthenticated.asObservable()
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

}


