import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { Location } from '@angular/common';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-user',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.scss'],
})
export class NuevoUsuarioComponent implements OnInit {
  exampleForm: FormGroup;
  show: boolean;
  hide: boolean;
  selectedFile: File = null;
  file: any;

  validation_messages = {
    comercioId: [{ type: 'required', message: 'Este campo es obligatorio.' }],
    password: [{ type: 'required', message: 'Este campo es obligatorio.' }],
    email: [{ type: 'required', message: 'Este campo es obligatorio.' }],
    responsable: [{ type: 'required', message: 'Este campo es obligatorio.' }],
  };

  url2: string | ArrayBuffer;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private dataService: ApiService,
    private _location: Location
  ) {
    this.show = false;
  }

  password() {
    this.show = !this.show;
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      password: ['', Validators.required],
      edad: ['', Validators.required],
      dni: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: [''],
      email: [''],
      telefonoEmergencia: [''],
      // fechaNacimiento: [''],
      habilitado: [false],
    });
  }

  resetFields() {
    this.exampleForm = this.fb.group({
      responsable: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      telefono: new FormControl(''),
      habilitado: [false],
    });
  }

  onSubmit(value) {
    this.dataService.createUsuarioAuth(value).subscribe(
      (data) => {
        value.uid = data;
        value.user_type = 'ADMIN';
        delete value.password;
        this.dataService.createUserAdmin(value);
        Swal.fire({
          title: 'Atención',
          text: 'Usuario creado correctamente!',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then((result) => {
          this._location.back();
        });
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salió mal!',
        });
      }
    );
  }
  // });
}
