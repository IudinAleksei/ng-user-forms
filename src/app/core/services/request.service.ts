import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IRequest, IService, IUser } from '../models/request.model';

@Injectable()
export class RequestService {

  constructor(private http: HttpClient) { }

  private baseRequest(params: string): Observable<any> {
    return this.http.get<any>(`${environment.backend_url}${params}`)
      .pipe(
        retry(2),
        catchError(err => {
          console.warn('Error: ', err);
          return throwError(err);
        })
      );
  }

  getUsersAndSettings(): Observable<IRequest> {
    return this.baseRequest('/all');
  }

  getUser(id: number): Observable<IUser> {
    return this.baseRequest(`/users/${id}`);
  }

  getAllUsers(): Observable<IUser[]> {
    return this.baseRequest(`/users`);
  }

  getUserSettings(id: number): Observable<{}> {
    return this.baseRequest(`/settings/${id}`);
  }

  getServices(): Observable<IService[]> {
    return this.baseRequest(`/services`);
  }
}
