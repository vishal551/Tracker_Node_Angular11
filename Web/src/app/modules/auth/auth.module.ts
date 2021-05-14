import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { VerifyemailComponent } from './verifyemail/verifyemail.component';

const authRoutes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full',
  },
  {
    path: 'verify',
    component: VerifyemailComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent,
    VerifyemailComponent,
  ],
  imports: [SharedModule, CommonModule, RouterModule.forChild(authRoutes)],
})
export class AuthModule {}
