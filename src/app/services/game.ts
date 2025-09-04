import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; 
@Injectable({
  providedIn: 'root'
})
export class Game {
  constructor() { }
  createAndJoinGame(userName: string, userRole: 'player' | 'spectator'): Observable<any> {
    console.log(`[MOCK] Creando partida para ${userName} como ${userRole}`);

    const mockResponse = {
      success: true,
      gameId: 'partida-' + Math.random().toString(36).substring(2, 9), 
      message: 'Partida creada y unida con éxito.',
      userData: { name: userName, role: userRole }
    };
    localStorage.setItem('gameData', JSON.stringify(mockResponse.userData));
    localStorage.setItem('gameId', mockResponse.gameId);
    return of(mockResponse);
  }
}
