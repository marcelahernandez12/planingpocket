import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RadioInputComponent } from './radio';

// Componente de prueba para alojar RadioInputComponent
@Component({
  standalone: true,
  imports: [RadioInputComponent, FormsModule],
  template: `
    <app-radio-input
      [id]="'radio1'"
      [name]="'group1'"
      [value]="'option1'"
      [checked]="false"
      (selected)="onRadioChange($event)"
    >
      Opción 1
    </app-radio-input>
  `,
})
class TestHostComponent {
  onRadioChange(event: any) {}
}

describe('RadioInputComponent (en host)', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let radioEl: DebugElement;
  let labelEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();

    radioEl = fixture.debugElement.query(By.css('input[type="radio"]'));
    labelEl = fixture.debugElement.query(By.css('label'));

    jest.spyOn(hostComponent, 'onRadioChange');
  });

  it('debe crear el input y el label', () => {
    expect(radioEl).toBeTruthy();
    expect(labelEl).toBeTruthy();
  });

  it('debe enlazar correctamente los atributos', () => {
    const radioElement = radioEl.nativeElement as HTMLInputElement;

    expect(radioElement.id).toBe('radio1');
    expect(radioElement.name).toBe('group1');
    expect(radioElement.value).toBe('option1');
    expect(radioElement.checked).toBe(false);
  });

  it('debe proyectar el contenido dentro del label', () => {
    const labelElement = labelEl.nativeElement as HTMLLabelElement;
    expect(labelElement.textContent?.trim()).toBe('Opción 1');
  });

  
});
