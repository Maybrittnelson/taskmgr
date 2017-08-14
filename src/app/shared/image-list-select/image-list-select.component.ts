import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl} from '@angular/forms';

@Component({
  selector: 'app-image-list-select',
  templateUrl: './image-list-select.component.html',
  styleUrls: ['./image-list-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ImageListSelectComponent),
      multi: true
    },
  ]
})
export class ImageListSelectComponent implements ControlValueAccessor {

  @Input()
  cols = 6;
  @Input()
  rowHeight = '64px';
  @Input()
  title = '选择';
  @Input()
  items: string[] = [];
  @Input()
  useSvgIcon = false;
  @Input()
  itemWidth = '80px';

  selected: string;
  constructor() { }
  private propageteChange = (_: any) => {};
  onChange(i) {
    this.selected = this.items[i];
    this.propageteChange(this.selected);
  }

  /**
   * Write a new value to the element.
   */
  writeValue(obj: any): void {
    this.selected = obj;
  }

  /**
   * Set the function to be called when the control receives a change event.
   */
  registerOnChange(fn: any): void {
    this.propageteChange = fn;
  }
  /**
   * Set the function to be called when the control receives a touch event.
   */
  registerOnTouched(fn: any): void {

  }

  validate(c: FormControl): {[key: string]: any} {
    return this.selected ? null : {
      imageListInvalid: {
        valid: false
      }
    };
  }

}
