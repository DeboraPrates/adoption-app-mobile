import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BackBttnComponent } from 'src/app/components/back-bttn/back-bttn.component';

// Todos os componentes e controllers do Ionic importados estritamente do standalone
import {
  IonContent, IonList, IonItem, IonIcon, LoadingController
} from "@ionic/angular/standalone";

import { signOut, onAuthStateChanged, Unsubscribe } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [BackBttnComponent, IonContent, IonList, IonItem, IonIcon, RouterModule, CommonModule],
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
    // Armazena o listener na variável
    this.authSubscription = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const docRef = doc(db, "usuarios", user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            const dados = docSnap.data();
            
            this.tipoUsuario = dados['role']; 
            this.usuarioDados = dados; // CORRIGIDO: Agora o seu HTML vai receber os dados!
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
        this.router.navigateByUrl('/login'); // Se não está logado, segurança extra: joga pro login
      }
    });
  }

  // Executado automaticamente quando o usuário sai desta tela
  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription(); // CORRIGIDO: Desliga o monitor do Firebase, poupando memória e internet
      console.log('Listener do Firebase desativado para evitar vazamento de memória.');
    }
  }
}