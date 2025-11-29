import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { LoginResponse } from '@/app/core/models/LoginResponse';
import { environment } from '@/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;

  private _token = signal<string | null>(localStorage.getItem('token'));
  private _user = signal<any | null>(null);

  isLogged = computed(() => !!this._token());

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap(res => {
          localStorage.setItem('token', res.token);
          this._token.set(res.token);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this._token.set(null);
    this._user.set(null);
  }

  user = computed(() => this._user());
}

