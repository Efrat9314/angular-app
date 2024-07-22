import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../students-list/Student';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StudentService } from './../students.service';


@Component({
  selector: 'app-student-details-form',
  templateUrl: './student-details-form.component.html',
})
export class StudentDetailsFormComponent {

  tracksList: string[] = this._studentService.getTracksList();
  @Input()
  student: Student | undefined;

  addStudentForm: FormGroup = new FormGroup({
    firstName: new FormControl("", [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl("", [Validators.required, Validators.minLength(2)]),
    phone: new FormControl("", [Validators.required, Validators.pattern("^05[0-9]{8}")]),
    avg: new FormControl("", [Validators.required, Validators.min(56)]),
    track: new FormControl("", Validators.required),
    year: new FormControl("", Validators.required),
  });

  @Input()
  addStudent?: boolean;

  @Output()
  onSaveStudent: EventEmitter<Student> = new EventEmitter();

  saveNewStudent() {
    this.student = this.addStudentForm.value;
    this.onSaveStudent.emit(this.student);
    this.addStudentForm.reset();
    this.addStudent=false;
  }
  constructor(private _studentService: StudentService) { }

}
