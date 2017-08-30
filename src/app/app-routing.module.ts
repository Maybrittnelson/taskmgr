import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuardService} from './services/auth-guard.service';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'projects', loadChildren: 'app/project#ProjectModule', pathMatch: 'full', canActivate: [AuthGuardService]},
    { path: 'tasklists/:id', loadChildren: 'app/task#TaskModule', pathMatch: 'full', canActivate: [AuthGuardService]},
  { path: 'mycal/:view', loadChildren: 'app/my-calendar#MyCalendarModule', pathMatch: 'full', canActivate: [AuthGuardService]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
