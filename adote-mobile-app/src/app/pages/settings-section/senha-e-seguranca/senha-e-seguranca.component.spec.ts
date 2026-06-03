import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SenhaESegurancaComponent } from './senha-e-seguranca.component';

describe('SenhaESegurancaComponent', () => {
  let component: SenhaESegurancaComponent;
  let fixture: ComponentFixture<SenhaESegurancaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SenhaESegurancaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SenhaESegurancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
