import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto';
import { PedidoService } from '../../services/pedido';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.html',
  standalone: false,
  styleUrls: ['./pedido.scss']
})
export class Pedido { // o PedidoComponent

  // --- Variables para el estado del componente ---
  listaProductos: any[] = []; // Para el <select>
  pedidoActual: any[] = [];   // Las líneas que vamos agregando al pedido

  // --- Variables para el formulario de nueva línea ---
  productoSeleccionado: any = null;
  largo: number | null = null;
  cantidad: number | null = null;

  // --- Variables para los totales ---
  subtotal: number = 0;
  descuento: number = 0;
  total: number = 0;

  // Inyectamos los dos servicios que necesitamos
  constructor(
    private productoService: ProductoService,
    private pedidoService: PedidoService
  ) { }

  ngOnInit(): void {
    // Al cargar la página, obtenemos la lista de productos para el dropdown
    this.productoService.getProductos().subscribe(data => {
      this.listaProductos = data;
    });
  }

  agregarLinea(): void {
    if (!this.productoSeleccionado || !this.largo || !this.cantidad) {
      alert('Por favor, completa todos los campos para agregar un producto.');
      return;
    }

    // Calculamos el subtotal de esta línea específica
    const subtotalLinea = this.productoSeleccionado.precio_por_pulgada * this.largo * this.cantidad;

    // Añadimos la nueva línea a nuestro pedido actual
    this.pedidoActual.push({
      producto_id: this.productoSeleccionado.id,
      nombre: this.productoSeleccionado.diametro,
      largo: this.largo,
      cantidad: this.cantidad,
      subtotal: subtotalLinea
    });

    // Reseteamos los campos del formulario
    this.productoSeleccionado = null;
    this.largo = null;
    this.cantidad = null;
    this.recalcularTotal();
  }

  eliminarLinea(index: number): void {
    this.pedidoActual.splice(index, 1); // Elimina el elemento en la posición 'index'
    this.recalcularTotal();
  }

  recalcularTotal(): void {
    // Calculamos el subtotal sumando el subtotal de cada línea
    this.subtotal = this.pedidoActual.reduce((acc, item) => acc + item.subtotal, 0);
    // Calculamos el total final aplicando el descuento
    const descuentoAplicado = this.subtotal * (this.descuento / 100);
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

    // LA CORRECCIÓN ESTÁ AQUÍ:
    // Asegúrate de que estás llamando a this.pedidoService.crearPedido
    this.pedidoService.crearPedido(pedidoParaEnviar).subscribe(
      response => {
        alert(`¡Pedido guardado con éxito! ID del pedido: ${response.pedidoId}`);
        // Limpiamos todo para un nuevo pedido
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