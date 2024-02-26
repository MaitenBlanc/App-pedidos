import { CommonModule } from '@angular/common';
import { Component, WritableSignal, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TarjetaProductoComponent } from '../../core/components/tarjeta-producto/tarjeta-producto.component';
import { Producto } from '../../core/interfaces/productos';
import { CategoriasService } from '../../core/services/categorias.service';
import { HeaderService } from '../../core/services/header.service';

@Component({
  selector: 'app-rubro',
  standalone: true,
  imports: [TarjetaProductoComponent, CommonModule, RouterModule],
  templateUrl: './rubro.component.html',
  styleUrl: './rubro.component.scss',
})
export class RubroComponent {
  headerService = inject(HeaderService);
  categoriasService = inject(CategoriasService);
  ac = inject(ActivatedRoute);
  productos: WritableSignal<Producto[]> = signal([]);

  ngOnInit(): void {
    this.ac.params.subscribe((params) => {
      if (params['id']) {
        this.categoriasService
          .getById(parseInt(params['id']))
          .then((categoria) => {
            if (categoria) {
              this.productos.set(categoria.productos);
              this.headerService.titulo.set(categoria.nombre);
            }
          });
      }
    });
  }
}
