import { Injectable } from '@angular/core';
import {Tva} from '../models/Tva.models';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TvaService {

  tvas: Tva[] = [];
  tvasSubject = new Subject<Tva[]>();

  constructor(private http: HttpClient) { }

  emitTvasSubject() {
    this.tvasSubject.next(this.tvas);
  }

  getAll() {
    this.http.get<Tva[]>(environment.apiURL + 'tvas').subscribe(
        (tvas: Tva[]) => {
          this.tvas = tvas;
          this.emitTvasSubject();
        }
    );
  }

  findById(id: number): Tva {
    return this.tvas.find( e => e.idTva === id);
  }
}
