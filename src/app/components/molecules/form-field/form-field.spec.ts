import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormFieldComponent } from './form-field';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('FormFieldComponent (Jest)', () => {
  let component: FormFieldComponent;
  let fixture: ComponentFixture<FormFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormFieldComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(FormFieldComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render label with provided text', () => {
    component.label = 'Username';
    component.id = 'username';
    component.control = new FormControl('');
    fixture.detectChanges();

    const labelEl = fixture.debugElement.query(By.css('label')).nativeElement;
    expect(labelEl.textContent).toContain('Username');
    expect(labelEl.getAttribute('for')).toBe('username');
  });

  it('should pass control to input', () => {
    component.control = new FormControl('JohnDoe');
    fixture.detectChanges();

    const inputEl = fixture.debugElement.query(By.css('app-input'));
    expect(inputEl).toBeTruthy();
  });

  it('should render error message if provided', () => {
    component.errorMessage = 'This field is required';
    component.control = new FormControl('');
    fixture.detectChanges();

    const errorEl = fixture.debugElement.query(By.css('.error-message')).nativeElement;
    expect(errorEl.textContent).toContain('This field is required');
  });

  it('should not render error message if null', () => {
    component.errorMessage = null;
    component.control = new FormControl('');
    fixture.detectChanges();

    const errorEl = fixture.debugElement.query(By.css('.error-message'));
    expect(errorEl).toBeNull();
  });
});
