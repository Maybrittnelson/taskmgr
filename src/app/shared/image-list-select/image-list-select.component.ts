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
  constructor() {
  }
  // 这里是做一个空函数体，真正使用的方法在 registerOnChange 中
  // 由框架注册，然后我们使用它把变化发回表单
  // 注意，和 EventEmitter 尽管很像，但发送回的对象不同
  private propageteChange = (_: any) => {};
  // 列表元素选择发生改变触发
  onChange(i) {
    this.selected = this.items[i];
    this.propageteChange(this.selected);
  }

  /**
   * Write a new value to the element.
   */
  // 写入控件值
  writeValue(obj: any): void {
    this.selected = obj;
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
  registerOnTouched(fn: any): void {

  }

  // 验证表单，验证结果正确返回 null 否则返回一个验证结果对象
  validate(c: FormControl): {[key: string]: any} {
    return this.selected ? null : {
      imageListInvalid: {
        valid: false
      }
    };
  }

}
