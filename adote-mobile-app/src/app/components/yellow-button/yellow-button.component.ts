import { Component, OnInit, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-yellow-button',
  imports: [RouterLink, IonButton],
  standalone: true,
  templateUrl: './yellow-button.component.html',
  styleUrls: ['./yellow-button.component.scss'],
})
export class YellowButtonComponent {

  @Input() texto: string = "Continuar";
  @Input() rota?: string;

  constructor(
    private router: Router
  ) { }

    clicar() {
    if (this.rota) {
      this.router.navigate([this.rota]);
    }
  }
}
