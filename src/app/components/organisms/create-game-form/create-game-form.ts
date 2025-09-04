import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../atoms/button/button';
import { FormFieldComponent } from '../../molecules/form-field/form-field';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidationErrors,
  AbstractControl,
  FormControl
} from '@angular/forms';
@Component({
  selector: 'app-create-game-form',
  standalone: true,
  imports: [CommonModule, FormFieldComponent, ButtonComponent, ReactiveFormsModule],
  templateUrl: './create-game-form.html',
  styleUrls: ['./create-game-form.scss']
})
export class CreateGameForm {
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
          this.nameValidator(),
        ],
      ],
    });
  }
  
  nameValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value: string = control.value || '';
      const specialChars = /[_*#\/-]/;
      const numbers = value.match(/\d/g) || [];
      const hasOnlyNumbers = /^\d+$/.test(value);

      if (specialChars.test(value)) {
        return { specialChars: true };
      }
      if (numbers.length > 3) {
        return { maxNumbers: true };
      }
      if (hasOnlyNumbers) {
        return { onlyNumbers: true };
      }
      return null;
    };
  }

  onSubmit() {
    console.log("entro")
    if (this.gameForm.valid) {
      this.formSubmit.emit(this.gameForm.value.gameName);
    } else {
      console.log('Formulario de partida inválido.');
      this.gameForm.markAllAsTouched();
    }
  }

  get gameNameControl(): FormControl {
    return this.gameForm.get('gameName') as FormControl;
  }
}