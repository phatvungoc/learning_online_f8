import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Login, Logout } from 'src/app/stores/auth/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  currentCard = 'home';
  form!: FormGroup;
  errorMessage!: string;
  redirectUrl!: string;

  constructor(
    private router: Router,
    private store: Store,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.redirectUrl = params['redirectUrl'];
      console.log(this.redirectUrl);
    });

    this.onLogout();
    this.form = new FormGroup({
      email: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.email,
          Validators.pattern(
            '[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}'
          ),
        ],
      }),
      password: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(20),
          Validators.pattern('^[a-zA-Z0-9]*$'),
        ],
      }),
    });
  }

  get email() {
    return this.form.controls['email'];
  }

  get password() {
    return this.form.controls['password'];
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.store
      .dispatch(
        new Login({ username: this.email.value, password: this.password.value })
      )
      .subscribe((result) => {
        if (!result.auth.error) {
          if (this.redirectUrl) {
            this.router.navigateByUrl(this.redirectUrl);
          } else {
            this.router.navigate(['/']);
          }
          return;
        }
        this.errorMessage = result.auth.error.error.message;
      });
  }

  onLogout() {
    this.store.dispatch(new Logout()).subscribe((result) => {
      // console.log(result);
    });
  }

  onSwitchCardBody(page: string) {
    this.currentCard = page;
  }
}
