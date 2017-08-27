import { Component, OnInit, HostBinding, ChangeDetectorRef } from '@angular/core';
import {NewTaskComponent} from '../new-task/new-task.component';
import {MdDialog} from '@angular/material';
import { Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import {ActivatedRoute} from '@angular/router';
import {CopyTaskComponent} from '../copy-task/copy-task.component';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {NewTaskListComponent} from '../new-task-list/new-task-list.component';
import {slideToRight} from '../../anims/router.anim';
import {Observable} from 'rxjs/Observable';
import {TaskList} from '../../domain/task-list.model';
import * as actions from '../../actions/task-list.action';
import * as taskActions from '../../actions/task.action';

@Component({
  selector: 'app-task-home',
  templateUrl: './task-home.component.html',
  styleUrls: ['./task-home.component.scss'],
  animations: [
    slideToRight
  ]
})
export class TaskHomeComponent implements OnInit {

  @HostBinding('@routeAnim') state;
  projectId$: Observable<string>;
  lists$: Observable<TaskList[]>;
  constructor(
    private dialog: MdDialog,
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef) {
    this.projectId$ = this.route.paramMap.map(p => p.get('id'));
    this.lists$ = this.store.select(fromRoot.getTaskByLists);
  }

  ngOnInit() {
  }

  launchNewTaskDialog(list) {
    const user$ = this.store.select(fromRoot.getAuthState).map(auth => auth.user);
    user$.take(1)
      .map(user => this.dialog.open(NewTaskComponent, {data: {title: '新建任务', owner: user}}))
      .switchMap(dialogRef => dialogRef.afterClosed().take(1).filter(n => n))
      .subscribe(val => this.store.dispatch(new taskActions.AddAction({...val, taskListId: list.id, completed: false,
      createDate: new Date})));

  }

  launchCopyTaskDialog(list) {
    this.lists$.map(l => l.filter(n => n.id !== list.id))
      .map(li => this.dialog.open(CopyTaskComponent, {data: {lists: li}}))
      .switchMap(dialogRef => dialogRef.afterClosed()
        .take(1).filter(n => n))
      .subscribe(val => this.store.dispatch(new taskActions.MoveAllAction({srcListId: list.id, targetListId: val})));
  }

  launchUpdateTaskDialog(task) {
    const dialogRef = this.dialog.open(NewTaskComponent, {data: {title: '修改任务', task: task}});
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .subscribe(val => this.store.dispatch(new taskActions.UpdateAction({...task, ...val})));
  }

  launchConfirmDialog(list: TaskList) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除任务列表：', content: '您确认删除任务列表吗'}});
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .subscribe(result => this.store.dispatch(new actions.DeleteAction(list)));
  }

  launchEditlistDialog(list: TaskList) {
    console.log(list);
    const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title: '更改列表名称：', taskLists: list.name}});
    dialogRef.afterClosed()
      .take(1)
      .subscribe(result => this.store.dispatch(new actions.UpdateAction({...result, id: list.id})));
  }

  launchNewListDialog(ev: Event) {
    const dialogRef = this.dialog.open(NewTaskListComponent, {data: {title: '新建列表：'}});
    dialogRef.afterClosed()
      .take(1)
      .withLatestFrom(this.projectId$, (val, projectId) => ({...val, projectId: projectId}))
      .subscribe(result => this.store.dispatch(new actions.AddAction(result)));
  }

  handleMove(srcData, list) {
    switch (srcData.tag) {
      case 'task-item':
            console.log('handling item');
            break;
      case 'task-list':
            console.log('handling list');
            const srcList = srcData.data ;
            const tempOrder = srcList.order;
            srcList.order = list.order;
            list.order = tempOrder;
            break;
      default:
        break;
    }

  }

  handleQuickTask(desc: string, list) {
    console.log(list);
    const user$ = this.store.select(fromRoot.getAuthState).map(auth => auth.user);
    user$.take(1)
      .subscribe(user => this.store.dispatch(new taskActions.AddAction({
        desc: desc,
        priority: 3,
        taskListId: list.id,
        ownerId: user.id,
        completed: false,
        createDate: new Date(),
        participantIds: []})));
  }
}
