import { catchError, Observable, retry, throwError } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { environment } from '@environments/environment';
@Injectable({
  providedIn: "root"
})
export class RepositoryService {
  private envAdress: string = environment.urlAdress;
  constructor(private http: HttpClient) { }

  public getData<T>(endPoint: string): Observable<T> {
    return this.http.get<T>(this.createCompleteRoute(endPoint), this.generateHeaders()).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  public create<T>(endPoint: string, body: T): Observable<T> {
    return this.http.post<T>(this.createCompleteRoute(endPoint), body).pipe(
      retry(2),
      catchError(this.handleError)
    );
  }

  public update<T>(endPoint: string, body: T): Observable<T> {
    return this.http.put<T>(this.createCompleteRoute(endPoint), body, this.generateHeaders()).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  public delete<T>(endPoint: string): Observable<T> {
    return this.http.delete<T>(this.createCompleteRoute(endPoint)).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  private createCompleteRoute(endPoint: string) {
    return `${this.envAdress}/${endPoint}`;
  }

  private generateHeaders(): { headers: HttpHeaders; } {
    return {
      headers: new HttpHeaders({ 'Content-type': 'applicaiton/json' })
    }
  }

  private handleError(errorResponse: HttpErrorResponse):  Observable<never> {
    let errorMessage: string = "";
    if (errorResponse.error instanceof ErrorEvent) {
      errorMessage = errorResponse.error.message;
    } else {
      errorMessage = `Código do erro: ${errorResponse.status}, ` + `menssagem: ${errorResponse.message}`;
    }
    console.log(errorMessage);
    return throwError(() => errorMessage);
  };

}
