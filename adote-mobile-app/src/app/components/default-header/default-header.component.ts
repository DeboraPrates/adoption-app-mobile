import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
  styleUrls: ['./default-header.component.scss'],
})
export class DefaultHeaderComponent  implements OnInit {
    @Input() header: string = "Continuar";

  constructor() { }

  ngOnInit() {}

}
