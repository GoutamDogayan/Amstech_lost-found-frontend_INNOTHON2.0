import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MissingPersonService } from '../../service/missing-person';


@Component({
  selector: 'app-person-register',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './person-register.component.html',
  styleUrls: ['./person-register.component.scss', '../authentication-1.scss', '../../authentication.scss']
})
export class PersonRegisterComponent implements OnInit {
  hide = true;
  coHide = true;
  isDatasetGenerated = false;

  email = new FormControl('', [Validators.required, Validators.email]);
  faceForm: FormGroup;

  private http = inject(HttpClient);

  userName: string = '';

registerForm: FormGroup;

  constructor(private fb: FormBuilder,private apiService: MissingPersonService ) {
    this.registerForm = this.fb.group({
    name: [''],
    age: [''],
    address: ['']
  });
  }

  ngOnInit(): void {
    this.faceForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      idProof: ['', Validators.required],
      description: ['', Validators.required],
       terms: [false, Validators.requiredTrue] 
    });
  }

   // Handle Dataset Generation
  generateDataset(data: any): void {
    console.log(this.faceForm.value);
    this.apiService.generateDataset(data).subscribe(
      (response) => {
        this.trainModel();
        console.log('Dataset generated:', response);
      },
      (error) => {
        console.error('Error generating dataset:', error);
      }
    );
  }

  // Handle Model Training
  trainModel(): void {
    this.apiService.trainModel().subscribe(
      (response) => {
        console.log('Model trained:', response);
      },
      (error) => {
        console.error('Error training model:', error);
      }
    );
  }

  // Handle User Detection
  detectUser(name: string): void {
    this.apiService.detectUser(name).subscribe(
      (response) => {
        if (response.status === 'found') {
          console.log(`${name} was found.`);
        } else {
          console.log(`${name} not found.`);
        }
      },
      (error) => {
        console.error('Error detecting user:', error);
      }
    );
  }
  onRegister() {
  if (this.faceForm.valid) {
    this.generateDataset(this.faceForm.value);
  }
}

getErrorMessage(field: string): string {
  const control = this.faceForm.get(field);

  if (control?.hasError('required')) {
    return 'This field is required';
  }

  if (control?.hasError('email')) {
    return 'Invalid email address';
  }

  if (control?.hasError('minlength')) {
    return `Minimum length is ${control.getError('minlength').requiredLength}`;
  }

  return 'Invalid field';
}


}