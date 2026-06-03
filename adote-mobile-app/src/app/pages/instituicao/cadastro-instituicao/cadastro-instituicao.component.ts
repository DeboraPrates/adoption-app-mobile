import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


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
  imports: [RouterModule, FormsModule, IonContent, IonList, IonItem, IonInput, IonButton, IonInputPasswordToggle, IonIcon, IonSelect, IonSelectOption],
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

  etapa: number = 1;  

  async avancar() {
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
    if (!this.instituicao.email || !this.instituicao.senha || !this.instituicao.nome) {
      this.exibirAlerta('Erro', 'Por favor, preencha os campos obrigatórios (Nome, E-mail e Senha).');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Criando sua conta...',
    });
    await loading.present();

    try {
      const credenciais = await createUserWithEmailAndPassword(
        auth, 
        this.instituicao.email, 
        this.instituicao.senha
      );

      const userId = credenciais.user.uid; 

      await setDoc(doc(db, "usuarios", userId), {
        nome: this.instituicao.nome,
        email: this.instituicao.email,
        cnpj: this.instituicao.cnpj,
        estado: this.instituicao.estado,
        cidade: this.instituicao.cidade,
        role: "instituicao",
        aprovado: true,
        criadoEm: new Date()
      });

      await loading.dismiss();

      this.router.navigateByUrl('/instituicao-home');

    } catch (error: any) {
      await loading.dismiss();
      console.error('Erro ao cadastrar:', error);
      
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

  async exibirAlerta(titulo: string, mensagem: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensagem,
      buttons: ['OK']
    });
    await alert.present();
  }
}
