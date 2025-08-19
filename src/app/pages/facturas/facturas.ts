import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.html',
  standalone: false,
  styleUrls: ['./facturas.scss']
})
export class Facturas implements OnInit { // o FacturasComponent

  listaPedidos: any[] = [];

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.pedidoService.getPedidos().subscribe(
      data => {
        this.listaPedidos = data;
      },
      error => {
        console.error('Error al cargar el historial de pedidos', error);
      }
    );
  }
}