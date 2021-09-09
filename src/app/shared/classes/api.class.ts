import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { API_URL, API_VERSION } from '@env/environment';


export class ApiService {

  private httpClient: HttpClient;
  protected version = API_VERSION;
  protected apiUrl = API_URL;
  
  constructor(protected injector: Injector) {
    this.httpClient = injector.get(HttpClient);
  }

  public get<T>(path: string, options: { [param: string]: any } = {}): Observable<T> {
    return this.httpClient.get<T>(`${this.apiUrl}/${this.version}/${path}/`, options);
  }

  public post<T>(path: string, body: any, options: { [param: string]: any } = {}): Observable<T> {
    return this.httpClient.post<T>(`${this.apiUrl}/${this.version}/${path}/`, body, options);
  }

  public patch<T>(path: string, body: any, options: { [param: string]: any } = {}): Observable<T> {
    return this.httpClient.patch<T>(`${this.apiUrl}/${this.version}/${path}/`, body, options);
  }

  public put<T>(path: string, body: any, options: { [param: string]: any } = {}): Observable<T> {
    return this.httpClient.put<T>(`${this.apiUrl}/${this.version}/${path}/`, body, options);
  }

  public delete<T>(path: string, options: { [param: string]: any } = {}): Observable<T> {
    return this.httpClient.delete<T>(`${this.apiUrl}/${this.version}/${path}/`, options);
  }

}
