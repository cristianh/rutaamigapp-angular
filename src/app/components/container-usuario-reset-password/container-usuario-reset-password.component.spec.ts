import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerUsuarioResetPasswordComponent } from './container-usuario-reset-password.component';

describe('ContainerUsuarioResetPasswordComponent', () => {
  let component: ContainerUsuarioResetPasswordComponent;
  let fixture: ComponentFixture<ContainerUsuarioResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerUsuarioResetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerUsuarioResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
