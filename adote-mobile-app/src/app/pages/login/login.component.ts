import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { 
  IonContent, 
  IonList, 
  IonItem, 
  IonInput,
  IonButton, 
  IonInputPasswordToggle, 
  LoadingController, 
  AlertController 
} from "@ionic/angular/standalone";

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ 
    RouterModule, IonContent, IonList, IonItem, IonInput,
    IonButton, IonInputPasswordToggle, CommonModule, FormsModule 
  ],
  // Removido a linha de providers locais para evitar bugs com overlays do Ionic
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

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
      console.log('Usuário autenticado com sucesso no Auth:', userId);

      // Busca o documento do usuário no Firestore para conferir o nível de acesso
      const docRef = doc(db, "usuarios", userId);
      const docSnap = await getDoc(docRef);

      // Fecha o carregamento imediatamente após receber a resposta do servidor
      await loading.dismiss();

      if (docSnap.exists()) {
        const dadosUsuario = docSnap.data();
        const nivelAcesso = dadosUsuario['role']; 

        if (nivelAcesso === 'instituicao') {
     const estaAprovado = dadosUsuario['aprovado'];
     
     if (estaAprovado) {
       this.router.navigateByUrl('/home');
        } else {
          // Se não estiver aprovado, manda para uma tela simples de "Em Análise"
          this.router.navigateByUrl('/cadastro-analise'); 
        }
        return;
      }

      // 4. Redireciona dependendo do nível de acesso e usa o 'return' para parar a execução
      if (nivelAcesso === 'admin') {
        this.router.navigateByUrl('/admin-dashboard'); 
        return;

      } else if (nivelAcesso === 'instituicao') {
        const estaAprovado = dadosUsuario['aprovado'];
        
        if (estaAprovado) {
          this.router.navigateByUrl('/instituicao-home'); 
        } else {
          // Se não estiver aprovado, manda para uma tela simples de "Em Análise"
          this.router.navigateByUrl('/cadastro-analise'); 
        }
        return; // Esse return mata a execução se for instituição

      } else {
        // Usuário comum cai aqui, totalmente separado da instituição
        this.router.navigateByUrl('/home'); 
        return;
      }
      } else {
        // Se o usuário existe no Auth mas o documento não existe no banco (ex: deletado manualmente)
        console.warn('Usuário autenticado, mas documento não encontrado no Firestore.');
        this.router.navigateByUrl('/home');
        return;
      }

    } catch (error: any) {
      // Garante o fechamento do loading se houver qualquer rejeição do Firebase
      await loading.dismiss();
      console.error('Erro ao logar:', error);

      let mensagemErro = 'E-mail ou senha incorretos.';

      if (error.code === 'auth/invalid-email') {
        mensagemErro = 'O formato do e-mail digitado é inválido.';
      } else if (error.code === 'auth/user-not-found') {
        mensagemErro = 'Esta conta não existe. Verifique o e-mail ou cadastre-se.';
      } else if (error.code === 'auth/wrong-password') {
        mensagemErro = 'Senha incorreta. Tente novamente.';
      } else if (error.code === 'auth/too-many-requests') {
        mensagemErro = 'Acesso bloqueado temporariamente devido a muitas tentativas falhas. Tente mais tarde.';
      } else if (error.code === 'auth/user-disabled') {
        mensagemErro = 'Esta conta foi desativada.';
      }

      this.exibirAlerta('Erro no Login', mensagemErro);
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
}