import { Component, OnInit } from '@angular/core';
import { Magasin } from 'app/models/Magasin.models';
import { Subscription } from 'rxjs';
import { MagasinsService } from 'app/services/magasins.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ListArticlesComponent} from '../../modals/list-articles/list-articles.component';
import {ListFournisseursComponent} from '../../modals/list-fournisseurs/list-fournisseurs.component';
import {FormControl, FormGroup} from '@angular/forms';
import {Fournisseur} from '../../models/Fournisseur.models';
import {Article} from '../../models/Article.models';
import {TvaService} from '../../services/tva.service';
import {CommandesService} from '../../services/commandes.service';
import {Commande} from '../../models/Commande.models';
import {ArticleXCommande} from '../../models/ArticleXCommande.models';
import {ArticlesService} from '../../services/articles.service';
import {ArticleXCommandeService} from '../../services/article-xcommande.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-saisie-commande-fournisseur',
  templateUrl: './saisie-commande-fournisseur.component.html',
  styleUrls: ['./saisie-commande-fournisseur.component.css']
})
export class SaisieCommandeFournisseurComponent implements OnInit {

  magasins: Magasin[] = [];
  tvaDefault = 20;
  selectedArticles: Article[] = [];
  magasinSubscription: Subscription;
  commandeForm: FormGroup;
  fournisseurForm: FormGroup;
  articleForm: FormGroup;
  recapForm: FormGroup;
  commande: Commande;
  articleXCommande: ArticleXCommande;

  constructor(public magasinService: MagasinsService,
              public commandeService: CommandesService,
              public articleXcommandeService: ArticleXCommandeService,
              public articleService: ArticlesService,
              public tvaService: TvaService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.init();
    // Magasins
    this.magasinSubscription = this.magasinService.magasinsSubject.subscribe(
      (magasins: Magasin[]) => {
        this.magasins = magasins;
      }
    );
    this.magasinService.getAll();
    this.tvaService.getAll();
    this.commandeService.getAll();
  }

  init() {
    this.commandeForm = new FormGroup({
      numeroCommande: new FormControl(''),
      dateCommande: new FormControl(''),
      dateArrive: new FormControl(''),
      magasins: new FormControl(this.magasins),
    });

    this.fournisseurForm = new FormGroup({
      codeFournisseur: new FormControl(''),
      nomFournisseur: new FormControl(''),
      telephoneFournisseur: new FormControl('')
    });

    this.articleForm = new FormGroup({
      referenceArticle: new FormControl(''),
      designationArticle: new FormControl(''),
      tvaArticle: new FormControl(''),
      quantiteArticle: new FormControl(''),
      prixHTArticle: new FormControl(''),
      prixTTCArticle: new FormControl(''),
      montantTotalArticle: new FormControl('')
    });

    this.recapForm = new FormGroup({
      totalHT: new FormControl(''),
      totalTVA: new FormControl(''),
      totalTTC: new FormControl(''),
      remarque: new FormControl('')
    })
  }

  onArticles() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '85%';
    dialogConfig.data = {
      article: null
    };

