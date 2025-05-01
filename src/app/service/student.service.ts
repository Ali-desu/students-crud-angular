import {inject, Injectable} from '@angular/core';
import { Student } from '../model/student.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private Students: Student[] = [];
  private http = inject(HttpClient)
  private readonly STORAGE_KEY = 'students';

  constructor() {
    // Load students from localStorage or initialize with mock data
    this.loadStudents();
    if (this.Students.length === 0) {
      this.Students = [];
      this.saveStudents();
    }

    //testing the http
    this.http.get('http://localhost:9090/spring_tuto_web_war_exploded/api/students').subscribe({
      next: (response) => {
        console.log("fetched from the backend : " + response);
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  private loadStudents(): void {
    const storedStudents = localStorage.getItem(this.STORAGE_KEY);
    if (storedStudents) {
      const parsedStudents = JSON.parse(storedStudents);
      // Convert birthDate strings back to Date objects
      this.Students = parsedStudents.map((student: any) => ({
        ...student,
        birthDate: new Date(student.birthDate)
      }));
    }
  }

  private saveStudents(): void {
    // Save students to localStorage
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.Students));
  }

  getStudents(): Student[] {
    return this.Students;
  }

  addStudent(student: Student): void {
    const index = this.Students.findIndex(s => s.id === student.id);
    if (index === -1) {
      this.Students.push(student);
      this.saveStudents();
    } else {
      alert(`Student ${student.id} already exists`);
    }
  }

  deleteStudent(id: number): void {
    const index = this.Students.findIndex(student => student.id === id);
    if (index !== -1) {
      this.Students.splice(index, 1);
      this.saveStudents();
    }
  }

  updateStudent(updatedStudent: Student): void {
    const index = this.Students.findIndex(student => student.id === updatedStudent.id);
    if (index !== -1) {
      this.Students[index] = updatedStudent;
      this.saveStudents();
    }
  }
}
