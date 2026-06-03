import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
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

import { HttpClient } from '@angular/common/http';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [RouterModule, FormsModule, IonContent, IonList, IonItem, IonInput, IonButton, IonInputPasswordToggle],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})


export class CadastroComponent {
usuario = {
    nome: '',
    email: '',
    senha: '',
    cpf: '',
    cep: '',
    estado: '',
    cidade: ''
  };

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private http: HttpClient
  ) {}

  async testeCadastro() {
    if (!this.usuario.email || !this.usuario.senha || !this.usuario.nome) {
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
        this.usuario.email, 
        this.usuario.senha
      );

      const userId = credenciais.user.uid; 


      await setDoc(doc(db, "usuarios", userId), {
        nome: this.usuario.nome,
        email: this.usuario.email,
        cpf: this.usuario.cpf,
        cep: this.usuario.cep,
        estado: this.usuario.estado,
        cidade: this.usuario.cidade,
        role: "comum",
        criadoEm: new Date()
      });

      await loading.dismiss();

      this.router.navigateByUrl('/home');

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

    buscarCep() {
      const cep = this.usuario.cep.replace(/\D/g, '');

      this.http
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .subscribe((dados: any) => {

        this.usuario.cidade = dados.localidade;
        this.usuario.estado = dados.uf;

        if (dados.erro) {
          alert('CEP não encontrado');
          return;
        }
    })
  }

}

export interface Endereco {
  cep: string;
  estado: string;
  cidade: string;
}
