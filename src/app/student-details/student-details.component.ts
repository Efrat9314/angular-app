import { Component, EventEmitter, Input, Output, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Student } from '../students-list/Student';
import { StudentService } from './../students.service';
import { absenceDays } from './../absenceDays.model';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
})
export class StudentDetailsComponent implements OnInit {

  studentForm: FormGroup = new FormGroup({
    firstName: new FormControl("", [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl("", [Validators.required, Validators.minLength(2)]),
    phone: new FormControl("", [Validators.required, Validators.pattern("^05[0-9]{8}")]),
    avg: new FormControl("", [Validators.required, Validators.min(56)]),
    track: new FormControl("", Validators.required),
    absenceDaysStudent: new FormGroup({
      startDay: new FormControl(" ", [Validators.required]),
      numDays: new FormControl(" ", [Validators.required]),
    })
  });

  @Input()
  currentStudent: Student | undefined;
  tracksList: string[] = [];

  @Output() onUpdateStudent: EventEmitter<Student> = new EventEmitter();

  constructor(private _studentService: StudentService) { }

  ngOnInit() {
    this.tracksList = this._studentService.getTracksList();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Check if currentStudent has changed and patch form values
    if (this.currentStudent && changes['currentStudent'] && !changes['currentStudent'].firstChange) {
      this.studentForm.reset(this.currentStudent);
    }
  }

  showTotaldays(id: number): number {
    return this._studentService.totalAbsenceDays(id);
  }

  updateDetails() {
    if (this.currentStudent) {
      let absenceArr: absenceDays[] = [];
      if (this.currentStudent.absenceDaysStudent)
        absenceArr = [...this.currentStudent.absenceDaysStudent]
      absenceArr.push(this.studentForm.value.absenceDaysStudent);
      const updateStudent = { id: this.currentStudent.id, ...this.studentForm.value, absenceDaysStudent: absenceArr, isActive:true };
      this.onUpdateStudent.emit(updateStudent);
      this.studentForm.reset();
      this.currentStudent=undefined;
    }
  }
}