    const dialogRef = this.dialog.open(ListArticlesComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
        (result) => {
          if (result !== undefined) {
            this.showArticle(result.data);
          }
        }
    );
  }

  showArticle(article: Article) {
    const ht = ((article.prixVenteArticleTtc) / (1 + (+this.articleForm.get('tvaArticle').value / 100))).toFixed(2);
    this.articleForm.patchValue({referenceArticle: article.refArticle});
    this.articleForm.patchValue({designationArticle: article.designation});
    this.articleForm.patchValue({quantiteArticle: '1'});
    this.articleForm.patchValue({prixHTArticle: ht});
    this.articleForm.patchValue({prixTTCArticle: article.prixVenteArticleTtc});
    this.articleForm.patchValue({montantTotalArticle: article.prixVenteArticleTtc});
  }

  onFournisseurs() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';

    const dialogRef = this.dialog.open(ListFournisseursComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
        (result) => {
          if (result !== undefined) {
            this.showFournisseur(result.data);
          }
        }
    );
  }

  showFournisseur(fournisseur: Fournisseur) {
    this.fournisseurForm.setValue({
      codeFournisseur: fournisseur.idFournisseur,
      nomFournisseur: fournisseur.nom,
      telephoneFournisseur: fournisseur.telephone,
    });
  }

  onQuantite() {
    const montant = +this.articleForm.get('quantiteArticle').value * +this.articleForm.get('prixTTCArticle').value;
    this.articleForm.patchValue({montantTotalArticle: montant});
    const ht = ((this.articleForm.get('prixTTCArticle').value) / (1 + (+this.articleForm.get('tvaArticle').value / 100))).toFixed(2);
    this.articleForm.patchValue({prixHTArticle: ht});
  }

  onSubmit() {
    if (this.commande === undefined) {
      const numeroCommande = this.commandeService.commandes.length !== 0 ? +(+this.commandeService.findLast().numCommande + 1) : 1;
      this.commandeForm.patchValue({numeroCommande: numeroCommande});
      this.commande = new Commande();
      this.commande.numCommande = +this.commandeForm.get('numeroCommande').value;
      this.commande.dateCommande = this.commandeForm.get('dateCommande').value;
      this.commande.idMagasin =  this.commandeForm.get('magasins').value;
      // this.commande.articleXCommande = [];
      this.commandeService.post(this.commande).subscribe(
          (commande) => {
            console.log(JSON.stringify('post commande ok : ' + JSON.stringify(commande)));
            this.commande = commande;
            // articleXcommande
            this.articleXCommande = new ArticleXCommande();
            this.articleXCommande.idArticle = this.articleService.findByRef(this.articleForm.get('referenceArticle').value).idArticle;
            this.articleXCommande.quantiteCommandee = +this.articleForm.get('quantiteArticle').value;
            this.articleXCommande.designation = this.articleForm.get('designationArticle').value;
            this.articleXCommande.idCommande = +this.commande.idCommande;
            this.articleXCommande.prix = +this.articleForm.get('prixTTCArticle').value;
            this.articleXCommande.quantiteLivree = +this.articleForm.get('prixHTArticle').value; // there is no attribute for prix HT
            this.articleXCommande.prixTtc = +this.articleForm.get('montantTotalArticle').value;
            this.articleXCommande.tauxTva = +this.articleForm.get('tvaArticle').value;
            this.articleXCommande.prix = +this.articleForm.get('montantTotalArticle').value;
            // post articleXcommande
            this.articleXcommandeService.post(this.articleXCommande).subscribe(
                (articleXCommande: ArticleXCommande) => {
                  this.articleXCommande = articleXCommande;
                }, (error) => {
                  console.log('Error post ArticleXcommande : ' + JSON.stringify(error));
                }
            );
            this.commande.articleXCommande.push(this.articleXCommande);
            // montant total
            let totalTTC = 0;
            let totalTVA = 0;
            let totalHT = 0;
            // TTC
            this.commande.articleXCommande.forEach( e => totalTTC +=  e.prix)
            this.recapForm.patchValue({totalTTC: totalTTC});
            // HT
            this.commande.articleXCommande.forEach( e => totalHT +=  e.quantiteLivree); // HT
            this.recapForm.patchValue({totalHT: totalHT});
            // TVA
            totalTVA = totalTTC - totalHT;
            this.recapForm.patchValue({totalTVA: totalTVA});
          }, (error) => {
            console.log('Error post commande : ' + JSON.stringify(error));
          }
      );
    } else {
      this.articleXCommande = new ArticleXCommande();
      this.articleXCommande.idArticle = this.articleService.findByRef(this.articleForm.get('referenceArticle').value).idArticle;
      this.articleXCommande.quantiteCommandee = +this.articleForm.get('quantiteArticle').value;
      this.articleXCommande.designation = this.articleForm.get('designationArticle').value;
      this.articleXCommande.idCommande = +this.commande.idCommande;
      this.articleXCommande.prix = +this.articleForm.get('prixTTCArticle').value;
      this.articleXCommande.quantiteLivree = +this.articleForm.get('prixHTArticle').value; // there is no attribute for prix HT
      this.articleXCommande.prixTtc = +this.articleForm.get('montantTotalArticle').value;
      this.articleXCommande.tauxTva = +this.articleForm.get('tvaArticle').value;
      this.articleXCommande.prix = +this.articleForm.get('montantTotalArticle').value;
      alert('articleXcommande : ' + JSON.stringify(this.articleXCommande));
      // post articleXcommande
      this.articleXcommandeService.post(this.articleXCommande).subscribe(
          (result) => {
          }, (error) => {
            console.log('Error post ArticleXcommande : ' + JSON.stringify(error));
          }
      );
      this.commande.articleXCommande.push(this.articleXCommande);
      // montant total
      let totalTTC = 0;
      let totalTVA = 0;
      let totalHT = 0;
      // TTC
      this.commande.articleXCommande.forEach( e => totalTTC +=  e.prix)
      this.recapForm.patchValue({totalTTC: totalTTC});
      // HT
      this.commande.articleXCommande.forEach( e => totalHT +=  e.quantiteLivree); // HT
      this.recapForm.patchValue({totalHT: totalHT});
      // TVA
      totalTVA = totalTTC - totalHT;
      this.recapForm.patchValue({totalTVA: totalTVA});
    }
  }

  onSave() {
    if (this.commande !== undefined) {
      this.commande.remarque = this.recapForm.get('remarque').value;
    }
    this.commandeService.put(this.commande).subscribe(
        (result) => {
          console.log(JSON.stringify('put commande ok : ' + JSON.stringify(result)));
        }, (error) => {
          console.log('Error put commande : ' + JSON.stringify(error));
        }
    );
    this.router.navigate(['/list-commandes']);
  }

  onTVA() {
    const ht = ((this.articleForm.get('prixTTCArticle').value) / (1 + (+this.articleForm.get('tvaArticle').value / 100))).toFixed(2);
    this.articleForm.patchValue({prixHTArticle: ht});
  }

  onDeleteArticle(item: ArticleXCommande) {
    const index = this.commande.articleXCommande.indexOf(item);
    this.commande.articleXCommande.splice(index, 1);
    // montant total
    let totalTTC = 0;
    let totalTVA = 0;
    let totalHT = 0;
    // TTC
    this.commande.articleXCommande.forEach( e => totalTTC +=  e.prix);
    this.recapForm.patchValue({totalTTC: totalTTC});
    // HT
    this.commande.articleXCommande.forEach( e => totalHT +=  e.quantiteLivree); // HT
    this.recapForm.patchValue({totalHT: totalHT});
    // TVA
    totalTVA = totalTTC - totalHT;
    this.recapForm.patchValue({totalTVA: totalTVA});
  }
}
