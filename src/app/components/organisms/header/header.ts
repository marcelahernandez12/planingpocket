import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from '../../molecules/user-info/user-info';
import { ButtonComponent } from '../../atoms/button/button';
import { ModalContainerComponent } from '../../molecules/modal-container/modal-container.component';
import { JoinGameModalComponent } from '../join-game-modal/join-game-modal';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, UserInfoComponent, ButtonComponent, ModalContainerComponent, JoinGameModalComponent],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  @Input() gameName: string = '';
  @Input() userName: string = '';
  @Input() userRole: 'jugador' | 'propietario' = 'jugador';
  @Input() displayMode: 'jugador' | 'espectador' = 'jugador';
  @Output() displayModeChange = new EventEmitter<'jugador' | 'espectador'>();
  isInviteModalOpen = false;
  inviteLink = window.location.href;
  isUserSettingsModalOpen = false;

  openUserSettingsModal() {
    this.isUserSettingsModalOpen = true;
  }

  closeUserSettingsModal() {
    this.isUserSettingsModalOpen = false;
  }
  openInviteModal() {
    this.isInviteModalOpen = true;
  }

  closeInviteModal() {
    this.isInviteModalOpen = false;
  }

  copyInviteLink() {
    navigator.clipboard.writeText(this.inviteLink).then(() => {
      console.log('Enlace copiado:', this.inviteLink);
    });
  }
  onDisplayModeChange(mode: 'jugador' | 'espectador') {
    this.displayMode = mode; 
    this.displayModeChange.emit(mode); 
  }
}