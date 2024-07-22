import { Injectable } from "@angular/core";
import { Student } from "./students-list/Student";
import { absenceDays } from "./absenceDays.model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class StudentService {
    STUDENTS_LIST: Student[] = [
        new Student(1, "efrat", "yanay", '0527109314', 98.5, "Accounting", true),
        new Student(2, "rachel", "bekerman", '0522827814', 85, "Teaching", false),
        new Student(3, "tehila", "levi", '058572314', 93, "ComputerPrograming", true, "26/05/2020"),
        new Student(4, "tamar", "weiss", '05689614', 72, "Teaching", false, "24/02/2023", [new absenceDays("27/06/2024", 5), new absenceDays("22/012/2023", 2)]),
    ]
    TRCKS_LIST = ["ComputerPrograming", "Teaching", "Accounting"]

    constructor(private _http: HttpClient) { }
    getAllStudents(): Observable<Student[]> {
        return this._http.get<Student[]>("/api/students");
    }

    getStudentsList(): Student[] {
        return this.STUDENTS_LIST;
    }
    getTracksList(): string[] {
        return this.TRCKS_LIST;
    }

    getPromiseStudentsList(): Promise<Student[]> {
        return new Promise<Student[]>(res => {
            setTimeout(() => { res(this.STUDENTS_LIST) }, 2000)
        })
    }
    getAvgById(id: number): number {
        let stu = this.STUDENTS_LIST.find(x => x.id == id);
        console.log('o found student', stu)
        return stu ? stu.avg : 0;
    }
    totalAbsenceDays(id: number): number {
        let stu = this.STUDENTS_LIST.find(x => x.id == id);
        if (stu && stu.absenceDaysStudent) {
            return stu.absenceDaysStudent.reduce((prev, current) => prev + current.numDays, 0) || 0;
        }
        else
            return 0;

    }

}