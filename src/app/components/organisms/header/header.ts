import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from '../../molecules/user-info/user-info';
import { ButtonComponent } from '../../atoms/button/button';
import { ModalContainerComponent } from '../../molecules/modal-container/modal-container.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, UserInfoComponent, ButtonComponent, ModalContainerComponent],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  @Input() gameName: string = '';
  @Input() userName: string = '';

  isInviteModalOpen = false;
  inviteLink = window.location.href;

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
}