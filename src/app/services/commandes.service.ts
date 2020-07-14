import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Commande} from '../models/Commande.models';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommandesService {

  commandes: Commande[] = [];
  commandesSubject = new Subject<Commande[]>()

  constructor(private http: HttpClient) { }

  emitCommandeSubject() {
    this.commandesSubject.next(this.commandes);
  }

  getAll() {
    this.http.get<Commande[]>(environment.apiURL + 'commandes').subscribe(
        (commandes: Commande[]) => {
          this.commandes = commandes;
          this.emitCommandeSubject();
        }
    );
  }

  findLast(): Commande {
      return this.commandes[this.commandes.length - 1];
  }

  post(commande: Commande) {
    this.http.post(environment.apiURL + 'commandes', commande).subscribe(
        (result) => {
          console.log(JSON.stringify(result));
        }, (error) => {
          console.log(JSON.stringify(error));
        }
    );
  }
}
