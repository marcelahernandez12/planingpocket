import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioInputComponent } from '../../atoms/radio/radio';

@Component({
  selector: 'app-role-selector',
  standalone: true,
  imports: [CommonModule, RadioInputComponent],
  templateUrl: './role-selector.html',
  styleUrl: './role-selector.scss'
})
export class RoleSelectorComponent {
  @Input() selectedRole: 'player' | 'spectator' = 'player';
  @Output() roleChange = new EventEmitter<'player' | 'spectator'>();

  onRoleChange(role: 'player' | 'spectator') {
    this.selectedRole = role;
    this.roleChange.emit(this.selectedRole);
  }
}