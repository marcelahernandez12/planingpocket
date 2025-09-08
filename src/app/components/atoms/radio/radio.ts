import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-radio-input',
  standalone: true,
  imports: [],
  templateUrl: './radio.html',
  styleUrl: './radio.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioInputComponent),
      multi: true,
    },
  ],
})
export class RadioInputComponent implements ControlValueAccessor{
  @Input() id = '';
  @Input() name = '';
  @Input() value!: string;
  @Input() checked: boolean = false; 
  @Output() selected = new EventEmitter<string>();
  innerValue: string | null = null;
  onChange = (_: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.innerValue = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  handleChange(event: Event) {
    const val = (event.target as HTMLInputElement).value;
    this.innerValue = val;
    this.onChange(val);
    this.onTouched();
    this.selected.emit(val);   
  }
}