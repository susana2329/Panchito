import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

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

  panes: Opcion[] = [
    { id: 'clasico',  nombre: 'Clásico',  icono: 'icons/pan-clasico.png',  emoji: '🍞', color: '#e8a020' },
    { id: 'integral', nombre: 'Integral', icono: 'icons/pan-integral.png', emoji: '🌾', color: '#8B6914' },
    { id: 'brioche',  nombre: 'Brioche',  icono: 'icons/pan-brioche.png',  emoji: '🥐', color: '#f0c060' },
  ];

  salchichas: Opcion[] = [
    { id: 'viena', nombre: 'Viena', icono: 'icons/salchicha-viena.png', emoji: '🌭', color: '#c0392b' },
    { id: 'cerdo', nombre: 'Cerdo', icono: 'icons/salchicha-cerdo.png', emoji: '🥩', color: '#962d22' },
    { id: 'pollo', nombre: 'Pollo', icono: 'icons/salchicha-pollo.png', emoji: '🍗', color: '#d4a017' },
  ];

  salsas: Opcion[] = [
    { id: 'ketchup',  nombre: 'Ketchup',  icono: 'icons/ketchup.png',  emoji: '🍅', color: '#e74c3c' },
    { id: 'mostaza',  nombre: 'Mostaza',  icono: 'icons/mostaza.png',  emoji: '🟡', color: '#FAC748' },
    { id: 'mayonesa', nombre: 'Mayonesa', icono: 'icons/mayonesa.png', emoji: '⚪', color: '#f5f0dc' },
  ];

  extras: Opcion[] = [
    { id: 'cheddar', nombre: 'Cheddar',   icono: 'icons/cheddar.png',  emoji: '🧀' },
    { id: 'pickles', nombre: 'Pickles',   icono: 'icons/pickles.png',  emoji: '🥒' },
    { id: 'cebolla', nombre: 'Cebolla',   icono: 'icons/cebolla.png',  emoji: '🧅' },
    { id: 'papas',   nombre: 'Papas Pay', icono: 'icons/papas.png',    emoji: '🥔' },
    { id: 'lechuga', nombre: 'Lechuga',   icono: 'icons/lechuga.png',  emoji: '🥬' },
    { id: 'tomate',  nombre: 'Tomate',    icono: 'icons/tomate.png',   emoji: '🍅' },
  ];

  panSeleccionado:       Opcion | null = null;
  salchichaSeleccionada: Opcion | null = null;
  salsasSeleccionadas:   Set<string> = new Set();
  extrasSeleccionados:   Set<string> = new Set();

 
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

  get colorPan()       { return this.panSeleccionado?.color       || '#e8a020'; }
  get colorSalchicha() { return this.salchichaSeleccionada?.color || '#c0392b'; }

  get salsasSeleccionadasLista(): Opcion[] {
    return this.salsas.filter(s => this.salsasSeleccionadas.has(s.id));
  }

  get extrasSeleccionadosLista(): Opcion[] {
    return this.extras.filter(e => this.extrasSeleccionados.has(e.id));
  }

  get puedeGuardar() {
    return this.panSeleccionado && this.salchichaSeleccionada;
  }

  guardar() {
    if (!this.puedeGuardar) return;
    const pancho = {
      nombre:       `Pancho ${this.panSeleccionado!.nombre}`,
      pan:          this.panSeleccionado!.id,
      salchicha:    this.salchichaSeleccionada!.id,
      ingredientes: [
        ...Array.from(this.salsasSeleccionadas),
        ...Array.from(this.extrasSeleccionados)
      ].join(', '),
      precio:     0,
      tamano:     'Mediano',
      disponible: true,
    };
    console.log('Pancho a crear:', pancho);
    // TODO: conectar con API Gateway
    // this.panchosService.crearPancho(pancho).subscribe(...)
    alert('¡Pancho guardado! (conectar con API Gateway)');
  }
}