import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import {CalendarEvent} from 'angular-calendar';
import {TaskService} from "../../services/task.service";
import {Store} from "@ngrx/store";
import * as fromRoot from '../../reducers';
import { startOfDay, endOfDay} from 'date-fns';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF18A'
  }
};

const getColor = (priority: number) => {
  switch (priority) {
    case 1:
      return colors.red;
    case 2:
      return colors.blue;
    default:
      return colors.yellow;
  }
}
@Component({
  selector: 'app-calendar-home',
  template: `
  <md-card>
    <div class="toolbar">
      <button md-icon-button mwlCalendarPreviousView>
        <md-icon class="md-48">chevron_left</md-icon>
      </button>
      <button md-button mwlCalendarToday>
        {{viewDate | date: 'yyyy-MM-dd'}}
      </button>
      <button md-icon-button mwlCalendarNextView>
        <md-icon class="md-48">chevron_right</md-icon>
      </button>
    </div>
    <ng-container *ngIf="(events$ | async)as calEvents">
      <div [ngSwitch]=" view$ | async">
        <mwl-calendar-week-view  *ngSwitchCase="'week'"
                                 [viewDate]="viewDate"
                                 [locale]="'zh'"
                                 [events]="calEvents"
                                 (eventClicked)="handleEvent($event.event)">

        </mwl-calendar-week-view >
        <mwl-calendar-day-view *ngSwitchCase="'day'"
                               [viewDate]="viewDate"
                               [locale]="'zh'"
                               [events]="calEvents"
                               (eventClicked)="handleEvent($event.event)">

        </mwl-calendar-day-view>
        <mwl-calendar-month-view *ngSwitchDefault
                                 [viewDate]="viewDate"
                                 [locale]="'zh'"
                                 [events]="calEvents"
                                 (eventClicked)="handleEvent($event.event)">

        </mwl-calendar-month-view>
      </div>
    </ng-container>
  </md-card>
  `,
  styles: []
})
export class CalendarHomeComponent implements OnInit {

  viewDate: Date;
  view$: Observable<string>;
  events$: Observable<CalendarEvent[]>;

  constructor(private route: ActivatedRoute,
              private store$: Store<fromRoot.State>,
              private service$: TaskService) {
    this.viewDate = new Date();
    this.view$ = this.route.paramMap.map(p => p.get('view'));
    this.events$ = this.store$.select(fromRoot.getAuthState)
      .map(auth => auth.user.id)
      .switchMap(userId => this.service$.getUserTasks(userId))
      .map(tasks => tasks.map(task => ({
        start: startOfDay(task.createDate),
        end: endOfDay(task.dueDate),
        title: task.desc,
        color: getColor(task.priority)
      })));
  }

  ngOnInit() {
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log('events handled');
  }

}
