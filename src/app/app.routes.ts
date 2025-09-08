import { Routes } from '@angular/router';
import { CreateGame } from './components/pages/create-game-page/create-game';
import { GameBoard } from './components/pages/game-board-page/game-board';
import { AdminPage } from './components/pages/admin-page/admin-page';

export const routes: Routes = [
  { path: '', component: CreateGame },
  { path: 'game-board/:id', component: GameBoard }, 
  { path: 'admin/crear-usuario', component: AdminPage },
  { path: '**', redirectTo: '' }
];
