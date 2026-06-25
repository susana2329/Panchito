import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface RainItem {
  icono: string;
  nombre: string;
  left: string;
  size: string;
  duration: string;
  delay: string;
}

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class InicioComponent implements OnInit, OnDestroy {

  readonly iconosLluvia = [
    { icono: 'assets/icons/tomate.png',    nombre: 'tomate' },
    { icono: 'assets/icons/pepino.png',    nombre: 'pepino' },
    { icono: 'assets/icons/cebolla.png',   nombre: 'cebolla' },
    { icono: 'assets/icons/queso.png',     nombre: 'queso' },
    { icono: 'assets/icons/picante.png',   nombre: 'picante' },
    { icono: 'assets/icons/lechuga.png',   nombre: 'lechuga' },
    { icono: 'assets/icons/ketchup.png',   nombre: 'ketchup' },
    { icono: 'assets/icons/ajo.png',       nombre: 'ajo' },
    { icono: 'assets/icons/aceitunas.png', nombre: 'aceitunas' },
    { icono: 'assets/icons/huevo.png',     nombre: 'huevo' },
    { icono: 'assets/icons/mayonesa.png',  nombre: 'mayonesa' },
    { icono: 'assets/icons/palta.png',     nombre: 'palta' },
  ];

  rainItems: RainItem[] = [];
  step = 0;
  private rainInterval!: ReturnType<typeof setInterval>;
  private assemblyInterval!: ReturnType<typeof setInterval>;
  private timeouts: ReturnType<typeof setTimeout>[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    for (let i = 0; i < 12; i++) this.addRainItem();
    this.rainInterval = setInterval(() => {
      this.addRainItem();
      if (this.rainItems.length > 40) this.rainItems.splice(0, 10);
    }, 500);
    this.runAssembly();
    this.assemblyInterval = setInterval(() => this.runAssembly(), 7000);
  }

  ngOnDestroy() {
    clearInterval(this.rainInterval);
    clearInterval(this.assemblyInterval);
    this.timeouts.forEach(t => clearTimeout(t));
  }

  addRainItem() {
    const base = this.iconosLluvia[Math.floor(Math.random() * this.iconosLluvia.length)];
    this.rainItems.push({
      icono:    base.icono,
      nombre:   base.nombre,
      left:     `${Math.random() * 100}vw`,
      size:     `${28 + Math.random() * 24}px`,
      duration: `${5 + Math.random() * 5}s`,
      delay:    `${Math.random() * 3}s`,
    });
  }

  runAssembly() {
    this.step = 0;
    this.cdr.detectChanges();
    this.timeouts.forEach(t => clearTimeout(t));
    this.timeouts = [];
    [1, 2, 3, 4, 5].forEach((s, i) => {
      const t = setTimeout(() => {
        this.step = s;
        this.cdr.detectChanges();
      }, 600 + i * 700);
      this.timeouts.push(t);
    });
  }
}