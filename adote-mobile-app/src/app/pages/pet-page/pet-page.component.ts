import { Component, OnInit } from '@angular/core';
import { BackBttnComponent } from 'src/app/components/back-bttn/back-bttn.component';
import { YellowButtonComponent } from 'src/app/components/yellow-button/yellow-button.component';

import {
  IonContent, IonIcon, IonCard, IonCardHeader, IonCardContent
} from "@ionic/angular/standalone"

@Component({
  selector: 'app-pet-page',
  imports: [BackBttnComponent, YellowButtonComponent, IonContent, 
  IonIcon, IonCard, IonCardHeader, IonCardContent],
  standalone: true,
  templateUrl: './pet-page.component.html',
  styleUrls: ['./pet-page.component.scss'],
})
export class PetPageComponent  implements OnInit {

  constructor() { }

  nomeAnimal = "Thor";
  nomeInstituicao = "Centro Animal";
  ngOnInit() {}

}
