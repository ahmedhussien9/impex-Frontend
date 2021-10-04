import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { AdminlayoutComponent } from './adminlayout/adminlayout.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { UserlayoutComponent } from './userlayout/userlayout.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    RouterModule,
    SharedModule,
    HttpClientModule,
    BsDropdownModule.forRoot()
  ],
  declarations: [AdminlayoutComponent, UserlayoutComponent, NavbarComponent],
  providers: [],
  exports: [RouterModule, SharedModule, HttpClientModule, NavbarComponent],
})
export class CoreModule { }
