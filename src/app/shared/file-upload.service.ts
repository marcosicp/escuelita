import { FileUpload } from './../shared/file-upload';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  pushImagenComercioToStorageImage(
    fileUpload: FileUpload,
    pdr: any
  ): Observable<number | undefined> {
    const filePath = `alumnos/${pdr.nombre}/${fileUpload.file.name}`;
    const storageRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, fileUpload.file);

    uploadTask
      .snapshotChanges()
      .pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe((downloadURL) => {
            fileUpload.url = downloadURL;
            fileUpload.name = fileUpload.file.name;
            // this.saveFileDataComercios(fileUpload.idDoc, fileUpload);
          });
        })
      )
      .subscribe();

    return uploadTask.percentageChanges();
  }

  // private saveFileDataComercios(comercioId: string, fileUpload: FileUpload): void {
  //   this.db.collection('pdrs').doc(comercioId).update({
  //     imagen: fileUpload.url,
  //   });
  // }
}
