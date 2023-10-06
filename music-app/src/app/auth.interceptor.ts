 
import { Injectable } from '@angular/core';

import {

  HttpInterceptor,

  HttpRequest,

  HttpHandler,

  HttpEvent,

} from '@angular/common/http';

import { Observable } from 'rxjs';
 
@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor() {}
 
  intercept(

    request: HttpRequest<any>,

    next: HttpHandler

  ): Observable<HttpEvent<any>> {
 
    const authToken = localStorage.getItem('token');
 
    if (request.url.endsWith('/api/auth/token')) {

     

      return next.handle(request);

    }

 

    if (authToken) {

      request = request.clone({

        setHeaders: {

          Authorization: `Bearer ${authToken}`,

        },

      });

    }

 

   

    return next.handle(request);

  }

}