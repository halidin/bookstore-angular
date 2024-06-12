import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common'
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-customer-orders',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule,NgFor],
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.css'
})
export class CustomerOrdersComponent {


  orderList: any [] = [];
  userId!:string
  constructor(private authService:AuthService,private http: HttpClient,private router: Router) {
  }

  ngOnInit(): void{
    this.getCustomerOrders();
  }


  // Get orders that made from the logged in customer
  getCustomerOrders(){
    const userId = this.authService.getUserId()
    const token =localStorage.getItem('Authorization');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get(`https://bookshop-api-git-main-halidins-projects.vercel.app/api/orders/${userId}`, { headers:headers,observe: 'response' }).subscribe((res:any)=>{
      console.log(res.body);
      this.orderList= res.body

    });

  }



}
