import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importamos todos los componentes, incluyendo el nuevo 'Home'
import { Home } from './pages/home/home'; // o HomeComponent
import { Productos } from './pages/productos/productos'; // o ProductosComponent
import { Pedido } from './pages/pedido/pedido'; // o PedidoComponent
import { Facturas } from './pages/facturas/facturas'; // o FacturasComponent
import { FacturaDetalle } from './pages/factura-detalle/factura-detalle'; // <-- Importa el nuevo componente


const routes: Routes = [
  // La ruta raíz (la principal) ahora muestra el componente Home
  { path: '', component: Home }, 
  { path: 'productos', component: Productos },
  { path: 'pedido', component: Pedido },
  { path: 'facturas', component: Facturas },
  { path: 'facturas/:id', component: FacturaDetalle } // <-- AÑADE ESTA RUTA

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }