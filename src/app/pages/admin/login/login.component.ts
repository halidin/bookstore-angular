import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router,RouterModule } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { error } from 'console';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: Login;

  constructor(private authService: AuthService,private http: HttpClient,private router: Router) {
    this.loginObj = new Login();
  }


  // User login 
  onLogin() {
    debugger;
    this.authService.login(this.loginObj).subscribe({
      next: (res:any)=>{
        if(res.status) {
          alert("Login Success");
          localStorage.setItem('Authorization', res.body.accessToken)
          localStorage.setItem('UserId', res.body.user._id)
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

export class Login { 
    username: string;
    password: string;
    constructor() {
      this.username = '';
      this.password = '';
    } 
}