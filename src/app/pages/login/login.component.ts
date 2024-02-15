import { Component, OnInit, OnDestroy, Renderer2, NgZone } from '@angular/core';
import { AppService } from '../../utils/services/app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public isAuthLoading = false;
  error: string = '';
  constructor(
    public authService: AuthService,
    private renderer: Renderer2,
    private toastr: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService,
    public ngZone: NgZone
  ) {}

  ngOnInit() {
    this.renderer.addClass(document.querySelector('app-root'), 'login-page');
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  login() {
    this.error = '';
    this.spinner.show();
    const that = this;
    if (this.loginForm.valid) {
      this.authService
        .SignIn(
          this.loginForm.controls.email.value,
          this.loginForm.controls.password.value
        ).catch((error) => {
          this.spinner.hide();
        });
    } else {
      this.spinner.hide();
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
  }
}
