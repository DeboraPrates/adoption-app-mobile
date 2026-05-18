import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonContent, IonList, IonItem, IonInput,
  IonButton, IonInputPasswordToggle } from "@ionic/angular/standalone";

// Importados os controllers para serem usados como providers locais ou se certificar que o Ionic os gerencie
import { LoadingController, AlertController } from '@ionic/angular/standalone';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ RouterModule, IonContent, IonList, IonItem, IonInput,
    IonButton, IonInputPasswordToggle, CommonModule, FormsModule ],
  providers: [LoadingController, AlertController], // Garante que os services do Ionic estejam disponíveis neste componente standalone
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  // Objeto para capturar o que o usuário digita
  credenciais = {
    email: '',
    senha: ''
  };

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  async fazerLogin() {
    // 1. Validação básica
    if (!this.credenciais.email || !this.credenciais.senha) {
      this.exibirAlerta('Campos vazios', 'Por favor, preencha o e-mail e a senha.');
      return;
    }

    // 2. Mostra o indicador de carregamento
    const loading = await this.loadingCtrl.create({
      message: 'Autenticando...',
    });
    await loading.present();

    try {
      // 3. Tenta fazer o login no Firebase
      const userCredential = await signInWithEmailAndPassword(
        auth, 
        this.credenciais.email, 
        this.credenciais.senha
      );

      const userId = userCredential.user.uid;

      // Busca o documento do usuário no Firestore
      const docRef = doc(db, "usuarios", userId);
      const docSnap = await getDoc(docRef);

      await loading.dismiss();

      if (docSnap.exists()) {
        const dadosUsuario = docSnap.data();
        const nivelAcesso = dadosUsuario['role']; // Pega o 'comum' ou 'admin'

        // Redireciona dependendo do nível de acesso
        if (nivelAcesso === 'admin') {
          this.router.navigateByUrl('/admin-dashboard'); // Tela do Admin
        } else if (nivelAcesso === 'instituicao') {
          this.router.navigateByUrl('/instituicao-home'); // Tela da Instituição
        } else {
          this.router.navigateByUrl('/home'); // Tela do Usuário comum
        }
      } else {
        // Se o usuário existe no Auth mas não no banco (raro, mas herança de testes anteriores)
        this.router.navigateByUrl('/home');
      }

      console.log('Usuário logado com sucesso:', userCredential.user.uid);
      
      // Fecha o carregamento
      await loading.dismiss();

      // 4. Redireciona para a página principal
      this.router.navigateByUrl('/home');

    } catch (error: any) {
      await loading.dismiss();
      console.error('Erro ao logar:', error);

      // Mensagem padrão de segurança (cobre e-mail inexistente e senha errada nas versões novas)
      let mensagemErro = 'E-mail ou senha incorretos.';

      // Se o formato do e-mail for inválido (ex: "usuario@com")
      if (error.code === 'auth/invalid-email') {
        mensagemErro = 'O formato do e-mail digitado é inválido.';
        
      } 
      // Se a conta não existir (em projetos com proteção de enumeração desativada)
      else if (error.code === 'auth/user-not-found') {
        mensagemErro = 'Esta conta não existe. Verifique o e-mail ou cadastre-se.';
        
      } 
      // Se o usuário digitou a senha errada (em projetos antigos/configurações específicas)
      else if (error.code === 'auth/wrong-password') {
        mensagemErro = 'Senha incorreta. Tente novamente.';
        
      } 
      // Se a conta foi bloqueada por muitas tentativas erradas
      else if (error.code === 'auth/too-many-requests') {
        mensagemErro = 'Acesso bloqueado temporariamente devido a muitas tentativas falhas. Tente mais tarde.';
        
      } 
      // Se a conta foi desativada pelo administrador no painel
      else if (error.code === 'auth/user-disabled') {
        mensagemErro = 'Esta conta foi desativada.';
      }

      this.exibirAlerta('Erro no Login', mensagemErro);
    }
  }

  // Função auxiliar para alertas
  async exibirAlerta(titulo: string, mensagem: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensagem,
      buttons: ['OK']
    });
    await alert.present();
  }
}