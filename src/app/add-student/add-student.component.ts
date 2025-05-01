import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, FormsModule, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Student } from '../model/student.model';
import { StudentService } from '../service/student.service';
import { NavbarComponent } from '../navbar/navbar.component';

// Custom validator for positive numbers

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NavbarComponent
  ],
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  studentService = inject(StudentService);

  studentForm = new FormGroup({
    id: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0)
    ]),
    firstname: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    lastname: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    mark: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0),
      Validators.max(100)
    ]),
    email: new FormControl<string>('', [
      Validators.required,
      Validators.email,
      Validators.minLength(5),
      Validators.maxLength(50)
    ]),
    birthdate: new FormControl<Date>(new Date(), [
      Validators.required
    ]),
    filiere: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(1)
    ])
  });

  errorMessages: string[] = [];

  sendStudent(): void {
    this.errorMessages = []; // Clear previous errors

    if (!this.studentForm.valid) {
      this.validateForm();
      return; // Stop if the form is invalid
    }

    const student: Student = {
      id: this.studentForm.value.id!,
      firstName: this.studentForm.value.firstname!.trim(),
      lastName: this.studentForm.value.lastname!.trim(),
      mark: this.studentForm.value.mark!,
      email: this.studentForm.value.email!.trim(),
      birthDate: this.studentForm.value.birthdate!,
      filiere: this.studentForm.value.filiere!.trim()
    };

    this.studentService.addStudent(student);
    console.log(this.studentService.getStudents());

    // Reset the form with default values
    this.studentForm.reset({
      id: 0,
      firstname: '',
      lastname: '',
      mark: 0,
      birthdate: new Date(),
      filiere: ''
    });
  }

  validateForm(): void {
    this.errorMessages = [];

    if (this.studentForm.get('id')?.hasError('required')) {
      this.errorMessages.push('ID is required.');
    } else if (this.studentForm.get('id')?.hasError('positiveNumber')) {
      this.errorMessages.push('ID must be a positive number.');
    }

    if (this.studentForm.get('firstname')?.hasError('required')) {
      this.errorMessages.push('First name is required.');
    }
    //email
    if (this.studentForm.get('email')?.hasError('required')) {
      this.errorMessages.push('Email is required.');
    } else if (this.studentForm.get('email')?.hasError('email')) {
      this.errorMessages.push('Email is not valid.');
    } else if (this.studentForm.get('email')?.hasError('minlength')) {
      this.errorMessages.push('Email must be at least 5 characters long.');
    } else if (this.studentForm.get('email')?.hasError('maxlength')) {
      this.errorMessages.push('Email must be at most 50 characters long.');
    }

    if (this.studentForm.get('lastname')?.hasError('required')) {
      this.errorMessages.push('Last name is required.');
    }

    if (this.studentForm.get('mark')?.hasError('required')) {
      this.errorMessages.push('Mark is required.');
    } else if (this.studentForm.get('mark')?.hasError('min') || this.studentForm.get('mark')?.hasError('max')) {
      this.errorMessages.push('Mark must be between 0 and 100.');
    }

    if (this.studentForm.get('birthdate')?.hasError('required')) {
      this.errorMessages.push('Birth date is required.');
    }

    if (this.studentForm.get('filiere')?.hasError('required')) {
      this.errorMessages.push('Filiere is required.');
    }
  }
}
