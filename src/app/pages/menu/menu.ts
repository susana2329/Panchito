import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PanchosService } from '../../services/panchitos.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class MenuComponent implements OnInit {

  panchos: any[] = [];
  buscarPancho = '';
  cargando = true;
  errorCarga = false;

  mostrarAlertaDelete = false;
  mostrarToast = false;
  panchoSeleccionadoId: string | null = null;
  panchoSeleccionadoNombre = '';
  nombreEliminado = '';
  private toastTimeout?: ReturnType<typeof setTimeout>;

  constructor(private panchosService: PanchosService, private router: Router) {}

  ngOnInit() { this.cargarPanchos(); }

  cargarPanchos() {
    this.cargando = true;
    this.errorCarga = false;
    this.panchosService.listarPanchos().subscribe({
      next: (res: any) => {
        this.panchos = res.panchos;
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error al cargar panchos:', err);
        this.errorCarga = true;
        this.cargando = false;
      }
    });
  }

  tamanoTexto(tamano: string): string {
    const cm = parseInt(tamano);
    if (isNaN(cm)) return tamano;
    if (cm <= 10) return 'Muy chico';
    if (cm <= 15) return 'Chico';
    if (cm <= 20) return 'Mediano';
    if (cm <= 25) return 'Grande';
    return 'Muy grande';
  }

  get panchosFiltrados(): any[] {
    const filtro = this.buscarPancho.toLowerCase();
    return this.panchos.filter(p => p.nombre.toLowerCase().includes(filtro));
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
    this.panchosService.borrarPancho(this.panchoSeleccionadoId).subscribe({
      next: () => {
        this.panchos = this.panchos.filter(p => p.panchoId !== this.panchoSeleccionadoId);
        this.cerrarAlerta();
        this.mostrarToastControlado();
      },
      error: (err: any) => {
        console.error('Error al eliminar:', err);
        alert('Error al eliminar el pancho');
        this.cerrarAlerta();
      }
    });
  }

  private mostrarToastControlado(): void {
    this.mostrarToast = true;
    if (this.toastTimeout) clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => { this.mostrarToast = false; }, 2500);
  }
}