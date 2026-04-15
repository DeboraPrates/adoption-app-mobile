import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-pet-page',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './pet-page.component.html',
  styleUrls: ['./pet-page.component.scss'],
})
export class PetPageComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
