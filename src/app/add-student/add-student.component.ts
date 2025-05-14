import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Student } from '../model/student.model';
import { StudentService } from '../service/student.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NavbarComponent
  ],
  styleUrls: ['./add-student.component.css'],
  standalone: true
})
export class AddStudentComponent {
  studentService = inject(StudentService);

  studentForm = new FormGroup({
    id: new FormControl<number>(0, [
      Validators.required,
      Validators.min(0)
    ]),
    name: new FormControl<string>('', [
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
    major: new FormControl<string>('', [
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
      name: this.studentForm.value.name!.trim(),
      mark: this.studentForm.value.mark!,
      major: this.studentForm.value.major!.trim(),
      email: this.studentForm.value.email!.trim()
    };

    this.studentService.addStudent(student).subscribe({
      next: () => {
        this.studentForm.reset({
          id: 0,
          name: '',
          mark: 0,
          email: '',
          major: ''
        });
      },
      error: (err) => {
        this.errorMessages.push('Error adding student: ' + err.message);
      }
    });
  }

  validateForm(): void {
    this.errorMessages = [];

    if (this.studentForm.get('id')?.hasError('required')) {
      this.errorMessages.push('ID is required.');
    } else if (this.studentForm.get('id')?.hasError('min')) {
      this.errorMessages.push('ID must be a positive number.');
    }

    if (this.studentForm.get('name')?.hasError('required')) {
      this.errorMessages.push('Name is required.');
    }

    if (this.studentForm.get('email')?.hasError('required')) {
      this.errorMessages.push('Email is required.');
    } else if (this.studentForm.get('email')?.hasError('email')) {
      this.errorMessages.push('Email is not valid.');
    } else if (this.studentForm.get('email')?.hasError('minlength')) {
      this.errorMessages.push('Email must be at least 5 characters long.');
    } else if (this.studentForm.get('email')?.hasError('maxlength')) {
      this.errorMessages.push('Email must be at most 50 characters long.');
    }

    if (this.studentForm.get('mark')?.hasError('required')) {
      this.errorMessages.push('Mark is required.');
    } else if (this.studentForm.get('mark')?.hasError('min') || this.studentForm.get('mark')?.hasError('max')) {
      this.errorMessages.push('Mark must be between 0 and 100.');
    }

    if (this.studentForm.get('major')?.hasError('required')) {
      this.errorMessages.push('Major is required.');
    }
  }
}
