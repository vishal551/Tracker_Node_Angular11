import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
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
    private authService: AuthService
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

  // get f() { return this.Step1.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.Step1.invalid) {
      return;
    }
    this.authService.register(this.Step1.value).subscribe(
      (res) => {
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(res, null, 4));
      },
      (error) => {
        alert('ERROR!! :-)\n\n' + JSON.stringify(error, null, 4));
      }
    );
  }
}
