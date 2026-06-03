import { Component, OnInit } from '@angular/core';

import { Router, RouterLink } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';

import { signOut, onAuthStateChanged, Unsubscribe } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../../firebase';

import {
  business, 
  settings, 
  paw, 
  heart, 
  alertCircle,
  documentText, 
  addCircle, 
  checkmarkCircle, 
  warning, 
  listCircle,
  personCircleOutline
} from 'ionicons/icons';


export interface Solicitacao {
  id: string;
  nomeAdotante: string;
  nomeAnimal: string;
  data: string;
  status: 'pendente' | 'aprovada' | 'reprovada';
  statusLabel: string;
}
 
export interface MesAdocao {
  label: string;
  valor: number;
}

@Component({
  selector: 'app-instituicao-home',
  standalone: true,
  imports: [RouterLink, IonContent, IonIcon],
  templateUrl: './instituicao-home.component.html',
  styleUrls: ['./instituicao-home.component.scss'],
})

export class InstituicaoHomeComponent implements OnInit {

  role = '';
  notificacoesPendentes = 3;
  animaisDisponiveis  = 12;
  adocoesEmAndamento  = 5;
  denunciasPendentes  = 2;
  registrosPendentes  = 4;
 
  solicitacoes: Solicitacao[] = [
  ];
 
  adocoesPorMes: MesAdocao[] = [
    { label: 'Jan', valor: 3 },
    { label: 'Fev', valor: 5 },
    { label: 'Mar', valor: 4 },
    { label: 'Abr', valor: 7 },
    { label: 'Mai', valor: 6 },
    { label: 'Jun', valor: 9 },
  ];

usuario: any = null;
usuarioDados: any = null;
tipoUsuario: string = ''; 
carregando: boolean = true;

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

  get maxAdocoes(): number {
    return Math.max(...this.adocoesPorMes.map(m => m.valor));
  }
 
  constructor(private router: Router) {
    addIcons({
      business, settings, paw, heart, alertCircle,
      documentText, addCircle, checkmarkCircle, warning, listCircle,
      personCircleOutline
    });
  }


 
  irPara(rota: string) {
    this.router.navigate([rota]);
  }
 
  verSolicitacao(s: Solicitacao) {
    this.router.navigate(['/inst/adocoes', s.id]);
  }
}