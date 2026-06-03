import { Component, OnInit, Input } from '@angular/core';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-secondary-button',
  standalone: true,
  imports: [IonButton],
  templateUrl: './secondary-button.component.html',
  styleUrls: ['./secondary-button.component.scss'],
})
export class SecondaryButtonComponent  implements OnInit {
  @Input() texto: string = '';

  constructor() { }

  ngOnInit() {}

}
