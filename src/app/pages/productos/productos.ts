import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.html',
  standalone: false,
  styleUrls: ['./productos.scss']
})
export class Productos implements OnInit {

  // Guardará los productos agrupados por diámetro
  gruposDeProductos: any[] = [];

  constructor(private productoService: ProductoService) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe(
      data => {
        this.gruposDeProductos = data;
      },
      error => {
        console.error('Error al cargar los productos', error);
      }
    );
  }

  actualizarPrecio(id: number, input: HTMLInputElement): void {
    const nuevoPrecio = input.value;
    if (!nuevoPrecio) {
      alert('Por favor, introduce un nuevo precio.');
      return;
    }

    this.productoService.updateProducto(id, parseFloat(nuevoPrecio)).subscribe(
      response => {
        alert('¡Precio actualizado con éxito!');
        // Recargamos los datos para ver el cambio
        this.cargarProductos(); 
      },
      error => {
        console.error('Error al actualizar el producto', error);
        alert('Hubo un error al actualizar el producto.');
      }
    );
  }
}