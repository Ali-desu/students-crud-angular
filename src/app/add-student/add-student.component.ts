import {Component, EventEmitter, inject, Output} from '@angular/core';
import {ReactiveFormsModule, FormControl, FormGroup, FormsModule} from '@angular/forms';
import {Student} from '../model/student.model';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  @Output() addStudent = new EventEmitter<Student>();

  studentForm = new FormGroup({
    id: new FormControl(0),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    mark: new FormControl<number>(0),
    birthdate: new FormControl(new Date()),
    filiere: new FormControl('')
  })
  errorMessages: string[] = [];


  sendStudent(): void {

    this.errorMessages = []; // Clear previous errors
    this.validateForm();
    if (this.errorMessages.length > 0) {
      return; // Stop if there are validation errors
    }

    // Emit the student data
    this.addStudent.emit({
      "id": this.studentForm.value.id ?? 0,
      "firstName": this.studentForm.value.firstname ?? '',
      "lastName": this.studentForm.value.lastname ?? '',
      "mark": this.studentForm.value.mark ?? 0,
      "birthDate": this.studentForm.value.birthdate ?? new Date(),
      "filiere": this.studentForm.value.filiere ?? ''
    });

    // Reset the form
    this.studentForm.reset();
  }

  validateForm(): void {
    this.errorMessages = []; // Clear previous errors

    if (this.studentForm.value.firstname?.trim() === '') {
      this.errorMessages.push('First name is required.');
    }
    if (this.studentForm.value.lastname?.trim() === '') {
      this.errorMessages.push('Last name is required.');
    }
    if ((this.studentForm.value.mark??0) < 0 || (this.studentForm.value.mark??0) > 100) {
      this.errorMessages.push('Mark must be between 0 and 100.');
    }
    if (this.studentForm.value.birthdate === null) {
      this.errorMessages.push('Birth date is required.');
    }
    if (this.studentForm.value.filiere?.trim() === '') {
      this.errorMessages.push('Filiere is required.');
    }
  }

}
