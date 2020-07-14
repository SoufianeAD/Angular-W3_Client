import {Component, Inject, OnInit} from '@angular/core';
import { ArticlesService } from 'app/services/articles.service';
import { Article } from 'app/models/Article.models';
import { Subscription } from 'rxjs';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrls: ['./list-articles.component.css']
})
export class ListArticlesComponent implements OnInit {

  articles: Article[] = [];
  articlesSubscription: Subscription;

  constructor(public articlesService: ArticlesService,
              @Inject(MAT_DIALOG_DATA)public data: any,
              public dialogRef: MatDialogRef<ListArticlesComponent>) { }

  ngOnInit(): void {
     // Articles
     this.articlesSubscription = this.articlesService.articlesSubject.subscribe(
      (articles: Article[]) => {
        this.articles = articles;
      }
    );
    this.articlesService.getAll();
  }

  onSelect(article: Article) {
      this.data = article;
      this.dialogRef.close({ event: 'close', data: article });
  }

}
