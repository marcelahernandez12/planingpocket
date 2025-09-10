import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardSelectorComponent } from './card-selector.component';
import { CardButtonComponent } from '../../atoms/card-button/card-button.component';
import { By } from '@angular/platform-browser';

describe('CardSelectorComponent', () => {
  let component: CardSelectorComponent;
  let fixture: ComponentFixture<CardSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSelectorComponent, CardButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardSelectorComponent);
    component = fixture.componentInstance;
  });

  it('debería renderizar el título', () => {
    fixture.detectChanges();
    const title = fixture.nativeElement.querySelector('.title');
    expect(title.textContent).toContain('Elige una carta 👇');
  });

  it('debería mostrar las cartas cuando existen', () => {
    component.cards = [1, 2, 3];
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.directive(CardButtonComponent));
    expect(buttons.length).toBe(3);
  });

  it('debería mostrar mensaje cuando no hay cartas', () => {
    component.cards = [];
    fixture.detectChanges();

    const noCardsMsg = fixture.nativeElement.querySelector('.no-cards');
    expect(noCardsMsg.textContent).toContain('No hay cartas registradas');
  });

  it('debería emitir el evento cardSelected al seleccionar una carta válida', () => {
    component.cards = [1, 2, 3];
    fixture.detectChanges();

    jest.spyOn(component.cardSelected, 'emit');

    component.onSelect(2);

    expect(component.cardSelected.emit).toHaveBeenCalledWith(2);
  });

  it('no debería emitir evento si la carta no existe en el arreglo', () => {
    component.cards = [1, 2, 3];
    fixture.detectChanges();

    jest.spyOn(component.cardSelected, 'emit');

    component.onSelect(99);

    expect(component.cardSelected.emit).not.toHaveBeenCalled();
  });
}
