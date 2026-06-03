import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BackBttnComponent } from 'src/app/components/back-bttn/back-bttn.component';
import { SecondaryButtonComponent } from 'src/app/components/secondary-button/secondary-button.component';

import { 
  IonContent, 
  IonText,
  IonList, 
  IonItem, 
  IonInput,
  IonButton,
  LoadingController, 
  AlertController,
  IonRadioGroup,
  IonRadio
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-report-form',
  standalone: true,
  imports: [
    IonContent, 
    IonText, 
    IonList, 
    IonItem,
    IonInput, 
    BackBttnComponent, 
    SecondaryButtonComponent],
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss'],
})
export class ReportFormComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
