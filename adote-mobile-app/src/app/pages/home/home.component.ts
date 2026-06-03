import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';

import { collection, getDocs } from 'firebase/firestore';
import { db } from 'src/app/firebase';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home', 
  standalone: true,
  imports: [IonicModule, RouterLink, IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
        

})
export class HomeComponent {

  ongsPerto = 4;
  veterinariasPerto = 8;
  instituicoesPerto = this.ongsPerto + this.veterinariasPerto;
  usuarioCidade = 'RJ';
  usuarioEstado = 'Rio de Janeiro';
  nomeInstituicao = 'Clínica Veterinária PetCare';

  petList: any[] = [];

  tipoAnimal = 'Gato';
  idadeAnimal = 'Filhote';
  
  instituicaoDistancia = 15;
  usuarioDistancia = 2;

  distancia = this.instituicaoDistancia - this.usuarioDistancia;

animais: any[] = [];

async carregarAnimais() {

  const querySnapshot =
    await getDocs(collection(db, 'animais'));

  this.animais = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

}
}

