import { GridApi } from 'ag-grid-community';

import { Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from "@angular/platform-browser";
import { CloudinaryService } from '../img-and-video/cloudinary.service';
import { HttpserviceService } from '../services/httpservice.service';


@Component({
  selector: 'app-docfile',
  templateUrl: './docfile.component.html',
  styleUrls: ['./docfile.component.css']
})
export class DocfileComponent implements OnInit {
 
  docArray!: any;
  excelArray!: any;
  pptArray! : any;

  rowDataDoc = [{}];
  rowDataExcel = [{}];
  rowDataPpt = [{}];
  columnDefDoc = [{ field: 'docName' ,width : 300}];
  columnDefExcel = [{ field: 'excelName' ,width : 300}];
  columnDefPpt = [{field : 'pptName',width : 300}];

  mainDocArray = []
  mainExcelArray = []
  mainPptArray = []
 
public gridApi : any = GridApi<any>;
  fileName: any;
row(p : any){
  let row = this.gridApi.getSelectedRows()
  this.docArray = this.mainDocArray.filter(data=>data[0] == p.data.id);

     
}

call(p : any,type : string){

    if(type == 'doc'){
      this.urlDoc = this.docArray.filter((item: any[])=>item[0] == p[0].id)[0][1].url;
      this.docId = this.docArray.filter((item: any[])=>item[0] == p[0].id)[0][1].id;
      this.fileName = this.docArray.filter((item: any[])=>item[0] == p[0].id)[0][1].filename;
    }else if(type == 'excel'){
      this.urlxl = this.excelArray.filter((item: any[])=>item[0] == p[0].id)[0][1].url;
      this. docId = this.excelArray.filter((item: any[])=>item[0] == p[0].id)[0][1].id;
      this.fileName = this.excelArray.filter((item: any[])=>item[0] == p[0].id)[0][1].filename;
      
    }else{
      this.urlppt = this.pptArray.filter((item: any[])=>item[0] == p[0].id)[0][1].url;
      this.docId = this.pptArray.filter((item: any[])=>item[0] == p[0].id)[0][1].id;
      this.fileName = this.pptArray.filter((item: any[])=>item[0] == p[0].id)[0][1].filename;
    }
}
onGridReady(p : any){
  this.gridApi = p.api;
   
}


  cloudName = "djjxgxipp"; // replace with your own cloud name
  uploadPreset = "cu0julqm"; // replace with your own upload preset
  myWidget : any;
  docId:string = ''
  imgArray! : any;
  
  urlDoc: string = `https://docs.google.com/viewerng/viewer?url=https://res.cloudinary.com/djjxgxipp/raw/upload/v1709807175/codeshareimages/pnbjj4bi3k10yuxdjneg.doc`;

  urlxl: string =  "https://view.officeapps.live.com/op/embed.aspx?src=https://go.microsoft.com/fwlink/?LinkID=521962";

  urlppt: string = "https://view.officeapps.live.com/op/embed.aspx?src=  http://www.dickinson.edu/download/downloads/id/1076/sample_powerpoint_slides.pptx";

  urlSafe!: SafeResourceUrl;


  constructor(private cloudinary: CloudinaryService, private http : HttpserviceService,public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlDoc);

    this.http.getAllImages().subscribe(data=>{
      let dataObj = Object.entries(data);
      this.docArray = dataObj.filter((item: { type: string; }[]) => item[1].type == 'doc');
      this.excelArray = dataObj.filter((item: { type: string; }[]) => item[1].type == 'excel');
      this.pptArray = dataObj.filter((item: { type: string; }[]) => item[1].type == 'ppt');



      let arr: any[] = [];
      this.docArray.forEach((element: { filename: string,id : string }[]) => {
        arr.push({ docName : element[1].filename , id : element[0]});
      });
      arr.reverse()
      this.rowDataDoc =  arr;
      arr = []
      this.excelArray.forEach((element: { filename: string,id : string }[]) => {
        arr.push({ excelName : element[1].filename , id : element[0]});
      });
      arr.reverse()
      this.rowDataExcel = arr;
      arr = []
      this.pptArray.forEach((element: { filename: string,id : string }[]) => {
        arr.push({ pptName : element[1].filename , id : element[0]});
      });
      arr.reverse()
      this.rowDataPpt = arr;

      
    })
  }

  downloadDoc(url: string){
     
  }

  deleteDoc(id : string){
     
  }

  pdflist = ['first','second','third','fourth']

 docType : string = 'doc';
  selectDocumentType(type: any) {
    switch (type) {
      case "doc":
        this.docType = 'doc'
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.urlDoc
        );
        break;
      
        
      case "xl":
        this.docType = 'xl',
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.urlxl
        );
        break;
      case "ppt":
        this.docType = 'ppt',
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.urlppt
        );
        break;
      default:
        this.docType = 'doc',
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.urlDoc
        );
    }
  }

}
