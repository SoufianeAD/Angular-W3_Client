import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ArticleXCommande} from '../models/ArticleXCommande.models';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticleXCommandeService {

  articleXcommandes: ArticleXCommande[] = [];
  articleXcommandesSubject = new Subject<ArticleXCommande[]>();

  constructor(private http: HttpClient) { }

  emitArticlesXCommandesSubject() {
    this.articleXcommandesSubject.next(this.articleXcommandes);
  }

  getAll() {
    this.http.get<ArticleXCommande[]>( environment.apiURL + 'articlexcommandes').subscribe(
        (articleXcommandes) => {
          this.articleXcommandes = articleXcommandes;
          this.emitArticlesXCommandesSubject();
        }
    );
  }
}
