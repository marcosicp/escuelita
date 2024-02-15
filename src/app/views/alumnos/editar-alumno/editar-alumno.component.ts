// import { AlertsService } from '@jaspero/ng-alerts';
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import {} from '@angular/material/form-field';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { fromEvent, merge, Observable, Observer } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';
import { Location } from '@angular/common';
import { finalize, map } from 'rxjs/operators';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Ng2ImgMaxService } from 'ng2-img-max';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ConnectionService } from 'ng-connection-service';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-editar-alumno',
  templateUrl: './editar-alumno.component.html',
  styleUrls: ['./editar-alumno.component.scss'],
})
export class EditarAlumnoComponent implements OnInit {
  alumnoForm: FormGroup;
  alumno: any;
  unItem = {
    nombre: '',
    descripcion: '',
    precio: 0,
  };
  validationMessages = {
    nombre: [{ type: 'required', message: 'Este campo es obligatorio.' }],
    apellido: [{ type: 'required', message: 'Este campo es obligatorio.' }],
    telefono: [{ type: 'required', message: 'Este campo es obligatorio.' }],
  };
  isConnected = true;
  noInternetConnection: boolean;
  selectedValueTurno: string = '';
  selectedValueHoraExtra: string = '';
  selectedValueCiclo: string = '';

  constructor(
    public apiService: ApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private location: Location
  ) {
    // this.createOnline$().subscribe(isOnline => console.log(isOnline));
  }

  /* Detectar si hubo desconexion*/
  // createOnline$() {
  //   return merge<boolean>(
  //     fromEvent(window, 'offline').pipe(map(() => false)),
  //     fromEvent(window, 'online').pipe(map(() => true)),
  //     new Observable((sub: Observer<boolean>) => {
  //       sub.next(navigator.onLine);
  //       sub.complete();
  //     }));
  // }

  ngOnInit() {
    this.route.data.subscribe((routeData) => {
      const data = routeData.data;
      if (data) {
        this.alumno = data;
        if (this.alumno.ciclos.find((c) => c === 'Inscripción')) {
          this.selectedValueCiclo = this.alumno.ciclos;
          this.selectedValueHoraExtra = this.alumno.horaExtra;
          this.selectedValueTurno = this.alumno.turno;
          this.createForm();
        } else {
          this.alumno.ciclos.push('Inscripción');
          this.selectedValueCiclo = this.alumno.ciclos;
          this.selectedValueHoraExtra = this.alumno.horaExtra;
          this.selectedValueTurno = this.alumno.turno;
          this.createForm();
        }
      }
    });
  }

  pagar(pago) {
    this.alumno.pagos.forEach((p) => {
      if (pago.nombre === p.nombre) {
        p.estado = 'PAGADO';
        p.fechaPago = new Date().toLocaleDateString().split('/').join('-');
      }
    });

    this.apiService
      .updatePagoAlumno(this.alumno.id, this.alumno.pagos)
      .then(() => {
        Swal.fire({
          title: 'Atención',
          text: 'Pago realizado correctamente. Si solo realizo un pago no necesita guardar el formulario.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      });
  }

  parseDate(date: any): string {
    return new Date(date.seconds * 1000).toLocaleDateString();
  }

  onEdit(item: { nombre: string; descripcion: string; precio: number }) {
    this.unItem = item;
  }

  createForm() {
    this.alumnoForm = this.fb.group({
      nombre: [this.alumno.nombre || '', Validators.required],
      apellido: [this.alumno.apellido || '', Validators.required],
      edad: [this.alumno.edad || 0, Validators.required],
      dni: [this.alumno.dni || 0, Validators.required],
      turno: [this.alumno.turno || '', Validators.required],
      horaExtra: [this.alumno.horaExtra || ''],
      ciclos: [this.alumno.ciclos || '', Validators.required],
      colegio: [this.alumno.colegio || ''],
      email: [this.alumno.email || '', Validators.required],
      direccion: [this.alumno.direccion || ''],
      telefono: [this.alumno.telefono || '', Validators.required],
      telefonoEmergencia: [this.alumno.telefonoEmergencia || ''],
      habilitado: [this.alumno.habilitado || false],
      nombrePadre: [this.alumno.nombrePadre || '', Validators.required],
      celPadre: [this.alumno.celPadre || ''],
      dniPadre: [this.alumno.dniPadre || ''],
      nombreMadre: [this.alumno.nombreMadre || ''],
      dniMadre: [this.alumno.dniMadre || ''],
      celMadre: [this.alumno.celMadre || ''],
      pagos: [this.alumno.pagos || ''],
    });
  }

  backClicked() {
    this.location.back();
  }

  // eliminar(alumno: any) {
  //   Swal.fire({
  //     title: 'Atención',
  //     text: '¿Desea eliminar alumno?',
  //     icon: 'question',
  //     confirmButtonText: 'ELIMINAR',
  //     showCancelButton: true,
  //     cancelButtonText: 'CANCELAR',
  //   }).then((result) => {
  //     this.spinner.show();
  //     if (result.isConfirmed) {
  //       this.apiService.deleteAlumno(this.alumno.id).then((res: any) => {
  //         this.spinner.hide();
  //         this.location.back();
  //       });
  //     }
  //   });
  // }

  errorAlert(mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: mensaje,
    });
  }

  resetFields() {
    this.alumnoForm = this.fb.group({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      habilitado: [false],
    });
  }

  /* llame al mismo metodo de updateAlumno()*/

  onPagoAlumno(value: any) {}
  onSubmit(value: any) {
    value.editado = new Date();
    value.id = this.alumno.id;

    this.apiService
      .updateAlumno(value)
      .then((res) => {
        Swal.fire({
          title: 'Atención',
          text: 'Alumno guardado correctamente!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then((result) => {
          this.backClicked();
        });
      })
      .catch((error) => {
        Swal.fire({
          title: 'Atención',
          text: 'Error al guardar',
          icon: 'warning',
          confirmButtonText: 'OK',
        });
      });
  }
}
