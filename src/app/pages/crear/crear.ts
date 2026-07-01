import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PanchosService } from '../../services/panchitos.service';

interface Opcion {
  id: string;
  nombre: string;
  icono: string;
  emoji: string;
  color?: string;
}

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './crear.html',
  styleUrls: ['./crear.css']
})

export class CrearComponent {


  nombrePancho: string = '';

  panes: Opcion[] = [
    { id: 'clasico', nombre: 'Clásico', icono: 'assets/icons/pan-clasico.png', emoji: 'icon cargando', color: '#e8a020' },
    { id: 'integral', nombre: 'Integral', icono: 'assets/icons/pan-integral.png', emoji: 'icon cargando', color: '#8B6914' },
    { id: 'brioche', nombre: 'Brioche', icono: 'assets/icons/pan-brioche.png', emoji: 'icon cargando', color: '#f0c060' },
  ];

  salchichas: Opcion[] = [
    { id: 'viena', nombre: 'Viena', icono: 'assets/icons/salchicha-viena.png', emoji: 'icon cargando', color: '#c0392b' },
    { id: 'cerdo', nombre: 'Cerdo', icono: 'assets/icons/salchicha-cerdo.png', emoji: 'icon cargando', color: '#962d22' },
    { id: 'pollo', nombre: 'Pollo', icono: 'assets/icons/salchicha-pollo.png', emoji: 'icon cargando', color: '#d4a017' },
  ];

  salsas: Opcion[] = [
    { id: 'ketchup', nombre: 'Ketchup', icono: 'assets/icons/ketchup.png', emoji: 'icon cargando', color: '#e74c3c' },
    { id: 'mostaza', nombre: 'Mostaza', icono: 'assets/icons/mostaza.png', emoji: 'icon cargando', color: '#FAC748' },
    { id: 'mayonesa', nombre: 'Mayonesa', icono: 'assets/icons/mayonesa.png', emoji: 'icon cargando', color: '#f5f0dc' },
  ];

  extras: Opcion[] = [
    { id: 'queso', nombre: 'Cheddar', icono: 'assets/icons/queso.png', emoji: 'icon cargando' },
    { id: 'pepino', nombre: 'Pepino', icono: 'assets/icons/pepino.png', emoji: 'icon cargando' },
    { id: 'cebolla', nombre: 'Cebolla', icono: 'assets/icons/cebolla.png', emoji: 'icon cargando' },
    { id: 'palta', nombre: 'Palta', icono: 'assets/icons/palta.png', emoji: 'icon cargando' },
    { id: 'lechuga', nombre: 'Lechuga', icono: 'assets/icons/lechuga.png', emoji: 'icon cargando' },
    { id: 'tomate', nombre: 'Tomate', icono: 'assets/icons/tomate.png', emoji: 'icon cargando' },
    { id: 'berenjena', nombre: 'Berenjena', icono: 'assets/icons/berenjena.png', emoji: 'icon cargando' },
    { id: 'huevo', nombre: 'Huevo', icono: 'assets/icons/huevo.png', emoji: 'icon cargando' },
    { id: 'aceitunas', nombre: 'Aceitunas', icono: 'assets/icons/aceitunas.png', emoji: 'icon cargando' },
    { id: 'picante', nombre: 'Picante', icono: 'assets/icons/picante.png', emoji: 'icon cargando' },
  ];

  panSeleccionado: Opcion | null = null;
  salchichaSeleccionada: Opcion | null = null;
  salsasSeleccionadas: Set<string> = new Set();
  extrasSeleccionados: Set<string> = new Set();

  onImgError(event: Event, emoji: string) {
    const img = event.target as HTMLImageElement;
    const span = document.createElement('span');
    span.textContent = emoji;
    span.style.fontSize = '28px';
    img.replaceWith(span);
  }

  seleccionarPan(pan: Opcion) {
    this.panSeleccionado = this.panSeleccionado?.id === pan.id ? null : pan;
  }

  seleccionarSalchicha(s: Opcion) {
    this.salchichaSeleccionada = this.salchichaSeleccionada?.id === s.id ? null : s;
  }

  toggleSalsa(s: Opcion) {
    this.salsasSeleccionadas.has(s.id)
      ? this.salsasSeleccionadas.delete(s.id)
      : this.salsasSeleccionadas.add(s.id);
  }

  toggleExtra(e: Opcion) {
    this.extrasSeleccionados.has(e.id)
      ? this.extrasSeleccionados.delete(e.id)
      : this.extrasSeleccionados.add(e.id);
  }

  estaSeleccionado(id: string, set: Set<string>) {
    return set.has(id);
  }

  get colorPan() { return this.panSeleccionado?.color || '#e8a020'; }
  get colorSalchicha() { return this.salchichaSeleccionada?.color || '#c0392b'; }

  get salsasSeleccionadasLista(): Opcion[] {
    return this.salsas.filter(s => this.salsasSeleccionadas.has(s.id));
  }

  get extrasSeleccionadosLista(): Opcion[] {
    return this.extras.filter(e => this.extrasSeleccionados.has(e.id));
  }
  get estaGirando(): boolean {
    return !this.panSeleccionado
      && !this.salchichaSeleccionada
      && this.salsasSeleccionadas.size === 0
      && this.extrasSeleccionados.size === 0;
  }

  get puedeGuardar() {
  return this.nombrePancho.trim() &&
         this.panSeleccionado &&
         this.salchichaSeleccionada;
}

constructor(private panchosService: PanchosService) {}

guardar() {

  if (!this.puedeGuardar) return;

  const pancho = {
    nombre: this.nombrePancho.trim(),
    pan: this.panSeleccionado!.id,
    salchicha: this.salchichaSeleccionada!.id,
    ingredientes: [
      ...Array.from(this.salsasSeleccionadas),
      ...Array.from(this.extrasSeleccionados)
    ].join(', '),
    precio: 0,
    tamaño: 'Mediano',
    disponible: true,
  };

  this.panchosService.crearPancho(pancho).subscribe({
    next: () => {
      alert(`¡"${pancho.nombre}" creado con éxito!`);

      this.nombrePancho = '';
      this.panSeleccionado = null;
      this.salchichaSeleccionada = null;
      this.salsasSeleccionadas.clear();
      this.extrasSeleccionados.clear();
    },

    error: (err: any) => {
      console.error(err);
      alert('Error al guardar el pancho. Revisá la consola.');
    }
  });
}

}