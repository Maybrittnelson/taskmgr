import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import {getDate} from 'date-fns';
import {Project} from '../../domain/project.model';
import { Store} from '@ngrx/store';
import * as actions from '../../actions/project.action';
import * as fromRoot from '../../reducers';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent implements OnInit {

  @Output() navClick = new EventEmitter<void>();
  today = 'day';
  projects$: Observable<Project[]>;

  constructor(private store$: Store<fromRoot.State>) {
    this.projects$ = this.store$.select(fromRoot.getProjects);
  }

  ngOnInit() {
    this.today = `day${getDate(new Date())}`;
  }

  onNavClick() {
    this.navClick.emit();
  }

  onPrjClick(prj: Project) {
    this.store$.dispatch(new actions.SelectAction(prj));
    this.navClick.emit();
  }

}
