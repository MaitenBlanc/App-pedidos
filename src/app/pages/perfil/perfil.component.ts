import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Perfil } from '../../core/interfaces/perfil';
import { HeaderService } from '../../core/services/header.service';
import { PerfilService } from '../../core/services/perfil.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})
export class PerfilComponent {
  headerService = inject(HeaderService);
  perfilService = inject(PerfilService);
  router = inject(Router);

  ngOnInit(): void {
    this.headerService.titulo.set('Perfil');
    if (this.perfilService.perfil()) {
      this.perfil = { ...this.perfilService.perfil()! };
    }
  }

  perfil: Perfil = {
    nombre: '',
    direccion: '',
    telefono: '',
    detalleEntrega: '',
  };

  guardarDatosPerfil() {
    this.perfilService.guardarDatos(this.perfil);
    this.router.navigate(['/carrito']);
  }
}
