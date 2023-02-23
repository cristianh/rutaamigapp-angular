import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Usuario } from '../models/usuario';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  configUrl = 'assets/config.json';
  baseUrl=environment.API_URL;

  constructor(private http: HttpClient) { }

  getAllUsuarios(route: string) {
    return this.http.get(route)
  }

  saveUsuario(route: string, usuariodata: Usuario) {
    let config: any = {
      responseType: "json"
    }
    
    return this.http.post(`${this.baseUrl}${route}`, usuariodata, config);
  }

  deleteUsuario(route: string) {
    let config: any = {
      responseType: "json"
    }
    return this.http.delete(route,config);
  }

  navegacionUsuario(route: string) {
    return this.http.get(route)
  }

  loginUsuario(route,usuario:Usuario){
    let config: any = {
      responseType: "json"
    }
    return this.http.post(`${this.baseUrl}${route}`, usuario, config);
  }

  resetPassword(route,correo){
    let config: any = {
      responseType: "json"
    }
    return this.http.post(`${this.baseUrl}${route}`, correo, config);
  }

  updatePasswordUsuario(route,data){
    let config: any = {
      responseType: "json",
      
    }
    return this.http.post(`${this.baseUrl}${route}`, data,config);
  }
}
