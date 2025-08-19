import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Productos } from './pages/productos/productos';
import { Pedido } from './pages/pedido/pedido';
import { Facturas } from './pages/facturas/facturas';
import { Home } from './pages/home/home';
import { FacturaDetalle } from './pages/factura-detalle/factura-detalle';

@NgModule({
  declarations: [
    App,
    Productos,
    Pedido,
    Facturas,
    Home,
    FacturaDetalle
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule 
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
