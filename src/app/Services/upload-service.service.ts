import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders} from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
@Injectable({
  providedIn: 'root'
})
export class UploadServiceService {
  apiUrl = 'http://localhost:99/api/order/postfile';
  constructor(private http : HttpClient) { }

  postFile(caption: string, fileToUpload: File) {
    const endpoint = this.apiUrl;
    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload, fileToUpload.name);
    formData.append('ImageCaption', caption);
    return this.http.post(endpoint, formData);
  }


}
