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
  IonLabel
} from '@ionic/angular/standalone';

import { doc, setDoc } from 'firebase/firestore';

import { Camera, CameraDirection, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-animal-cadastro',
  standalone: true,
  imports: [
    CommonModule, IonContent, RouterModule, IonText, 
    BackBttnComponent, IonInput, IonList, IonItem, IonRadioGroup, IonRadio,
    IonTextarea, IonLabel, YellowButtonComponent, FormsModule
  ],
  templateUrl: './animal-cadastro.component.html',
  styleUrls: ['./animal-cadastro.component.scss'],
})
export class AnimalCadastroComponent implements OnInit {

  animal = {
    nome: '',
    img: '',
    especie: '',
    sexo: '',
    faixaEtaria: '',
    castrado: false, 
    comportamento: '',
    preferencias: '',
    condicaoMedica: false,
    condicaoDescricao: ''
  };

  imagemSelecionada: File | null = null;
  previewImagem: string | null = null;
  animalCondicao = false;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController 
  ) { }

  ngOnInit() {
  }

  async exibirAlerta(titulo: string, mensagem: string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensagem,
      buttons: ['OK']
    });
    await alert.present();
  }

  async cadastroAnimal() {
    if(!this.animal.nome || !this.animal.especie || !this.animal.sexo || 
       !this.animal.faixaEtaria) {
        this.exibirAlerta('Erro', 'Por favor, preencha todos os campos da sessão "Básico"');
        return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Cadastrando Animal...',
    });
    await loading.present();

  }

  async selecionarFoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos 
      });

      this.previewImagem = image.webPath ?? null;
      console.log('Imagem da galeria selecionada:', image.webPath);

    } catch (e) {
      console.error('Falha ao selecionar foto da galeria:', e);
    }
  }

  async tirarFoto() {
    try {
      const result = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        direction: CameraDirection.Rear,
        width: 1280,
        height: 720,
        source: CameraSource.Camera
      });

      this.previewImagem = result.webPath ?? null;
    } catch (e) {
      console.error('Falha ao tirar foto:', e);
    }
  }

  mudarCondicao(event: any) {
    this.animalCondicao = event.detail.value === true || event.detail.value === 'true';
  }
}