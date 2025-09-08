import { ComponentFixture, TestBed } from '@angular/core/testing';
import { User } from './user-name'; 
import { By } from '@angular/platform-browser';

describe('User Component (Jest)', () => {
  let component: User;
  let fixture: ComponentFixture<User>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [User], 
    }).compileComponents();

    fixture = TestBed.createComponent(User);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the name inside <p>', () => {
    component.name = 'Carlos';
    fixture.detectChanges();

    const pEl = fixture.debugElement.query(By.css('.user-name')).nativeElement;
    expect(pEl.textContent).toBe('Carlos');
  });
});
