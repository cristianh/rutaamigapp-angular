import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContainerRegisterComponent } from './components/container-register/container-register.component'
import { ContainerLoginComponent } from './components/container-login/container-login.component'

import { LoginComponent } from './components/login/login.component';
import { PrincipalContainerComponent } from './components/principal-container/principal-container.component';
import { ContainerMapComponent } from './components/container-map/container-map.component';
import { ContainerUsuarioComponent } from './components/container-usuario/container-usuario.component';
import { ContainerRegisterUsuarioComponent } from './components/container-register-usuario/container-register-usuario.component';
import { ContainerUsuarioResetPasswordComponent } from './components/container-usuario-reset-password/container-usuario-reset-password.component';
import { ContenedorUsuarioNewPasswordComponent } from './components/contenedor-usuario-new-password/contenedor-usuario-new-password.component';
import { ContainerMapaComponent } from './components/container-mapa/container-mapa.component';
import { UsuarioNewPasswordComponent } from './components/usuario-new-password/usuario-new-password.component';
const routes: Routes = [
  { path: '', component: ContainerRegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'mapa', component: ContainerMapaComponent },
  { path: 'reset-password', component: ContainerUsuarioResetPasswordComponent },
  { path: 'reset-new-password', component: UsuarioNewPasswordComponent },
  { path: 'new-password/:id/:token', component: ContenedorUsuarioNewPasswordComponent },
  { path: 'usuarios', component: ContainerUsuarioComponent },
  { path: 'usuarioRegister', component: ContainerRegisterUsuarioComponent },
  {path: '**', component:PrincipalContainerComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

