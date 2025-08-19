import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: false,
  styleUrls: ['./login.scss']
})
export class Login { // o LoginComponent

  // Variables para conectar con los campos del formulario
  username = '';
  password = '';

  // Inyectamos el servicio de autenticación y el router
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  // Esta función se ejecuta cuando se envía el formulario
  handleLogin(): void {
    const credentials = {
      username: this.username,
      password: this.password
    };

    this.authService.login(credentials).subscribe(
      // Si el login es exitoso
      response => {
        console.log('Login exitoso', response);
        // Navegamos a la página de inicio
        this.router.navigate(['/home']);
      },
      // Si hay un error
      error => {
        console.error('Error en el login', error);
        alert('Usuario o contraseña incorrectos.');
      }
    );
  }
}