import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


@Component({
  template: `
    <input
      [id]="'test-id'"
      [type]="'text'"
      [placeholder]="'Test Placeholder'"
      [value]="testValue"
      (input)="onChange($event.target.value)"
      (blur)="onTouched()"
    />
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: TestHostComponent,
      multi: true,
    },
  ],
})
class TestHostComponent implements ControlValueAccessor {
  testValue: string = 'initial value';
  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.testValue = value;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}

describe('Input Component Unit Test', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;
  let inputEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, TestHostComponent ],
     
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input'));

    jest.spyOn(component, 'onChange');
    jest.spyOn(component, 'onTouched');

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should update the value on input change', () => {
    const mockEvent = { target: { value: 'new value' } };
    inputEl.triggerEventHandler('input', mockEvent);

    expect(component.onChange).toHaveBeenCalledWith('new value');
  });

  it('should call onTouched on blur event', () => {
    inputEl.triggerEventHandler('blur', null);

    expect(component.onTouched).toHaveBeenCalled();
  });

  it('should bind the initial value correctly', () => {
    const inputElement = inputEl.nativeElement as HTMLInputElement;
    expect(inputElement.value).toBe('initial value');
  });

  it('should set the id, type, and placeholder attributes', () => {
    const inputElement = inputEl.nativeElement as HTMLInputElement;
    expect(inputElement.id).toBe('test-id');
    expect(inputElement.type).toBe('text');
    expect(inputElement.placeholder).toBe('Test Placeholder');
  });
});