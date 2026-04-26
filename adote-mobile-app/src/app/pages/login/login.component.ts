import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';

import {
  IonContent, IonList, IonItem, IonInput,
  IonButton, IonInputPasswordToggle
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, IonContent, IonList, IonItem, IonInput,
  IonButton, IonInputPasswordToggle],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})

export class LoginComponent {


}
