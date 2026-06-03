import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { 
  IonButton,
  IonContent, 
  IonInput, 
  IonItem, 
  IonList
} from '@ionic/angular/standalone';

import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase';

@Component({
  selector: 'app-esqueci-senha',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, IonContent, IonList, IonItem, IonInput, IonButton],
  templateUrl: './esqueci-senha.component.html',
  styleUrls: ['./esqueci-senha.component.scss'],
})
export class EsqueciSenhaComponent {
  email: string = '';

  async recuperarSenha() {

    try {
      await sendPasswordResetEmail(auth, this.email);

      alert('Verifique sua caixa de entrada')
    
    } catch(error: any) {
      
      if (error.code === 'auth/user-not-found') {

      alert('Nenhuma conta encontrada com esse e-mail.');

    } else if (error.code === 'auth/invalid-email') {

      alert('E-mail inválido.');

    } else {

      alert('Ocorreu um erro ao enviar o e-mail.');

    }


    }
    
  }
}
