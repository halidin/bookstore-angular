import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router,RouterModule } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';
import { error } from 'console';

const EMPTY_STRING = "";
@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css'
})
export class EditCustomerComponent {

  updatedcustomerObj: updatedCustomer;
  customerId: any;
  currentInfo:updatedCustomer;
  customerInfo!:any
  
  constructor(private customerService: CustomerService,private route: ActivatedRoute,private http: HttpClient,private router: Router) {
    this.updatedcustomerObj = new updatedCustomer();
    this.currentInfo = new updatedCustomer();
  }
  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('id');
    // Fetch the customer data using this.customerId
    console.log(`Editing customer with id: ${this.customerId}`);
    this.getCustomer();
  }


  // Get customer by id
  getCustomer(){
    this.customerService.getCustomer(this.customerId).subscribe({
      next:(res:any)=>{
        console.log(res.body)
        this.currentInfo=res.body
      },
      error: (error) => {
        console.error('Error getting customers', error);
      }
    });
  }

  // Edit customer
  editCustomer() {
    debugger;
    const token =localStorage.getItem('Authorization');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post(`https://bookshop-api-git-main-halidins-projects.vercel.app/api/clients/update/${this.customerId}`, this.currentInfo, { headers: headers,observe: 'response' }).subscribe((res:any)=>{
      console.log(res.body)
      if(res.status) {
        alert("Success");
      } else {
        alert(res.message)
      }
    });
  }

}






export class updatedCustomer { 
  fullname: string;
  email: string;
  phonenumber: Number;
  address: string;
  constructor() {
    this.fullname = EMPTY_STRING;
    this.email = EMPTY_STRING;
    this.phonenumber = NaN
    this.address = EMPTY_STRING;
  } 
}