import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto'; // Importamos nuestro servicio

@Component({
  selector: 'app-productos',
  templateUrl: './productos.html',
  standalone: false,
  styleUrls: ['./productos.scss']
})
export class Productos { // o ProductosComponent, según como lo hayas nombrado

  // Creamos una variable para guardar la lista de productos que llegue del backend
  listaProductos: any[] = [];

  // Inyectamos nuestro ProductoService en el constructor
  constructor(private productoService: ProductoService) { }

  // ngOnInit es un método especial que se ejecuta automáticamente cuando el componente carga
  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    // Usamos el servicio y nos "suscribimos" al Observable para recibir los datos
    this.productoService.getProductos().subscribe(
      data => {
        this.listaProductos = data; // Guardamos los datos en nuestra variable
      },
      error => {
        console.error('Error al cargar los productos', error);
      }
    );
  }
  // --- FUNCIÓN NUEVA PARA EL BOTÓN ---
  actualizarPrecio(id: number, input: HTMLInputElement): void {
    const nuevoPrecio = input.value; // Obtenemos el valor del campo de texto
    
    // Validamos que no esté vacío
    if (!nuevoPrecio) {
      alert('Por favor, introduce un nuevo precio.');
      return;
    }

    this.productoService.updateProducto(id, parseFloat(nuevoPrecio)).subscribe(
      response => {
        alert('¡Producto actualizado con éxito!');
        this.cargarProductos(); // Volvemos a cargar la lista para ver el cambio
        input.value = ''; // Limpiamos el campo de texto
      },
      error => {
        console.error('Error al actualizar el producto', error);
        alert('Hubo un error al actualizar el producto.');
      }
    );
  }
}