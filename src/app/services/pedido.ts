import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private API_URL = `${environment.apiUrl}/api/pedidos`;

  constructor(private http: HttpClient) { }

  // Método para enviar el nuevo pedido al backend
  crearPedido(pedidoData: any): Observable<any> {
    return this.http.post(this.API_URL, pedidoData);
  }

  getPedidos(): Observable<any> {
    return this.http.get(this.API_URL);
  }
  getPedidoDetalle(id: string): Observable<any> {
    return this.http.get(`${this.API_URL}/${id}`);
  }
}