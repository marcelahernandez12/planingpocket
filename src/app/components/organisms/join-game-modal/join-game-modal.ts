import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from '../../molecules/form-field/form-field';
import { RoleSelectorComponent } from '../../molecules/role-selector/role-selector';
import { ButtonComponent } from '../../atoms/button/button';
import { Game } from '../../../services/game';
import { Router } from '@angular/router'; 
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-join-game-modal',
  standalone: true,
  imports: [CommonModule, FormFieldComponent, RoleSelectorComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './join-game-modal.html',
  styleUrl: './join-game-modal.scss'
})
export class JoinGameModalComponent {
  @Output() formSubmit = new EventEmitter<string>();
  joinForm: FormGroup;
  @Output() close = new EventEmitter<void>();
  @Input() userRole: string = 'jugador';
  constructor(
    private fb: FormBuilder, 
    private gameService: Game, 
    private router: Router) {
    this.joinForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      displayMode: ['jugador', Validators.required],
    });
  }

  onRoleChange(role: 'jugador' | 'espectador') {
    this.joinForm.get('displayMode')?.setValue(role);
    console.log('Padre recibió:', role);
    console.log('FormControl ahora:', this.joinForm.get('displayMode')?.value);
  }

  onJoin() {
    if (this.joinForm.valid) {
      const userName = this.joinForm.value.userName;
      const displayMode = this.joinForm.value.displayMode;
      const gameName = JSON.parse(localStorage.getItem('gameName') || '""');
       this.gameService.createAndJoinGame(gameName, userName, displayMode, this.userRole)
        .subscribe(response => {
          if (response.success) {
            this.close.emit();
            this.router.navigate(['/game-board', response.gameId]);
          }
        });
    
    } else {
      this.joinForm.markAllAsTouched();
    }
  }

  closeModal() {
    this.close.emit();
  }

  get userNameControl(): FormControl {
    return this.joinForm.get('userName') as FormControl;
  }
  
}