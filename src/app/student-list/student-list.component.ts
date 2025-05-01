import {Component, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {StudentService} from '../service/student.service';
import {Student} from '../model/student.model';
import {FormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-student',
  imports: [
    RouterOutlet,
    FormsModule,
    DatePipe,
    NavbarComponent
  ],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css'
})
export class StudentListComponent {
  studentService = inject(StudentService);

  students: Student[] = this.studentService.getStudents();
  editingStudent: Student | null = null;
  currentPage: number = 1;
  pageSize: number = 5;

  paginate(){
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.students.slice(start, end);
  }

  addStudent(student: Student) {
    this.studentService.addStudent(student);
    // Reset to first page if adding a new student
    this.currentPage = 1;
  }

  editStudent(student: Student) {
    this.editingStudent = { ...student };
  }

  saveEdit() {
    if (this.editingStudent) {
      this.studentService.updateStudent(this.editingStudent);
      this.editingStudent = null;
    }
  }

  cancelEdit() {
    this.editingStudent = null;
  }

  deleteStudent(id: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id);
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.students.length > this.currentPage * this.pageSize) {
      this.currentPage++;
    }
  }
}
