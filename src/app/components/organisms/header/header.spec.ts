import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header';
import { By } from '@angular/platform-browser';
import { UserInfoComponent } from '../../molecules/user-info/user-info';
import { ButtonComponent } from '../../atoms/button/button';
import { ModalContainerComponent } from '../../molecules/modal-container/modal-container.component';

describe('HeaderComponent (with Jest)', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, UserInfoComponent, ButtonComponent, ModalContainerComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    component.gameName = 'Partida de prueba';
    component.userName = 'Carlos';
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the game name in the header', () => {
    const titleEl: HTMLElement = fixture.nativeElement.querySelector('.game-title');
    expect(titleEl.textContent).toContain('Partida de prueba');
  });

  it('should pass userName to app-user-info', () => {
    const userInfoDebugEl = fixture.debugElement.query(By.directive(UserInfoComponent));
    expect(userInfoDebugEl.componentInstance.userName).toBe('Carlos');
  });

 

  it('should close modal when closeInviteModal() is called', () => {
    component.isInviteModalOpen = true;
    component.closeInviteModal();
    fixture.detectChanges();
    expect(component.isInviteModalOpen).toBe(false);
  });

  it('should copy invite link when copyInviteLink is called', () => {
  const mockClipboard = {
    writeText: jest.fn().mockResolvedValue(undefined)
  };
  (window.navigator as any).clipboard = mockClipboard;

  component.inviteLink = 'http://localhost/game/123';
  component.copyInviteLink();

  expect(mockClipboard.writeText).toHaveBeenCalledWith('http://localhost/game/123');
});
});
