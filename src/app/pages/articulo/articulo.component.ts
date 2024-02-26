import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContadorCantidadComponent } from '../../core/components/contador-cantidad/contador-cantidad.component';
import { Producto } from '../../core/interfaces/productos';
import { CartService } from '../../core/services/cart.service';
import { HeaderService } from '../../core/services/header.service';
import { ProductosService } from '../../core/services/productos.service';

@Component({
  selector: 'app-articulo',
  standalone: true,
  imports: [CommonModule, ContadorCantidadComponent, FormsModule],
  templateUrl: './articulo.component.html',
  styleUrl: './articulo.component.scss',
})
export class ArticuloComponent {
  headerService = inject(HeaderService);
  productosService = inject(ProductosService);
  cartService = inject(CartService);

  producto?: Producto;
  cantidad = signal(1);
  notas = '';

  ngOnInit(): void {
    this.headerService.titulo.set('Artículo');
  }

  constructor(private ac: ActivatedRoute, private router: Router) {
    ac.params.subscribe((param) => {
      if (param['id']) {
        this.productosService.getById(param['id']).then((producto) => {
          this.producto = producto;
          this.headerService.titulo.set(producto!.nombre);
        });
      }
    });
  }

  agregarAlCarrito() {
    if (!this.producto) return;
    this.cartService.agregarProducto(
      this.producto?.id,
      this.cantidad(),
      this.notas
    );
    this.router.navigate(['/carrito']);
  }
}
