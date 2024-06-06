import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private api = 'https://bookshop-api-git-main-halidins-projects.vercel.app/api';

  constructor(private http: HttpClient) { }

  setHeaders(): HttpHeaders {
    const token = localStorage.getItem('Authorization');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getUploadedProducts(): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.api+'/products/all', { observe: 'response' });
  }

  getProduct(id:string): Observable<HttpResponse<any>> {
    return this.http.get<any>(this.api+`/products/product/${id}`, { observe: 'response' });
  }

  addProduct(product: any): Observable<HttpResponse<any>> {
    const headers = this.setHeaders();
    return this.http.post<any>(this.api+'/products/add', product, { headers:headers,observe: 'response' });
  }
  
  editProduct(id:string,product:any): Observable<HttpResponse<any>> {
    const headers = this.setHeaders();
    return this.http.post<any>(this.api+`/products/update/${id}`, product,{ headers:headers,observe: 'response' });
  }
  
  deleteProduct(id:string): Observable<HttpResponse<any>> {
    const headers = this.setHeaders();
    return this.http.delete<any>(this.api+`/products/remove/${id}`, { headers:headers,observe: 'response' });
  }

}