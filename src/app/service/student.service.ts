import { Injectable } from '@angular/core';
import { Student } from '../model/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  Students: Student[] = [];

  constructor() {
    // Initialize with mock data, using Date objects for birthDate
    this.Students = [
      { id: 1, firstName: 'John', lastName: 'Doe', birthDate: new Date('2000-01-15'), mark: 85, filiere: 'Computer Science' },
      { id: 2, firstName: 'Jane', lastName: 'Smith', birthDate: new Date('1999-05-22'), mark: 90, filiere: 'Mathematics' },
      { id: 3, firstName: 'Alice', lastName: 'Johnson', birthDate: new Date('2001-03-10'), mark: 78, filiere: 'Physics' },
      { id: 4, firstName: 'Bob', lastName: 'Williams', birthDate: new Date('2000-07-30'), mark: 92, filiere: 'Engineering' },
      { id: 5, firstName: 'Emma', lastName: 'Brown', birthDate: new Date('1998-11-05'), mark: 88, filiere: 'Biology' },
      { id: 6, firstName: 'Michael', lastName: 'Davis', birthDate: new Date('2000-09-12'), mark: 95, filiere: 'Computer Science' },
      { id: 7, firstName: 'Sarah', lastName: 'Wilson', birthDate: new Date('1999-02-28'), mark: 80, filiere: 'Chemistry' },
      { id: 8, firstName: 'David', lastName: 'Taylor', birthDate: new Date('2001-06-18'), mark: 87, filiere: 'Mathematics' },
      { id: 9, firstName: 'Laura', lastName: 'Martinez', birthDate: new Date('2000-04-25'), mark: 83, filiere: 'Engineering' },
      { id: 10, firstName: 'James', lastName: 'Anderson', birthDate: new Date('1999-12-01'), mark: 91, filiere: 'Physics' }
    ];
  }

  getStudents(): Student[] {
    return this.Students;
  }

  addStudent(student: Student): void {
    const index = this.Students.findIndex(s => s.id === student.id);
    if (index === -1) {
      this.Students.push(student);
    } else {
      alert(`Student ${student.id} already exists`);
    }
  }

  deleteStudent(id: number): void {
    const index = this.Students.findIndex(student => student.id === id);
    if (index !== -1) {
      this.Students.splice(index, 1);
    }
  }

  updateStudent(updatedStudent: Student): void {
    const index = this.Students.findIndex(student => student.id === updatedStudent.id);
    if (index !== -1) {
      this.Students[index] = updatedStudent;
    }
  }
}
