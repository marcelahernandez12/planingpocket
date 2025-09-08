export interface Player {
  name: string;
  initials: string;
  role: 'jugador' | 'espectador';
  cardSelected: number | null;
}