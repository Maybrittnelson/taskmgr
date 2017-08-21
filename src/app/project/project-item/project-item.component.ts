import { Component, OnInit, Input, Output, EventEmitter, HostBinding, HostListener, ChangeDetectionStrategy} from '@angular/core';
import {cardAnim} from '../../anims/card.anim';
@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss'],
  animations: [
    cardAnim
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectItemComponent implements OnInit {
  @Input()
  item;
  @Output()
  onInvite = new EventEmitter<void>();
  @Output()
  onEdit = new EventEmitter<void>();
  @Output()
  onDel = new EventEmitter<void>();
  @Output()
  onSelected = new EventEmitter<void>();
  /* 整个组件进行动画 */
  @HostBinding('@card') cardState = 'out' ;


  constructor() { }

  ngOnInit() {
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.cardState = 'hover';
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.cardState = 'out';
  }

  onInviteClick(ev: Event) {
    ev.stopPropagation();
    this.onInvite.emit();
  }

  onEditClick(ev: Event) {
    ev.stopPropagation();
    this.onEdit.emit();
  }

  onDelClick(ev: Event) {
    ev.stopPropagation();
    this.onDel.emit();
  }

  onClick() {
    this.onSelected.emit();
  }

}
