import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-editar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './editar.html',
  styleUrls: ['./editar.css']
})
export class EditarComponent implements OnInit {

  panchoId: string = '';
  panchoOriginal: any = null; 
  nombrePancho: string = '';
  tamanioCm: number | null = null;
  cargando = true;
  guardando = false;

  panes: Opcion[] = [
    { id: 'clasico',  nombre: 'Clásico',  icono: 'assets/icons/pan-clasico.png',  emoji: '🍞', color: '#e8a020' },
    { id: 'integral', nombre: 'Integral', icono: 'assets/icons/pan-integral.png', emoji: '🌾', color: '#8B6914' },
    { id: 'brioche',  nombre: 'Brioche',  icono: 'assets/icons/pan-brioche.png',  emoji: '🥐', color: '#f0c060' },
  ];

  salchichas: Opcion[] = [
    { id: 'viena', nombre: 'Viena', icono: 'assets/icons/salchicha-viena.png', emoji: '🌭', color: '#c0392b' },
    { id: 'cerdo', nombre: 'Cerdo', icono: 'assets/icons/salchicha-cerdo.png', emoji: '🥩', color: '#962d22' },
    { id: 'pollo', nombre: 'Pollo', icono: 'assets/icons/salchicha-pollo.png', emoji: '🍗', color: '#d4a017' },
  ];

  salsas: Opcion[] = [
    { id: 'ketchup',  nombre: 'Ketchup',  icono: 'assets/icons/ketchup.png',  emoji: '🍅', color: '#e74c3c' },
    { id: 'mostaza',  nombre: 'Mostaza',  icono: 'assets/icons/mostaza.png',  emoji: '🟡', color: '#FAC748' },
    { id: 'mayonesa', nombre: 'Mayonesa', icono: 'assets/icons/mayonesa.png', emoji: '⚪', color: '#f5f0dc' },
  ];

  extras: Opcion[] = [
    { id: 'queso',     nombre: 'Cheddar',   icono: 'assets/icons/queso.png',     emoji: '🧀' },
    { id: 'pepino',    nombre: 'Pickles',   icono: 'assets/icons/pepino.png',    emoji: '🥒' },
    { id: 'cebolla',   nombre: 'Cebolla',   icono: 'assets/icons/cebolla.png',   emoji: '🧅' },
    { id: 'palta',     nombre: 'Palta',     icono: 'assets/icons/palta.png',     emoji: '🥑' },
    { id: 'lechuga',   nombre: 'Lechuga',   icono: 'assets/icons/lechuga.png',   emoji: '🥬' },
    { id: 'tomate',    nombre: 'Tomate',    icono: 'assets/icons/tomate.png',    emoji: '🍅' },
    { id: 'berenjena', nombre: 'Berenjena', icono: 'assets/icons/berenjena.png', emoji: '🍆' },
    { id: 'huevo',     nombre: 'Huevo',     icono: 'assets/icons/huevo.png',     emoji: '🥚' },
    { id: 'aceitunas', nombre: 'Aceitunas', icono: 'assets/icons/aceitunas.png', emoji: '🫒' },
    { id: 'picante',   nombre: 'Picante',   icono: 'assets/icons/picante.png',   emoji: '🌶️' },
  ];

  panSeleccionado:       Opcion | null = null;
  salchichaSeleccionada: Opcion | null = null;
  salsasSeleccionadas:   Set<string> = new Set();
  extrasSeleccionados:   Set<string> = new Set();

  constructor(
    private panchosService: PanchosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.panchoId = this.route.snapshot.paramMap.get('id') || '';
    if (this.panchoId) this.cargarPancho();
  }

  cargarPancho() {
    this.panchosService.obtenerPancho(this.panchoId).subscribe({
      next: (pancho: any) => {
        this.panchoOriginal        = pancho; // Lo guardamos
        this.nombrePancho          = pancho.nombre;
        this.tamanioCm             = parseInt(pancho.tamano) || null;
        this.panSeleccionado       = this.panes.find(p => p.id === pancho.pan) || null;
        this.salchichaSeleccionada = this.salchichas.find(s => s.id === pancho.salchicha) || null;
        
        const ings = pancho.ingredientes?.split(', ') || [];
        ings.forEach((ing: string) => {
          if (this.salsas.find(s => s.id === ing))  this.salsasSeleccionadas.add(ing);
          if (this.extras.find(e => e.id === ing))  this.extrasSeleccionados.add(ing);
        });
        
        this.cargando = false;
      },
      error: (err: any) => {
        console.error('Error al cargar pancho:', err);
        alert('No se pudo cargar el pancho');
        this.router.navigate(['/menu']);
      }
    });
  }

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

  estaSeleccionado(id: string, set: Set<string>) { return set.has(id); }

  get colorPan()       { return this.panSeleccionado?.color       || '#e8a020'; }
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

  get tamanoTexto(): string {
    const cm = this.tamanioCm;
    if (!cm || cm <= 0) return '';
    if (cm <= 10) return 'Muy chico';
    if (cm <= 15) return 'Chico';
    if (cm <= 20) return 'Mediano';
    if (cm <= 25) return 'Grande';
    return 'Muy grande';
  }

  get tamanioBadgeClase(): string {
    const cm = this.tamanioCm;
    if (!cm) return '';
    if (cm <= 10) return 'badge-xs';
    if (cm <= 15) return 'badge-s';
    if (cm <= 20) return 'badge-m';
    if (cm <= 25) return 'badge-l';
    return 'badge-xl';
  }

  get puedeGuardar() {
    return this.nombrePancho.trim()
      && this.panSeleccionado
      && this.salchichaSeleccionada
      && this.tamanioCm !== null
      && this.tamanioCm > 0;
  }

  guardar() {
    if (!this.puedeGuardar || this.guardando) return;
    this.guardando = true;

   
    const panchoActualizado = {
      ...this.panchoOriginal, 
      nombre:       this.nombrePancho.trim(),
      pan:          this.panSeleccionado!.id,
      salchicha:    this.salchichaSeleccionada!.id,
      ingredientes: [
        ...Array.from(this.salsasSeleccionadas),
        ...Array.from(this.extrasSeleccionados)
      ].join(', '),
      tamano:       String(this.tamanioCm)
    };

    this.panchosService.actualizarPancho(this.panchoId, panchoActualizado).subscribe({
      next: () => {
        this.guardando = false;
        alert(`¡"${panchoActualizado.nombre}" actualizado con éxito!`);
        this.router.navigate(['/menu']);
      },
      error: (err: any) => {
        console.error(err);
        this.guardando = false;
        alert('Error al actualizar el pancho. Revisá la consola.');
      }
    });
  }
}