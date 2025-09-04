import { Component } from '@angular/core';
import { CreateGameForm } from '../../organisms/create-game-form/create-game-form';
import { CommonModule } from '@angular/common'; 
import { JoinGameModalComponent } from '../../organisms/join-game-modal/join-game-modal'; 

@Component({
  selector: 'app-create-game',
  standalone: true,
  imports: [CommonModule, CreateGameForm, JoinGameModalComponent],
  templateUrl: './create-game.html',
  styleUrl: './create-game.scss'
})
export class CreateGame {
  isModalOpen = false;

  constructor() { }

  openModal(gameName: string) {
    this.isModalOpen = true; 
  }
}
