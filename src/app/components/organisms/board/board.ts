import { Component, Input, ChangeDetectorRef, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';
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
export class BoardComponent implements OnChanges {
  @Input() userName: string = '';
  @Input() userRole: 'jugador' | 'administrador' = 'jugador';
  @Input() displayMode: 'jugador' | 'espectador' = 'jugador';
  @Output() displayModeChange = new EventEmitter<'jugador' | 'espectador'>();
  currentUser!: Player;
  connectedUsers: Player[] = [];
  cards: (number | string)[] = []; 
  loadingReveal: boolean = false;
  cardsRevealed: boolean = false; 
  constructor(private gameService: Game, private cd: ChangeDetectorRef) {}
  
  ngOnInit(): void {
    this.displayMode = this.gameService.getUserMode();
    this.userRole = this.gameService.getUserRole();
    this.cards = this.gameService.getAvailableCards();

    this.currentUser = {
      name: this.userName,
      initials: this.userName.charAt(0).toUpperCase(),
      role: this.userRole,
      displayMode:this.displayMode,
      cardSelected: null,
      isOwner:true
    };
    const mockOtherUsers : Player[]  = [
      { name: 'Oscar', initials: 'OS', displayMode:'espectador', role: 'jugador', cardSelected: null, isOwner: false },
      { name: 'David', initials: 'DA', displayMode:'jugador', role: 'jugador', cardSelected: 5, isOwner: false },
      { name: 'Albert', initials: 'AL', displayMode:'jugador', role: 'jugador', cardSelected: 3, isOwner: false },
      { name: 'Pedro', initials: 'PE', displayMode:'jugador', role: 'jugador', cardSelected: 1, isOwner: false },
      { name: 'Nata', initials: 'NA', displayMode:'jugador', role: 'jugador', cardSelected: 8, isOwner: false },
      { name: 'Andrea', initials: 'AN', displayMode:'jugador', role: 'jugador', cardSelected: 3, isOwner: false },
      { name: 'Henry', initials: 'He', displayMode:'jugador', role: 'jugador', cardSelected: 8, isOwner: false },
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
   ngOnChanges(changes: SimpleChanges): void {
    if (changes['displayMode'] && this.currentUser) {
      this.currentUser.displayMode = this.displayMode;
      this.displayModeChange.emit(this.displayMode); 
      this.cd.detectChanges();
    }
    if (changes['userRole'] && this.currentUser) {
      this.currentUser.role = this.userRole;
      this.cd.detectChanges();
    }
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
  if (this.loadingReveal || this.cardsRevealed) return; // evita clicks múltiples

  this.loadingReveal = true;
  this.cd.detectChanges(); // fuerza render del loading

  setTimeout(() => {
    this.gameService.revealCards();

    const jugadores = [this.currentUser, ...this.connectedUsers].filter(
      u => u.displayMode === 'jugador'
    );
    const summary = this.gameService.getVoteSummary(jugadores);

    this.voteSummary = Array.from(summary.counts.entries()).map(([key, value]) => ({ key, value }));
    this.average = summary.average;

    this.loadingReveal = false;  // oculta animación
    this.cardsRevealed = true;   // muestra botón de nueva votación
    this.cd.detectChanges();
  }, 1000); // duración animación
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
    this.cardsRevealed = false;
  }
  makeAdmin(player: Player) {
    if (this.currentUser.role !== 'administrador') return; 
    player.role = 'administrador';
    console.log(`${player.name} ahora es administrador`);
    console.table([this.currentUser, ...this.connectedUsers].map(u => ({
      name: u.name,
      role: u.role,
      displayMode: u.displayMode,
      isOwner: u.isOwner
      })));
  }
}