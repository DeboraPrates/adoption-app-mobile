import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonContent, IonInput, IonItem, IonList } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular/standalone';

import { BackBttnComponent } from 'src/app/components/back-bttn/back-bttn.component';
import { DefaultHeaderComponent } from 'src/app/components/default-header/default-header.component';
import { SecondaryButtonComponent } from 'src/app/components/secondary-button/secondary-button.component';

import { auth } from '../../../firebase';
import { updatePassword } from 'firebase/auth';

@Component({
  selector: 'app-trocar-senha',
  standalone: true,
  imports: [
    IonContent, 
    BackBttnComponent, 
    SecondaryButtonComponent, 
    DefaultHeaderComponent, 
    IonInput, 
    CommonModule, 
    FormsModule,
    IonList,
    IonItem],
  templateUrl: './trocar-senha.component.html',
  styleUrls: ['./trocar-senha.component.scss'],
})
export class TrocarSenhaComponent  implements OnInit {

  novaSenha: string = '';
  confirmaSenha: string = '';

  constructor(private alertCtrl: AlertController) {}

async alterarSenha() {
    
    if (!this.novaSenha || !this.confirmaSenha) {
      this.exibirAlerta('Aviso', 'Por favor, preencha todos os campos.');
      return;
    }

    if (this.novaSenha !== this.confirmaSenha) {
      this.exibirAlerta('Erro', 'As senhas digitadas não coincidem.');
      return;
    }

    const user = auth.currentUser;

    if (!user) {
      this.exibirAlerta('Erro de Autenticação', 'Nenhum usuário está logado atualmente.');
      return;
    }

    try {
      
      await updatePassword(user, this.novaSenha);

      this.exibirAlerta('Sucesso!', 'Sua senha foi alterada com sucesso.');

      this.novaSenha = '';
      this.confirmaSenha = '';

    } catch (error: any) {
      console.error(error);


      if (error.code === 'auth/requires-recent-login') {
        this.exibirAlerta(
          'Ação Necessária', 
          'Por motivos de segurança, você precisa fazer login novamente antes de alterar a senha.'
        );
      } else {
        this.exibirAlerta('Erro', 'Não foi possível alterar a senha. Tente novamente mais tarde.');
      }
    }
  }

  async exibirAlerta(titulo: string, mensagem: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensagem,
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {}

}
