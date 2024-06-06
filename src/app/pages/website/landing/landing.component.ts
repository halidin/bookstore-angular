import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common'
import { TokenHandlerService } from '../../../services/token-handler.service';
import { AuthService } from '../../../services/auth.service';
import { ProductService } from '../../../services/product.service'; 


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule,NgFor],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  cartproductObj: CartProduct;
  newProduct: { productId: string; quantity: number,price:number,title:string,img:string};
  quan:any
  productList: any [] = [];
  activeCart!: boolean
  cartId!:string

  userCart!: { productId: string; quantity: number,price:number,title:string,img:string}[];

  constructor(private productService: ProductService,public authService:AuthService,private tokenHandlerService: TokenHandlerService,private http: HttpClient,private router: Router) {
    this.cartproductObj = new CartProduct();
    this.newProduct = { productId: '', quantity: 1 ,price:0,title:'',img:''};
    
  }

  ngOnInit(): void{
    
    this.getUploadedProducts();
    this.getCart()
  }
  
  // Get all products
  getUploadedProducts() {
    this.productService.getUploadedProducts().subscribe({
      next: (res: any) => {
        this.productList = res.body;
      },
      error: (error) => {
        console.error('Error fetching products', error);
      }
    });
  }


  // Add product to cart, check if there is a already saved cart in the database or create new one 
  addToCart(id: string,price:number,title:string,img:string): void {
    const token = this.tokenHandlerService.getToken();
    console.log(token)
    if(token===null
    )
      {alert('Login to order a product')};
    const userId = this.authService.getUserId();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.newProduct.productId = id;
    this.cartproductObj.userId = userId;
    this.newProduct.price= price;
    this.newProduct.title=title
    this.newProduct.img=img
    
    this.cartproductObj.totalPrice+= this.newProduct.quantity * this.newProduct.price
    
    // Check if there is a cart 
    // A user can have one saved cart in the database
    if (!this.userCart || this.userCart.length === 0) {
      this.cartproductObj.products = [this.newProduct];
      this.http.post('https://bookshop-api-git-main-halidins-projects.vercel.app/api/cart/addtocart', this.cartproductObj, { headers: headers, observe: 'response' })
        .subscribe((res: any) => {
          alert('Product added to cart');
          this.getCart(); 
        });
    } else {
      // Update the already saved cart 
      this.cartproductObj.products = this.userCart;
      // Find the prodcuts and increase the quantity
      const productIndex = this.userCart.findIndex(product => product.productId === id);
      if (productIndex > -1) {
        this.userCart[productIndex].quantity += this.newProduct.quantity;
      } else {
        this.cartproductObj.products.push(this.newProduct);
      }
      
      this.http.post(`https://bookshop-api-git-main-halidins-projects.vercel.app/api/cart/updatecart/${this.cartId}`, this.cartproductObj, { headers: headers, observe: 'response' })
        .subscribe((res: any) => {
          alert('Product added to cart');
          this.getCart(); 
        });
    }
  }

// Get user's saved cart
  getCart(){
    const token = this.tokenHandlerService.getToken()
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const userId = this.authService.getUserId()
    
    this.http.get(`https://bookshop-api-git-main-halidins-projects.vercel.app/api/cart/${userId}`, { headers:headers,observe: 'response' }).subscribe((res: any) => { 

      if(res.body.length===0){
        this.activeCart = false
        this.userCart=[]
      }
      else{this.userCart = res.body[0].products; this.cartId=res.body[0]._id}
    });
  }

  
}



export class CartProduct {
  userId: string | null;
  products: { productId: string, quantity: number ,price:number,title:string,img:string}[];
  totalPrice: number

  
  constructor() {
    this.userId = '';
    this.products = [];
    this.totalPrice=0

  } 
}
