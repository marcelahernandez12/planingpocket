import { Component } from '@angular/core';

import { CommonModule } from '@angular/common'; 
import { AdminForm } from '../../organisms/admin-form/admin-form';


@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [CommonModule, AdminForm],
  templateUrl: './admin-page.html'
})
export class AdminPage {
  
}   
