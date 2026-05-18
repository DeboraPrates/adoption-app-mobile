import { Component, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {
  IonContent, IonList, IonItem, IonInput,
  IonButton, IonInputPasswordToggle, LoadingController, AlertController
} from "@ionic/angular/standalone";

import {
  getAuth, createUserWithEmailAndPassword
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, IonContent, IonList, 
    IonItem, IonInput, IonButton, IonInputPasswordToggle, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})


export class CadastroComponent {
usuario = {
    nome: '',
    email: '',
    senha: '',
    cpf: '',
    estado: '',
    cidade: ''
  };

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  async testeCadastro() {
    // 1. Validação básica para não enviar campos vazios
    if (!this.usuario.email || !this.usuario.senha || !this.usuario.nome) {
      this.exibirAlerta('Erro', 'Por favor, preencha os campos obrigatórios (Nome, E-mail e Senha).');
      return;
    }

    // 2. Cria uma animação de "Carregando" na tela
    const loading = await this.loadingCtrl.create({
      message: 'Criando sua conta...',
    });
    await loading.present();

    try {
      // 3. Cria o usuário no Firebase Auth
      const credenciais = await createUserWithEmailAndPassword(
        auth, 
        this.usuario.email, 
        this.usuario.senha
      );

      const userId = credenciais.user.uid; // ID único gerado pelo Firebase

      // 4. Salva as informações adicionais no Firestore na coleção "usuarios"
      // Usamos o UID do Auth como o ID do documento para ficarem interligados
      await setDoc(doc(db, "usuarios", userId), {
        nome: this.usuario.nome,
        email: this.usuario.email,
        cpf: this.usuario.cpf,
        estado: this.usuario.estado,
        cidade: this.usuario.cidade,
        role: "comum", // <-- DEFINA O NÍVEL PADRÃO AQUI (pode ser 'comum', 'voluntario', etc.)
        criadoEm: new Date()
      });

      // Fecha o "Carregando"
      await loading.dismiss();

      // 5. Se deu tudo certo, navega para a Home
      this.router.navigateByUrl('/home');

    } catch (error: any) {
      await loading.dismiss();
      console.error('Erro ao cadastrar:', error);
      
      // Tratamento de erros amigável para o usuário
      let mensagemErro = 'Não foi possível realizar o cadastro.';
      
      if (error.code === 'auth/email-already-in-use') {
        mensagemErro = 'Este e-mail já está cadastrado.';
      } else if (error.code === 'auth/weak-senha') {
        mensagemErro = 'A senha deve ter pelo menos 6 caracteres.';
      } else if (error.code === 'auth/invalid-email') {
        mensagemErro = 'O formato do e-mail é inválido.';
      }

      this.exibirAlerta('Falha no Cadastro', mensagemErro);
    }
  }

  // Função auxiliar para exibir mensagens de alerta do Ionic
  async exibirAlerta(titulo: string, mensagem: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensagem,
      buttons: ['OK']
    });
    await alert.present();
  }
}
