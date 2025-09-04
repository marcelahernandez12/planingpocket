import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../atoms/button/button';
import { FormFieldComponent } from '../../molecules/form-field/form-field';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl
} from '@angular/forms';
import { Router } from '@angular/router'; 
import { FormUtils } from '../../../utils/form-utils';
import { RoleSelectorComponent } from '../../molecules/role-selector/role-selector';
@Component({
  selector: 'app-admin-form',
  standalone: true,
  imports: [CommonModule, FormFieldComponent, ButtonComponent, ReactiveFormsModule, RoleSelectorComponent],
  templateUrl: './admin-form.html'
})
export class AdminForm {
  @Output() formSubmit = new EventEmitter<string>();
  adminForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router) {
    this.adminForm = this.fb.group({
      userName: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
          FormUtils.nameValidator(),
        ],
      ],
      userRole: ['player', Validators.required],
    });
  }
  
  onSubmit() {
    if (this.adminForm.invalid) {
      this.adminForm.markAllAsTouched();
      return;
    }
    const dataUser = this.adminForm.value;

    const userRol = {
      ...dataUser,
      rol: 'propietario'
    }
    localStorage.setItem('usuarioAdmin', JSON.stringify(userRol));
    this.router.navigate(['/game-board']);
  }
  onRoleChange(role: 'player' | 'spectator') {
    this.adminForm.get('userRole')?.setValue(role);
  }
  get adminControl(): FormControl {
    return this.adminForm.get('userName') as FormControl;
  }
}