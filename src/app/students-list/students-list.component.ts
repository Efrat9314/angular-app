import { StudentService } from '../students.service';
import { Student } from './Student';
import { Component, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
})
export class StudentsListComponent {
  studentToDisplay?: Student;
  studentToAdd: boolean = false;
  studentsList: Student[]=[];  // this._studentsService.getStudentsList();

  constructor(private _studentsService: StudentService) { }

  deleteStudent(student: Student) {
    let index = this.studentsList.indexOf(student);
    this.studentsList.splice(index, 1);
    this.studentToDisplay = undefined;
  }

  editStudentDetails(student: Student) {
    this.studentToDisplay = student;
    console.log('studentToDiaplay',student);
  }

  addStudent() {
    this.studentToAdd = !this.studentToAdd;
  }

   async save(student: Student) {
    student.id = this.studentsList[this.studentsList.length - 1].id + 1;
    student.isActive = true;
    this.studentsList.push(student);
    await alert('The Student was added successfully!');
  }
  async update(student:Student){
      let index=this.studentsList.findIndex(x=> x.id==student.id);
      if(index!=-1){
        await this._studentsService.STUDENTS_LIST.splice(index,1,student);
        alert('The Student was updatede successfully!');
      }
    else{
      console.log('not found')
    }
      
  }
  ngOnInit(){
    //  this._studentsService.getPromiseStudentsList().then(data=>{this.studentsList=data;})
    this._studentsService.getAllStudents().subscribe(
      (students)=> this.studentsList=students,
      (err)=> console.log('error occure',err),
      ()=> console.log('finish tthr job!'));
  }
  totalAbsenceDays(id:number):number{
    return this._studentsService.totalAbsenceDays(id);
  }

}
