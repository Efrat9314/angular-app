import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';

@Component({
    selector:'app-root',//name component
    templateUrl: './app.component.html', //body component
  })
export class AppComponent{
    //here is the code
    name:string='efrat';
    time:Date=new Date;
    checkTime(){
        if(this.time.getHours()>6&&this.time.getHours()<=12)
           return 'good morning!'
        if(this.time.getHours()>12&&this.time.getHours()<=17)
            return 'good noon!'
        if(this.time.getHours()>17&&this.time.getHours()<22)
            return 'good evening!'
        if(this.time.getHours()>=22||this.time.getHours()<=5)
           return 'good night!'
        else
            return "";
    }
    
}