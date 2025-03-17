import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../../services/material.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-materials',
  imports: [CommonModule, FormsModule],
  templateUrl: './materials.component.html',
})
export class MaterialsComponent implements OnInit {
  materials: any[] = [];
  showForm = false;
  showEditForm = false;
  isEditMode = false;
  newMaterial = {
    nombre: '',
    descripcion: '',
    tipo: '',
    precio: null,
    fechaCompra: '',
    fechaVenta: null,
    estado: '',
    ciudadNombre: '',
  };

  EditMaterialData = {
    id: 0,
    nombre: '',
    descripcion: '',
    tipo: '',
    precio: null,
    fechaCompra: '',
    fechaVenta: null,
    estado: '',
    ciudadNombre: '',
  };
  constructor(private materialService: MaterialService, private router: Router) {}

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
  openEditForm(material: any): void {
    this.EditMaterialData = {...material}
    this.showEditForm = true;
  }
  editMaterial() {
    this.materialService.updateMaterial(this.EditMaterialData.id, this.EditMaterialData).subscribe(
      () => {
        this.loadMaterials();
        alert('Material updated successfully');
        this.showEditForm = false;
      },
      (error) => {
        console.error('Error updating material', error);
      }
    );
  
  }

  deleteMaterial(id: number): void {
    if (confirm('Estas seguro que deseas eliminar este material?')) {
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
    if (!tipo) {
      this.loadMaterials();
      return;
    }
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
    if (!fechaCompra) {
      this.loadMaterials();
      return;
    }

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
    if (!ciudad) {
      this.loadMaterials();
      return;
    }
    this.materialService.getMaterialsByCiudad(ciudad).subscribe(
      (data) => {
        this.materials = data;
      },
      (error) => {
        console.error('Error fetching materials by city', error);
      }
    );
  }
  logout() {
    localStorage.removeItem('token');
    alert('Sesión cerrada');
    this.router.navigate(['/login']);
    
  }

}
