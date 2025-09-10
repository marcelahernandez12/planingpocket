import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-button',
  templateUrl: './card-button.component.html',
  styleUrls: ['./card-button.component.scss'],
  imports:[CommonModule]
})
export class CardButtonComponent {
  @Input() value?: number | string;
  @Input() selected = false;
  selectCard() {
    console.log('Carta seleccionada:', this.value);
    // Aquí luego emites un evento con @Output
  }
}
