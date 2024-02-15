export class FileUpload {
  key!: string;
  name!: string;
  url!: string;
  file: File;
  idDoc: string;

  constructor(file: File) {
    this.file = file;
  }
}
