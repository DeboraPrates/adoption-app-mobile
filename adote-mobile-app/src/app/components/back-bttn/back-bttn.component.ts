import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-bttn',
  imports: [IonicModule],
  standalone: true,
  templateUrl: './back-bttn.component.html',
  styleUrls: ['./back-bttn.component.scss'],
})
export class BackBttnComponent  implements OnInit {

  constructor(private location: Location) { }

  voltar() {
    this.location.back();
  }
  ngOnInit() {}

}
