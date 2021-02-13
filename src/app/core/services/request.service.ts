import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IService, IUser } from '../models/request.model';

@Injectable()
export class RequestService {

  constructor(private http: HttpClient) { }


  private getRequest(params: string): Observable<any> {
    return this.http.get<any>(`${environment.backend_url}${params}`)
      .pipe(
        retry(2),
        catchError(err => {
          console.warn('Error: ', err);
          return throwError(err);
        })
      );
  }

  private postRequest(params: string, body: any): Observable<any> {
    return this.http.patch<any>(`${environment.backend_url}${params}`, body)
      .pipe(
        retry(2),
        catchError(err => {
          console.warn('Error: ', err);
          return throwError(err);
        })
      );
  }

  setSettings(body: any): Observable<any> {
    return this.postRequest(`/settings`, body);
  }

  getUser(id: number): Observable<IUser> {
    return this.getRequest(`/users/${id}`);
  }

  getAllUsers(): Observable<IUser[]> {
    return this.getRequest(`/users`);
  }

  getUserSettings(id: number): Observable<{}> {
    return this.getRequest(`/settings/${id}`);
  }

  getServices(): Observable<IService[]> {
    return this.getRequest(`/services`);
  }
}
