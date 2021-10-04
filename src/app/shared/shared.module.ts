// Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Modules
// import { MaterialImportsModule } from './material-imports/material.module';

// Pipes
import { TranslatePipe } from './pipes/translates.pipe';
import { TranslateApiPipe } from './pipes/translateApi.pipe';
import { SubmitBtnComponent } from './components/submit-btn/submit-btn.component';
import { ToastrModule } from 'ngx-toastr';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ActionButtonComponent } from './components/action-button/action-button.component';
import { FilesUploadIconComponent } from './components/files-upload-icon/files-upload-icon.component';

// Angular material




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    // MaterialImportsModule,
    HttpClientModule,
    ToastrModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [
    // directives
    //Pipes
    TranslatePipe,
    TranslateApiPipe,
    // Components
    SubmitBtnComponent,
    SingleProductComponent,
    ActionButtonComponent,
    FilesUploadIconComponent,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    ToastrModule,
    // MaterialImportsModule,
    HttpClientModule,
    SubmitBtnComponent,
    // directives
    //Pipes
    TranslatePipe,
    TranslateApiPipe,
    // Components
    SingleProductComponent,
    ActionButtonComponent,
    FilesUploadIconComponent,
  ],
  providers: [
    DatePipe
  ],
})
export class SharedModule { }
