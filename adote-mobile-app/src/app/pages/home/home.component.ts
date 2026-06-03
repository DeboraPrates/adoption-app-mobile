import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';

import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from 'src/app/firebase';
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';

import { signOut, onAuthStateChanged, Unsubscribe } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

@Component({
  selector: 'app-home', 
  standalone: true,
  imports: [IonicModule, RouterLink, IonCard, IonCardTitle, IonCardSubtitle, IonCardHeader, RouterLink],
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
  tipoUsuario: string = ''; 
  usuarioDados: any = null;
  carregando: boolean = true;
  
  instituicaoDistancia = 15;
  usuarioDistancia = 2;

  distancia = this.instituicaoDistancia - this.usuarioDistancia;

  constructor(
    private router: Router
  ){}

animais: any[] = [];
private authSubscription!: Unsubscribe;

ngOnInit() {
  this.authSubscription = onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const docRef = doc(db, "usuarios", user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const dados = docSnap.data();
          
          this.tipoUsuario = dados['role']; 
          this.usuarioDados = dados; 
        } 
      } catch (error) {
        console.error("Erro ao buscar nível de acesso:", error);
      } finally {
        this.carregando = false;
      }
    } else {
      this.tipoUsuario = '';
      this.usuarioDados = null;
      this.carregando = false;
      this.router.navigateByUrl('/login'); 
    }
  });
}

async carregarAnimais() {

  const querySnapshot =
    await getDocs(collection(db, 'animais'));

  this.animais = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

}
}

