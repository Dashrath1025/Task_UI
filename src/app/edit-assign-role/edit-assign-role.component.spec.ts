import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssignRoleComponent } from './edit-assign-role.component';

describe('EditAssignRoleComponent', () => {
  let component: EditAssignRoleComponent;
  let fixture: ComponentFixture<EditAssignRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAssignRoleComponent]
    });
    fixture = TestBed.createComponent(EditAssignRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
