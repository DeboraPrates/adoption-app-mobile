import { Component, OnInit } from '@angular/core';
import { IonContent, IonButton } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-role',
  standalone: true,
  imports: [IonContent, IonButton, RouterLink],
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
