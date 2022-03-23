import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  userHashCode!: string;
  user!: any;
  updateForm!: FormGroup;
  imageType = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];
  file!: any;
  image!: any;
  validFile = true;
  isSuccessful!: boolean;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userHashCode = JSON.parse(localStorage.getItem('auth')).user.HashCode;
    this.userService.getUser(this.userHashCode).subscribe({
      next: (result) => {
        this.user = result;
        this.updateForm = new FormGroup({
          firstName: new FormControl(this.user.firstName, {
            validators: [
              Validators.required,
              Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$'),
            ],
          }),
          lastName: new FormControl(this.user.lastName, {
            validators: [
              Validators.required,
              Validators.pattern('^[a-zA-Z]+( [a-zA-Z]+)*$'),
            ],
          }),
          phoneNumber: new FormControl(this.user.phoneNumber, {
            validators: [
              Validators.required,
              Validators.minLength(10),
              Validators.maxLength(11),
              Validators.pattern('^[0-9]*$'),
            ],
          }),
          avatar: new FormControl(this.user.avatar),
          bio: new FormControl(this.user.bio),
          email: new FormControl(this.user.email),
          password: new FormControl(null, {
            validators: [Validators.required],
          }),
        });
      },
      error: () => {},
    });
  }

  get firstName() {
    return this.updateForm.controls['firstName'];
  }
  get lastName() {
    return this.updateForm.controls['lastName'];
  }
  get phoneNumber() {
    return this.updateForm.controls['phoneNumber'];
  }
  get bio() {
    return this.updateForm.controls['bio'];
  }

  onChange($event: Event) {
    this.file = ($event.target as HTMLInputElement).files[0];
    if (this.file && this.imageType.includes(this.file.type)) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(this.file);
      fileReader.onload = () => {
        this.image = fileReader.result;
      };
      this.validFile = true;
    }
    if (this.file && !this.imageType.includes(this.file.type)) {
      this.validFile = false;
    }
  }

  onSubmit() {
    const email = JSON.parse(localStorage.getItem('auth')).user.Email;
    const password = this.updateForm.controls['password'].value + '';

    this.authService.login({ username: email, password: password }).subscribe({
      next: () => {
        // const avatar = this.image || '';
        const userInput = {
          firstName: this.firstName.value,
          middleName: '',
          lastName: this.lastName.value,
          phoneNumber: this.phoneNumber.value,
          email,
          password,
          bio: this.bio.value,
          avatar: 'avatar-default.png',
          role: this.user.role,
          status: this.user.status,
        };
        this.userService.updateUser(this.userHashCode, userInput).subscribe({
          next: () => {
            const localData = JSON.parse(localStorage.getItem('auth'));
            const newLocalData = {
              ...localData,
            };
            newLocalData.user = {
              ...localData.user,
              Avatar: userInput.avatar,
              Bio: userInput.bio,
              FullName: userInput.lastName + ' ' + userInput.firstName,
              PhoneNumber: userInput.phoneNumber,
            };
            localStorage.setItem('auth', JSON.stringify(newLocalData));
            this.updateForm.controls['password'].reset();
            this.isSuccessful = true;
          },
          error: () => (this.isSuccessful = false),
        });
      },
      error: () => (this.isSuccessful = false),
    });
  }
}
