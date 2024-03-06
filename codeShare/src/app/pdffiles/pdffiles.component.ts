import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdffiles',
  templateUrl: './pdffiles.component.html',
  styleUrls: ['./pdffiles.component.css']
})
export class PdffilesComponent implements OnInit {

 
  pdflist = ['first','second','third','fourth']
   
  constructor() { }
  src = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  title: string = 'ng2-pdf-viewer';
  // src: string = 'assets/pspdfkit-web-demo.pdf';

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
  ngOnInit(): void {
  }

}
