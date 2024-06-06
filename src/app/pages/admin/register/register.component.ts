import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router,RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerObj: Register;

  constructor(private authService:AuthService,private http: HttpClient,private router: Router) {
    this.registerObj = new Register();
  }

  // User register
  onRegister() {
    debugger;
    this.authService.regitser(this.registerObj).subscribe({
      next: (res:any)=>{
        if(res.status) {
          alert("Registeration Success");
          this.router.navigateByUrl('/mainpage')
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




export class Register {
    username: string; 
    email: string;
    password: string;
    constructor() {
      this.username='';
      this.email = '';
      this.password = '';
    } 
}