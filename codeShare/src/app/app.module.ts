import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer'; // <- import PdfViewerModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TextfieldComponent } from './textfield/textfield.component';
import { HttpClientModule } from '@angular/common/http';
import { CloudinaryModule } from '@cloudinary/ng';

import { ImgAndVideoComponent } from './img-and-video/img-and-video.component';
import { DocfileComponent } from './docfile/docfile.component';
import { PdffilesComponent } from './pdffiles/pdffiles.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDividerModule} from '@angular/material/divider';

import {CdkTextareaAutosize, TextFieldModule} from '@angular/cdk/text-field';
import { NgZone} from '@angular/core';
import {take} from 'rxjs/operators';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    TextfieldComponent,
    TextfieldComponent,
    
    ImgAndVideoComponent,
    DocfileComponent,
    
    PdffilesComponent
  ],
  imports: [

    MatDialogModule,
    MatRadioModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    TextFieldModule,
    BrowserModule,
    AppRoutingModule,
     HttpClientModule ,
     CloudinaryModule,
     NgxExtendedPdfViewerModule,
     PdfViewerModule,
     BrowserAnimationsModule,MatProgressSpinnerModule,MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
