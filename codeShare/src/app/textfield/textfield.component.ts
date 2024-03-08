import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';

import { HttpserviceService } from '../services/httpservice.service';
import 'ag-grid-community';
import { CdkTextareaAutosize, TextFieldModule } from '@angular/cdk/text-field';
import { NgZone } from '@angular/core';
import { take } from 'rxjs/operators';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AgGridComponent } from '../ag-grid-component';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ColDef, ColGroupDef, GridApi } from 'ag-grid-community';
import { Router } from '@angular/router';
import { AuthserviceService } from '../services/authservice.service';
import { Subject } from 'rxjs';

let subject = new Subject<any>


@Component({
  selector: 'app-textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.css'],
})
export class TextfieldComponent implements OnInit {

  @ViewChild('textfield') textInput!: ElementRef;
  @ViewChild('textheader') textHeader!: ElementRef;

  isLogged : boolean = this.auth.isLogged;
  constructor(
    public http: HttpserviceService,
    public auth : AuthserviceService,
    private _ngZone: NgZone,
    public dialog: MatDialog
  ) {}

  
  call(event: any) {
   
  }


  columnDefss: ColDef[] | ColGroupDef[] = [
    {
      //   getQuickFilterText: params => {
      //     return params.value.name;
      //  },
      field: 'serialNo',
      width : 300
      
      // filter: 'agSetColumnFilter',

      // filterParams : {
      //   applyMiniFilterWhileTyping : true
      // },
      // cellEditor: 'agTextCellEditor',
      // checkboxSelection: true,

      // floatingFilter: false,
      // cellEditorParams: {
      //   maxLength: 20,
      // },
      // tooltipField: 'country',
      // // cellRenderer: 'agGroupCellRenderer',
      // // rowGroup: true,
      // cellRendererParams: {
      //   suppressCount: false,
      //   checkbox: false,
      //   suppressHeaderMenuButton : true,

      //   //  innerRenderer: SimpleCellRenderer,
      //   suppressDoubleClickExpand: true,
      //   suppressEnterExpand: true,
      // },
    },
  ];

  rowData = [];

  openDialog(txtItem: any) {
    this.dialog.open(DialogBox, {
      data: txtItem,
    });
  }

  private gridApi!: GridApi<any>;

  undoRedoCellEditing = true;
  undoRedoCellEditingLimit = 20;
  tooltipInteraction = true;

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  router: Router = inject(Router);

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  row(p: any) {
    let row = this.gridApi.getSelectedRows();
    console.log('row', p);
    // this.router.navigate(['/'],{fragment : p.data.id})
    this.txtData = this.mainData.filter((id: any[]) => id[0] == row[0].id);
    console.log(this.mainData);
  }

  txtData: any;
  mainData: any;
  getData(){
   console.log('get Called')
    this.http.getAllTextData().subscribe((txtdata) => {
      this.txtData = Object.entries(txtdata);
      this.mainData = this.txtData;
      this.txtData = this.txtData.reverse();

      let rowArray: any = [];
      this.txtData.forEach((element: any) => {
        rowArray.push({ serialNo: element[1].header, id: element[0] });
      });
      this.rowData = rowArray;
    });

  }
  ngOnInit(): void {
    
    this.getData();
    subject.subscribe(res=>this.getData())




    if(sessionStorage.getItem('specialUser') == 'yes'){
       this.auth.setUser();
       this.auth.sub.next(178)
       this.isLogged = this.auth.isLogged
      
 }
    this.auth.sub.subscribe(isuser=>{
      console.log('called2',isuser)
       this.isLogged = this.auth.isLogged;
    })
  }
  
  doneText() {
    console.log(this.textInput?.nativeElement.value);
    const currentDate = new Date();

    const currentDayOfMonth = currentDate.getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const currhour = currentDate.getHours();
    const currmin = currentDate.getMinutes();
    const currsec = currentDate.getSeconds();

    const dateString =
      currentDayOfMonth +
      '-' +
      (currentMonth + 1) +
      '-' +
      currentYear +
      ' :: ' +
      currhour +
      ':' +
      currmin +
      ':' +
      currsec;

    let data = {
      header: this.textHeader.nativeElement.value,
      txt: this.textInput.nativeElement.value,
      time: dateString,
    };

    this.textHeader.nativeElement.value = ''
    this.textInput.nativeElement.value = ''
   
    this.http.addTextData(data).subscribe((res) => this.getData());
    
  }

  deleteTxt(id: string) {
    this.http.deleteTxt(id).subscribe((res) => this.getData());
    
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  template: `
    <h1 mat-dialog-title> {{ data[1].header }}</h1>
    <div mat-dialog-content>
      <textarea #txt name="" id="" cols="30" rows="10" [value]="data[1].txt">
      </textarea>
    </div>

    <div mat-dialog-actions>
      <button mat-button mat-dialog-close (click)="updateData(txt.value)">Update</button>
      <button mat-button mat-dialog-close (click)="onNoClick()">Close</button>
    </div>
  `,
})
export class DialogBox {
  constructor(
    public dialogRef: MatDialogRef<DialogBox>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http : HttpserviceService
  ) {}

  updateData(txt : string){
    this.data.txt = txt;
    this.http.updateData(this.data,this.data.id).subscribe(res=>subject.next({}))
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
