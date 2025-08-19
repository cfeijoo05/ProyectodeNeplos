import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importamos todos los componentes, incluyendo el nuevo 'Home'
import { Login } from './pages/login/login'; // o LoginComponent
import { Home } from './pages/home/home'; // o HomeComponent
import { Productos } from './pages/productos/productos'; // o ProductosComponent
import { Pedido } from './pages/pedido/pedido'; // o PedidoComponent
import { Facturas } from './pages/facturas/facturas'; // o FacturasComponent
import { FacturaDetalle } from './pages/factura-detalle/factura-detalle'; // <-- Importa el nuevo componente


const routes: Routes = [
  // Ruta para el login (esta no está protegida)
  { path: 'login', component: Login },
  // La ruta raíz (la principal) ahora muestra el componente Home
  { path: 'home', component: Home }, 
  { path: 'productos', component: Productos },
  { path: 'pedido', component: Pedido },
  { path: 'facturas', component: Facturas },
  { path: 'facturas/:id', component: FacturaDetalle },
  // Si alguien intenta ir a una ruta que no existe, lo mandamos al inicio
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }