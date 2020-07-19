import { Component, OnInit } from '@angular/core';
import {CommandesService} from '../../services/commandes.service';
import {Commande} from '../../models/Commande.models';
import {Subscription} from 'rxjs';
import {MagasinsService} from '../../services/magasins.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ListArticlesComponent} from '../../modals/list-articles/list-articles.component';
import {DetailsCommandeComponent} from '../../modals/details-commande/details-commande.component';
import {ArticleXCommandeService} from '../../services/article-xcommande.service';

@Component({
  selector: 'app-list-commandes',
  templateUrl: './list-commandes.component.html',
  styleUrls: ['./list-commandes.component.css']
})
export class ListCommandesComponent implements OnInit {

  commandes: Commande[] = []
  commandeSubscription: Subscription;
  commandesBackUp: Commande[] = [];

  constructor(public commandeService: CommandesService,
              public articleXcommandeService: ArticleXCommandeService,
              public magasinService: MagasinsService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.commandeSubscription = this.commandeService.commandesSubject.subscribe(
        (commandes: Commande[]) => {
          this.commandes = commandes;
          this.commandesBackUp = commandes;
        }
    );
    this.commandeService.getAll();
    this.magasinService.getAll();
    this.articleXcommandeService.getAll();
  }

    onSearch() {
      const searchKey = (document.getElementById('searchInput') as HTMLInputElement).value.toLowerCase();
      if (searchKey === '') {
        this.commandes = this.commandesBackUp;
      } else {
        this.commandes.forEach(
            e => {
              if (!JSON.stringify(e).toString().toLowerCase().includes(searchKey)) {
                const index = this.commandes.indexOf(e);
                this.commandes.splice(index, 1);
              }
            }
        );

      }
    }

  onDelete(commande: Commande) {
      this.articleXcommandeService.getArticleXCommande().filter(e => e.idCommande === commande.idCommande).forEach(
          e => {
              this.articleXcommandeService.delete(e);
          }
      );
      this.commandeService.delete(commande);
  }

  onDetails(commande: Commande) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.width = '85%';
      dialogConfig.data = {
          commande: commande
      };
      const dialogRef = this.dialog.open(DetailsCommandeComponent, dialogConfig);
  }
}
