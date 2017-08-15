import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MdToolbarModule,
         MdIconModule,
         MdButtonToggleModule,
         MdButtonModule,
         MdCardModule,
         MdListModule,
         MdSlideToggleModule,
         MdGridListModule,
         MdDialogModule,
         MdAutocompleteModule,
         MdMenuModule,
         MdCheckboxModule,
         MdTooltipModule,
         MdDatepickerModule,
         MdRadioModule,
         MdNativeDateModule,
         MdSelectModule,
         MdSidenavModule,
         MdInputModule} from '@angular/material';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {DirectiveModule} from "../directive/directive.module";
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';
import { AgeInputComponent } from './age-input/age-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdInputModule,
    MdSlideToggleModule,
    MdGridListModule,
    MdListModule,
    MdAutocompleteModule,
    MdMenuModule,
    MdDialogModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdDatepickerModule,
    MdRadioModule,
    MdNativeDateModule,
    MdSelectModule,
    MdSidenavModule,
    DirectiveModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MdToolbarModule,
    MdIconModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdInputModule,
    MdSlideToggleModule,
    MdListModule,
    MdGridListModule,
    MdAutocompleteModule,
    MdDialogModule,
    MdMenuModule,
    MdCheckboxModule,
    MdTooltipModule,
    MdDatepickerModule,
    MdRadioModule,
    MdNativeDateModule,
    MdSelectModule,
    MdSidenavModule,
    DirectiveModule,
    ImageListSelectComponent,
    AgeInputComponent
  ],
  entryComponents: [ConfirmDialogComponent],
  declarations: [
    ConfirmDialogComponent,
    ImageListSelectComponent,
    AgeInputComponent]
})
export class SharedModule { }
