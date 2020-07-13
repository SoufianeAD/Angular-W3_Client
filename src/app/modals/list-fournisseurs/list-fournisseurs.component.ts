import { Component, OnInit } from '@angular/core';
import { Fournisseur } from 'app/models/Fournisseur.models';
import { Subscription } from 'rxjs';
import { FournisseursService } from 'app/services/fournisseurs.service';

@Component({
  selector: 'app-list-fournisseurs',
  templateUrl: './list-fournisseurs.component.html',
  styleUrls: ['./list-fournisseurs.component.css']
})
export class ListFournisseursComponent implements OnInit {

  fournisseurs: Fournisseur[] = [];
  fournisseurSubscription: Subscription;

  constructor(public fournisseurService: FournisseursService) { }

  ngOnInit(): void {
    // Fournisseurs
    this.fournisseurSubscription = this.fournisseurService.fournisseursSubject.subscribe(
      (fournisseurs: Fournisseur[]) => {
        this.fournisseurs = fournisseurs;
      }
    );
    this.fournisseurService.getAll();
  }

}
