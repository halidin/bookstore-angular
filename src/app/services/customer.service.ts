import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { head } from '@vercel/blob';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private api = 'https://bookshop-api-git-main-halidins-projects.vercel.app/api';

  constructor(private http: HttpClient) { }

  setHeaders(): HttpHeaders {
    const token = localStorage.getItem('Authorization');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllCustomers(): Observable<HttpResponse<any>> {
    const headers = this.setHeaders();
    return this.http.get<any>(this.api+'/clients/all', {headers:headers,observe: 'response' });
  }

  getCustomer(id:string): Observable<HttpResponse<any>> {
    const headers = this.setHeaders();
    return this.http.get<any>(this.api+`/clients/client/${id}`, { headers:headers,observe: 'response' });
  }

  addNewCustomer(customer:any): Observable<HttpResponse<any>> {
    const headers = this.setHeaders();
    return this.http.post<any>(this.api+`/clients/addnew`,customer, { headers:headers,observe: 'response' });
  }

  deleteCustomer(id: string): Observable<HttpResponse<any>> {
    const headers = this.setHeaders();
    return this.http.delete<any>(this.api+`/clients/remove/${id}` , { headers:headers,observe: 'response' });
  }
  
  editCustomer(id:string,customer:any): Observable<HttpResponse<any>> {
    const headers = this.setHeaders();
    return this.http.post<any>(this.api+`/clients/update/${id}`, customer,{ headers:headers,observe: 'response' });
  }
  


}
