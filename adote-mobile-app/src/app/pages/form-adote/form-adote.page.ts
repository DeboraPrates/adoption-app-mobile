import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRadio,
  IonRadioGroup,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonTitle,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonFooter,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle
} from '@ionic/angular/standalone';

import { SecondaryButtonComponent } from 'src/app/components/secondary-button/secondary-button.component';
import { DefaultHeaderComponent } from 'src/app/components/default-header/default-header.component';
import { BackBttnComponent } from 'src/app/components/back-bttn/back-bttn.component';

@Component({
  selector: 'app-form-adote',
  templateUrl: './form-adote.page.html',
  styleUrls: ['./form-adote.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonIcon,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonInput,
    IonTextarea,
    IonCheckbox,
    IonRadio,
    IonRadioGroup,
    IonSegment,
    IonSegmentButton,
    IonFooter,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    CommonModule,
    FormsModule,
    BackBttnComponent,
    DefaultHeaderComponent,
    SecondaryButtonComponent
  ]
})
export class FormAdotePage {
  step = 1;
  totalSteps = 7;

  form = {
    experiencia: '',
    tempoExperiencia: '',
    adotouAntes: '',
    cuidadosEspeciais: '',
    rotinaHoras: '',
    rotinaFora: '',
    rotinaDescricao: '',
    moradiaTipo: '',
    possuiQuintal: '',
    pessoasMoram: '',
    motivoAdocao: '',
    animalHistorico: '',
    pretendeCastrar: '',
    custosMensaisCientes: '',
    compromisso1: false,
    compromisso2: false
  };

  prevStep() {
    if (this.step > 1) {
      this.step--;
    }
  }

  nextStep() {
    if (this.step < this.totalSteps - 1) {
      this.step++;
      return;
    }
    this.submitForm();
  }

  cancel() {
    if (this.step > 1) {
      this.step = 1;
      return;
    }
    this.resetForm();
  }

  submitForm() {
    this.step = this.totalSteps;
  }

  resetForm() {
    this.step = 1;
    this.form = {
      experiencia: '',
      tempoExperiencia: '',
      adotouAntes: '',
      cuidadosEspeciais: '',
      rotinaHoras: '',
      rotinaFora: '',
      rotinaDescricao: '',
      moradiaTipo: '',
      possuiQuintal: '',
      pessoasMoram: '',
      motivoAdocao: '',
      animalHistorico: '',
      pretendeCastrar: '',
      custosMensaisCientes: '',
      compromisso1: false,
      compromisso2: false
    };
  }
}
