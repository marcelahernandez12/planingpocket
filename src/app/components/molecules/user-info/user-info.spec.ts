import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { UpperCasePipe } from '@angular/common';
import { UserInfoComponent } from './user-info';

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInfoComponent], 
      providers: [UpperCasePipe],
    }).compileComponents();

    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the first letter of userName in uppercase', () => {
    component.userName = 'marcela';
    fixture.detectChanges();

    const span = fixture.debugElement.query(By.css('.initials')).nativeElement;
    expect(span.textContent?.trim()).toBe('M');
  });

  it('should handle empty userName gracefully', () => {
    component.userName = '';
    fixture.detectChanges();

    const span = fixture.debugElement.query(By.css('.initials')).nativeElement;
    expect(span.textContent?.trim()).toBe('') 
  });
});
