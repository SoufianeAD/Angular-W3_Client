import {Component, Inject, OnInit} from '@angular/core';
import { Fournisseur } from 'app/models/Fournisseur.models';
import { Subscription } from 'rxjs';
import { FournisseursService } from 'app/services/fournisseurs.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-list-fournisseurs',
  templateUrl: './list-fournisseurs.component.html',
  styleUrls: ['./list-fournisseurs.component.css']
})
export class ListFournisseursComponent implements OnInit {

  fournisseurs: Fournisseur[] = [];
  fournisseurSubscription: Subscription;

  constructor(public fournisseurService: FournisseursService,
              @Inject(MAT_DIALOG_DATA)public data: any,
              public dialogRef: MatDialogRef<ListFournisseursComponent>) { }

  ngOnInit(): void {
    // Fournisseurs
    this.refresh();
  }

  refresh() {
    this.fournisseurSubscription = this.fournisseurService.fournisseursSubject.subscribe(
        (fournisseurs: Fournisseur[]) => {
          this.fournisseurs = fournisseurs;
        }
    );
    this.fournisseurService.getAll();
  }

  onSelect(fournisseur: Fournisseur) {
    this.data = fournisseur;
    this.dialogRef.close({ event: 'close', data: fournisseur });
  }

  onSearch() {
    const searchKey = (document.getElementById('searchInput') as HTMLInputElement).value.toLowerCase();
    if (searchKey === '') {
      this.refresh();
    } else {
      this.fournisseurs.forEach(
          e => {
            if (!JSON.stringify(e).toString().toLowerCase().includes(searchKey)) {
              const index = this.fournisseurs.indexOf(e);
              this.fournisseurs.splice(index, 1);
            }
          }
      );

    }
  }
}
