import { FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Component, Output, OnInit, EventEmitter, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';
import { AngularFireAuth } from '@angular/fire/auth';
// import { User } from "src/app/shared/user";
import { Observable } from 'rxjs';
import { AppService } from 'src/app/utils/services/app.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.scss'],
})
export class AlumnosComponent implements OnInit {
  ageValue: number = 0;
  searchValue: string = '';
  items: Array<any>;
  filteredItems: Array<any>;
  rowData: any;
  columnDefs = [
    {
      headerName: 'Nombre',
      field: 'nombre',
      suppressSizeToFit: true,
      width: 150,
      resizable: true,
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Apellido',
      field: 'apellido',
      suppressSizeToFit: true,
      width: 150,
      resizable: true,
      sortable: true,
      filter: true,
    },
    {
      headerName: 'Telefono',
      field: 'telefono',
      width: 150,
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: 'Edad',
      field: 'edad',
      sortable: true,
      width: 80,
      filter: true,
      resizable: true,
    },
    {
      headerName: 'Direccion',
      field: 'direccion',
      width: 150,
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: 'Email',
      field: 'email',
      width: 150,
      sortable: true,
      filter: true,
      resizable: true,
    },
    {
      headerName: 'Creado',
      field: 'creado',
      width: 190,
      sortable: true,
      filter: true,
      resizable: true,
    },
  ];
  private gridApi;
  private gridColumnApi;

  constructor(
    public _auth: AuthService,
    private router: Router,
    private appService: AppService,
    private dataService: ApiService,
    private titleService: Title
  ) {
    // this.appService.logout();
  }

  viewDetails(item) {
    this.router.navigate(['alumnos/details/' + JSON.stringify(item.data)]);
  }

  nuevoAlumno() {
    this.router.navigate(['alumnos/nuevo-alumno']);
  }

  quickSearch() {
    this.gridApi.setQuickFilter(this.searchValue);
  }

  ngOnInit() {
    this.getData();
    // this.gridApi.api.sizeColumnsToFit();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columns;
  }

  getData() {
    this.dataService.getAlumnos().subscribe((result) => {
      if (result.docs.length < 0){
        // this.rowData = result.docs;
        return;
      }

      
      this.items = result.docs.map((item: any, index: number) => {
        const obj = item.data();
        obj.id = item.id;
        obj.creado = new Date(obj.creado.seconds * 1000);
        return obj;
      });

      // this.items = result.data();
      // var itemsModel: Array<any> = [];
      this.rowData = this.items;
    
    });
  }
}

