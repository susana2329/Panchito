import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Pancho {
  panchoId: string;
  nombre: string;
  ingredientes: string;
  tamanio: string;
}

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class MenuComponent {

  panchos: Pancho[] = [
    { panchoId: '1', nombre: 'Pancho Clásico', ingredientes: 'Ketchup, Mostaza', tamanio: 'Mediano' },
    { panchoId: '2', nombre: 'Pancho Especial', ingredientes: 'Cheddar, Cebolla, Papas Pay', tamanio: 'Grande' },
    { panchoId: '3', nombre: 'Pancho Premium', ingredientes: 'Cheddar, Pickles, Tomate', tamanio: 'XL' },
    { panchoId: '4', nombre: 'Panchooooo', ingredientes: 'Cheddar, Pickles, Tomate', tamanio: 'XS' },
    { panchoId: '5', nombre: 'PanchoOOOTEE', ingredientes: 'Cheddar, Pickles, Tomate', tamanio: 'XXXL' },
    { panchoId: '6', nombre: 'Panchote', ingredientes: 'Cheddar, Pickles, Tomate', tamanio: 'XXL' },
    { panchoId: '7', nombre: 'PanchoRizo', ingredientes: 'Cheddar, Pickles, Tomate', tamanio: 'M' }
  ];

  buscarPancho = '';

  mostrarAlertaDelete = false;
  mostrarToast = false;

  panchoSeleccionadoId: string | null = null;
  panchoSeleccionadoNombre = '';
  nombreEliminado = '';

  private toastTimeout?: ReturnType<typeof setTimeout>;

  constructor(private router: Router) {}

  get panchosFiltrados(): Pancho[] {
    const filtro = this.buscarPancho.toLowerCase();

    return this.panchos.filter(p =>
      p.nombre.toLowerCase().includes(filtro)
    );
  }

  abrirConfirmacion(id: string, nombre: string): void {
    this.panchoSeleccionadoId = id;
    this.panchoSeleccionadoNombre = nombre;
    this.mostrarAlertaDelete = true;
  }

  cerrarAlerta(): void {
    this.mostrarAlertaDelete = false;
    this.panchoSeleccionadoId = null;
    this.panchoSeleccionadoNombre = '';
  }

  confirmarEliminar(): void {
    if (!this.panchoSeleccionadoId) return;

    this.nombreEliminado = this.panchoSeleccionadoNombre;

    this.panchos = this.panchos.filter(
      p => p.panchoId !== this.panchoSeleccionadoId
    );

    this.cerrarAlerta();
    this.mostrarToastControlado();
  }

  private mostrarToastControlado(): void {
    this.mostrarToast = true;

    if (this.toastTimeout) {
      clearTimeout(this.toastTimeout);
    }

    this.toastTimeout = setTimeout(() => {
      this.mostrarToast = false;
    }, 1500);
  }

  editarPancho(pancho: Pancho): void {
    this.router.navigate(['/editar-pancho', pancho.panchoId]);
  }
}
