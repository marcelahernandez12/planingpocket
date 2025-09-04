import { ButtonComponent } from './button';
import { TestBed, ComponentFixture } from '@angular/core/testing';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the btnClick event when the button is clicked', () => {
    // Espía el método 'emit' para confirmar que se llama
    const emitSpy = jest.spyOn(component.btnClick, 'emit');

    // Encuentra el botón y simula un clic
    const buttonElement = fixture.nativeElement.querySelector('button');
    buttonElement.click();

    // Afirma que el evento fue emitido
    expect(emitSpy).toHaveBeenCalled();
  });
});