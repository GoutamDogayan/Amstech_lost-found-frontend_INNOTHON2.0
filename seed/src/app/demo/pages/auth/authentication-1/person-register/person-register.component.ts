// angular import
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

// project import
import { SharedModule } from 'src/app/demo/shared/shared.module';
import { AuthenticationService } from 'src/app/@theme/services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { MissingPersonService } from '../../service/missing-person';

@Component({
  selector: 'app-person-register',
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './person-register.component.html',
  styleUrls: ['./person-register.component.scss', '../authentication-1.scss', '../../authentication.scss']
})
export class PersonRegisterComponent {
  // public props
  hide = true;
  coHide = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  authenticationService = inject(AuthenticationService);

  // public method
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter an email';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  faceForm: FormGroup;

  constructor(private fb: FormBuilder, private missingPersonService: MissingPersonService,private http: HttpClient) {}

  ngOnInit(): void {
    this.faceForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      idProof: ['', Validators.required],
      description: ['', Validators.required],
      
    });
  }

  // Method to submit the form and call the API
  onRegister(): void {
    if (!this.isDatasetGenerated) return;
    if (this.faceForm.valid) {
      const requestModel = this.faceForm.value;  // Get the form values
      this.missingPersonService.missingPersonRegister(requestModel).subscribe(
        response => {
          // Handle success
          console.log('User created successfully', response);
        },
        error => {
          // Handle error
          console.error('Error while creating user', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  isDatasetGenerated = false;

  // Add this method to your component
printFormValues() {
  const formData = this.faceForm.value;
  const jsonOutput = JSON.stringify({
    name: formData.name,
    age: formData.age
  });
  console.log(jsonOutput);  // This will print the JSON object in the console
}

  generateDataset() {
    if (this.faceForm.valid) {
      this.printFormValues();
      this.isDatasetGenerated = true; 
      this.http.post('http://localhost:5000/api/generate-dataset', this.faceForm.value)
        .subscribe(res => alert('Dataset generated!'), err => alert('Error generating dataset'));
    } else {
      alert('Please fill all fields');
    }
  }

  trainModel() {
    this.http.get('http://localhost:5000/api/train')
      .subscribe(res => alert('Training completed!'), err => alert('Error training model'));
  }

  detectFaces() {
    this.http.get('http://localhost:5000/api/detect')
      .subscribe(res => alert('Detecting faces...'), err => alert('Error detecting faces'));
  }

}
