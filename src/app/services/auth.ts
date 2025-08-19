import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = environment.apiUrl + '/api/auth';
  private TOKEN_KEY = 'auth-token';

  constructor(private http: HttpClient) { }

  // Envía las credenciales al backend para iniciar sesión
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, credentials).pipe(
      tap((response: any) => this.saveToken(response.token))
    );
  }

  // Guarda el token en el almacenamiento local del navegador
  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  // Obtiene el token guardado
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // Cierra la sesión eliminando el token
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  // Revisa si el usuario ha iniciado sesión (si existe un token)
  isLoggedIn(): boolean {
    // Esto comprueba que el token no sea null, undefined, o una cadena vacía.
    return !!this.getToken();
  }
}