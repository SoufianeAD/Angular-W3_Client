import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'app/services/articles.service';
import { Article } from 'app/models/Article.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent implements OnInit {

  articles: Article[] = [];
  articlesSubscription: Subscription;

  constructor(public articlesService: ArticlesService) { }

  ngOnInit(): void {
     // Articles
     this.articlesSubscription = this.articlesService.articlesSubject.subscribe(
      (articles: Article[]) => {
        this.articles = articles;
      }
    );
    this.articlesService.getAll();
  }

}
