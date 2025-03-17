import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}
  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/materiales']); // Redirigir si ya está autenticado
    }
  }
  
  login() {
    const userData = { email: this.email, password: this.password };

    this.http.post<any>('http://localhost:8080/api/auth/login', userData)
      .subscribe({
        next: (response) => {
          localStorage.setItem('token', response.token); // Guardamos el token
          alert('Login exitoso');
          this.router.navigate(['/materiales']); // Redirigir a la página principal
        },
        error: (error) => {
          console.error('Error en el login', error);
          alert('Error en el login, revisa tus credenciales');
        }
      });
  }
}
