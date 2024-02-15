import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.scss'],
})
export class EditarUsuarioComponent implements OnInit {
  usuarioForm: FormGroup;
  item: any;
  usuarios: any;
  show: boolean;
  hide: boolean;

  validationMessages = {
    title: [{ type: 'required', message: 'Name is required.' }],
    descripcion: [{ type: 'required', message: 'Surname is required.' }],
    // categoria: [{ type: "required", message: "Age is required." }],
  };

  constructor(
    public apiService: ApiService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private _location: Location
  ) {}

  ngOnInit() {
    const that = this;
    
    this.route.data.subscribe((routeData: any) => {
      const data = routeData.data;
      if (data) {
        that.item = data;
        that.createForm();
      }
    });
  }

  createForm() {
    this.usuarioForm = this.fb.group({
      nombre: [this.item.nombre, Validators.required],
      apellido: [this.item.apellido, Validators.required],
      edad: [this.item.edad, Validators.required],
      dni: [this.item.dni, Validators.required],
      direccion: [this.item.direccion, Validators.required],
      telefono: [this.item.telefono],
      email: [this.item.email],
      telefonoEmergencia: [this.item.telefonoEmergencia],
      habilitado: [this.item.habilitado],
    });
  }

  backClicked() {
    this._location.back();
  }

  onSubmit(value) {
    value.id = this.item.id;
    value.editado = new Date();
    
    this.apiService.updateUsuario(value).then((res) => {
      Swal.fire({
        title: 'Atención',
        text: 'Usuario editado correctamente!',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        this.backClicked();
      });
    });
  }

  
}
