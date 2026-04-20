import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BackBttnComponent } from 'src/app/components/back-bttn/back-bttn.component';
import { HomeComponent } from '../home/home.component';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pet-page',
  standalone: true,
  imports: [IonicModule, BackBttnComponent, RouterLink],
  templateUrl: './pet-page.component.html',
  styleUrls: ['./pet-page.component.scss'],
})
export class PetPageComponent {

  constructor() { }

  animalNome = 'Mia';
  animalTipo = 'Gato';
  animalSexo = 'Fêmea';
  castrado = true;

}
