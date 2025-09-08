import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.html',
  styleUrl: './button.scss'
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button'; 
  @Output() btnClick = new EventEmitter<void>();
  @Input() className: string = '';
  onClick(): void {
    this.btnClick.emit();
  }
}