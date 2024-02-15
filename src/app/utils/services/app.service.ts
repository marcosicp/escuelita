import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, merge, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public user = {
    firstName: 'Alexander',
    lastName: 'Pierce',
    image: 'assets/img/user2-160x160.jpg',
  };

  constructor(private router: Router, private  authSrv : AuthService) {
    this.createOnline$().subscribe(isOnline => console.log(isOnline));
  }

  login() {
    localStorage.setItem('token', 'LOGGED_IN');
    this.router.navigate(['/']);
  }

  register() {
    localStorage.setItem('token', 'LOGGED_IN');
    this.router.navigate(['/']);
  }

  logout() {
    this.authSrv.SignOut();
  }

  createOnline$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      })
    );
  }

  errorAlert(mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: mensaje,
    });
  }

  okeyAlert(titulo: string, mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: titulo,
      text: mensaje,
    });
  }
}
