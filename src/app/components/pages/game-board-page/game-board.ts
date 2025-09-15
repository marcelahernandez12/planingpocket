import { Component, OnInit } from '@angular/core';
import { CommonModule  } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { HeaderComponent } from '../../organisms/header/header';
import { BoardComponent } from '../../organisms/board/board';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule, HeaderComponent, BoardComponent],
  templateUrl: './game-board.html',
  styleUrl: './game-board.scss'
})
export class GameBoard implements OnInit {
  gameName: string = '';
  userName: string = '';
  userRole: 'jugador' | 'propietario' = 'jugador';
  displayMode: 'jugador' | 'espectador' = 'jugador';
  gameId: string | null = null;

  constructor(private route: ActivatedRoute) { }
  onDisplayModeChange(newMode: 'jugador' | 'espectador') {
    this.displayMode = newMode;
  }
  ngOnInit(): void {
     this.gameId = this.route.snapshot.paramMap.get('id');
    
    const sessionData = localStorage.getItem('sessionData');
    if (sessionData) {
      const data = JSON.parse(sessionData);
      this.gameName = data.gameId;
      this.userName = data.user.name;
      this.userRole = data.user.userRole;
      this.displayMode = data.user.displayMode === 'espectador' ? 'espectador' : 'jugador';
    }
  }
}