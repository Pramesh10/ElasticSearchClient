import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilesUploadService {
  apiUploadUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUploadUrl = 'https://localhost:7299/api/Files/upload';
  }

  public uploadFile(formData: FormData): Observable<any> {
    return this.httpClient.request(
      new HttpRequest('POST', this.apiUploadUrl, formData, {
        reportProgress: true,
      })
    );
  }
}
