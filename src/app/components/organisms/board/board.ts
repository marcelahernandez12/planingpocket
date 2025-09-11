import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from '../../molecules/user-info/user-info';
import { PlayerCardComponent } from '../../molecules/player-card/player-card';
import { Player } from '../../../utils/interfaces/interfaces';
import { Game } from '../../../services/game';
import { CardSelectorComponent } from '../../molecules/card-selector/card-selector.component';
import { ButtonComponent } from '../../atoms/button/button';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, UserInfoComponent,  PlayerCardComponent, CardSelectorComponent, ButtonComponent],
  templateUrl: './board.html',
  styleUrls: ['./board.scss']
})
export class BoardComponent {
  @Input() userName: string = '';
  @Input() userRole: 'jugador' | 'propietario' = 'jugador';
  @Input() displayMode: 'jugador' | 'espectador' = 'jugador';

  currentUser!: Player;
  connectedUsers: Player[] = [];
  cards: (number | string)[] = []; 
  constructor(private gameService: Game) {}

  ngOnInit(): void {
    this.displayMode = this.gameService.getUserMode();
    this.userRole = this.gameService.getUserRole();
    this.cards = this.gameService.getAvailableCards();

    this.currentUser = {
      name: this.userName,
      initials: this.userName.charAt(0).toUpperCase(),
      role: this.userRole,
      displayMode:this.displayMode,
      cardSelected: null
    };
    const mockOtherUsers : Player[]  = [
      { name: 'Oscar', initials: 'OS', displayMode:'espectador', role: 'jugador', cardSelected: null},
      { name: 'David', initials: 'DA', displayMode:'jugador', role: 'jugador', cardSelected: 5 },
      { name: 'Albert', initials: 'AL', displayMode:'jugador', role: 'jugador', cardSelected: 3 },
      { name: 'Pedro', initials: 'PE', displayMode:'jugador', role: 'jugador', cardSelected: 1 },
      { name: 'Nata', initials: 'NA', displayMode:'jugador', role: 'jugador', cardSelected: 8 },
      { name: 'Andrea', initials: 'AN', displayMode:'jugador', role: 'jugador', cardSelected: 3 },
      { name: 'Henry', initials: 'He', displayMode:'jugador', role: 'jugador', cardSelected: 8 },
    ];
    this.connectedUsers = mockOtherUsers;

    this.gameService.cardSelected$.subscribe(({ userName, card }) => {
      if (this.currentUser.name === userName) {
        this.currentUser.cardSelected = card;
      } else {
        const player = this.connectedUsers.find(u => u.name === userName);
        if (player) {
          player.cardSelected = card;
        }
      }
    });
  }

  handleCardSelection(card: number | string) {
      if (this.displayMode === 'jugador') {
        this.currentUser.cardSelected = card;
        this.gameService.notifyCardSelection(this.currentUser.name, card);
        console.log('Carta elegida por:', this.currentUser.name, this.currentUser.role, card);
      }
  }
  
  voteSummary: { key: string | number, value: number }[] = [];
  average = 0;

  reveal() {
    this.gameService.revealCards();

    const jugadores = [this.currentUser, ...this.connectedUsers].filter(
      u => u.displayMode === 'jugador'
    );

    const summary = this.gameService.getVoteSummary(jugadores);
    this.voteSummary = Array.from(summary.counts.entries())
      .map(([key, value]) => ({ key, value }));
    this.average = summary.average;
  }


  get areCardsRevealed(): boolean {
    return this.gameService.areCardsRevealed();
  }

  get allPlayersHaveVoted(): boolean {
    const jugadores = [this.currentUser, ...this.connectedUsers].filter(
      u => u.displayMode === 'jugador'
    );
    return jugadores.every(u => u.cardSelected !== null);
  }
  reset() {
    this.currentUser.cardSelected = null;
    this.connectedUsers = this.gameService.resetGame(this.connectedUsers);

    this.voteSummary = [];
    this.average = 0;
  }
}