import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { MustMatch } from '../../_helpers/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  Step1: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private commonService: CommonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.Step1 = this.formBuilder.group(
      {
        firstName: [
          '',
          [Validators.required, Validators.pattern(/^[a-zA-Z0-9'-\s]+$/)],
        ],
        lastName: [
          '',
          [Validators.required, Validators.pattern(/^[a-zA-Z0-9'-\s]+$/)],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.Step1.invalid) {
      return;
    }
    this.authService.register(this.Step1.value).subscribe(
      (res: any) => {
        if (res.status) {
          this.commonService.toastrMessage(
            'success',
            'Registration Successful!',
            {
              positionClass: 'toast-top-center',
            }
          );
          this.router.navigate(['/verify'], {
            state: { data: this.Step1.value.email },
          });
        }
      },
      (error: any) => {
        if (error.status === 400) {
          if (error.error.data[0].msg) {
            this.commonService.toastrMessage('error', error.error.data[0].msg, {
              positionClass: 'toast-top-center',
            });
          }
        } else {
          this.commonService.toastrMessage(
            'error',
            'Please try after sometime',
            {
              positionClass: 'toast-top-center',
            }
          );
        }
      }
    );
  }
}
