export interface Player {
  name: string;
  initials: string;
  displayMode: 'jugador' | 'espectador';
  role: 'administrador' | 'jugador';
  cardSelected: string | number | null;
  isOwner: boolean
}

export interface Card {
  value: number;
}