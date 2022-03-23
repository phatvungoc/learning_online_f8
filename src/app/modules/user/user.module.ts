import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared-module.module';

import { ConfirmEqualValidatorDirective } from './directives/confirm-equal-validator.directive';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from 'src/app/stores/auth/state';
import { SettingsComponent } from './components/settings/settings.component';

@NgModule({
  declarations: [
    ConfirmEqualValidatorDirective,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgxsModule.forFeature([AuthState]),
  ],
})
export class UserModule {}
