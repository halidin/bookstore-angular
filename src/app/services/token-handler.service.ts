import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TokenHandlerService {
  
  constructor() { }

  getToken(): string | null {
    const token = localStorage.getItem('Authorization');
    return token;
  }
}
