import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss'
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button'; 
  @Output() btnClick = new EventEmitter<void>();

  onClick(): void {
    this.btnClick.emit();
  }
}