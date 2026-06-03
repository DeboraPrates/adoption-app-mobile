import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormAdotePage } from './form-adote.page';

describe('FormAdotePage', () => {
  let component: FormAdotePage;
  let fixture: ComponentFixture<FormAdotePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAdotePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
