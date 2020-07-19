import {Component, Inject, OnInit} from '@angular/core';
import {ArticleXCommande} from '../../models/ArticleXCommande.models';
import {Subscription} from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ArticleXCommandeService} from '../../services/article-xcommande.service';
import {Commande} from '../../models/Commande.models';

@Component({
  selector: 'app-details-commande',
  templateUrl: './details-commande.component.html',
  styleUrls: ['./details-commande.component.css']
})
export class DetailsCommandeComponent implements OnInit {

  articleXcommandes: ArticleXCommande[] = [];

  constructor(public articleXcommandeService: ArticleXCommandeService,
              @Inject(MAT_DIALOG_DATA)public data: any,
              public dialogRef: MatDialogRef<DetailsCommandeComponent>) { }

  ngOnInit(): void {
    this.articleXcommandes = this.articleXcommandeService.getArticleXCommande().filter(e => e.idCommande === this.data.commande.idCommande);
  }

  onSearch() {
  }

  onDelete(item: ArticleXCommande) {
    this.articleXcommandeService.delete(item);
  }
}
