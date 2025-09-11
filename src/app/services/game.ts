import { Injectable } from '@angular/core';
import { Observable, of, Subject  } from 'rxjs';
import { tap } from 'rxjs/operators'; 
import { Player } from '../utils/interfaces/interfaces';
export interface UserData {
  name: string;
  role: 'jugador' | 'propietario';
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

  private cardSelectedSource = new Subject<{ userName: string; card: number | string }>();
  private revealed = false;
  cardSelected$ = this.cardSelectedSource.asObservable();
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

  getUserRole(): 'jugador' | 'propietario' {
    const session = this.getSessionData();
    return session?.user.role ?? 'jugador';
  }
  getAvailableCards(): (number | string)[] {
    return [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, '?'];
  }
  notifyCardSelection(userName: string, card: number | string) {
    this.cardSelectedSource.next({ userName, card });
  }
  revealCards() {
    this.revealed = true;
  }
  areCardsRevealed(): boolean {
    return this.revealed;
  }

  getVoteSummary(players: Player[]): { counts: Map<number|string, number>, average: number } {
    const counts = new Map<number|string, number>();
    let total = 0;
    let validVotes = 0;

    players.forEach(player => {
      if (player.displayMode === 'jugador' && player.cardSelected !== null) {
        counts.set(player.cardSelected, (counts.get(player.cardSelected) || 0) + 1);
        if (typeof player.cardSelected === 'number') {
          total += player.cardSelected;
          validVotes++;
        }
      }
    });

    const average = validVotes > 0 ? total / validVotes : 0;
    return { counts, average };
  }

  resetGame(players: Player[]): Player[] {
    this.revealed = false;
    return players.map(player => ({
      ...player,
      cardSelected: null
    }));
  }
}