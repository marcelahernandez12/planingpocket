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
  @Input() selectedRole: 'jugador' | 'espectador' = 'jugador';
  @Output() roleChange = new EventEmitter<'jugador' | 'espectador'>();

  onRoleChange(role: 'jugador' | 'espectador') {
    console.log('Hijo emite:', role); 
    this.selectedRole = role;
    this.roleChange.emit(this.selectedRole);
  }
}