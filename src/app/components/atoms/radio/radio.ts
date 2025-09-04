import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-radio-input',
  standalone: true,
  imports: [],
  templateUrl: './radio.html',
  styleUrl: './radio.scss'
})
export class RadioInputComponent {
  @Input() id: string = '';
  @Input() name: string = ''; 
  @Input() value: string = '';
  @Input() checked: boolean = false;

  @Output() selected = new EventEmitter<string>();

  onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.selected.emit(target.value);
  }
}