import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [RouterModule, CommonModule],
})
export class HeaderComponent {
  headerService = inject(HeaderService);
  claseAplicada = signal('');
  tituloMostrado = signal('');

  esconderTitulo = effect(
    () => {
      if (this.headerService.titulo()) {
        this.claseAplicada.set('fade-out');
      }
    },
    { allowSignalWrites: true }
  );

  mostrarTituloNuevo(e: AnimationEvent) {
    if (e.animationName.includes('fade-out')) {
      this.tituloMostrado.set(this.headerService.titulo());
      this.claseAplicada.set('fade-in');
      setTimeout(() => this.claseAplicada.set(''), 250);
    }
  }
}
