import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { CommonModule, NgFor } from '@angular/common'
@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule,NgFor],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {
  productObj: Product;
  productList: any [] = [];
  currentProduct: Product;
  productId: any;

  constructor(private productService: ProductService,private route: ActivatedRoute, private http: HttpClient,private router: Router) {
    this.productObj = new Product();
    this.currentProduct= new Product();
  }

  ngOnInit(): void{
    debugger;
    this.productId = this.route.snapshot.paramMap.get('id');
    console.log(`Editing product with id: ${this.productId}`);
    this.getProduct();
  }


  // Get product with product id
  getProduct() {
    this.productService.getProduct(this.productId).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.currentProduct = res.body;
        } else {
          alert(res.message);
        }
      },
      error: (error) => {
        console.error('Error fetching products', error);
      }
    });
  }

  // Edit product and update it on database
  editProduct() {
    this.productService.editProduct(this.productId,this.currentProduct).subscribe({
      next: (res: any) => {
        if (res.status) {
          this.currentProduct = res.body;
          alert("Success");
        } else {
          alert(res.message);
        }
      },
      error: (error) => {
        console.error('Error editing products', error);
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

