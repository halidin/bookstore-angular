import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common'
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule,NgFor],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent {
  productObj: Product;


  productList: any [] = [];
  constructor(private productService: ProductService,private http: HttpClient,private router: Router) {
    this.productObj = new Product();
  }

  ngOnInit(): void{
    debugger;
    this.getUploadedProducts();
  }


  // Adding product to databse
  onAddProduct() {
    this.productService.addProduct(this.productObj).subscribe({
      next:(res: any) => {
        console.log(res.result)
        if (res.status) {
          alert("Product Added");
          this.getUploadedProducts();
        } else {
          console.log('error')
          alert(res.message);
        }
      },
      error: (error) => {
        console.error('Error fetching products', error);
      }
      });
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


  // Delete product
  onDelete(id:string){
    this.productService.deleteProduct(id).subscribe({
      next: (res:any)=>{
        if(res.status===200) {
          alert("Product removed");
          this.getUploadedProducts();
        }else{ 
          alert(res.message)
        };
      },
      error:(error) =>{
        console.error('Error deleting product', error);
      }
    });
  }



}

export class Product {
    title: string; 
    desc: string;
    img: string;
    price: string;
    constructor() {
      this.title='';
      this.desc = '';
      this.img = '';
      this.price = '';
    } 
}