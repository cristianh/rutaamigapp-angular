import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioNewPasswordComponent } from './usuario-new-password.component';

describe('UsuarioNewPasswordComponent', () => {
  let component: UsuarioNewPasswordComponent;
  let fixture: ComponentFixture<UsuarioNewPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioNewPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioNewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
