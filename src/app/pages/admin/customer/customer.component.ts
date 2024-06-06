import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../../services/customer.service';
import { CommonModule, NgFor } from '@angular/common'


@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule,NgFor],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {

  customerList: any [] = [];
  constructor(private customerService: CustomerService) {
  }


  ngOnInit(): void{
    debugger;
    this.getAllCustomers();
  }

  // Get all customers
  getAllCustomers() {
    this.customerService.getAllCustomers().subscribe({
      next: (res: any) => {
        console.log(res.body);
        this.customerList = res.body
      },
      error: (error) => {
        console.error('Error getting customers', error);
      }
    });
  }

  // Delete customer by id
  onDelete(id:string){
    this.customerService.deleteCustomer(id).subscribe({
      next : (res:any) =>{
        console.log(res.body);
        if(res.status) {
          this.getAllCustomers();
          alert("Customer deleted");
        }else{ 
          alert(res.message)
        };
      },
      error: (error) => {
        console.error('Error getting customers', error);
      }
    });
  }
}


export class newCustomer { 
  fullname: string;
  email: string;
  phonenumber: number;
  address: string;
  constructor() {
    this.fullname = '';
    this.email = '';
    this.phonenumber = 0;
    this.address = '';
  } 
}