import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayerCardComponent } from './player-card';
import { By } from '@angular/platform-browser';

describe('PlayerCardComponent (Jest)', () => {
  let component: PlayerCardComponent;
  let fixture: ComponentFixture<PlayerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerCardComponent], // ✅ standalone
    }).compileComponents();

    fixture = TestBed.createComponent(PlayerCardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render user name', () => {
    component.userName = 'Carlos';
    fixture.detectChanges();

    const userNameEl = fixture.debugElement.query(By.css('app-user-name'));
    expect(userNameEl).toBeTruthy();
    expect(userNameEl.componentInstance.name).toBe('Carlos');
  });

  it('should have "espectador" class when role is espectador', () => {
    component.displayMode = 'espectador';
    fixture.detectChanges();

    const cardEl = fixture.debugElement.query(By.css('.player-card')).nativeElement;
    expect(cardEl.classList).toContain('spectator-card');
  });

  it('should have "empty" class when jugador without cardSelected', () => {
    component.displayMode = 'jugador';
    component.cardSelected = null;
    fixture.detectChanges();

    const cardEl = fixture.debugElement.query(By.css('.player-card')).nativeElement;
    expect(cardEl.classList).toContain('empty');
  });

  it('should have "voted" class when jugador with cardSelected', () => {
    component.displayMode = 'jugador';
    component.cardSelected = 5;
    fixture.detectChanges();

    const cardEl = fixture.debugElement.query(By.css('.player-card')).nativeElement;
    expect(cardEl.classList).toContain('voted');
  });
});
