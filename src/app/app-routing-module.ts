import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Tus importaciones de componentes
import { Login } from './pages/login/login';
import { Home } from './pages/home/home';
import { Productos } from './pages/productos/productos';
import { Pedido } from './pages/pedido/pedido';
import { Facturas } from './pages/facturas/facturas';
import { FacturaDetalle } from './pages/factura-detalle/factura-detalle';
import { AuthGuard } from './security/auth-guard'; // El guardia

const routes: Routes = [
  // Ruta para el login (sin protección)
  { path: 'login', component: Login },

  // Rutas protegidas por el AuthGuard
  { path: 'home', component: Home, canActivate: [AuthGuard] },
  { path: 'productos', component: Productos, canActivate: [AuthGuard] },
  { path: 'pedido', component: Pedido, canActivate: [AuthGuard] },
  { path: 'facturas', component: Facturas, canActivate: [AuthGuard] },
  { path: 'facturas/:id', component: FacturaDetalle, canActivate: [AuthGuard] },

  // La ruta raíz ahora redirige al login
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Cualquier otra ruta no definida, también va al login
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }