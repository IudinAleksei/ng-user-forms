import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from './../../constants.js';

@Injectable()
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsersAndServices(): Observable<{}> {
    return this.http.get<{}>(BACKEND_URL)
      .pipe(
        retry(2),
        catchError(err => {
          console.warn('Error: ', err);
          return throwError(err);
        })
      );
  }
}
