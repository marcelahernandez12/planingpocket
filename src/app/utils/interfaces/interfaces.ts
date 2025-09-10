export interface Player {
  name: string;
  initials: string;
  role: 'jugador' | 'espectador';
  cardSelected: string | number | null;
}

export interface Card {
  value: number;
}