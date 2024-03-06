import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { HttpserviceService } from '../services/httpservice.service';

import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { NgZone } from '@angular/core';
import { take } from 'rxjs/operators';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.css'],
})
export class TextfieldComponent implements OnInit {
  @ViewChild('textfield') textInput!: ElementRef;
  constructor(
    public http: HttpserviceService,
    private _ngZone: NgZone,
    public dialog: MatDialog
  ) {}

  openDialog(txtItem : any) {
    this.dialog.open(DialogBox,{
         data : txtItem
    });
  }

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  txtData: any;
  ngOnInit(): void {
    this.http.getAllTextData().subscribe((txtdata) => {
      this.txtData = Object.entries(txtdata);
      this.txtData = this.txtData.reverse();
    });
  }

  doneText() {
    console.log(this.textInput?.nativeElement.value);
    let data = {
      txt: this.textInput.nativeElement.value,
    };
    this.http.addTextData(data).subscribe((res) => console.log(res));
  }

  deleteTxt(id: string) {
    this.http.deleteTxt(id).subscribe((res) => console.log(res));
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  template: `
    <h1 mat-dialog-title>unique id : {{data[0]}}</h1>
    <div mat-dialog-content>
        <textarea name="" id="" cols="30" rows="10" [value]="data[1].txt">

        </textarea>
    </div>

    <div mat-dialog-actions>

      <button mat-button mat-dialog-close (click)="onNoClick()">Update</button>
      <button mat-button mat-dialog-close (click)="onNoClick()">Close</button>
    </div>
  `,
})
export class DialogBox {
  constructor(
    public dialogRef: MatDialogRef<DialogBox>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
