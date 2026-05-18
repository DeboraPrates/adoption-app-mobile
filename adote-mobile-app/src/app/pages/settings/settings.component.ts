import { Component, OnInit } from '@angular/core';
import { IonicModule, LoadingController } from '@ionic/angular';
import { BackBttnComponent } from 'src/app/components/back-bttn/back-bttn.component';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import {
  IonContent, IonList, IonItem, IonIcon
} from "@ionic/angular/standalone";

import { signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';


@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [BackBttnComponent, IonContent, IonList, IonItem, IonIcon, RouterModule, CommonModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent  implements OnInit {
  
  constructor(
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  // 1. Crie a variável aqui para o HTML ter acesso a ela
  tipoUsuario: string = ''; 
  usuarioDados: any = null;
  carregando: boolean = true;

  async deslogar() {
    // 1. Cria o indicador de carregamento
    const loading = await this.loadingCtrl.create({
      message: 'Saindo...',
    });
    await loading.present();

    try {
      // 2. Faz o logout no Firebase
      await signOut(auth);

      // Fecha o carregamento
      await loading.dismiss();

      // 3. Redireciona para a página de login (substitua pelo seu caminho de login)
      this.router.navigateByUrl('/login');
      
    } catch (error) {
      await loading.dismiss();
      console.error('Erro ao deslogar:', error);
    }
  }

  ngOnInit() {

// 2. Monitora se o usuário está logado
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // 3. Busca o documento dele no Firestore
          const docRef = doc(db, "usuarios", user.uid);
          const docSnap = await getDoc(docRef);

          
          if (docSnap.exists()) {
            const dados = docSnap.data();
          
            // 4. Salva o 'role' na variável que criamos lá em cima
            this.tipoUsuario = dados['role']; // vai guardar 'comum', 'admin', 'ong', etc.
          } 

        } catch (error) {
          console.error("Erro ao buscar nível de acesso:", error);
        } finally {
          this.carregando = false;
        }
      } else {
        this.tipoUsuario = '';
        this.carregando = false;
      }
    });
  }
}

