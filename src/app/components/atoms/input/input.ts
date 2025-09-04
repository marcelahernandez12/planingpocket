import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'app-input',
  standalone: true,
  styleUrl: './input.scss',
  templateUrl:'./input.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputText),
      multi: true,
    },
  ],
})
export class InputText implements ControlValueAccessor {
  @Input() id = '';
  @Input() type = 'text';
  @Input() placeholder = '';

  value = '';
  onChange = (_: any) => {};
  onTouched = () => {};
  onInput(event: Event): void {
    const newValue = (event.target as HTMLInputElement).value;
    this.value = newValue;     // 👈 actualiza lo que se muestra
    this.onChange(newValue);   // 👈 notifica al FormControl
  }
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
