import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, Query } from '@angular/fire/firestore';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    public db: DataService,
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore, // Inject Firestore service
    private router: Router,
    private http: HttpClient
  ) {}

  getPDRById(pdrID) {
    // return this.db.getAsync(URL_PDR.GET_BY_ID + '/' + pdrID, []);
  }

  // getBolsaId(bolsaID) {
  //   return this.db.getAsync(URL_PDR.GET_BY_ID + '/' + bolsaID, []);
  // }

  getEmpleadoById(empleadoID) {
    // return this.db.getAsync(URL_EMPLEADOS.GET_BY_ID + '/' + empleadoID, []);
  }

  getAlumnos() {
    return this.afs.collection('alumnos').get();
  }

  getBolsas() {
    return this.afs.collection('bolsas').get();
  }

  getBolsaByCodigo(codigo) {
    return this.afs.firestore
      .collection('cycleadores-bolsas')
      .where('codigo', '==', codigo)
      .where('estado', '==', 'NO DISPONIBLE')
      .limit(1)
      .get();
  }

  getItemsMuestra() {
    return this.afs.collection('items').get();
  }

  getEmpleados() {
    return this.afs.collection('empleados').get();
  }

  getEncuestas() {
    return this.afs.collection('quiz').get();
  }

  getUsuariosAdmin() {
    return (
      this.afs.firestore
        .collection('usuarios')
        // .where('user_type', '==', 'ADMIN')
        .get()
    );
  }

  // getUsuarioById(usuarioId) {
  //   return this.db.getAsync(URL_USUARIOS.GET_BY_ID + '/' + usuarioId, []);
  // }

  updateAlumno(alumno) {
    return this.afs.collection('alumnos').doc(alumno.id).update({
      nombre: alumno.nombre,
      apellido: alumno.apellido,
      dni: alumno.dni,
      edad: alumno.edad,
      habilitado: alumno.habilitado,
      telefono: alumno.telefono,
      telefonoEmergencia: alumno.telefonoEmergencia,
      direccion: alumno.direccion,
      turno: alumno.turno,
      horaExtra: alumno.horaExtra,
      ciclos: alumno.ciclos,
      colegio: alumno.colegio, 
      nombrePadre: alumno.nombrePadre,
      celPadre: alumno.celPadre,
      dniPadre: alumno.dniPadre,
      nombreMadre: alumno.nombreMadre,
      celMadre: alumno.celMadre,
      dniMadre: alumno.dniMadre,
      editado: new Date(),
    });
  }

  updatePagoAlumno(alumnoId, pagos_) {
    debugger;
    return this.afs.collection('alumnos').doc(alumnoId).update({
      pagos: pagos_,
      editado: new Date(),
    });
  }


  updateEmpleado(empleado) {
    return this.afs.collection('empleados').doc(empleado.id).update(empleado);
  }

  updateUsuario(usuario) {
    return this.afs.collection('usuarios').doc(usuario.id).update(usuario);
  }

  deleteAlumno(productoID) {
    return this.afs.collection('alumnos').doc(productoID).update({
      habilitado: false,
    });
  }

  // deleteUsuario(usuarioID) {
  //   return this.db.deleteAsync(URL_USUARIOS.DELETE_USUARIO, usuarioID, []);
  // }

  createAlumno(value) {
    return this.afs.collection('alumnos').doc(value.uid).set(value);
  }

  createUserAdmin(value) {
    value.creado = new Date();
    return this.afs.collection('usuarios').doc(value.uid).set(value);
  }

  createUsuarioAuth(value) {
    const data = {
      email: value.email,
      password: value.password,
      displayName: value.nombre + value.apellido,
      creado: new Date(),
    };

    return this.http.post(
      'https://us-central1-escuelita-usuario.cloudfunctions.net/crearUsuario',
      data,
      { responseType: 'text' }
    );
  }


  getUsuarioByUID(value) {
    return this.afs.collection('usuarios').doc(value).get();
  }
}
