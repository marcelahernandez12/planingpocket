import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputText } from '../../atoms/input/input';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, InputText, ReactiveFormsModule],
  templateUrl: './form-field.html',
  styleUrl: './form-field.scss'
})
export class FormFieldComponent {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() errorMessage: string | null = null;

  @Input() control!: FormControl;
  value = '';
  onChange = (_: any) => {};
  onTouched = () => {};

  // Métodos del ControlValueAccessor
  writeValue(value: any): void {
    this.value = value ?? '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
