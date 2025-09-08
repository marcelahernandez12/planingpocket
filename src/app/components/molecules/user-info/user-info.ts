import { Component, Input } from '@angular/core';
import { CommonModule, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule, UpperCasePipe],
  templateUrl: './user-info.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent {
  @Input() userName: string = '';
}