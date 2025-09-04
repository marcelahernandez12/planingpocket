import { Component, OnInit } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule, UpperCasePipe],
  templateUrl: './game-board.html',
  styleUrl: './game-board.scss'
})
export class GameBoard implements OnInit {
  gameName: string = '';
  userName: string = '';
  userRole: 'player' | 'spectator' = 'player';
  gameId: string | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Recupera el ID de la partida de la URL
    this.gameId = this.route.snapshot.paramMap.get('id');
    
    // Recupera los datos del local storage
    const savedGameData = localStorage.getItem('gameData');
    if (savedGameData) {
      const userData = JSON.parse(savedGameData);
      this.userName = userData.name;
      this.userRole = userData.role;
    }
    
    const gameNameData = localStorage.getItem('gameName');
    if (gameNameData) {
      this.gameName = JSON.parse(gameNameData);
    }
  }
}