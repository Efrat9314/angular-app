import { Component } from '@angular/core';
import { Observable, filter, interval, map} from 'rxjs';
import { StudentService } from '../students.service';
import { Student } from '../students-list/Student';

@Component({
  selector: 'app-observable-demo',
  templateUrl: './observable-demo.component.html',
})
export class ObservableDemoComponent {

  studentsList:Student []=this._studentService.getStudentsList();;
  display:string="";
  hour1?: string;
  hour2?:string;
  messages?:string []=[];

  studentsName:Observable<string>=new Observable((observe)=>{
    this.studentsList.forEach(element => {
      observe.next(element.firstName+" "+element.lastName)
    });
  }) 

  currentHour:Observable<Date> =new Observable((obs)=>{
      setInterval(()=>{
        obs.next(new Date())
      },1000)
  })

  currentHourByOperator:Observable<Date>=interval(1000).pipe(map(x=> {return new Date()}));

  observableStudents:Observable<Student>=new Observable((obs)=>{
    this.studentsList.forEach(element => {
      obs.next(element);
    });
   
  })
  // observableStudents=from(this.studentsList).pipe(filter(x=> {return x.isActive}),map(x=>{}))
   
  constructor(private _studentService: StudentService){

    this.studentsName.subscribe((val)=>{
      this.display=val;
      console.log("name: "+val)
    })
    this.currentHour.pipe(map(x=>{return x.toLocaleTimeString()})).subscribe((val)=>{
      this.hour1=val;
    })
    this.currentHourByOperator.pipe(map(x=> {
      return x.toLocaleTimeString()
     })).subscribe((val)=>{
      this.hour2=val;
     })
     this.observableStudents.pipe(filter(x=> x.isActive),map(x=> {
      return "send email to "+x.firstName+" "+x.lastName;})).subscribe((val)=>{
      this.messages?.push(val);
      
     })
  }
}
function from(studentsList: Student[]) {
  throw new Error('Function not implemented.');
}

