import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ElasticSearchService {
  apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = 'https://localhost:7299/api/ElasticSearch/SearchWithContent';
  }

  elasticSearch(searchTerm: string): Observable<any> {
    const params = new HttpParams().set('searchTerm', searchTerm);

    return this.httpClient.get<any>(this.apiUrl, { params });
  }
}
