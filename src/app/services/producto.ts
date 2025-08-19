import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importamos el cliente HTTP
import { Observable } from 'rxjs'; // Importamos Observable
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  // Guardamos la URL de nuestra API en una variable privada
  private API_URL = `${environment.apiUrl}/api/productos`;

  // 1. Inyectamos HttpClient en el constructor
  constructor(private http: HttpClient) { }

  // 2. Creamos un método para obtener todos los productos
  getProductos(): Observable<any> {
    return this.http.get(this.API_URL);
  }
  // --- MÉTODO NUEVO PARA ACTUALIZAR ---
  updateProducto(id: number, nuevoPrecio: number): Observable<any> {
    // La URL para actualizar un producto específico es /api/productos/ID
    const url = `${this.API_URL}/${id}`; 
    
    // Enviamos el nuevo precio en el cuerpo de la petición
    const body = { precio_por_pulgada: nuevoPrecio }; 

    return this.http.put(url, body);
  }
}