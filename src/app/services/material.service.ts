import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Material {
  id: number;
  nombre: string;
  tipo: string;
  fechaCompra: string;
  ciudad: string;
  precio: number;
  estado: string;
  fechaVenta?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MaterialService {
  private apiUrl = 'http://localhost:8080/api/materiales'; // URL de la API

  constructor(private http: HttpClient) {}
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  getMaterials(): Observable<any> {
    const token = localStorage.getItem('token'); // Obtiene el token almacenado
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Lo añade al header

    return this.http.get<any>(this.apiUrl, { headers }); // Hace la petición con el token
  }
  addMaterial(material: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, material, {
      headers: this.getAuthHeaders(),
    });
  }
  getMaterialsByTipo(tipo: string): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.apiUrl}/tipo?tipo=${tipo}`,{
      headers: this.getAuthHeaders(),
    });
  }
  
  getMaterialsByFechaCompra(fechaCompra: string): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.apiUrl}/fecha-compra?fechaCompra=${fechaCompra}`, {
      headers: this.getAuthHeaders(),
    });
  }
  
  getMaterialsByCiudad(ciudad: string): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.apiUrl}/ciudad?nombreCiudad=${ciudad}`, {
      headers: this.getAuthHeaders(),
    });
  }
  updateMaterial(id: number, material: Material): Observable<Material> {
    return this.http.put<Material>(`${this.apiUrl}/${id}`, material, {
      headers: this.getAuthHeaders(),
    });
  }
  
  
  deleteMaterial(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }
}


