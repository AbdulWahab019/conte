import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private toast: ToastService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.headers.get('skip')) return next.handle(request);

    const token = localStorage.getItem('token');
    const is_blob = request.headers.get('is_blob');
    let authRequest = request;

    if (token) {
      if (is_blob) {
        authRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else
        authRequest = request.clone({
          setHeaders: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
    }

    return next.handle(authRequest).pipe(
      tap(
        () => {},
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status !== 401) {
              return;
            }
            localStorage.clear();
            this.toast.show('Session Expired, please login again.', {
              classname: 'bg-danger text-light',
              icon: 'error',
            });
            this.router.navigate(['authentication']);
          }
        }
      )
    );
  }
}
