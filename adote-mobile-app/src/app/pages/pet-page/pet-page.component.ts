import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BackBttnComponent } from 'src/app/components/back-bttn/back-bttn.component';
import { YellowButtonComponent } from 'src/app/components/yellow-button/yellow-button.component';

@Component({
  selector: 'app-pet-page',
  imports: [IonicModule, BackBttnComponent, YellowButtonComponent],
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
