import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { WelcomePage } from './pages/welcome-page/welcome-page.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { LoginComponent } from './pages/login/login.component';
import { EsqueciSenhaComponent } from './pages/esqueci-senha/esqueci-senha.component';
import { PetPageComponent } from './pages/pet-page/pet-page.component';
import { YellowButtonComponent } from './components/yellow-button/yellow-button.component';
import { ReportFormComponent } from './pages/report-form/report-form.component';
import { RegisterFormComponent } from './pages/register-form/register-form.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SettingsComponent } from './pages/settings/settings.component';

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
  {
    path: 'report-form',
    component: ReportFormComponent,
  },
  {
    path: 'register-form',
    component: RegisterFormComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  }
];