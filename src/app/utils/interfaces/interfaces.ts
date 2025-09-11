export interface Player {
  name: string;
  initials: string;
  displayMode: 'jugador' | 'espectador';
  role: 'propietario' | 'jugador';
  cardSelected: string | number | null;
}

export interface Card {
  value: number;
}