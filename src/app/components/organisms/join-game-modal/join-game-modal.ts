import { Component, EventEmitter, Output } from '@angular/core';
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

  constructor(private fb: FormBuilder, private gameService: Game, private router: Router) {
    this.joinForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      userRole: ['player', Validators.required],
    });
  }

  onRoleChange(role: 'player' | 'spectator') {
    this.joinForm.get('userRole')?.setValue(role);
  }

   onJoin() {
    if (this.joinForm.valid) {
      this.gameService.createAndJoinGame(this.joinForm.value.userName, this.joinForm.value.userRole)
        .subscribe(response => {
          console.log('Respuesta del servidor (mock):', response);
          if (response.success) {
            this.close.emit();
            this.router.navigate(['/game-board', response.gameId]);
          }
        });
    } else {
      console.log('Formulario inválido');
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