import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalContainerComponent } from './modal-container.component';
import { By } from '@angular/platform-browser';

describe('ModalContainerComponent (Jest)', () => {
  let component: ModalContainerComponent;
  let fixture: ComponentFixture<ModalContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalContainerComponent], // ✅ standalone
    }).compileComponents();

    fixture = TestBed.createComponent(ModalContainerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render modal when show = true', () => {
    component.show = true;
    fixture.detectChanges();

    const backdrop = fixture.debugElement.query(By.css('.modal-backdrop'));
    const content = fixture.debugElement.query(By.css('.modal-content-wrapper'));

    expect(backdrop).toBeTruthy();
    expect(content).toBeTruthy();
  });

  it('should not render modal when show = false', () => {
    component.show = false;
    fixture.detectChanges();

    const backdrop = fixture.debugElement.query(By.css('.modal-backdrop'));
    const content = fixture.debugElement.query(By.css('.modal-content-wrapper'));

    expect(backdrop).toBeNull();
    expect(content).toBeNull();
  });

  it('should emit close event when backdrop is clicked', () => {
    component.show = true;
    fixture.detectChanges();

    jest.spyOn(component.close, 'emit');
    const backdrop = fixture.debugElement.query(By.css('.modal-backdrop'));
    backdrop.triggerEventHandler('click', null);

    expect(component.close.emit).toHaveBeenCalled();
  });
});
