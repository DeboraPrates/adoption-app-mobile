import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';


import { IonContent, IonItem, IonList, IonCard } from '@ionic/angular/standalone';


import { signOut, onAuthStateChanged, Unsubscribe } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [IonContent, IonItem, IonList, IonCard],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent  implements OnInit {
 
  tipoUsuario: string = ''; 
  usuarioDados: any = null;

  constructor() { }

  ngOnInit() {
    
  }

}
