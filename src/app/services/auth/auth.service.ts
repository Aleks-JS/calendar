import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Routes } from '../../config/routes';
import { Observable } from 'rxjs';
import { auth } from './auth';
import IRefreshTokens = auth.IRefreshTokens;

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public static readonly authPath = '/auth';
  public static readonly loginPath = '/login';

  constructor(private http: HttpClient) {
  }

  // login, register

  login(data: auth.IAuthData): Observable<IRefreshTokens> {
    return this.http.post<IRefreshTokens>(`${Routes.baseUrl}/${AuthService.authPath}/refresh-tokens`, data, httpOptions);
  }

  refreshToken(token: string): Observable<IRefreshTokens> {
    return this.http.post<IRefreshTokens>(`${Routes.baseUrl}/${AuthService.loginPath}`, {
      refreshToken: token
    }, httpOptions);
  }
}
