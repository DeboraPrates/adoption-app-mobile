import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WelcomePage } from './pages/welcome-page/welcome-page.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';
import { EsqueciSenhaComponent } from './pages/esqueci-senha/esqueci-senha.component';
import { PetPageComponent } from './pages/pet-page/pet-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome-page',
    pathMatch: 'full',
  },

  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path: 'welcome-page',
    component: WelcomePage,
  },

  {
    path: 'cadastro',
    component: CadastroComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'esqueci-senha',
    component: EsqueciSenhaComponent,
  },
  {
    path: 'pet-page',
    component: PetPageComponent,
  },
];