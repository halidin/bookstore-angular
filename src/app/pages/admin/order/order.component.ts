import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common'
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule,NgFor],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  orderList: any [] = [];
  userId!:string
  constructor(private authService:AuthService,private http: HttpClient,private router: Router) {
  }

  ngOnInit(): void{
    this.getAllOrders();
  }


  // Get all orders of all customers on the admin page
  getAllOrders(){
    const token =localStorage.getItem('Authorization');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get(`https://bookshop-api-git-main-halidins-projects.vercel.app/api/orders/customer/all`, {headers:headers,observe: 'response' }).subscribe((res:any)=>{
      this.orderList= res.body
    });

  }

}
