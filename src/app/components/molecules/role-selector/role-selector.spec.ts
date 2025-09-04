import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Component, DebugElement } from '@angular/core';
import { RadioInputComponent } from '../../atoms/radio/radio';


// Un componente de prueba para alojar y probar el selector de rol
@Component({
  standalone: true,
  imports: [RadioInputComponent],
  template: `
    <div class="role-selector">
      <div class="options-container">
        <app-radio-input
          id="player"
          name="role"
          value="player"
          [checked]="selectedRole === 'player'"
          (selected)="onRoleChange('player')"
        >
          Jugador
        </app-radio-input>

        <app-radio-input
          id="spectator"
          name="role"
          value="spectator"
          [checked]="selectedRole === 'spectator'"
          (selected)="onRoleChange('spectator')"
        >
          Espectador
        </app-radio-input>
      </div>
    </div>
  `,
})
class TestHostComponent {
  selectedRole: string = 'player';

  onRoleChange(role: string) {
    this.selectedRole = role;
  }
}

describe('RoleSelectorComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let playerRadio: DebugElement;
  let spectatorRadio: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    
    
    jest.spyOn(hostComponent, 'onRoleChange');
    
    fixture.detectChanges();

    playerRadio = fixture.debugElement.query(By.css('#player'));
    spectatorRadio = fixture.debugElement.query(By.css('#spectator'));
  });

  it('debe crear el componente y tener el rol de jugador seleccionado por defecto', () => {
    expect(playerRadio).toBeTruthy();
    expect(spectatorRadio).toBeTruthy();
    
    expect(playerRadio.componentInstance.checked).toBe(true);
    expect(spectatorRadio.componentInstance.checked).toBe(false);
  });

  it('debe cambiar el rol a espectador cuando se selecciona esa opción', () => {
    spectatorRadio.triggerEventHandler('selected', 'spectator');
    
    fixture.detectChanges(); // Actualizar la vista

    expect(hostComponent.onRoleChange).toHaveBeenCalledWith('spectator');
    
    expect(hostComponent.selectedRole).toBe('spectator');
    
    expect(playerRadio.componentInstance.checked).toBe(false);
    expect(spectatorRadio.componentInstance.checked).toBe(true);
  });
});