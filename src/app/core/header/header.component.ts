import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { getAuthState } from '../../reducers';
import {Auth} from '../../domain/auth.model';
import { Observable } from 'rxjs/Observable';
import * as actions from '../../actions/auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  auth$: Observable<Auth>;
  @Output()
  toggle = new EventEmitter<void>();
  @Output()
  toggleDarkTheme = new EventEmitter<Boolean>();

  constructor(private store$: Store<fromRoot.State>) {
    this.auth$ = this.store$.select(getAuthState);
  }

  ngOnInit() {
  }

  openSidebar() {
    this.toggle.emit();
  }

  onChange(checked: boolean) {
    this.toggleDarkTheme.emit(checked);
  }

  logout () {
    this.store$.dispatch(new actions.LogoutAction(null));
  }


}
