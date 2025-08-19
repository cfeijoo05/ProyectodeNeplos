import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    
    // Si el usuario ha iniciado sesión (tiene un token), déjalo pasar.
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // Si no, envíalo a la página de login.
    this.router.navigate(['/login']);
    return false;
  }
}