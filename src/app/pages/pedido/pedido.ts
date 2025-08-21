import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto';
import { PedidoService } from '../../services/pedido';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.html',
  standalone: false,
  styleUrls: ['./pedido.scss']
})
export class Pedido implements OnInit {

  gruposDeProductos: any[] = [];
  pedidoActual: any[] = [];
  
  diametroSeleccionado: any = null;
  largoSeleccionado: any = null;
  cantidad: number | null = null;
  largosDisponibles: any[] = [];

  subtotal: number = 0;
  descuento: number | null = null;
  montoDescuento: number = 0; // <-- NUEVA VARIABLE
  total: number = 0;

  constructor(
    private productoService: ProductoService,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe(data => {
      this.gruposDeProductos = data;
    });
  }

  onDiametroChange(): void {
    if (this.diametroSeleccionado) {
      this.largosDisponibles = this.diametroSeleccionado.precios;
      this.largoSeleccionado = null;
    } else {
      this.largosDisponibles = [];
    }
  }

  agregarLinea(): void {
    if (!this.diametroSeleccionado || !this.largoSeleccionado || !this.cantidad) {
      alert('Por favor, completa todos los campos para agregar un producto.');
      return;
    }

    const subtotalLinea = this.largoSeleccionado.precio * this.cantidad;

    this.pedidoActual.push({
      producto_id: this.largoSeleccionado.id,
      nombre: this.diametroSeleccionado.diametro,
      largo: this.largoSeleccionado.largo,
      cantidad: this.cantidad,
      subtotal: subtotalLinea
    });

    this.diametroSeleccionado = null;
    this.largoSeleccionado = null;
    this.cantidad = null;
    this.largosDisponibles = [];

    this.recalcularTotal();
  }

  eliminarLinea(index: number): void {
    this.pedidoActual.splice(index, 1);
    this.recalcularTotal();
  }

  recalcularTotal(): void {
    this.subtotal = this.pedidoActual.reduce((acc, item) => acc + item.subtotal, 0);
    
    const porcentajeDescuento = this.descuento || 0;   
    const descuentoAplicado = this.subtotal * (porcentajeDescuento / 100);
    
    this.montoDescuento = descuentoAplicado;
    this.total = this.subtotal - descuentoAplicado;
  }

  guardarPedido(): void {
    if (this.pedidoActual.length === 0) {
      alert('No hay productos en el pedido para guardar.');
      return;
    }

    const pedidoParaEnviar = {
      detalles: this.pedidoActual,
      descuento: this.descuento,
      total_final: this.total
    };

    this.pedidoService.crearPedido(pedidoParaEnviar).subscribe(
      response => {
        alert(`¡Pedido guardado con éxito! ID del pedido: ${response.pedidoId}`);
        this.pedidoActual = [];
        this.descuento = 0;
        this.recalcularTotal();
      },
      error => {
        alert('Hubo un error al guardar el pedido.');
        console.error(error);
      }
    );
  }
}