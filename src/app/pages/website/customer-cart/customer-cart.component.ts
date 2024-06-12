import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common'
import { TokenHandlerService } from '../../../services/token-handler.service';

@Component({
  selector: 'app-customer-cart',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule,NgFor],
  templateUrl: './customer-cart.component.html',
  styleUrl: './customer-cart.component.css'
})
export class CustomerCartComponent {

  orderObj: Order
  productList: any [] = [];
  totalPrice!:number
  cartId!:string
  constructor(private authService:AuthService,private tokenHandlerService: TokenHandlerService,private http: HttpClient,private router: Router) {
    this.orderObj = new Order();
    
  }

  ngOnInit(): void{
    this.getCart()
  }

  // Get products in cart
  getCart(){
    const token = this.tokenHandlerService.getToken()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const userId = this.authService.getUserId()
    
    this.http.get(`https://bookshop-api-git-main-halidins-projects.vercel.app/api/cart/${userId}`, { headers:headers,observe: 'response' }).subscribe((res: any) => { 
      console.log('This is the cart');
      this.productList = res.body?.[0]?.products || [];
      this.totalPrice=res.body[0]?.totalPrice
      this.cartId = res.body[0]?._id
    });
  }


  // Complete client order
  order(){
    const userId = this.authService.getUserId()
    this.orderObj.userId= userId
    this.orderObj.products= this.productList
    this.orderObj.totalPrice=this.totalPrice

    this.http.post(`https://bookshop-api-git-main-halidins-projects.vercel.app/api/orders/order`,this.orderObj,{ observe: 'response' }).subscribe((res: any) => {
      if(res.status){
        alert('Order completed')
        this.clearcart(this.cartId)
      }
      else{alert(res.message)}

    });

  }


  // Clear cart and delete the saved cart from the database
  clearcart(id:string){
    const token = this.tokenHandlerService.getToken()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.delete(`https://bookshop-api-git-main-halidins-projects.vercel.app/api/cart/clearcart/${id}`,{ headers:headers,observe: 'response' }).subscribe((res: any) => {
      if(res.status){
        alert('Cart cleared')
        window.location.href = '/mainpage';
      }
      else{alert(res.message)
      }
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




