import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Client} from '../models/Client.models';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clients: Client[] = [];
  clientSubject = new Subject<Client[]>();

  constructor(private http: HttpClient) { }

  emitClients() {
    this.clientSubject.next(this.clients);
  }

  getAll() {
    this.http.get<Client[]>( environment.apiURL + 'clients').subscribe(
        (clients: Client[]) => {
          this.clients = clients;
          this.emitClients();
        }, (error) => {
          console.log('Error get Clients : ' + JSON.stringify(error));
        }
    );
  }

  count() {
      return  this.http.get<Client[]>( environment.apiURL + 'clients');
  }
}
