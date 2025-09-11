import { Component, Input } from '@angular/core';
import { User } from '../../atoms/user-name/user-name';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-card',
  templateUrl: './player-card.html',
  imports:[User, CommonModule, ],
  styleUrls: ['./player-card.scss']
})
export class PlayerCardComponent {
  @Input() userName: string = '';
  @Input() userInitials: string = '';
  @Input() displayMode: 'jugador' | 'espectador' = 'jugador';
  @Input() cardSelected: string | number | null = null;
  @Input() areCardsRevealed: boolean = false;
}
