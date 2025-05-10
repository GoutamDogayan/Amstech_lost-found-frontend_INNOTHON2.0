// angular import

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { AuthenticationService } from 'src/app/@theme/services/authentication.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { first } from 'rxjs';
import { UserService } from '../../service/user-service';



@Component({
  selector: 'app-login',
  imports: [CommonModule, SharedModule, RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../authentication-1.scss', '../../authentication.scss']
})


 export class LoginComponent {
  authenticationService = inject(AuthenticationService);

  hide = true;
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = '';
  error = '';
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.loginForm = this.formBuilder.group({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required)
    });
  }

  get formValues() {
    return this.loginForm.controls;
  }

  public login(): void {
    console.log("Login User..");
    this.isLoading = true;
  
    this.userService.userlogin(this.loginForm.value)
  .pipe(first())
  .subscribe(
    (response) => {
      // Now `response` is the user object (response.body)
      console.log('User response:', response);

      const token = localStorage.getItem('token');
      const userId = response?.data?.id;
      const roleId = response?.data?.roles?.[0]?.id;

      console.log('Token from localStorage:', token);
       alert(response.message);

        this.router.navigate(['/home']);
     
    },
    (error) => {
      console.error('Login error:', error);
      alert("Login Failed: " + (error.error?.message || "Unknown error"));
      this.loginForm.reset();
    }
  );

  }


  }
