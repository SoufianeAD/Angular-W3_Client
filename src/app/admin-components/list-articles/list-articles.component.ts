import { Component, OnInit } from '@angular/core';
import {Article} from '../../models/Article.models';
import {Subscription} from 'rxjs';
import {ArticlesService} from '../../services/articles.service';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent implements OnInit {

  articles: Article[] = [];
  articlesBackUp:  Article[] = [];
  articlesSubscription: Subscription;

  constructor(public articlesService: ArticlesService) { }

  ngOnInit(): void {
    this.refresh();
  }

  refresh() {
    // Articles
    this.articlesSubscription = this.articlesService.articlesSubject.subscribe(
        (articles: Article[]) => {
          this.articles = articles;
          this.articlesBackUp = articles;
        }
    );
    this.articlesService.getAll();
  }

    onSearch() {

    }

  onDelete(item: Article) {
    
  }
}
