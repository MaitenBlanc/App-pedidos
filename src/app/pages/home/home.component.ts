import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TarjetaCategoriaComponent } from '../../core/components/tarjeta-categoria/tarjeta-categoria.component';
import { Categoria } from '../../core/interfaces/categorias';
import { CategoriasService } from '../../core/services/categorias.service';
import { HeaderService } from '../../core/services/header.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, TarjetaCategoriaComponent, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  headerService = inject(HeaderService);
  categoriasService = inject(CategoriasService);
  categorias: WritableSignal<Categoria[]> = signal([]);

  ngOnInit(): void {
    this.headerService.titulo.set('Home');
    this.headerService.extendido.set(true);
    this.categoriasService.getAll().then((res) => this.categorias.set(res));
  }

  ngOnDestroy(): void {
    this.headerService.extendido.set(false);
  }
}
