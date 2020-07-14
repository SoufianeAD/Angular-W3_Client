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

@Component({
  selector: 'app-saisie-commande-fournisseur',
  templateUrl: './saisie-commande-fournisseur.component.html',
  styleUrls: ['./saisie-commande-fournisseur.component.css']
})
export class SaisieCommandeFournisseurComponent implements OnInit {

  magasins: Magasin[] = [];
  selectedArticles: Article[] = [];
  magasinSubscription: Subscription;
  commandeForm: FormGroup;
  fournisseurForm: FormGroup;
  articleForm: FormGroup;

  constructor(public magasinService: MagasinsService,
              public commandeService: CommandesService,
              public tvaService: TvaService,
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
      numeroCommande: new FormControl(
          this.commandeService.findLast() !== undefined ? this.commandeService.findLast().idCommande + 1 : 1),
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
    this.articleForm.setValue({
      referenceArticle: article.refArticle,
      designationArticle: article.designation,
      tvaArticle: this.tvaService.findById(article.idTva).tauxTva,
      quantiteArticle: '',
      prixHTArticle: article.prixVenteArticleHt,
      prixTTCArticle: article.prixAchatTtc,
      montantTotalArticle: ''
    });
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
  }

  onSubmitCommande() {
  }

  onSubmitFournisseur() {
  }

  onSubmitArticle() {
  }

}
