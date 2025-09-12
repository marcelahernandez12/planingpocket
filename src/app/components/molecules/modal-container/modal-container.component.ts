import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss']
})
export class ModalContainerComponent {
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<void>();
  @Input() modalClass = '';
  onClose() {
    this.close.emit();
  }
}