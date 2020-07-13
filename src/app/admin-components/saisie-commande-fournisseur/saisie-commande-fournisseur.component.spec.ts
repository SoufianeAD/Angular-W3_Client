import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaisieCommandeFournisseurComponent } from './saisie-commande-fournisseur.component';

describe('SaisieCommandeFournisseurComponent', () => {
  let component: SaisieCommandeFournisseurComponent;
  let fixture: ComponentFixture<SaisieCommandeFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaisieCommandeFournisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaisieCommandeFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
