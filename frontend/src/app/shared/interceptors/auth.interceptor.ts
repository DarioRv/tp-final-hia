import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  private urls = [
    '/usuario/cambiar-contrasena-logueado',
    '/usuario/eliminar',
    '/usuario/actualizar',
    '/cursos',
    '/estudiantes',
    '/horarios',
    '/asistencias',
  ];

  constructor(private authService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.urls.some((url) => request.url.includes(url))) {
      const token = this.authService.getToken();
      const clonedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
      return next.handle(clonedRequest);
    }
    return next.handle(request);
  }
}
