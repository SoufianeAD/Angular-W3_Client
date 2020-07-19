import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCommandeComponent } from './details-commande.component';

describe('DetailsCommandeComponent', () => {
  let component: DetailsCommandeComponent;
  let fixture: ComponentFixture<DetailsCommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsCommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
