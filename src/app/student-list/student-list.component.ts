import { Component, inject, OnInit } from '@angular/core';
import { StudentService } from '../service/student.service';
import { Student } from '../model/student.model';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';
import { AddStudentComponent } from '../add-student/add-student.component';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    RouterOutlet,
    FormsModule,
    DatePipe,
    NavbarComponent,
    AddStudentComponent
  ],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  studentService = inject(StudentService);
  students: Student[] = [];
  editingStudent: Student | null = null;
  currentPage: number = 1;
  pageSize: number = 5;

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe({
      next: (students) => this.students = students,
      error: (err) => console.error('Error fetching students:', err)
    });
  }

  paginate() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.students.slice(start, end);
  }

  editStudent(student: Student) {
    this.editingStudent = { ...student };
  }

  saveEdit() {
    if (this.editingStudent) {
      this.studentService.updateStudent(this.editingStudent).subscribe({
        next: () => {
          this.loadStudents(); // Refresh list
          this.editingStudent = null;
        },
        error: (err) => console.error('Error updating student:', err)
      });
    }
  }

  cancelEdit() {
    this.editingStudent = null;
  }

  deleteStudent(id: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => this.loadStudents(), // Refresh list
        error: (err) => console.error('Error deleting student:', err)
      });
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
