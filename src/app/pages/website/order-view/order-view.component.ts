import { Component } from '@angular/core';
import { ActivatedRoute, Router,RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common'
import { TokenHandlerService } from '../../../services/token-handler.service';

@Component({
  selector: 'app-order-view',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule,NgFor],
  templateUrl: './order-view.component.html',
  styleUrl: './order-view.component.css'
})
export class OrderViewComponent {


  orderId:any
  userId:any
  productList: any [] = [];
  totalPrice!:number
  cartId!:string
  orderObj:Order
    
  constructor(private route: ActivatedRoute,private authService:AuthService,private tokenHandlerService: TokenHandlerService,private http: HttpClient,private router: Router) {
    this.orderObj = new Order();
  }

  ngOnInit(): void{
    this.orderId = this.route.snapshot.paramMap.get('id');
    console.log(this.orderId)
    this.getOrder(this.orderId)
  }

  // Get order by id
  getOrder(id:string){
    const token = this.tokenHandlerService.getToken()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get(`https://bookshop-api-git-main-halidins-projects.vercel.app/api/orders/order/${id}`, { headers:headers,observe: 'response' }).subscribe((res: any) => { 

      this.orderObj=res.body
      this.productList = res.body?.products || [];

      this.userId=res.body?.userId
      this.totalPrice=res.body?.totalPrice
      this.cartId = res.body?._id
    });
  }
}



export class Order {
  userId: string|null;
  products: { productId: string, quantity: number ,price:number,title:string,img:string}[];
  fullname: string;
  email: string;
  phonenumber: number;
  address: string;
  totalPrice:number
  
  constructor() {
    this.userId = '';
    this.products = [];
    this.fullname = '';
    this.email = '';
    this.phonenumber = 0;
    this.address = '';
    this.totalPrice=0

  } 
}




