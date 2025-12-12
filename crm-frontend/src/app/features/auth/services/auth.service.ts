import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoginResponse } from '@/app/core/models/LoginResponse';
import { environment } from '@/environments/environment.development';
import { RegisterUser } from '../models/register-user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;

  private _token = signal<string | null>(localStorage.getItem('token'));
  
  private _user = signal<any | null>(null);
  get user() {
    return this._user;
  }

  isLogged = computed(() => !!this._token());

  constructor(private http: HttpClient) {
   const savedUser = localStorage.getItem('user');

    if (savedUser && savedUser !== 'undefined' && savedUser !== 'null') {
      try {
        this._user.set(JSON.parse(savedUser));
      } catch {
        this._user.set(null); 
      }
    }
  }

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
          this._token.set(res.token);

          const user = {
          id: res.id,
          email: res.email,
          fullName: res.fullName,
          userType: res.userType
        };

        localStorage.setItem('user', JSON.stringify(user));
        this._user.set(user);
      })
    );
  }


  register(user: RegisterUser): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }



  logout() {
    localStorage.removeItem('token');
    this._token.set(null);
    this._user.set(null);
  }
}

