import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-report-form',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './report-form.component.html',
  styleUrls: ['./report-form.component.scss'],
})
export class ReportFormComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
