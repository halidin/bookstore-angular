// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient,HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private api = 'https://bookshop-api-git-main-halidins-projects.vercel.app/api';


  getUserId(): string | null {
    const userId = localStorage.getItem('UserId');
    return userId;
  }

  loggedIn(){

    return !!localStorage.getItem('Authorization')
    
  }
  
  setHeaders(): HttpHeaders {
    const token = localStorage.getItem('Authorization');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  login(logininfo: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.api+'/auth/login', logininfo, {observe: 'response' });
  }

  regitser(registerinfo: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.api+'/auth/register', registerinfo, {observe: 'response' });
  }
  logout() {
    localStorage.removeItem('UserId');
    localStorage.removeItem('Authorization');
  }


}
