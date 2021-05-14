import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';
import { MustMatch } from '../../_helpers/must-match.validator';

@Component({
  selector: 'app-verifyemail',
  templateUrl: './verifyemail.component.html',
  styleUrls: ['./verifyemail.component.scss'],
})
export class VerifyemailComponent implements OnInit {
  Step1: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private commonService: CommonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.Step1 = this.formBuilder.group({
      email: [history.state.data],
      otp: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9'-\s]+$/)],
      ],
    });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.Step1.invalid) {
      return;
    }
    this.authService.VerifyOTP(this.Step1.value).subscribe(
      (res: any) => {
        if (res.status) {
          this.commonService.toastrMessage('success', 'OTP verified!', {
            positionClass: 'toast-top-center',
          });
          this.router.navigate(['/login']);
        }
      },
      (error: any) => {
        if (error.error.status === 0) {
          this.commonService.toastrMessage('error', error.error.message, {
            positionClass: 'toast-top-center',
          });
        }
      }
    );
  }
}
