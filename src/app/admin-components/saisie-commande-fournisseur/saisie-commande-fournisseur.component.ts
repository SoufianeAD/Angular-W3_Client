import { Component, OnInit } from '@angular/core';
import { Magasin } from 'app/models/Magasin.models';
import { Subscription } from 'rxjs';
import { Article } from 'app/models/Article.models';
import { MagasinsService } from 'app/services/magasins.service';
import { ArticlesService } from 'app/services/articles.service';
import { Fournisseur } from 'app/models/Fournisseur.models';
import { FournisseursService } from 'app/services/fournisseurs.service';

@Component({
  selector: 'app-saisie-commande-fournisseur',
  templateUrl: './saisie-commande-fournisseur.component.html',
  styleUrls: ['./saisie-commande-fournisseur.component.css']
})
export class SaisieCommandeFournisseurComponent implements OnInit {

  magasins: Magasin[] = [];
  magasinSubscription: Subscription;

  articles: Article[] = [];
  articlesSubscription: Subscription;

  fournisseurs: Fournisseur[] = [];
  fournisseurSubscription: Subscription;

  constructor(public magasinService: MagasinsService,
    public articlesService: ArticlesService,
    public fournisseurService: FournisseursService) { }

  ngOnInit(): void {
    //Magasins
    this.magasinSubscription = this.magasinService.magasinsSubject.subscribe(
      (magasins: Magasin[]) => {
        this.magasins = magasins;
      }
    );
    this.magasinService.getAll();
    // Articles
    this.articlesSubscription = this.articlesService.articlesSubject.subscribe(
      (articles: Article[]) => {
        this.articles = articles;
      }
    );
    this.articlesService.getAll();
    // Fournisseurs
    this.fournisseurSubscription = this.fournisseurService.fournisseursSubject.subscribe(
      (fournisseurs: Fournisseur[]) => {
        this.fournisseurs = fournisseurs;
      }
    );
    this.fournisseurService.getAll();
  }

  onArticles() {
    console.log(JSON.stringify(this.articles));
  } 

}
