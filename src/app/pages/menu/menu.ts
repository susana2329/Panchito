import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Pancho {
  id: number;
  nombre: string;
  ingredientes: string;
  precio: number;
  tamanio: string;
  disponible: boolean;
}

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class MenuComponent {

  panchos: Pancho[] = [
    {
      id: 1,
      nombre: 'Pancho Clásico',
      ingredientes: 'Ketchup, Mostaza',
      precio: 2500,
      tamanio: 'Mediano',
      disponible: true
    },
    {
      id: 2,
      nombre: 'Pancho Especial',
      ingredientes: 'Cheddar, Cebolla, Papas Pay',
      precio: 3500,
      tamanio: 'Grande',
      disponible: true
    },
    {
      id: 3,
      nombre: 'Pancho Premium',
      ingredientes: 'Cheddar, Pickles, Tomate',
      precio: 4200,
      tamanio: 'XL',
      disponible: false
    }
    ,
    {
      id: 4,
      nombre: 'Panchooooo',
      ingredientes: 'Cheddar, Pickles, Tomate',
      precio: 8500,
      tamanio: 'XS',
      disponible: true
    },
    {
      id: 5,
      nombre: 'PanchoOOOTEE',
      ingredientes: 'Cheddar, Pickles, Tomate',
      precio: 15000,
      tamanio: 'XXXL',
      disponible: false
    },
    {
      id: 6,
      nombre: 'Panchote',
      ingredientes: 'Cheddar, Pickles, Tomate',
      precio: 5000,
      tamanio: 'XXL',
      disponible: true
    },
    {
      id: 7,
      nombre: 'PanchoRizo',
      ingredientes: 'Cheddar, Pickles, Tomate',
      precio: 10000,
      tamanio: 'M',
      disponible: false
    }
  ];

  editarPancho(pancho: Pancho) {
    console.log('Editar Pancho:', pancho);
    alert(`Editar: ${pancho.nombre}`);
  }

  eliminarPancho(id: number) {

    const confirmar = confirm('¿Estás seguro de que querés ELIMINAR este PANCHO?');

    if (!confirmar) return;

    this.panchos = this.panchos.filter(p => p.id !== id);

    console.log('Panchito ELIMINADO', id);
  }

  obtenerEstado(disponible: boolean): string {
    return disponible ? 'Disponible' : 'NO Disponible';
  }
}

