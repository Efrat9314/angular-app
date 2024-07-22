import { absenceDays } from './../absenceDays.model';
export class Student {
     id: number;
     firstName: string;
     lastName: string;
     phone:string;
     avg:number;
     isActive: boolean;
     dateLiving?: string;
     track: string;
     absenceDaysStudent?:absenceDays[];

    constructor(id:number=0,firstName: string, lastName: string,phone:string,avg:number,track: string, isActive: boolean,dateLiving?: string,absenceDaysStudent?:absenceDays[]){
        this.id=id;
        this.firstName=firstName;
        this.lastName=lastName;
        this.phone=phone;
        this.avg=avg;
        this.track=track;
        this.isActive=isActive;
        this.dateLiving=dateLiving;
        this.absenceDaysStudent=absenceDaysStudent;
     }
          
}
