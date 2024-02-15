import { NuevoAlumnoComponent } from './views/alumnos/nuevo-alumno/nuevo-alumno.component';
import { EditarAlumnoComponent } from './views/alumnos/editar-alumno/editar-alumno.component';
import { EditarAlumnoResolver } from './views/alumnos/editar-alumno/editar-alumno.resolver';
import { AlumnosComponent } from './views/alumnos/alumno.component';
import { ForgotPasswordComponent } from './pages/forgotpassword/forgotpassword.component';
import { EditarUsuarioResolver } from './views/usuarios/editar-usuario/editar-usuario.resolver';
import { NuevoUsuarioComponent } from './views/usuarios/nuevo-usuario/nuevo-usuario.component';
import { AuthGuard2 } from './auth/auth.guard2';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './views/profile/profile.component';
import { NonAuthGuard } from './utils/guards/non-auth.guard';
import { EditarUsuarioComponent } from './views/usuarios/editar-usuario/editar-usuario.component';
import { UsuariosComponent } from './views/usuarios/usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard2],
    children: [
      { path: '', redirectTo: 'alumnos', pathMatch: 'full' },
      /* ALUMNOS */
      {
        path: 'alumnos',
        canActivate: [AuthGuard2],
        children: [
          {
            path: '',
            component: AlumnosComponent,
            canActivate: [AuthGuard2],
          },
          {
            path: 'alumnos',
            redirectTo: '',
            pathMatch: 'full',
          },
          {
            path: 'nuevo-alumno',
            component: NuevoAlumnoComponent,
            canActivate: [AuthGuard2],
          },
          {
            path: 'details/:alumno',
            component: EditarAlumnoComponent,
            resolve: { data: EditarAlumnoResolver },
            canActivate: [AuthGuard2],
          },
        ],
      },

      /* USUARIOS */
      {
        path: 'usuarios',
        canActivate: [AuthGuard2],
        children: [
          {
            path: 'usuarios',
            redirectTo: '',
            pathMatch: 'full',
          },
          {
            path: '',
            component: UsuariosComponent,
            canActivate: [AuthGuard2],
          },
          {
            path: 'detalle-usuario/:usuario',
            component: EditarUsuarioComponent,
            resolve: { data: EditarUsuarioResolver },
            canActivate: [AuthGuard2],
          },
          {
            path: 'nuevo-usuario',
            component: NuevoUsuarioComponent,
            canActivate: [AuthGuard2],
          },
        ],
      },

      
      /* PROFILE */
      {
        path: 'profile',
        canActivate: [AuthGuard2],
        children: [
          {
            path: 'profile',
            redirectTo: '',
            pathMatch: 'full',
          },
          {
            path: '',
            component: ProfileComponent
          },
        ],
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NonAuthGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [NonAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
