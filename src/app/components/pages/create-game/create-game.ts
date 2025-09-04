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
 // 1. Crea una variable pública para el modal
  isModalOpen = false;

  constructor() { }

  openModal(gameName: string) {
    console.log('Nombre de la partida:', gameName);
    // 2. Cambia el valor de la variable a true
    this.isModalOpen = true; 
  }
}
