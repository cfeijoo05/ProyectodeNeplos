import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { Login } from './pages/login/login'; // o LoginComponent
import { Home } from './pages/home/home'; // o HomeComponent
import { Productos } from './pages/productos/productos'; // o ProductosComponent
import { Pedido } from './pages/pedido/pedido'; // o PedidoComponent
import { Facturas } from './pages/facturas/facturas'; // o FacturasComponent
import { FacturaDetalle } from './pages/factura-detalle/factura-detalle'; // <-- Importa el nuevo componente
import { AuthGuard } from './security/auth-guard'; // <-- Asegúrate de importar el guardia

const routes: Routes = [

  // Ruta para el login (esta no está protegida
  { path: 'login', component: Login },
  // La ruta raíz (la principal) ahora muestra el componente Home
  { path: 'home', component: Home, canActivate: [AuthGuard]  },
  { path: 'productos', component: Productos, canActivate: [AuthGuard]  },
  { path: 'pedido', component: Pedido, canActivate: [AuthGuard]  },
  { path: 'facturas', component: Facturas, canActivate: [AuthGuard]  },
  { path: 'facturas/:id', component: FacturaDetalle, canActivate: [AuthGuard]  },
  // Si alguien intenta ir a una ruta que no existe, lo mandamos al inicio
  { path: '', redirectTo: '', pathMatch: 'full'},
  // Cualquier otra ruta no definida, también va al login
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

