import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators'; 
export interface UserData {
  name: string;
  role: 'jugador' | 'espectador';
  displayMode: 'jugador' | 'espectador';
}

export interface SessionData {
  gameId: string;
  user: UserData;
}
@Injectable({
  providedIn: 'root'
})
export class Game {
  constructor() { }

  createAndJoinGame(
    gameName: string, 
    userName: string, 
    displayMode:string, 
    userRole: string): Observable<any> {
    
    const userData = {
      name: userName,
      displayMode:displayMode,
      role: userRole,
    };

    const sessionData = {
      gameId: gameName,
      user: userData
    };

    const mockResponse = { success: true, gameId: gameName };

    return of(mockResponse).pipe(
      tap(() => {
        localStorage.setItem('sessionData', JSON.stringify(sessionData));
      })
    );
  }
  getSessionData(): SessionData | null {
    const data = localStorage.getItem('sessionData');
    return data ? JSON.parse(data) : null;
  }
  getUserMode(): 'jugador' | 'espectador' {
    const session = this.getSessionData();
    return session?.user.displayMode ?? 'jugador';
  }
}