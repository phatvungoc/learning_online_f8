import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  currentCard = 'home';
  registerForm!: FormGroup;
  errorMessage!: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$'),
        ],
      }),
      lastName: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$'),
        ],
      }),
      email: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}'
          ),
        ],
      }),
      phoneNumber: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(11),
          Validators.pattern('^[0-9]*$'),
        ],
      }),

      passwordGroup: new FormGroup({
        password: new FormControl(null, {
          validators: [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20),
            Validators.pattern('^[a-zA-Z0-9]*$'),
          ],
        }),
        confirmPassword: new FormControl(null, {
          validators: [Validators.required],
        }),
      }),
    });
  }

  get email() {
    return this.registerForm.controls['email'];
  }
  get firstName() {
    return this.registerForm.controls['firstName'];
  }
  get lastName() {
    return this.registerForm.controls['lastName'];
  }
  get phoneNumber() {
    return this.registerForm.controls['phoneNumber'];
  }
  get password() {
    return this.registerForm.get('passwordGroup')?.get('password');
  }
  get confirmPassword() {
    return this.registerForm.get('passwordGroup')?.get('confirmPassword');
  }

  onSubmit() {
    if (this.registerForm.invalid) return;
    this.authService
      .register({
        email: this.email.value,
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        phoneNumber: this.phoneNumber.value,
        password: this.password?.value,
        confirmPassword: this.confirmPassword?.value,
      })
      .subscribe({
        next: () => this.router.navigateByUrl('/user/login'),
        error: (err) => {
          if (err.error.title)
            this.errorMessage = `Register Failed: ${err.error.title}`;
          if (err.error.message)
            this.errorMessage = `Register Failed: ${err.error.message}`;
        },
      });
  }

  onSwitchCardBody(page: string) {
    this.currentCard = page;
  }
}
