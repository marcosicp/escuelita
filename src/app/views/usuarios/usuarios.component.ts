import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-new-user',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
  constructor(
    public _auth: AuthService,
    private router: Router,
    private apiService: ApiService,
    private titleService: Title
  ) {}
  ageValue: number = 0;
  searchValue: string = '';
  items: Array<any>;
  filteredItems: Array<any>;
  rowData: any;
  columnDefs = [
    {
      headerName: 'Nombre',
      field: 'nombre',
      sortable: true,
      filter: true,
      suppressSizeToFit: false,
    },
    {
      headerName: 'Apellido',
      field: 'apellido',
      sortable: true,
      filter: true,
      suppressSizeToFit: false,
    },
    {
      headerName: 'Habilitado',
      field: 'habilitado',
      sortable: true,
      filter: true,
      suppressSizeToFit: false,
      cellRenderer(params: any) {
        return '<div>' + (params.value ? 'SI' : 'NO') + '</div>';
      },
    },
    {
      headerName: 'Email',
      field: 'email',
      sortable: true,
      width: 150,
      filter: true,
      suppressSizeToFit: false,
    },
    {
      headerName: 'Teléfono',
      field: 'telefono',
      sortable: true,
      width: 150,
      filter: true,
      suppressSizeToFit: false,
    },
    {
      headerName: 'Creado',
      field: 'creado',
      sortable: true,
      filter: true,
      suppressSizeToFit: false,
    },
  ];
  private gridApi;
  private gridColumnApi;

  viewDetails(item) {
    this.router.navigate([
      'usuarios/detalle-usuario/' + JSON.stringify(item.data),
    ]);
  }

  nuevoUsuario() {
    this.router.navigate(['usuarios/nuevo-usuario']);
  }

  usuarios() {
    this.router.navigate(['usuarios']);
  }

  quickSearch() {
    this.gridApi.setQuickFilter(this.searchValue);
  }

  ngOnInit() {
    this.getUsuarios();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columns;
    this.gridApi.sizeColumnsToFit();
  }

  getUsuarios() {
    this.apiService.getUsuariosAdmin().then((result) => {
      
      this.items = result.docs.map((a) => {
        let obj = a.data();
        //
        
        obj.creado = new Date(obj.creado.seconds * 1000);
        obj.id = a.id;
        return obj;
      });
   
      this.rowData = this.items;
    });
  }
}
