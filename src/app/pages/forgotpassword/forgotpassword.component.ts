import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
// import {AppService} from '@services/app.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss'],
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  @HostBinding('class') class = 'login-box';
  public forgotPasswordForm: FormGroup;
  public isAuthLoading = false;

  constructor(
    private renderer: Renderer2,
    private router: Router,
    private auth: AuthService // private appService: AppService
  ) {}

  ngOnInit(): void {
    this.renderer.addClass(document.querySelector('app-root'), 'login-page');
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl(null, Validators.required),
    });
  }

  forgotPassword() {
    if (this.forgotPasswordForm.valid) {
      this.auth.afAuth
        .sendPasswordResetEmail(this.forgotPasswordForm.value.email)
        .then((result) => {
          Swal.fire({
            title: 'Success',
            text: 'Se envio el correo para restablecer su contraseña',
            icon: 'success',
          });
          this.forgotPasswordForm.reset();
          this.router.navigate([
            'login',
          ]);
        })
        .catch((err) => {
          Swal.fire({
            title: 'Error',
            text: 'Hubo un error al restablecer su contraseña',
            icon: 'error',
          });
        });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Por favor ingrese un email valido',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.querySelector('app-root'), 'login-page');
  }
}
