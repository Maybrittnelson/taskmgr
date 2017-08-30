import { Component, Input, forwardRef, OnDestroy, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, FormBuilder, FormGroup} from '@angular/forms';
import {
  subYears,
  subMonths,
  subDays,
  isBefore,
  differenceInDays,
  differenceInMonths,
  differenceInYears,
  parse,
  isValid,
  isDate,
  isFuture,
  format
} from 'date-fns';
import {isValidDate, toDate} from '../../utils/date.util';
import { Subscription } from 'rxjs/Subscription';
export enum AgeUnit {
  Year = 0,
  Month,
  Day
}

export interface Age {
  age: number;
  unit: AgeUnit;
}
/*ControlValueAccessor: 自定义表单控件必须实现接口*/
@Component({
  selector: 'app-age-input',
  templateUrl: './age-input.component.html',
  styleUrls: ['./age-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AgeInputComponent),
      multi: true
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgeInputComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Input() daysTop = 90;
  @Input() daysBottom = 0;
  @Input() monthsTop = 24;
  @Input() monthsBottom = 1;
  @Input() yearsBottom = 1;
  @Input() yearsTop = 150;
  @Input() debounceTime = 300;
  @Input() format = 'YYYY-MM-DD';
  selectedUnit = AgeUnit.Year;
  dateOfBirth;
  ageUnits = [
    {value: AgeUnit.Year, label: '岁'},
    {value: AgeUnit.Month, label: '月'},
    {value: AgeUnit.Day, label: '天'},
  ];
  form: FormGroup;
  sub: Subscription;
  private propageteChange = (_: any) => {};
  constructor(private fb: FormBuilder) {}

  ngOnInit () {
    const initDate = this.dateOfBirth ? this.dateOfBirth : toDate(subYears(Date.now(), 30));
    this.form = this.fb.group({
      birthday: [parse(initDate), this.validateDate],
      age: this.fb.group({
        ageNum: [],
        ageUnit: [AgeUnit.Year]
      }, {validator: this.validateAge('ageNum', 'ageUnit')})
      });
    const birthday = this.form.get('birthday');
    const ageNum = this.form.get('age').get('ageNum');
    const ageUnit = this.form.get('age').get('ageUnit');

    const birthday$ = birthday.valueChanges.map(d => {
      return {date: d, from: 'birthday'};
    })
      .debounceTime(this.debounceTime)
      .distinctUntilChanged()
      .filter(_ => birthday.valid);
    const ageNum$ = ageNum.valueChanges
      .startWith(ageNum.value)
      .debounceTime(this.debounceTime)
      .distinctUntilChanged();
    const ageUnit$ = ageUnit.valueChanges
      .startWith(ageUnit.value)
      .debounceTime(this.debounceTime)
      .distinctUntilChanged();
    const age$ = Observable.combineLatest(ageNum$, ageUnit$, (_n, _u) => {
      return this.toDate({age: _n, unit: _u});
    }).map(d => {
      return {date: d, from: 'age'};
    })
      .filter(_ => this.form.get('age').valid);
    const merged$ = Observable.
      merge(birthday$, age$)
      .filter(_ => this.form.valid);
    this.sub = merged$.subscribe(d => {
      const age = this.toAge(d.date);
      if (d.from === 'birthday') {
        if (age.age !== ageNum.value) {
          ageNum.patchValue(age.age, {emitEvent: false});
        }
        if (age.unit !== ageUnit.value) {
          this.selectedUnit = age.unit;
          ageNum.patchValue(age.unit, {emitEvent: false});
        }
        this.propageteChange(d.date);
      } else {
        const ageToCompare = this.toAge(birthday.value);
        if (age.age !== ageToCompare.age || age.unit !== ageToCompare.unit) {
          birthday.patchValue(parse(d.date), {emitEvent: false});
          this.propageteChange(d.date);
        }
      }
    });


  }

  ngOnDestroy () {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  /**
   * Write a new value to the element.
   */
  // 写入控件值
  writeValue(obj: any): void {
    if (obj) {
      //const date = format(obj, this.format);
      const date = parse(toDate(obj));
      this.form.get('birthday').patchValue(date, {emitEvent: true});
      console.log(date);
      const age = this.toAge(format(obj, this.format));
      this.form.get('age').get('ageNum').patchValue(age.age);
      this.form.get('age').get('ageUnit').patchValue(age.unit);
    }
  }

  /**
   * Set the function to be called when the control receives a change event.
   */
  // 当表单控件值改变时，函数 fn 会被调用
  // 这也是我们把变化 emit 回表单的机制
  registerOnChange(fn: any): void {
    this.propageteChange = fn;
  }
  /**
   * Set the function to be called when the control receives a touch event.
   */
  // 这里没有使用，用于注册 touched 状态
  registerOnTouched(fn: any): void {}

  toAge(dateStr: string): Age {
    const date = parse(dateStr);
    const now = Date.now();
    return isBefore(subDays(now, 90), date) ? {age: differenceInDays(now, date), unit: AgeUnit.Day} :
    isBefore(subMonths(now, 24), date) ?
      {age: differenceInMonths(now, date), unit: AgeUnit.Month} :
      {
        age: differenceInYears(now, date),
        unit: AgeUnit.Year
      };
  }

  toDate(age: Age): string {
    const now = Date.now();
    switch (age.unit) {
      case AgeUnit.Year: {
        return format(subYears(now, age.age), this.format);
      }
      case AgeUnit.Month: {
        return format(subMonths(now, age.age), this.format);
      }
      case AgeUnit.Day: {
        return format(subDays(now, age.age), this.format);
      }
      default: {
        return null;
      }
    }
  }
  // 验证表单，验证结果正确返回 null 否则返回一个验证结果对象
  validateDate(c: FormControl): {[key: string]: any} {
      const val = c.value;
      return isValidDate(val) ? null : {
        birthdayInvalid: true
      };
  }

  validate(c: FormControl): {[key: string]: any} {
    const val = c.value;
    if (!val) {
      return null;
    }
    if (isValidDate(val)) {
      return null;
    }
    return {
      dateOfBirthInvalid: true
    };
  }
  // 验证表单，验证结果正确返回 null 否则返回一个验证结果对象
  validateAge(ageNumKey: string, ageUnitKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      const ageNum = group.controls[ageNumKey];
      const ageUnit = group.controls[ageUnitKey];
      let result = false;
      const ageNumVal = ageNum.value;
      switch (ageUnit.value) {
        case AgeUnit.Year: {
          result = ageNumVal >= this.yearsBottom && ageNumVal < this.yearsTop;
          break;
        }
        case AgeUnit.Month: {
          result = ageNumVal >= this.monthsBottom && ageNumVal < this.monthsTop;
          break;
        }
        case AgeUnit.Day: {
          result = ageNumVal >= this.daysBottom && ageNumVal < this.daysTop;
          break;
        }
        default: {
          break;
        }
      }
      return result ? null : {ageInvalid: true};
    };
  }
}
