import { Component, WritableSignal, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TarjetaProductoComponent } from '../../core/components/tarjeta-producto/tarjeta-producto.component';
import { Busqueda } from '../../core/interfaces/busqueda';
import { Producto } from '../../core/interfaces/productos';
import { HeaderService } from '../../core/services/header.service';
import { ProductosService } from '../../core/services/productos.service';

@Component({
  selector: 'app-buscar',
  standalone: true,
  imports: [FormsModule, TarjetaProductoComponent, RouterModule],
  templateUrl: './buscar.component.html',
  styleUrl: './buscar.component.scss',
})
export class BuscarComponent {
  headerService = inject(HeaderService);
  productosService = inject(ProductosService);
  productos: WritableSignal<Producto[]> = signal([]);
  cargando = signal(true);

  ngOnInit(): void {
    this.headerService.titulo.set('Buscar');
    this.productosService.getAll().then((res) => {
      this.productos.set(res);
      this.cargando.set(false);
    });
  }

  parametrosBusqueda: Busqueda = {
    texto: '',
    aptoCeliaco: false,
    aptoVegano: false,
  };

  async buscar() {
    this.cargando.set(true);
    this.productos.set(
      await this.productosService.buscar(this.parametrosBusqueda)
    );
  }
}
