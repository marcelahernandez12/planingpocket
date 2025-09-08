import { Component } from '@angular/core';

import { CommonModule } from '@angular/common'; 
import { AdminForm } from '../../organisms/admin-form/admin-form';
import { ModalContainerComponent } from '../../molecules/modal-container/modal-container.component';
import { JoinGameModalComponent } from '../../organisms/join-game-modal/join-game-modal';


@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, AdminForm, ModalContainerComponent, JoinGameModalComponent],
  templateUrl: './admin-page.html'
})
export class AdminPage {
  isModalOpen = false;

  constructor() { }
}   
