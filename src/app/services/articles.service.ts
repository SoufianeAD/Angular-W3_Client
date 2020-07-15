import { Injectable } from '@angular/core';
import { Article } from 'app/models/Article.models';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  articles: Article[] = [];
  articlesSubject = new Subject<Article[]>();

  constructor(private http: HttpClient) { }

  emitArticles() {
    this.articlesSubject.next(this.articles);
  }

  getAll() {
    this.http.get<Article[]>( environment.apiURL + 'articles').subscribe(
      (articles: Article[]) => {
        this.articles = articles;
        this.emitArticles();
      }, (error) => {
        console.log('Error get Articles : ' + JSON.stringify(error));
      }
    );
  }

  findByRef(ref: string): Article {
    return this.articles.find(e => e.refArticle === ref);
  }

  findById(id: number): Article {
    return this.articles.find(e => e.idArticle === id);
  }
}
