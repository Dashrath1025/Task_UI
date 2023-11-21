import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDialogComponentComponent } from './profile-dialog-component.component';

describe('ProfileDialogComponentComponent', () => {
  let component: ProfileDialogComponentComponent;
  let fixture: ComponentFixture<ProfileDialogComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileDialogComponentComponent]
    });
    fixture = TestBed.createComponent(ProfileDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
