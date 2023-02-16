import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioResetPasswordComponent } from './usuario-reset-password.component';

describe('UsuarioResetPasswordComponent', () => {
  let component: UsuarioResetPasswordComponent;
  let fixture: ComponentFixture<UsuarioResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioResetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
