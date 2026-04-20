import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home', 
  standalone: true,
  imports: [IonicModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
        

})
export class HomeComponent {

  ongsPerto = 4;
  veterinariasPerto = 8;
  instituicoesPerto = this.ongsPerto + this.veterinariasPerto;
  usuarioCidade = 'RJ';
  usuarioEstado = 'Rio de Janeiro';

  petList: any[] = [];

  tipoAnimal = 'Gato';
  idadeAnimal = 'Filhote';
  
  instituicaoDistancia = 15;
  usuarioDistancia = 2;

  distancia = this.instituicaoDistancia - this.usuarioDistancia;
}

