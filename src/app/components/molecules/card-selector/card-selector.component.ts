import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CardButtonComponent } from '../../atoms/card-button/card-button.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-selector',
  templateUrl:'./card-selector.component.html', 
  styleUrls: ['./card-selector.component.scss'],
  imports: [CardButtonComponent, CommonModule]
})
export class CardSelectorComponent {
  @Input() cards: (number | string)[] = [];
  @Input() selectedCard: string | number | null = null;
  @Output() cardSelected = new EventEmitter<string | number>();

  
  onSelect(card: string | number) {
    if (this.cards.includes(card)) {
      this.cardSelected.emit(card);
    }
  }
}
