import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {FournisseursService} from '../../services/fournisseurs.service';
import {Fournisseur} from '../../models/Fournisseur.models';

@Component({
  selector: 'app-add-fournisseur',
  templateUrl: './add-fournisseur.component.html',
  styleUrls: ['./add-fournisseur.component.css']
})
export class AddFournisseurComponent implements OnInit {

  fournisseurForm: FormGroup;

  constructor(private router: Router,
              public fournisseurService: FournisseursService) { }

  ngOnInit(): void {
    this.init();
    this.fournisseurService.getAll();
  }

  init() {
    this.fournisseurForm = new FormGroup({
      nom: new FormControl(),
      telephone: new FormControl()
    });
  }

  clear() {
    this.fournisseurForm.patchValue({nom: ''});
    this.fournisseurForm.patchValue({telephone: ''});
  }

  onSubmit() {
    const fournisseur = new Fournisseur();
    fournisseur.nom = this.fournisseurForm.get('nom').value;
    fournisseur.telephone = this.fournisseurForm.get('telephone').value;
    this.fournisseurService.post(fournisseur).subscribe(
        (f: Fournisseur) => {
          this.clear();
          console.log('Post Fournisseur ok : ' + JSON.stringify(f));
          this.router.navigate(['/list-fournisseur']);
        }, (error) => {
          console.log('Error post Fournisseur : ' + JSON.stringify(error));
        }
    );
  }

}
