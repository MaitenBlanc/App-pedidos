import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Categoria } from '../../interfaces/categorias';

@Component({
  selector: 'app-tarjeta-categoria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tarjeta-categoria.component.html',
  styleUrl: './tarjeta-categoria.component.scss',
})
export class TarjetaCategoriaComponent {
  @Input({ required: true }) categoria!: Categoria;
}
