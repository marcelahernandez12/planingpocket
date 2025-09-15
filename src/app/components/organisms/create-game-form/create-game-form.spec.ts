import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateGameForm } from './create-game-form';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('CreateGameForm', () => {
  let component: CreateGameForm;
  let fixture: ComponentFixture<CreateGameForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateGameForm, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateGameForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the form with gameName control', () => {
    expect(component.gameForm).toBeTruthy();
    expect(component.gameNameControl).toBeTruthy();
  });

  it('should be invalid when gameName is empty', () => {
    component.gameNameControl.setValue('');
    expect(component.gameForm.invalid).toBe(true);
    expect(component.gameNameControl.hasError('required')).toBe(true);
  });

  it('should be invalid when gameName is too short', () => {
    component.gameNameControl.setValue('abc');
    expect(component.gameForm.invalid).toBe(true);
    expect(component.gameNameControl.hasError('minlength')).toBe(true);
  });

  it('should be invalid when gameName is too long', () => {
    component.gameNameControl.setValue('a'.repeat(21));
    expect(component.gameForm.invalid).toBe(true);
    expect(component.gameNameControl.hasError('maxlength')).toBe(true);
  });

  it('should emit formSubmit with gameName when form is valid', () => {
    const spy = jest.spyOn(component.formSubmit, 'emit');
    const testName = 'Sprint 32';
    component.gameNameControl.setValue(testName);

    component.onSubmit();

    expect(spy).toHaveBeenCalledWith(testName);
    expect(JSON.parse(localStorage.getItem('gameName')!)).toBe(testName);
  });

  it('should mark all controls as touched if form is invalid', () => {
    component.gameNameControl.setValue('');
    expect(component.gameNameControl.touched).toBe(false);

    component.onSubmit();

    expect(component.gameNameControl.touched).toBe(true);
  });

  it('should disable the submit button if form is invalid', () => {
    component.gameNameControl.setValue('');
    fixture.detectChanges();

    const buttonDE = fixture.debugElement.query(By.css('app-button'));
    const buttonComp = buttonDE.componentInstance; 
    expect(buttonComp.disabled).toBe(true);
    });

  it('should enable the submit button if form is valid', () => {
    component.gameNameControl.setValue('Sprint 32');
    fixture.detectChanges();

    const buttonDE = fixture.debugElement.query(By.css('app-button'));
    const buttonComp = buttonDE.componentInstance;
    expect(buttonComp.disabled).toBe(false);
    });
});
