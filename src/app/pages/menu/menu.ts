import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Pancho {
  panchoId: string; 
  nombre: string;
  ingredientes: string;
  tamanio: string;
}

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class MenuComponent {

  panchos: Pancho[] = [
    { panchoId: '1', nombre: 'Pancho Clásico', ingredientes: 'Ketchup, Mostaza', tamanio: 'Mediano' },
    { panchoId: '2', nombre: 'Pancho Especial', ingredientes: 'Cheddar, Cebolla, Papas Pay',  tamanio: 'Grande' },
    { panchoId: '3', nombre: 'Pancho Premium', ingredientes: 'Cheddar, Pickles, Tomate',  tamanio: 'XL' },
    { panchoId: '4', nombre: 'Panchooooo', ingredientes: 'Cheddar, Pickles, Tomate',  tamanio: 'XS' },
    { panchoId: '5', nombre: 'PanchoOOOTEE', ingredientes: 'Cheddar, Pickles, Tomate',  tamanio: 'XXXL' },
    { panchoId: '6', nombre: 'Panchote', ingredientes: 'Cheddar, Pickles, Tomate',  tamanio: 'XXL' },
    { panchoId: '7', nombre: 'PanchoRizo', ingredientes: 'Cheddar, Pickles, Tomate',  tamanio: 'M' }
  ];

  editarPancho(pancho: Pancho) {
    console.log('Editar Pancho:', pancho);
    alert(`Editar: ${pancho.nombre}`);
  }

  eliminarPancho(id: string) {
    const confirmar = confirm('¿Estás seguro de que querés ELIMINAR este PANCHO?');

    if (!confirmar) return;

    this.panchos = this.panchos.filter(p => p.panchoId !== id);

    console.log('Panchito ELIMINADO', id);
  }
}

