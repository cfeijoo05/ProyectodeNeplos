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

  mostrandoFormulario = false;
  nuevoProducto = {
    diametro: '',
    largo_pulgadas: null as number | null,
    precio: null as number | null
  };

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
  
  crearNuevoProducto(): void {
    if (!this.nuevoProducto.diametro || !this.nuevoProducto.largo_pulgadas || !this.nuevoProducto.precio) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    this.productoService.createProducto(this.nuevoProducto).subscribe(
      () => {
        alert('Producto creado con éxito.');
        this.cargarProductos(); // Recargar la lista
        this.mostrandoFormulario = false; // Ocultar el formulario
        this.nuevoProducto = { diametro: '', largo_pulgadas: null, precio: null }; // Resetear
      },
      error => {
        console.error('Error al crear producto', error);
        alert(error.error.error || 'Hubo un error al crear el producto.');
      }
    );
  }
}