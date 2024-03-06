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
  src = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  cloudName = "djjxgxipp"; // replace with your own cloud name
  uploadPreset = "cu0julqm"; // replace with your own upload preset
  myWidget : any;
  
  imgArray! : any;
  pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";

  // name = "Angular " + VERSION.major;
  // url = 'https://view.officeapps.live.com/op/embed.aspx?src=http://localhost:5000/assets/file-sample_1MB.doc';

  urlDoc: string = `https://view.officeapps.live.com/op/embed.aspx?src=https://stackblitz.com/storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdkpMIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--e75389b18343665404852ed4cba8bd25938fa9bd/file-sample_1MB.doc`;

  urlxl: string =
    "https://view.officeapps.live.com/op/embed.aspx?src=https://go.microsoft.com/fwlink/?LinkID=521962";

  urlppt: string =
    "https://view.officeapps.live.com/op/embed.aspx?src=  http://www.dickinson.edu/download/downloads/id/1076/sample_powerpoint_slides.pptx";

  urlSafe!: SafeResourceUrl;


  constructor(private cloudinary: CloudinaryService, private http : HttpserviceService,public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlDoc);
  }

  pdflist = ['first','second','third','fourth']
  selectDocumentType(type: any) {
    switch (type) {
      case "doc":
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.urlDoc
        );
        break;
      case "xl":
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.urlxl
        );
        break;
      case "ppt":
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.urlppt
        );
        break;
      default:
        this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
          this.urlDoc
        );
    }
  }

}
