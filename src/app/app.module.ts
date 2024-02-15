import { EditarAlumnoComponent } from './views/alumnos/editar-alumno/editar-alumno.component';
import { NuevoAlumnoComponent } from './views/alumnos/nuevo-alumno/nuevo-alumno.component';
import { EditarAlumnoResolver } from './views/alumnos/editar-alumno/editar-alumno.resolver';
import { AlumnosComponent } from './views/alumnos/alumno.component';
import { ForgotPasswordComponent } from './pages/forgotpassword/forgotpassword.component';
import { environment } from '../../environments/environment.prod';
import { EditarUsuarioComponent } from './views/usuarios/editar-usuario/editar-usuario.component';
import { NuevoUsuarioComponent } from './views/usuarios/nuevo-usuario/nuevo-usuario.component';
import { EditarUsuarioResolver } from './views/usuarios/editar-usuario/editar-usuario.resolver';
import { AppButtonComponent } from './components/app-button/app-button.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UsuariosComponent } from './views/usuarios/usuarios.component';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './pages/main/header/header.component';
import { FooterComponent } from './pages/main/footer/footer.component';
import { MenuSidebarComponent } from './pages/main/menu-sidebar/menu-sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './views/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './pages/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { MessagesDropdownMenuComponent } from './pages/main/header/messages-dropdown-menu/messages-dropdown-menu.component';
import { NotificationsDropdownMenuComponent } from './pages/main/header/notifications-dropdown-menu/notifications-dropdown-menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConnectionServiceModule } from 'ng-connection-service';
import {
  registerLocaleData,
  HashLocationStrategy,
  LocationStrategy,
} from '@angular/common';
import localeEn from '@angular/common/locales/en';
import { UserDropdownMenuComponent } from './pages/main/header/user-dropdown-menu/user-dropdown-menu.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AgGridModule } from 'ag-grid-angular';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { MatNativeDateModule } from '@angular/material/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!
import { AngularFireModule } from '@angular/fire';
import { QRCodeModule } from 'angularx-qrcode';
registerLocaleData(localeEn, 'en-EN');

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
]);

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MenuSidebarComponent,
    ProfileComponent,
    RegisterComponent,
    MessagesDropdownMenuComponent,
    NotificationsDropdownMenuComponent,
    UserDropdownMenuComponent,
    EditarAlumnoComponent,
    UsuariosComponent,
    NuevoUsuarioComponent,
    EditarUsuarioComponent,
    NuevoAlumnoComponent,
    AlumnosComponent,
    AppButtonComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatBadgeModule,
    MatIconModule,
    MatDividerModule,
    MatNativeDateModule,
    MatListModule,
    MatCheckboxModule,
    MatInputModule,
    Ng2ImgMaxModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ConnectionServiceModule,
    FullCalendarModule,
    NgxSpinnerModule,
    QRCodeModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgbModule,
    AgGridModule.withComponents([]),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    AuthService,
    EditarAlumnoResolver,
    EditarUsuarioResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'fill' },
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch((err) => console.error(err));
