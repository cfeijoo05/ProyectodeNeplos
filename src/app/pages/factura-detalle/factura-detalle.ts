import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { PedidoService } from '../../services/pedido';
import { environment } from '../../../environments/environment'; 
import { Router } from '@angular/router';



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
    private pedidoService: PedidoService,
    private router: Router
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
  descargarProforma(): void {
    if (this.pedidoId) {
      // Construimos la URL completa al endpoint del PDF en el backend
      const url = `${environment.apiUrl}/api/pedidos/${this.pedidoId}/pdf`;
      // Abrimos la URL en una nueva pestaña para iniciar la descarga
      window.open(url, '_blank');
    }
  }
  eliminarPedido(): void {
    if (this.pedidoId && confirm('¿Estás seguro de que quieres eliminar este pedido? Esta acción no se puede deshacer.')) {
      this.pedidoService.deletePedido(this.pedidoId).subscribe(
        () => {
          alert('Pedido eliminado con éxito.');
          this.router.navigate(['/facturas']); // Redirige al historial
        },
        error => {
          alert('Hubo un error al eliminar el pedido.');
          console.error(error);
        }
      );
    }
  }
}