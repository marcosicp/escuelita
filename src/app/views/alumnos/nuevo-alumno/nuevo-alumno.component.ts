import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent, merge, Observable, Observer } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { map, finalize } from 'rxjs/operators';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { FileUpload } from '../../../shared/file-upload';
import { AppService } from 'src/app/utils/services/app.service';

@Component({
  selector: 'app-nuevo-alumno',
  templateUrl: './nuevo-alumno.component.html',
  styleUrls: ['./nuevo-alumno.component.scss'],
})
export class NuevoAlumnoComponent implements OnInit {
  show: boolean;
  hide: boolean;
  selectedValueTurno: string = '';
  selectedValueHoraExtra: string = '';
  selectedValueCiclo: string = '';
  alumnoForm: FormGroup;
  percentageImagen = 0;
  validationMessages = {
    nombre: [{ type: 'required', message: 'Este campo es obligatorio.' }],
    apellido: [{ type: 'required', message: 'Este campo es obligatorio.' }],
    password: [{ type: 'required', message: 'Este campo es obligatorio.' }],
    direccion: [{ type: 'required', message: 'Este campo es obligatorio.' }],
    telefono: [{ type: 'required', message: 'Este campo es obligatorio.' }],
  };
  url2: string | ArrayBuffer;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public apiService: ApiService,
    private appService: AppService,
    private location: Location,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.createForm();
  }

  password() {
    this.show = !this.show;
  }

  backClicked() {
    this.location.back();
  }

  /* Detectar si hubo desconexion*/
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

  createForm() {
    this.alumnoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      password: ['', Validators.required],
      edad: ['', Validators.required],
      dni: ['', Validators.required],
      declaracion: [''],
      turno: [''],
      horaExtra: [''],
      ciclos: [''],
      colegio: [''],
      email: [''],
      direccion: [''],
      telefono: [''],
      telefonoEmergencia: [''],
      habilitado: [false],
      nombrePadre: [''],
      celPadre: [''],
      dniPadre: [''],
      nombreMadre: [''],
      dniMadre: [''],
      celMadre: [''],
    });
  }

  resetFields() {
    this.alumnoForm = this.fb.group({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      edad: new FormControl('', Validators.required),
      dni: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      turno: new FormControl('', Validators.required),
      horaExtra: new FormControl(''),
      ciclos: new FormControl('', Validators.required),
      declaracion: new FormControl('', Validators.required),
      colegio: [''],
      password: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      telefonoEmergencia: [''],
      habilitado: [false],
      nombrePadre: new FormControl('', Validators.required),
      celPadre: [''],
      dniPadre: [''],
      nombreMadre: [''],
      dniMadre: [''],
      celMadre: [''],
    });
  }

  onSubmit(value: any) {
    this.spinner.show();
    value.creado = new Date();
    value.telefono = value.telefono != null ? value.telefono.trim() : null;
    value.nombre = value.nombre.trim();
    value.turno = this.selectedValueTurno;
    value.horaExtra = this.selectedValueHoraExtra;
    value.ciclos = this.selectedValueCiclo;
    value.pagos = [
      {
        estado: 'NO PAGO',
        nombre: 'Inscripción',
      },
      {
        estado: 'NO PAGO',
        nombre: '1D',
      },
      {
        estado: 'NO PAGO',
        nombre: '2D',
      },
      {
        estado: 'NO PAGO',
        nombre: '1E',
      },
      {
        estado: 'NO PAGO',
        nombre: '2E',
      },
      {
        estado: 'NO PAGO',
        nombre: '1F',
      },
      {
        estado: 'NO PAGO',
        nombre: '2F',
        fechaPago: '',
      },
    ];

    this.apiService.createUsuarioAuth(value).subscribe(
      (data) => {
        value.uid = data;
        value.user_type = 'ALUMNO';
        debugger;
        delete value.password;
        this.apiService
          .createAlumno(value)
          .then((result: any) => {
            this.spinner.hide();
            this.resetFields();
            Swal.fire({
              title: 'Atención',
              text: 'Alumno guardado correctamente!',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then(() => {
              this.backClicked();
            });
          })
          .catch((error: any) => {
            this.appService.errorAlert(
              'Error al guardar, intente nuevamente mas tarde.'
            );
          });
      },
      (error) => {}
    );
  }
}
