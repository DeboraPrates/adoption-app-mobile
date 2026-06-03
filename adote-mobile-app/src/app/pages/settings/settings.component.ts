import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { BackBttnComponent } from 'src/app/components/back-bttn/back-bttn.component';
import { DefaultHeaderComponent } from 'src/app/components/default-header/default-header.component';

import {
  IonContent, 
  IonList, 
  IonItem, 
  IonIcon, 
  LoadingController
} from "@ionic/angular/standalone";

import { signOut, onAuthStateChanged, Unsubscribe } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [BackBttnComponent, DefaultHeaderComponent, IonContent, IonList, IonItem, IonIcon, RouterModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  
  tipoUsuario: string = ''; 
  usuarioDados: any = null;
  carregando: boolean = true;
  
  // Guarda a inscrição do Firebase para poder cancelar depois
  private authSubscription!: Unsubscribe;

  constructor(
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  async deslogar() {
    const loading = await this.loadingCtrl.create({
      message: 'Saindo...',
    });
    await loading.present();

    try {
      await signOut(auth);
      await loading.dismiss();
      this.router.navigateByUrl('/login');
    } catch (error) {
      await loading.dismiss();
      console.error('Erro ao deslogar:', error);
    }
  }

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

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription(); 
      console.log('Listener do Firebase desativado para evitar vazamento de memória.');
    }
  }
}