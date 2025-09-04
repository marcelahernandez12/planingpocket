import { Routes } from '@angular/router';
import { CreateGame } from './components/pages/create-game/create-game';
import { GameBoard } from './components/pages/game-board/game-board';
export const routes: Routes = [
  { path: '', component: CreateGame },
  { path: 'game-board/:id', component: GameBoard }, 
  { path: '**', redirectTo: '' }
];
