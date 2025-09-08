import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Avatar } from './avatar';
import { By } from '@angular/platform-browser';

describe('Avatar Component (Jest)', () => {
  let component: Avatar;
  let fixture: ComponentFixture<Avatar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Avatar], 
    }).compileComponents();

    fixture = TestBed.createComponent(Avatar);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render initials', () => {
    component.initials = 'AB';
    fixture.detectChanges();

    const spanEl = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(spanEl.textContent).toBe('AB');
  });
});
