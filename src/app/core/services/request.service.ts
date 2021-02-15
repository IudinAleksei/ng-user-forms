import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IService, ISettings, IUser } from './../models/request.model';

@Injectable()
export class RequestService {

  constructor(private http: HttpClient) { }

  private getRequest<T>(params: string): Observable<T> {
    return this.http.get<T>(`${environment.backend_url}${params}`)
      .pipe(
        retry(2),
        catchError(err => {
          console.warn('Error: ', err);
          return throwError(err);
        })
      );
  }

  private postRequest<T>(params: string, body: T): Observable<T> {
    return this.http.post<T>(`${environment.backend_url}${params}`, body)
      .pipe(
        retry(2),
        catchError(err => {
          console.warn('Error: ', err);
          return throwError(err);
        })
      );
  }

  private patchRequest<T>(params: string, body: T): Observable<T> {
    return this.http.patch<T>(`${environment.backend_url}${params}`, body)
      .pipe(
        retry(2),
        catchError(err => {
          console.warn('Error: ', err);
          return throwError(err);
        })
      );
  }

  getSettings(id: number): Observable<ISettings> {
    return this.getRequest(`/settings/${id}`);
  }

  setSettings(body: ISettings): Observable<ISettings> {
    return this.postRequest(`/settings`, body);
  }

  updateSettings(id: number, body: ISettings): Observable<ISettings> {
    return this.patchRequest(`/settings/${id}`, body);
  }

  getUser(id: number): Observable<IUser> {
    return this.getRequest(`/users/${id}`);
  }

  updateUser(id: number, body: IUser): Observable<IUser> {
    return this.patchRequest(`/users/${id}`, body);
  }

  getAllUsers(): Observable<IUser[]> {
    return this.getRequest(`/users`);
  }

  getServices(): Observable<IService[]> {
    return this.getRequest(`/services`);
  }
}
