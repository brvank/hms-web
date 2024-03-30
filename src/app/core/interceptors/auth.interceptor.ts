import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
              if (error.status === 401) {

                // Redirect user to login screen on unauthorized access
                localStorage.clear();
                this.router.navigate(['/login']);
              }
              throw error;
            })
          );
    }
    
}