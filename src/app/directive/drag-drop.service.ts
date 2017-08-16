import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/observable';

export interface DragData {
  tag: string;
  data: any;
}
@Injectable()
export class DragDropService {

  private _dragData = new BehaviorSubject<DragData>(null);

  /* 拖拽时更新最新值 */
  setDragData(data: DragData) {
    this._dragData.next(data);
  }

  /* 拖拽完获取最新值 */
  getDragData(): Observable<DragData> {
    return this._dragData.asObservable();
  }

  /* 拖拽完成时清空 */
  clearDragData() {
    this._dragData.next(null);
  }

}
