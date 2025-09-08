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
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'app-admin-form',
  standalone: true,
  imports: [CommonModule, FormFieldComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './admin-form.html'
})
export class AdminForm {
  @Output() formSubmit = new EventEmitter<string>();
  gameForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.gameForm = this.fb.group({
      gameName: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
          FormUtils.nameValidator(),
        ],
      ]
    });
  }
  
  

  onSubmit() {
    if (this.gameForm.valid) {
      localStorage.setItem('gameName', JSON.stringify(this.gameForm.value.gameName));
      this.formSubmit.emit(this.gameForm.value.gameName);
      return;
    } else {
      this.gameForm.markAllAsTouched();
    }
  }

  get gameNameControl(): FormControl {
    return this.gameForm.get('gameName') as FormControl;
  }
}