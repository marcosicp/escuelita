import { ApiService } from 'src/app/services/api.service';
import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { FirebaseApp } from '@angular/fire';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Guardar logged in user data

  constructor(
    public afAuth: AngularFireAuth, // Inject Firestore service
    public db: DataService, // Inject Firebase auth service
    public dbApi: ApiService, // Inject Firebase auth service
    private spinner: NgxSpinnerService,
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
 
  }

  // Sign in with email/password
  SignIn(email, password) {
    const that = this;
    const userLogin = {
      email,
      pass: password,
    };

    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.userData = result.user;
        let tokenUser;
        result.user
          .getIdTokenResult(false)
          .then((value) => {
            tokenUser = value.token;
            
          })
          .finally(() => {
            this.dbApi.getUsuarioByUID(this.userData.uid).subscribe((res) => {
              const arrObj = res.data();
              localStorage.setItem('token', tokenUser);
              localStorage.setItem('userEscuelita', JSON.stringify(arrObj));
              that.ngZone.run(() => {
                that.spinner.hide();
                that.router.navigateByUrl('/');
              });
            });
          });
      })
      .catch((error) => {
        this.spinner.hide();
        window.alert(error.message);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('userEscuelita'));
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Sign out
  SignOut() {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('userEscuelita');
      localStorage.clear();
      this.router.navigate(['/login']);
    });
    
    // this.router.navigate(['login']);
  }
}
