import { NgModule } from '@angular/core';
import {CalendarModule} from 'angular-calendar';
import { CalendarHomeComponent } from './calendar-home/calendar-home.component';
import {SharedModule} from '../shared/shared.module';
import {MyCalendarRoutingModule} from './my-calendar-routing.module';

@NgModule({
  imports: [
    SharedModule,
    MyCalendarRoutingModule,
    CalendarModule.forRoot(),
  ],
  declarations: [CalendarHomeComponent]
})
export class MyCalendarModule { }
