import { Injectable } from '@angular/core';
import { Magasin } from 'app/models/Magasin.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MagasinsService {

  magasins: Magasin[] = [];
  magasinsSubject = new Subject<Magasin[]>();

  constructor(private http: HttpClient) { }

  emitMagasins() {
    this.magasinsSubject.next(this.magasins);
  }

  getAll() {
    this.http.get<Magasin[]>( environment.apiURL + 'magasins').subscribe(
      (magasins: Magasin[]) => {
        this.magasins = magasins;
        this.emitMagasins();
      }, (error) => {
        console.log('Error get Magasins : ' + JSON.stringify(error));
      }
    );
  }

  findById(id: number): Magasin {
    return this.magasins.find(e => e.idMagasin === id);
  }

}
