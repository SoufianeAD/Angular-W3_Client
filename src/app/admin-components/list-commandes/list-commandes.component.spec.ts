import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCommandesComponent } from './list-commandes.component';

describe('ListCommandesComponent', () => {
  let component: ListCommandesComponent;
  let fixture: ComponentFixture<ListCommandesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCommandesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
