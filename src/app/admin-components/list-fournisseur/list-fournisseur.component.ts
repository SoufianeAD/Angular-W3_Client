import { Component, OnInit } from '@angular/core';
import {Fournisseur} from '../../models/Fournisseur.models';
import {Subscription} from 'rxjs';
import {FournisseursService} from '../../services/fournisseurs.service';

@Component({
  selector: 'app-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.css']
})
export class ListFournisseurComponent implements OnInit {

  fournisseurs: Fournisseur[] = [];
  fournisseurSubscription: Subscription;

  constructor(public fournisseurService: FournisseursService) { }

  ngOnInit(): void {
    this.fournisseurSubscription = this.fournisseurService.fournisseursSubject.subscribe(
        (fournisseurs: Fournisseur[]) => {
          this.fournisseurs = fournisseurs;
        }, (error) => {
          console.log('Error get Fournisseurs : ' + JSON.stringify(error));
        }
    );
    this.fournisseurService.getAll();
  }

  onSearch() {

  }

  onDelete(item: Fournisseur) {

  }
}
