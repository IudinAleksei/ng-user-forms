import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class RequestService {

  constructor(private http: HttpClient) { }

  getUsersAndSettings() {
    return this.http.get(environment.backend_url)
      .pipe(
        retry(2),
        catchError(err => {
          console.warn('Error: ', err);
          return throwError(err);
        })
      );
  }
}
