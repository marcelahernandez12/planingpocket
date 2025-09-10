import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from '../../molecules/user-info/user-info';
import { PlayerCardComponent } from '../../molecules/player-card/player-card';
import { Player } from '../../../utils/interfaces/interfaces';
import { Game } from '../../../services/game';
import { CardSelectorComponent } from '../../molecules/card-selector/card-selector.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, UserInfoComponent,  PlayerCardComponent, CardSelectorComponent],
  templateUrl: './board.html',
  styleUrls: ['./board.scss']
})
export class BoardComponent {
  @Input() userName: string = '';
  @Input() userRole: 'jugador' | 'espectador' = 'jugador';
  @Input() displayMode: string = '';

  currentUser!: Player;
  connectedUsers: Player[] = [];
  cards: (number | string)[] = []; 
  constructor(private gameService: Game) {}

  ngOnInit(): void {
    this.displayMode = this.gameService.getUserMode();
    
    this.cards = this.gameService.getAvailableCards();

    this.currentUser = {
      name: this.userName,
      initials: this.userName.charAt(0).toUpperCase(),
      role: this.userRole,
      cardSelected: null
    };
    const mockOtherUsers : Player[]  = [
      { name: 'Oscar', initials: 'OS', role: 'jugador', cardSelected: null},
      { name: 'David', initials: 'DA', role: 'jugador', cardSelected: null },
      { name: 'Albert', initials: 'AL', role: 'jugador', cardSelected: 8 },
      { name: 'Pedro', initials: 'PE', role: 'jugador', cardSelected: null },
      { name: 'Nata', initials: 'NA', role: 'jugador', cardSelected: null },
      { name: 'Andrea', initials: 'AN', role: 'jugador', cardSelected: null },
      { name: 'Henry', initials: 'He', role: 'jugador', cardSelected: null },
    ];
    this.connectedUsers = mockOtherUsers;

    this.gameService.cardSelected$.subscribe(({ userName, card }) => {
        const player = this.connectedUsers.find(u => u.name === userName);
        if (player) {
          player.cardSelected = card;
        }
        console.log(`📢 Notificación: ${userName} eligió la carta ${card}`);
    });
  }

  handleCardSelection(card: number | string) {
      if (this.displayMode === 'jugador') {
        this.currentUser.cardSelected = card;
        this.gameService.notifyCardSelection(this.currentUser.name, card);
        console.log('Carta elegida por:', this.currentUser.name, card);
      }
  }
}