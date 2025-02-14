import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  getDocumentContent(documentId: number) {
    return this.http.get(`/api/document/${documentId}/content`, { responseType: 'text' })
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  confirmDocument(documentId: number) {
    return this.http.post(`/api/document/${documentId}/confirm`, {})
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
}
