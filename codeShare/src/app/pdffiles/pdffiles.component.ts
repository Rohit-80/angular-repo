import { GridApi } from 'ag-grid-community';
import { Component, OnInit, inject } from '@angular/core';
import { HttpserviceService } from '../services/httpservice.service';
import { AuthserviceService } from '../services/authservice.service';

@Component({
  selector: 'app-pdffiles',
  templateUrl: './pdffiles.component.html',
  styleUrls: ['./pdffiles.component.css']
})
export class PdffilesComponent implements OnInit {
  auth = inject(AuthserviceService)

  public gridApi : any = GridApi<any>;
  rowDataPdf = [{}]
  columnDefPdf = [{
     field : 'pdfName',
     width : 300
     
  }]
   
  isLogged : boolean = false


  //  gridApi : any = GridApi<any>
  call(p: any) {
    // let row = this.gridApi.getSelectedRows();
    // this.src = event[0].url;
    this.pdfId = this.pdfArray.filter((item: any[])=>item[0] == p[0].id)[0][1].id;
    this.src = this.pdfArray.filter((item: any[])=>item[0] == p[0].id)[0][1].url;
    this.PdfName = this.pdfArray.filter((item: any[])=>item[0] == p[0].id)[0][1].filename;
    

  }

onGridReady(p : any){
   this.gridApi = p.api;
   
}


  constructor(public http : HttpserviceService) { }
  src = 'https://res.cloudinary.com/djjxgxipp/image/upload/v1709812054/codeshareimages/hcs6fydj9qzrttnlenwc.pdf';
  
  page: number = 1;
  totalPages: number = 0;
  isLoaded: boolean = false;

  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
    this.isLoaded = true;
  }

  nextPage() {
    this.page++;
  }

  prevPage() {
    this.page--;
  }
  pdfArray : any;
  pdfId : string = ''
  PdfName : string = ''

  ngOnInit(): void {
    if(sessionStorage.getItem('specialUser') == 'yes'){
      this.isLogged = true;
      this.auth.setUser();
    }

    this.auth.sub.subscribe(res=>this.isLogged = this.auth.isLogged)

    
    this.http.getAllImages().subscribe((data) => {

      let dataObj = Object.entries(data);
      this.pdfArray = dataObj.filter((item: { type: string; }[]) => item[1].type == 'pdf');

      let arr: any[] = [];
      this.pdfArray.forEach((element: { filename: string,id : string,url : string }[]) => {
        arr.push({ pdfName : element[1].filename , id : element[0],url : element[1].url});
      });
      arr.reverse()
      this.rowDataPdf =  arr;
      
    });
  }

  downloadPdf(url : string){

  }
  deletePdf(id : string){
     
  }

}
