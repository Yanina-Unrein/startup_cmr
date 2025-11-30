import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { environment } from '@/environments/environment.prod';
import { LoginResponse } from '@/app/core/models/LoginResponse';


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
  register(data: {
  email: string;
  password: string;
  fullName: string;
  companyId: number;
  typeUser: string;
}) {
  return this.http.post(`${this.apiUrl}/register`, data);
}


  logout() {
    localStorage.removeItem('token');
    this._token.set(null);
    this._user.set(null);
  }

  user = computed(() => this._user());
}

