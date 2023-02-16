import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedorUsuarioNewPasswordComponent } from './contenedor-usuario-new-password.component';

describe('ContenedorUsuarioNewPasswordComponent', () => {
  let component: ContenedorUsuarioNewPasswordComponent;
  let fixture: ComponentFixture<ContenedorUsuarioNewPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContenedorUsuarioNewPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContenedorUsuarioNewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
