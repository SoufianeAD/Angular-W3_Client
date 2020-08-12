import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {Client} from '../../models/Client.models';
import {ClientService} from '../../services/client.service';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit {

  clients: Client[] = [];
  clientSubscription: Subscription;

  constructor(public clientService: ClientService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    // Articles
    this.clientSubscription = this.clientService.clientSubject.subscribe(
        (clients: Client[]) => {
          this.clients = clients;
        }
    );
    this.clientService.getAll();
  }

  onSearch() {

  }

  onDelete(item: Client) {

  }

}
