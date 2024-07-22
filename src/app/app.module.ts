import { HttpClientModule } from '@angular/common/http';
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { ObservableDemoComponent } from './observable-demo/observable-demo.component';
import { StudentDetailsFormComponent } from './student-details-form/StudentDetailsFormComponent';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentService } from "./students.service";

@NgModule({   
    imports:[BrowserModule,ReactiveFormsModule,HttpClientModule],   //dependencies in module
    declarations:[AppComponent, StudentsListComponent, StudentDetailsComponent, StudentDetailsFormComponent, ObservableDemoComponent,],  //components in module
    providers:[StudentService], //for the injection: make one instance for all the declared components
    bootstrap:[AppComponent],  //starting component
})
export class AppModule{}

