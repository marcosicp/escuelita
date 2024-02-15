import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";
import { ApiService } from '../../../services/api.service';

@Injectable()
export class EditarAlumnoResolver implements Resolve<any> {

  constructor(public apiService: ApiService) { }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      const producto = JSON.parse(route.paramMap.get('alumno'));
      resolve(producto);
    });
  }
}
