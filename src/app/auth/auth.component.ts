import { Component, OnInit } from '@angular/core';
import { AppService, AuthResponseData } from '../shared/service/app.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../shared/model/user.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error = '';
  successResp = '';

  constructor(private appService: AppService, private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.error = '';
    this.successResp = '';

    if(!form.valid) {
      return;
    }

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if(this.isLoginMode) {
      authObs = this.appService.loginUser(form.value.username, form.value.password);
    } else {
      const temp: User = {
        username: form.value.username,
        password: form.value.password,
        firstname: form.value.firstName,
        lastName: form.value.lastName,
        email: form.value.email
      };

      authObs = this.appService.register(temp);
    }

    authObs.subscribe(
      (resData: AuthResponseData) => {
        console.log(resData);
        if(!this.isLoginMode) {
          this.successResp = 'User registered successfully';
        } else {
          this.router.navigate(['/credit-card']);
          if(resData.token != undefined) {
            localStorage.setItem('token', resData.token);
          }
        }
        this.isLoading = false;
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = 'Error while logging/Registring.';
        this.isLoading = false;
      }
    )

    form.reset();
  }
}
