import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IRequest } from '../models/request.model';

@Injectable()
export class RequestService {

  constructor(private http: HttpClient) { }

  getUsersAndSettings(): Observable<IRequest> {
    return this.http.get<IRequest>(environment.backend_url)
      .pipe(
        retry(2),
        catchError(err => {
          console.warn('Error: ', err);
          return throwError(err);
        })
      );
  }
}
