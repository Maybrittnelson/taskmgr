import { Component, OnInit, Inject, ChangeDetectionStrategy } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-new-task-list',
  templateUrl: './new-task-list.component.html',
  styleUrls: ['./new-task-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTaskListComponent implements OnInit {
  form: FormGroup;
  title = '';

  constructor(@Inject(MD_DIALOG_DATA) private data,
                private fb: FormBuilder,
                private dialogRef: MdDialogRef<NewTaskListComponent>) { }

  ngOnInit() {
    this.title = this.data.title;
    this.form = this.fb.group({
      name: [ this.data.taskLists ? this.data.taskLists : '', Validators.required]
    });
  }

  onSubmit({value, valid}) {
    if (!valid) {
      return;
    }
    this.dialogRef.close(value);
  }

}
