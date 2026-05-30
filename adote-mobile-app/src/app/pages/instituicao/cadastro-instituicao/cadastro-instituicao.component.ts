import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {
  IonContent, IonList, IonItem, IonInput,
  IonButton, IonInputPasswordToggle, LoadingController, AlertController, IonIcon,
  IonSelect, IonSelectOption
} from "@ionic/angular/standalone";

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../../firebase';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, IonContent, IonList, 
    IonItem, IonInput, IonButton, IonInputPasswordToggle, IonIcon, IonSelect,
  IonSelectOption],
  templateUrl: './cadastro-instituicao.component.html',
  styleUrls: ['./cadastro-instituicao.component.scss'],
})

export class CadastroInstituicaoComponent {
    instituicao = {
    nome: '',
    email: '',
    senha: '',
    cnpj: '',
    estado: '',
    cidade: '',
    bairro: '',
    telefone: '',
    subTipo: ''
  };

  customPopoverOptions = {
    header: 'Tipo de Instituição',
    subHeader: 'Como devemos reconhecer a organização?',
    message: 'Categorize seu perfil escolhendo uma das opções abaixo'
  };

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  // Controla qual etapa está visível (1 ou 2)
  etapa: number = 1;  

  async avancar() {
    // Valida se a parte 1 está preenchida antes de ir para a 2
    if (this.instituicao.nome && this.instituicao.cnpj && this.instituicao.email && this.instituicao.senha) {
      this.etapa = 2;
    } else {
          
      const alert = await this.alertCtrl.create({
        header: 'Campos incompletos',
        message: 'Por favor, preencha todos os campos da primeira etapa antes de avançar.',
        buttons: ['Entendido']
      });
      await alert.present();
    }
  }

  voltar() {
    this.etapa = 1;
  }

  async testeCadastro() {
    // 1. Validação básica para não enviar campos vazios
    if (!this.instituicao.email || !this.instituicao.senha || !this.instituicao.nome) {
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
        this.instituicao.email, 
        this.instituicao.senha
      );

      const userId = credenciais.user.uid; // ID único gerado pelo Firebase

      // 4. Salva as informações adicionais no Firestore na coleção "instituicaos"
      // Usamos o UID do Auth como o ID do documento para ficarem interligados
      await setDoc(doc(db, "instituicaos", userId), {
        nome: this.instituicao.nome,
        email: this.instituicao.email,
        cnpj: this.instituicao.cnpj,
        estado: this.instituicao.estado,
        cidade: this.instituicao.cidade,
        role: "instituicao",
        aprovado: false,
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
      } else if (error.code === 'auth/weak-password') {
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
