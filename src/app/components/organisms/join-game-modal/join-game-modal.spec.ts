import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { JoinGameModalComponent } from './join-game-modal';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '../../atoms/button/button';
import { FormFieldComponent } from '../../molecules/form-field/form-field';
import { RoleSelectorComponent } from '../../molecules/role-selector/role-selector';
import { Game } from '../../../services/game';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('JoinGameModalComponent', () => {
  let component: JoinGameModalComponent;
  let fixture: ComponentFixture<JoinGameModalComponent>;
  let gameServiceMock: Partial<Game>;
  let routerMock: Partial<Router>;

  beforeEach(async () => {
    gameServiceMock = {
      createAndJoinGame: jest.fn().mockReturnValue(of({ success: true, gameId: '123' })),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [JoinGameModalComponent, ReactiveFormsModule, FormFieldComponent, RoleSelectorComponent, ButtonComponent],
      providers: [
        { provide: Game, useValue: gameServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(JoinGameModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the submit button if form is invalid', () => {
    component.userNameControl.setValue('');
    fixture.detectChanges();

    const buttonDE = fixture.debugElement.query(By.css('app-button'));
    const buttonComp = buttonDE.componentInstance as any;
    expect(buttonComp.disabled).toBe(true);
  });

  it('should enable the submit button if form is valid', () => {
    component.userNameControl.setValue('Jugador 1');
    fixture.detectChanges();

    const buttonDE = fixture.debugElement.query(By.css('app-button'));
    const buttonComp = buttonDE.componentInstance as any;
    expect(buttonComp.disabled).toBe(false);
  });

  it('should emit displayModeChange when role changes', () => {
    const spy = jest.spyOn(component.displayModeChange, 'emit');
    component.onRoleChange('espectador');
    expect(spy).toHaveBeenCalledWith('espectador');
  });

  it('should emit close when form is valid and sessionData exists', fakeAsync(() => {
    const spyClose = jest.spyOn(component.close, 'emit');
    localStorage.setItem('sessionData', JSON.stringify({ user: { name: 'Old', role: 'jugador', displayMode: 'jugador' }}));
    
    component.userNameControl.setValue('NuevoNombre');
    fixture.detectChanges();

    component.onJoin();
    tick();

    expect(spyClose).toHaveBeenCalled();
    const sessionData = JSON.parse(localStorage.getItem('sessionData')!);
    expect(sessionData.user.name).toBe('NuevoNombre');
  }));

  it('should call gameService.createAndJoinGame when no sessionData', fakeAsync(() => {
    const spyClose = jest.spyOn(component.close, 'emit');
    localStorage.removeItem('sessionData');
    localStorage.setItem('gameName', JSON.stringify('MiJuego'));

    component.userNameControl.setValue('JugadorTest');
    fixture.detectChanges();

    component.onJoin();
    tick();

    expect(gameServiceMock.createAndJoinGame).toHaveBeenCalledWith('MiJuego', 'JugadorTest', component.displayMode, component.userRole, component.isOwner);
    expect(spyClose).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/game-board', '123']);
  }));

  it('should mark all controls as touched if form is invalid', () => {
    component.userNameControl.setValue('');
    const spyMarkAll = jest.spyOn(component.joinForm, 'markAllAsTouched');
    component.onJoin();
    expect(spyMarkAll).toHaveBeenCalled();
  });
});
