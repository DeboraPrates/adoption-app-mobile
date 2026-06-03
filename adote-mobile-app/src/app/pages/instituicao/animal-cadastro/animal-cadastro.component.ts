import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { LoadingController, AlertController } from '@ionic/angular';
import { BackBttnComponent } from 'src/app/components/back-bttn/back-bttn.component';
import { YellowButtonComponent } from 'src/app/components/yellow-button/yellow-button.component';

import { 
  IonContent,
  IonText,
  IonInput,
  IonList,
  IonItem,
  IonRadio, 
  IonRadioGroup,
  IonTextarea,
  IonLabel,
  IonSpinner,
  ToastController,
} from '@ionic/angular/standalone';

import { auth, db } from 'src/app/firebase';
import { collection, addDoc } from 'firebase/firestore';


import {
  Storage,
  ref,
  uploadBytes,
  getDownloadURL,
} from '@angular/fire/storage';

@Component({
  selector: 'app-animal-cadastro',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    RouterModule,
    IonText,
    BackBttnComponent,
    IonInput,
    IonList,
    IonItem,
    IonRadioGroup,
    IonRadio,
    IonTextarea,
    IonLabel,
    YellowButtonComponent,
    FormsModule
],
  templateUrl: './animal-cadastro.component.html',
  styleUrls: ['./animal-cadastro.component.scss'],
})

export class AnimalCadastroComponent {
  animal = {
    nome: '',
    especie: '',
    sexo: '',
    faixaEtaria: '',
    castrado: null as boolean | null,
    comportamento: '',
    preferencias: '',
    condicaoMedica: null as boolean | null,
    descricaoCondicao: '',
    foto: ''
  };

  animalCondicao: boolean | null = null;

  previewImagem: string | null = null;

  constructor(
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router
  ) {}


  selecionarFoto(event: any) {
    const arquivo = event.target.files[0];
    if (arquivo) {
      this.converterParaBase64(arquivo);
    }
  }

  tirarFoto(event: any) {
    const arquivo = event.target.files[0];
    if (arquivo) {
      this.converterParaBase64(arquivo);
    }
  }

private converterParaBase64(arquivo: File) {
  const reader = new FileReader();
  
  reader.onload = (event: any) => {
    const img = new Image();
    img.src = event.target.result;

    img.onload = () => {
      // 1. Define o tamanho máximo que a foto do pet terá (ex: largura máxima de 800px)
      const MAX_LARGURA = 800;
      let largura = img.width;
      let altura = img.height;

      if (largura > MAX_LARGURA) {
        altura = Math.round((altura * MAX_LARGURA) / largura);
        largura = MAX_LARGURA;
      }

      // 2. Cria um Canvas na memória para redesenhar a imagem menor
      const canvas = document.createElement('canvas');
      canvas.width = largura;
      canvas.height = altura;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, largura, altura);

        // 3. Converte o canvas para Base64 aplicando uma compressão de 60% (0.6)
        // Isso reduz drasticamente o peso do arquivo mantendo uma ótima qualidade visual
        const imagemCompactadaBase64 = canvas.toDataURL('image/jpeg', 0.6);

        // 4. Salva o resultado leve no seu objeto e no preview da tela
        this.previewImagem = imagemCompactadaBase64;
        this.animal.foto = imagemCompactadaBase64;

        console.log('Foto comprimida com sucesso! Tamanho reduzido para o Firestore.');
      }
    };
  };

  reader.readAsDataURL(arquivo);
}

  mudarCondicao(valor: boolean) {
    this.animalCondicao = valor;
    if (!valor) {
      this.animal.descricaoCondicao = ''; 
    }
  }

  async cadastroAnimal() {
    if (!this.animal.nome || !this.animal.especie || !this.animal.sexo || 
      !this.animal.faixaEtaria || this.animal.castrado === null) {
      this.exibirAlerta('Campos Obrigatórios', 'Por favor, preencha todas as informações básicas do animal.');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Salvando cadastro do pet...',
    });
    await loading.present();

    try {
      
      const usuarioLogado = auth.currentUser;
      
      const dadosParaSalvar = {
        ...this.animal,
        instituicaoId: usuarioLogado ? usuarioLogado.uid : 'anonimo',
        criadoEm: new Date()
      };

      const colecaoRef = collection(db, 'animais');
      await addDoc(colecaoRef, dadosParaSalvar);

      await loading.dismiss();
      
      await this.exibirAlerta('Sucesso!', `${this.animal.nome} foi cadastrado com sucesso.`);
      
      this.resetarFormulario();
      this.router.navigateByUrl('/instituicao-home'); 

    } catch (error: any) {
      await loading.dismiss();
      console.error('Erro ao cadastrar animal no Firestore:', error);
      this.exibirAlerta('Erro no Sistema', 'Não foi possível salvar o animal neste momento.');
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

  resetarFormulario() {
    this.animal = {
      nome: '',
      especie: '',
      sexo: '',
      faixaEtaria: '',
      castrado: null,
      comportamento: '',
      preferencias: '',
      condicaoMedica: null,
      descricaoCondicao: '',
      foto: ''
    };
    this.previewImagem = null;
    this.animalCondicao = null;
  }
}