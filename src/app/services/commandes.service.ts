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
    return this.http.post<any>(environment.apiURL + 'commandes', commande);
  }

  put(commande: Commande) {
      return this.http.put(environment.apiURL + 'commandes/' + commande.idCommande, commande);
  }

  delete(commande: Commande) {
      this.http.delete(environment.apiURL + 'delete/' + commande.idCommande).subscribe(
          (result) => {
              console.log('Delete commande ok!');
          }, (error) => {
              console.log('Error delete commande!' + JSON.stringify(error));
          }
      );
  }

  count() {
      return this.http.get<Commande[]>(environment.apiURL + 'commandes');
  }
}
