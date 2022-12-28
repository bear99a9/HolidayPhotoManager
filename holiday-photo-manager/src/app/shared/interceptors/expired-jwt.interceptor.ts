import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class expiredJWTInterceptor implements HttpInterceptor {

    constructor(private router: Router,
        private authService: AuthService) { }


    intercept(request: HttpRequest<any>, next: HttpHandler) {

        return next.handle(request).pipe(
            catchError((err) => {
                if (err.status === 401) {
                    this.authService.doLogout();
                    this.router.navigate(['']);
                }
                return throwError(err)
            })
        );
    }
}