import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { RegisteredSuccessfullyComponent } from './registered-successfully/registered-successfully.component';

@NgModule({
  declarations: [AuthComponent, LoginComponent, RegisterComponent, RegisteredSuccessfullyComponent],
  imports: [CommonModule, AuthRoutingModule, SharedModule, NgxIntlTelInputModule],
})
export class AuthModule { }
