import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { 
  IonContent, 
  IonItem,
  IonIcon, 
  IonList
 } from '@ionic/angular/standalone';

import { BackBttnComponent } from 'src/app/components/back-bttn/back-bttn.component';
import { DefaultHeaderComponent } from 'src/app/components/default-header/default-header.component';

@Component({
  selector: 'app-senha-e-seguranca',
  standalone: true,
  imports: [RouterModule, DefaultHeaderComponent, BackBttnComponent, IonContent, IonIcon, IonList, IonItem],
  templateUrl: './senha-e-seguranca.component.html',
  styleUrls: ['./senha-e-seguranca.component.scss'],
})
export class SenhaESegurancaComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
