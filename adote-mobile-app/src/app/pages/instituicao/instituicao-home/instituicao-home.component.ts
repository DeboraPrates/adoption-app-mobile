import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';

import {
  business, 
  notificationsOutline, 
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
  imports: [CommonModule, RouterLink, IonContent, IonIcon],
  templateUrl: './instituicao-home.component.html',
  styleUrls: ['./instituicao-home.component.scss'],
})

export class InstituicaoHomeComponent {

 
  nomeInstituicao     = 'Centro Animal RJ';
  notificacoesPendentes = 3;
  animaisDisponiveis  = 12;
  adocoesEmAndamento  = 5;
  denunciasPendentes  = 2;
  registrosPendentes  = 4;
 
  // mock — substituir por chamada ao serviço real
  solicitacoes: Solicitacao[] = [
    { id: '1', nomeAdotante: 'Maria Silva',   nomeAnimal: 'Thor',  data: 'hoje',       status: 'pendente',  statusLabel: 'Pendente'  },
    { id: '2', nomeAdotante: 'João Santos',   nomeAnimal: 'Mel',   data: 'ontem',      status: 'aprovada',  statusLabel: 'Aprovada'  },
    { id: '3', nomeAdotante: 'Ana Oliveira',  nomeAnimal: 'Bolinha',data: '20/05/2026', status: 'reprovada', statusLabel: 'Reprovada' },
  ];
 
  adocoesPorMes: MesAdocao[] = [
    { label: 'Jan', valor: 3 },
    { label: 'Fev', valor: 5 },
    { label: 'Mar', valor: 4 },
    { label: 'Abr', valor: 7 },
    { label: 'Mai', valor: 6 },
    { label: 'Jun', valor: 9 },
  ];
 
  get maxAdocoes(): number {
    return Math.max(...this.adocoesPorMes.map(m => m.valor));
  }
 
  constructor(private router: Router) {
    addIcons({
      business, notificationsOutline, paw, heart, alertCircle,
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