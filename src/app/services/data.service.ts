import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public ventas: any[] = [];
  public productos: any[] = [];
  public pedidos: any[] = [];
  public usuarios: any[] = [];
  public result: any[] = [];

  constructor(
    private http: HttpClient
  ) { }

  getAsync = (uri: string, dataPDR: any) => Observable.create(observer => {
    this.http.get(`${uri}`)
      .subscribe(
        data => {
          dataPDR = data;
          observer.next(dataPDR);
          observer.complete();
        },
        error => {
          observer.next(false);
          observer.complete();
        }
      );
  })

  getAsyncList = (uri: string, dataCollection: any[]) => Observable.create(observer => {
    this.http.get(`${uri}`)
      .subscribe(
        data => {
          dataCollection = [];
          for (const d of data as any[]) {
            dataCollection.push(d);
          }
          observer.next(dataCollection);
          observer.complete();
        },
        error => {
          observer.next(false);
          observer.complete();
        }
      );
  })

  createAsync = (uri: string, object: any, dataCollection: any[]) => Observable.create(observer => {
    this.http.post(`${uri}`, object)
      .subscribe(result => {
        // TODO result deberia traer el id del nuevo objeto insertado
        // object['id] = result.id;
        dataCollection.push(result[0]);
        observer.next(dataCollection);
        observer.complete();
      },
      error => {
        observer.next(false);
        observer.complete();
      });
  })

  postAsync = (uri: string, object: any) => Observable.create(observer => {
    this.http.post(`${uri}`, object)
      .subscribe(result => {
        observer.next(result);
        observer.complete();
      },
      error => {
        observer.next(false);
        observer.complete();
      });
  })

  // updateAsync = (uri: string, object: any, dataCollection: any[]) => Observable.create(observer => {
  //   this.http.post(`${URL_BASE}/${uri}`, object)
  //     .subscribe(result => {
  //       // TODO probar que esto funcione. Se asume que la primary key de las tablas sea 'id'
  //       const objectToUpdate = dataCollection.filter(x => x.id === object.id)[0];
  //       const objectIndex = dataCollection.indexOf(objectToUpdate);
  //       dataCollection[objectIndex] = object;

  //       observer.next(dataCollection);
  //       observer.complete();
  //     },
  //     error => {
  //       observer.next(false);
  //       observer.complete();
  //     });
  // })

  deleteAsync = (uri: string, id: string, data: any) => Observable.create(observer => {
    this.http.delete(`${uri}/${id}`)
      .subscribe(result => {
        // TODO probar que esto funcione. Se asume que la primary key de las tablas sea 'id'
        const objectToUpdate = data;
        // const objectIndex = dataCollection.indexOf(objectToUpdate);
        // dataCollection.splice(objectIndex, 1);

        observer.next(objectToUpdate);
        observer.complete();
      },
      error => {
        observer.next(false);
        observer.complete();
      });
  })
}
