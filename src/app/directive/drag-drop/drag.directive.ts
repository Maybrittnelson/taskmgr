import { Directive, HostListener, ElementRef, Renderer2, Input } from '@angular/core';
import {DragDropService} from "../drag-drop.service";

/*在 task-item 中使用*/
@Directive({
  selector: '[app-draggable][dragTag][dragData][draggedClass]'
})
export class DragDirective {

  private _isDraggble = false;

  @Input('app-draggable')
  set isDraggable(val: boolean) {
    this._isDraggble = val;
    this.rd.setAttribute(this.el.nativeElement, 'draggable', `${val}`);
  }
  get isDraggable() {
    return this._isDraggble ;
  }
  @Input()
  draggedClass: string;
  @Input()
  dragTag: string;
  @Input()
  dragData: any;
  constructor(private el: ElementRef,
              private rd: Renderer2, 
              private service: DragDropService) { }

  @HostListener('dragstart', ['$event'])
  onDragStart(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.addClass(this.el.nativeElement, this.draggedClass);
      this.service.setDragData({tag: this.dragTag, data: this.dragData});//添加等级, 添加元素值
    }
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.removeClass(this.el.nativeElement, this.draggedClass);
    }
  }

}
