import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MaterialsComponent } from './components/materials/materials.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: MaterialsComponent, canActivate: [AuthGuard] }, // Protegido
  { path: 'login', component: LoginComponent },
  { path: 'materiales', component: MaterialsComponent, canActivate: [AuthGuard] }, // Protegido
  { path: 'register', component: RegisterComponent },
];
