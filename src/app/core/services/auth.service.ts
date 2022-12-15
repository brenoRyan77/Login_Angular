import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = "http://localhost:3000";

  constructor(private http: HttpClient, private router: Router) { }

  public sign(payLoad: {email: string; password: string }): Observable<any>{
    return this.http.post<{ token: string}>(`${this.url}/sign`, payLoad).pipe(
      map((res) =>{
        localStorage.setItem('acces_token', JSON.stringify(res.token))
        return this.router.navigate(['admin']);
      }),
      catchError((e) =>{
        if (e.error.message) return throwError(() => e.error.message);

        return throwError(() => "Servidores offline");
      })
    )
  }

  public logout(){
    localStorage.removeItem('acess_token');
    return this.router.navigate(['']);
  }
}
