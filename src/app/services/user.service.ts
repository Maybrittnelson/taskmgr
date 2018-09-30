import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Project} from '../domain';
import {Observable} from 'rxjs/Observable';
import {User} from "../domain/user.model";

@Injectable()
export class UserService {
  private readonly domain = 'users';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });
  constructor(private http: Http, @Inject('BASE_CONFIG' )private config) {}

  searchUsers(filter: string): Observable<User[]> {
      const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {'email_like': filter}})
      .map(res => res.json() as User[]);
  }

  getUserByProject(projectId: string): Observable<User[]> {
    const uri = `${this.config.uri}/${this.domain}`;
    return this.http
      .get(uri, {params: {'projectId': projectId}})
      .map(res => res.json() as User[]);
  }

  //of为返回一个对象
  addProjectRef(user: User, projectId: string): Observable<User> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = (user.projectIds) ? user.projectIds : [];
    if (projectIds.indexOf(projectId) > -1) {
      return Observable.of(user);
    }
    return this.http
      .patch(uri, JSON.stringify({projectIds: [...projectIds, projectId]}), {headers: this.headers})
      .map(res => res.json() as User);
  }

  removeProjectRef(user: User, projectId: string): Observable<User> {
    const uri = `${this.config.uri}/${this.domain}/${user.id}`;
    const projectIds = (user.projectIds) ? user.projectIds : [];
    const index = projectIds.indexOf(projectId);
    if (index === -1) {
      return Observable.of(user);
    }
    const toUpdate = [...projectIds.slice(0, index), ...projectIds.slice(index + 1)];
    return this.http
      .patch(uri, JSON.stringify({projectIds: toUpdate}), {headers: this.headers})
      .map(res => res.json() as User);
  }

  batchUpdateProjectRef(project: Project): Observable<User[]> {
    const projectId = project.id;
    const memberIds = project.members ? project.members : [];
    return Observable.from(memberIds)
      .switchMap(id => {
        const uri = `${this.config.uri}/${this.domain}/${id}`;
        return this.http.get(uri).map(res => res.json() as User);
      })
      .filter((user: User) => user.projectIds.indexOf(projectId) === -1)
      .switchMap((u: User) => this.addProjectRef(u, projectId))
      .reduce((users: User[], curr) => [...users, curr], []);
  }

}
