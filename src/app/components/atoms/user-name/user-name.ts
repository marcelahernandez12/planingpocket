import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-name',
  templateUrl: './user-name.html',
  styleUrls: ['./user-name.scss']
})
export class User {
  @Input() name: string = '';
}
