import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../../services/material.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-materials',
  imports: [CommonModule, FormsModule],
  templateUrl: './materials.component.html',
})
export class MaterialsComponent implements OnInit {
  materials: any[] = [];
  showForm = false;
  newMaterial = {
    nombre: '',
    descripcion: '',
    tipo: '',
    precio: null,
    fechaCompra: '',
    fechaVenta: null,
    estado: '',
    ciudadCodigo: ''
  };
  constructor(private materialService: MaterialService) {}

  ngOnInit() {
    this.loadMaterials();
  }

  loadMaterials() {
    this.materialService.getMaterials().subscribe({
      next: (data) => {
        this.materials = data;
      },
      error: (err) => {
        console.error('Error al obtener materiales', err);
      }
    });
  }
  addMaterial() {

    if (this.newMaterial.precio !== null && this.newMaterial.precio <= 0) {
      alert("El precio debe ser mayor a 0");
      return;
    }
    this.materialService.addMaterial(this.newMaterial).subscribe(
      () => {
        this.loadMaterials();
        alert('Material created successfully');
        this.showForm = false;
     
      },
      (error) => {
        console.error('Error creating material', error);
      }
    );
  }
  deleteMaterial(id: number): void {
    if (confirm('Are you sure you want to delete this material?')) {
      this.materialService.deleteMaterial(id).subscribe(
        () => {
          this.loadMaterials();
          alert('Material deleted successfully');
        },
        (error) => {
          console.error('Error deleting material', error);
        }
      );
    }
  }
  searchByTipo(tipo: string): void {
    this.materialService.getMaterialsByTipo(tipo).subscribe(
      (data) => {
        this.materials = data;
      },
      (error) => {
        console.error('Error fetching materials by type', error);
      }
    );
  }
  
  searchByFechaCompra(fechaCompra: string): void {
    this.materialService.getMaterialsByFechaCompra(fechaCompra).subscribe(
      (data) => {
        this.materials = data;
      },
      (error) => {
        console.error('Error fetching materials by purchase date', error);
      }
    );
  }
  
  searchByCiudad(ciudad: string): void {
    this.materialService.getMaterialsByCiudad(ciudad).subscribe(
      (data) => {
        this.materials = data;
      },
      (error) => {
        console.error('Error fetching materials by city', error);
      }
    );
  }
  editMaterial(material: any): void {
    this.materialService.updateMaterial(material.id, material).subscribe(
      () => {
        this.loadMaterials();
        alert('Material updated successfully');
      },
      (error) => {
        console.error('Error updating material', error);
      }
    );
  }
  logout() {
    localStorage.removeItem('token');
    alert('Sesión cerrada');
    
  }

}
