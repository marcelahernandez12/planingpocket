import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from '../../molecules/user-info/user-info';
import { PlayerCardComponent } from '../../molecules/player-card/player-card';
import { Player } from '../../../utils/interfaces/interfaces';
import { Game } from '../../../services/game';
@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, UserInfoComponent,  PlayerCardComponent],
  templateUrl: './board.html',
  styleUrls: ['./board.scss']
})
export class BoardComponent {
  @Input() userName: string = '';
  userRole: 'jugador' | 'espectador' = 'jugador';
  displayMode: string = '';

  connectedUsers: Player[] = [];
  constructor(private gameService: Game) {}

  ngOnInit(): void {
    this.displayMode = this.gameService.getUserMode();
    const mockOtherUsers : Player[]  = [
      { name: 'Oscar', initials: 'OS', role: 'jugador', cardSelected: null},
      { name: 'David', initials: 'DA', role: 'jugador', cardSelected: null },
      { name: 'Albert', initials: 'AL', role: 'jugador', cardSelected: 8 },
      { name: 'Pedro', initials: 'PE', role: 'jugador', cardSelected: null },
      { name: 'Nata', initials: 'NA', role: 'jugador', cardSelected: null },
      { name: 'Andrea', initials: 'AN', role: 'jugador', cardSelected: null },
    ];
    
    this.connectedUsers.push({
      name: this.userName,
      initials: this.userName.charAt(0).toUpperCase(),
      role: this.userRole,
      cardSelected: null
    });

    this.connectedUsers.push(...mockOtherUsers);
    console.log('Usuario actual:', this.userName, 'displayMode:', this.displayMode);
  }
}