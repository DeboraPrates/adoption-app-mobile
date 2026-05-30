import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome-page',
    pathMatch: 'full',
  },
  {
    path: 'welcome-page',
    loadComponent: () => import('./pages/welcome-page/welcome-page.component').then(m => m.WelcomePage),
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./pages/cadastro/cadastro.component').then(m => m.CadastroComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'esqueci-senha',
    loadComponent: () => import('./pages/esqueci-senha/esqueci-senha.component').then(m => m.EsqueciSenhaComponent),
  },
  {
    path: 'pet-page',
    loadComponent: () => import('./pages/pet-page/pet-page.component').then(m => m.PetPageComponent),
  },
  {
    path: 'report-form',
    loadComponent: () => import('./pages/report-form/report-form.component').then(m => m.ReportFormComponent),
  },
  {
    path: 'register-form',
    loadComponent: () => import('./pages/register-form/register-form.component').then(m => m.RegisterFormComponent),
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.component').then(m => m.ProfileComponent),
  },
  {
    path: 'settings',
    loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent),
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
  },
  {
    path: 'role',
    loadComponent: () => import('./pages/role/role.component').then(m => m.RoleComponent),
  },
  {
    path: 'cadastro-instituicao',
    loadComponent: () => import('./pages/instituicao/cadastro-instituicao/cadastro-instituicao.component').then(m => m.CadastroInstituicaoComponent),
  },
  {
    path: 'instituicao-home',
    loadComponent: () => import('./pages/instituicao/instituicao-home/instituicao-home.component').then(m => m.InstituicaoHomeComponent),
  },
    {
    path: 'animal-cadastro',
    loadComponent: () => import('./pages/instituicao/animal-cadastro/animal-cadastro.component').then(m => m.AnimalCadastroComponent),
  }
];