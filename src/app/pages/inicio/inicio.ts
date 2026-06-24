import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface RainItem {
  emoji: string; left: string; size: string; duration: string; delay: string;
}

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css']
})
export class InicioComponent implements OnInit, OnDestroy {
  readonly rainEmojis = ['🍅','🥒','🧅','🧀','🌶️','🥬','🫙','🧄','🫒','🍋','🥚','🌿'];
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
    }, 400);
    this.runAssembly();
    this.assemblyInterval = setInterval(() => this.runAssembly(), 7000);
  }

  ngOnDestroy() {
    clearInterval(this.rainInterval);
    clearInterval(this.assemblyInterval);
    this.timeouts.forEach(t => clearTimeout(t));
  }

  addRainItem() {
    this.rainItems.push({
      emoji:    this.rainEmojis[Math.floor(Math.random() * this.rainEmojis.length)],
      left:     `${Math.random() * 100}vw`,
      size:     `${20 + Math.random() * 20}px`,
      duration: `${4 + Math.random() * 5}s`,
      delay:    `${Math.random() * 2}s`,
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