import { Component } from '@angular/core';
import { CreateGameForm } from '../../organisms/create-game-form/create-game-form';
import { CommonModule } from '@angular/common'; 
import { JoinGameModalComponent } from '../../organisms/join-game-modal/join-game-modal'; 
import { ModalContainerComponent } from '../../molecules/modal-container/modal-container.component';

@Component({
  selector: 'app-create-game',
  standalone: true,
  imports: [CommonModule, CreateGameForm, JoinGameModalComponent, ModalContainerComponent],
  templateUrl: './create-game.html',
  styleUrl: './create-game.scss'
})
export class CreateGame {
  isModalOpen = false;

  constructor() { }

  
}
