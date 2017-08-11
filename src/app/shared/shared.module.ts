import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdToolbarModule, 
         MdIconModule, 
         MdButtonModule, 
         MdCardModule,
         MdListModule,
         MdSlideToggleModule,
         MdGridListModule,
         MdInputModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdSlideToggleModule,
    MdGridListModule,
    MdListModule,
  ],
  exports: [
    CommonModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdCardModule,
    MdInputModule,
    MdSlideToggleModule,
    MdListModule,
    MdGridListModule,
  ],
  declarations: []
})
export class SharedModule { }
