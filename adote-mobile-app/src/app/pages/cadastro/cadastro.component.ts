import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import {
  IonContent, IonList, IonItem, IonInput,
  IonButton, IonInputPasswordToggle
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [IonicModule, RouterModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent {
  
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nomeCompleto: ['', Validators.required],
      email: ['', Validators.required],
      senha: ['', Validators.required],
      cpf: ['', Validators.required],
      estado: ['', Validators.required],
      cidade: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
