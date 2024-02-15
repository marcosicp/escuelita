import { ApiService } from '../../../../app/services/api.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";

@Injectable()
export class EditarUsuarioResolver implements Resolve<any> {

  constructor(public apiService: ApiService) { }

  resolve(route: ActivatedRouteSnapshot,) {
    return new Promise((resolve, reject) => {
      const producto = JSON.parse(route.paramMap.get('usuario'));
      resolve(producto);
    });
  }
}
