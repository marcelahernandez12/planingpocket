import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
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
export class JoinGameModalComponent implements OnChanges{
  @Output() formSubmit = new EventEmitter<string>();
  joinForm: FormGroup;
  @Output() close = new EventEmitter<void>();
  @Input() userName: string = '';
  @Input() userRole: 'jugador' | 'administrador' = 'jugador';
  @Input() displayMode: 'jugador' | 'espectador' = 'jugador';
  @Output() displayModeChange = new EventEmitter<'jugador' | 'espectador'>();
  @Input() isOwner: boolean = false;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['displayMode'] && this.joinForm) {
      this.joinForm.get('displayMode')?.setValue(this.displayMode);
    }
    if (changes['userName'] && this.joinForm) {
      this.joinForm.get('userName')?.setValue(this.userName);
    }
  }
  constructor(
    private fb: FormBuilder, 
    private gameService: Game, 
    private router: Router) {
    this.joinForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      displayMode: [this.displayMode, Validators.required],
    });
  }

  onRoleChange(displayMode: 'jugador' | 'espectador') {
  this.joinForm.get('displayMode')?.setValue(displayMode);
  this.displayModeChange.emit(displayMode); 
}

 onJoin() {
  if (this.joinForm.valid) {
    const userName = this.joinForm.value.userName;
    const displayMode = this.joinForm.value.displayMode;
    const sessionData = JSON.parse(localStorage.getItem('sessionData') || 'null');
    if (sessionData?.user) {
      const updatedSession = {
        ...sessionData,
        user: {
          ...sessionData.user,
          name: userName,
          displayMode: displayMode,
          role: sessionData.user.role
        }
      };

      localStorage.setItem('sessionData', JSON.stringify(updatedSession));
      this.close.emit();
    } else {
      const gameName = JSON.parse(localStorage.getItem('gameName') || '""');
      this.gameService.createAndJoinGame(gameName, userName, displayMode, this.userRole, this.isOwner )
        .subscribe(response => {
          if (response.success) {
            this.close.emit();
            const normalizedId = decodeURIComponent(response.gameId)
              .trim()
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^a-z0-9\-]/g, '');
            this.router.navigate(['/game-board', normalizedId]);
          }
        });
    }
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