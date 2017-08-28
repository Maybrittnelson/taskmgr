import {
  Component,
  OnInit,
  OnDestroy,
  HostBinding,
  ChangeDetectionStrategy,
  ChangeDetectorRef } from '@angular/core';
import {MdDialog} from '@angular/material';
import { NewProjectComponent } from '../new-project/new-project.component';
import { InviteComponent } from '../invite/invite.component';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {slideToRight} from '../../anims/router.anim';
import {listAnimation} from '../../anims/list.anim';
import {ProjectService} from '../../services/project.service';
import * as _ from 'lodash';
import {Project} from '../../domain/project.model';
import {Subscription} from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import {Observable} from 'rxjs/Observable';
import * as actions from '../../actions/project.action';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  animations: [
    slideToRight, listAnimation
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectListComponent implements OnInit, OnDestroy {

  @HostBinding('@routeAnim') state;

  projects$: Observable<Project[]>;
  listAnim$: Observable<number>;
  constructor(private dialog: MdDialog,
              private cd: ChangeDetectorRef,
              private store$: Store<fromRoot.State>) {
    this.store$.dispatch(new actions.LoadAction(null));
    this.projects$ = this.store$.select(fromRoot.getProjects);
    this.listAnim$ = this.projects$.map(p => p.length);
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

  openNewProjectDialog() {
      const selectedImg = `/assets/img/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
      const dialogRef = this.dialog.open(
        NewProjectComponent,
        {data: {thumbnails: this.getThumbnails(), img: selectedImg}});
      dialogRef.afterClosed()
        .take(1)
        .filter(n => n)
        .map(val => ({...val, coverImg: this.buildImgSrc(val.coverImg)}))
        .subscribe(project => {
          this.store$.dispatch(new actions.AddAction(project));
        });
  }

  launchInviteDialog(project: Project) {
      this.store$.select(fromRoot.getProjectUsers(project.id))
        .map(users => this.dialog.open(InviteComponent, {data: {members: users}}))
        .switchMap(dialogRef => dialogRef.afterClosed().take(1).filter(n => n))
        .subscribe(val => this.store$.dispatch(new actions.InviteAction({projectId: project.id, members: val})));
  }

  launchUpdateDialog(project: Project) {
    const dialogRef = this.dialog.open(
      NewProjectComponent,

{data: {thumbnails: this.getThumbnails(), project: project}});
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .map(val => ({...val, id: project.id, coverImg: this.buildImgSrc(val.coverImg)}))
      .subscribe(project => {
        this.store$.dispatch(new actions.UpdateAction(project));
      });
  }

  launchConfirmDialog(project) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除项目：', content: '您确认删除项目吗'}});
    dialogRef.afterClosed()
      .take(1)
      .filter(n => n)
      .subscribe(_ => {
          this.store$.dispatch(new actions.DeleteAction(project));
    });
  }

  private getThumbnails() {
    return _.range(0, 40)
    .map(i => `/assets/img/covers/${i}_tn.jpg`);
  }

  private buildImgSrc(img: string) {
    return img.indexOf('_') > -1 ? img.split('_')[0] + '.jpg' : img;
  }

  selectProject (project: Project) {
    this.store$.dispatch(new actions.SelectAction(project));
  }


}
