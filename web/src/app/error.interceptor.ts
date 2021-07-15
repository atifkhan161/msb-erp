import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';

export class ErrorIntercept implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
            throwError(errorMessage)
          } else if (error.error) {
            // server-side error
            errorMessage = `Error Status: ${error.error.status}\nMessage: ${error.error.message}`;
            alert(errorMessage);
            // return Observable.empty<HttpEvent<any>>();
          }
          return throwError(errorMessage);
        })
      )
  }
}