import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router,RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from '../../../services/customer.service';

const EMPTY_STRING = "";
@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css'
})
export class NewCustomerComponent {
  newcustomerObj: newCustomer;

  constructor(private customerService: CustomerService,private http: HttpClient,private router: Router) {
    this.newcustomerObj = new newCustomer();
  }


  // Add new customer
  addCustomer() {
    this.customerService.addNewCustomer(this.newcustomerObj).subscribe({
      next:(res:any)=>{
        console.log(res.body)
        if(res.status) {
          alert("Success");
          this.router.navigateByUrl('/customer')
        } else {
          alert(res.message)
        }
      },
      error: (error) => {
        console.error('Error', error);
      }
    });
  }
}




export class newCustomer { 
  fullname: string;
  email: string;
  phonenumber: Number;
  address: string;
  constructor() {
    this.fullname = EMPTY_STRING;
    this.email = EMPTY_STRING;
    this.phonenumber = NaN;
    this.address = EMPTY_STRING;
  } 
}