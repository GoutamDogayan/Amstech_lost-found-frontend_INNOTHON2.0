// angular import
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { AuthenticationService } from 'src/app/@theme/services/authentication.service';
import { UserService } from '../../service/user-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss', '../authentication-1.scss', '../../authentication.scss']
})
export class RegisterComponent {
  // public props
   faceForm: FormGroup;
  
    constructor(private fb: FormBuilder, private userService: UserService,private http: HttpClient,private router: Router) {
  
      this.faceForm = this.fb.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        mobileNumber: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
         password: ['', Validators.required],
        idProof: ['', Validators.required],
       
        
      });
    }
  
   onRegister(): void {
   
    if (this.faceForm.valid) {
      const requestModel = this.faceForm.value;  // Get the form values
      this.userService.userRegister(requestModel).subscribe(
        (response) => {
          console.log('Signup successful:', response);
          
          alert(response.message);
          this.router.navigate(['/login']);
          this.faceForm.reset();
         
        
        },
        (error) => {
          
          console.error('Signup failed:', error);
          alert("Signup Failed: " + (error.error?.message || "Something went wrong"));
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
