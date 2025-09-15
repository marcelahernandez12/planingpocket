import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BoardComponent } from './board';
import { Game } from '../../../services/game';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let mockGameService: Partial<Game>;

  beforeEach(async () => {
    mockGameService = {
      getUserMode: jest.fn(() => 'jugador'),
      getUserRole: jest.fn(() => 'administrador'),
      getAvailableCards: jest.fn(() => [1, 2, 3, 5, 8]),
      cardSelected$: of(),
      revealCards: jest.fn(),
      getVoteSummary: jest.fn(() => ({ counts: new Map([[1, 3]]), average: 3 })),
      areCardsRevealed: jest.fn(() => false),
      resetGame: jest.fn((users) => users.map(u => ({ ...u, cardSelected: null }))),
      notifyCardSelection: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [BoardComponent],
      providers: [
        { provide: Game, useValue: mockGameService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;

    // Preparar datos para que todos hayan votado
    component.userRole = 'administrador';
    component.loadingReveal = false;
    component.cardsRevealed = false;
    component.currentUser = { name: 'Admin', initials: 'A', role: 'administrador', displayMode: 'jugador', cardSelected: 1, isOwner: true };
    component.connectedUsers = [
      { name: 'Oscar', initials: 'O', displayMode: 'jugador', role: 'jugador', cardSelected: 2, isOwner: false },
      { name: 'David', initials: 'D', displayMode: 'jugador', role: 'jugador', cardSelected: 3, isOwner: false }
    ];

    fixture.detectChanges();
  });

  it('should show "Revelar cartas" button when all players have voted', async () => {
    component.userRole = 'administrador';
    component.cardsRevealed = false;
    component.loadingReveal = false;

    component.currentUser = {
        name: 'Admin',
        initials: 'A',
        role: 'administrador',
        displayMode: 'jugador',
        cardSelected: 1,
        isOwner: true
    };

    component.connectedUsers = [
        { name: 'Oscar', initials: 'O', displayMode: 'jugador', role: 'jugador', cardSelected: 2, isOwner: false },
        { name: 'David', initials: 'D', displayMode: 'jugador', role: 'jugador', cardSelected: 3, isOwner: false }
    ];

    fixture.detectChanges();
    await fixture.whenStable(); // espera que Angular renderice el botón

    const revealBtn = fixture.debugElement.query(By.css('.reveal-cards'));
    expect(revealBtn).toBeTruthy(); // ahora sí debería encontrarlo
    });


  

});
