import { Component, OnInit } from '@angular/core';

import { BackBttnComponent } from 'src/app/components/back-bttn/back-bttn.component';

import { 
  IonContent, 
  IonItem, 
  IonList, 
  IonListHeader, 
  IonText,
  IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [IonContent, IonItem, IonList, IonListHeader,
    BackBttnComponent, IonText, IonIcon],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
