import { Injectable } from '@angular/core';
import { Fournisseur } from 'app/models/Fournisseur.models';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FournisseursService {

  fournisseurs: Fournisseur[] = [];
  fournisseursSubject = new Subject<Fournisseur[]>();

  constructor(private http: HttpClient) { }

  emitFournisseursSubject() {
    this.fournisseursSubject.next(this.fournisseurs);
  }

  getAll() {
    this.http.get<Fournisseur[]>(environment.apiURL + 'fournisseurs').subscribe(
      (fournisseurs: Fournisseur[]) => {
        this.fournisseurs = fournisseurs;
        this.emitFournisseursSubject();
      }, (error) => {
        console.log('Error get Fournisseurs : ' + JSON.stringify(error));
      }
    );
  }
}
