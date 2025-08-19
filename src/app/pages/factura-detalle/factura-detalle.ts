import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Herramienta para leer la URL
import { PedidoService } from '../../services/pedido';

@Component({
  selector: 'app-factura-detalle',
  templateUrl: './factura-detalle.html',
  standalone: false,
  styleUrls: ['./factura-detalle.scss']
})
export class FacturaDetalle implements OnInit { // o FacturaDetalleComponent

  detallesPedido: any[] = [];
  pedidoId: string | null = '';

  constructor(
    private route: ActivatedRoute, // Inyectamos ActivatedRoute
    private pedidoService: PedidoService
  ) { }

  ngOnInit(): void {
    // 1. Obtenemos el 'id' de la URL actual
    this.pedidoId = this.route.snapshot.paramMap.get('id');

    // 2. Si hay un id, llamamos al servicio para obtener los detalles
    if (this.pedidoId) {
      this.pedidoService.getPedidoDetalle(this.pedidoId).subscribe(
        data => {
          this.detallesPedido = data;
        },
        error => {
          console.error('Error al cargar los detalles del pedido', error);
        }
      );
    }
  }
  formatearLargo(valor: string): string {
    // Convierte el texto a un número para eliminar los ceros decimales innecesarios
    const numero = parseFloat(valor);
    // Lo convierte de nuevo a texto y le añade el símbolo de pulgadas
    return numero.toString() + '"';
  }
}