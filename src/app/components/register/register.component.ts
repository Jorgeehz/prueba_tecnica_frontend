import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    const userData = {
      email: this.email,
      password: this.password
    };
  
    this.http.post('http://localhost:8080/api/auth/register', userData).subscribe({
      next: (response) => {
        console.log('Registro exitoso', response);
        alert('Registro exitoso');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error en el registro', error);
        alert('Error al registrar: ' + (error.error?.message || 'Intenta nuevamente.'));
      }
    });
  }
  
}
