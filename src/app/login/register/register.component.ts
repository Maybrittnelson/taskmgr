import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {extractInfo, getAddrByCode, isValidAddr} from '../../utils/identity.util';
import {isValidDate} from "../../utils/date.util";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: FormGroup;
  items: string[];
  private _sub: Subscription;
  private readonly avatarName = 'avatars';

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    const img = `${this.avatarName}:svg-${(Math.random() * 16).toFixed()}`;
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    this.items = nums.map(d => `avatars:svg-${d}`);
    this.form = this.fb.group({
        email: [],
        name: [],
        password: [],
        repeat: [],
        avatar: [img],
        dateOfBirth: ['1990-01-01'],
        address: [],
        identity: []
    });
    const id$ = this.form.get('identity').valueChanges
      .debounceTime(300)
      .filter(v => this.form.get('identity').valid);

    this._sub = id$.subscribe(id => {
      const info = extractInfo(id.identityNo);
      if (isValidAddr(info.addrCode)) {
        const addr = getAddrByCode(info.addrCode);
        this.form.get('address').patchValue(addr);
      }
      if (isValidDate(info.dateOfBirth)) {
        this.form.get('dateOfBirth').patchValue(info.dateOfBirth);
      }
    });
  }
  ngOnDestroy() {
    if (this._sub) {
      this._sub.unsubscribe();
    }
  }

  onSubmit ({value, valid}, ev: Event) {
    ev.preventDefault();
    if (!valid) {
      return;
    }
    console.log(value);
  }

}
