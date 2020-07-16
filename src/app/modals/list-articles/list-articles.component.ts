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
  articlesBackUp:  Article[] = [];
  articlesSubscription: Subscription;

  constructor(public articlesService: ArticlesService,
              @Inject(MAT_DIALOG_DATA)public data: any,
              public dialogRef: MatDialogRef<ListArticlesComponent>) { }

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

  onSelect(article: Article) {
      this.data = article;
      this.dialogRef.close({ event: 'close', data: article });
  }

    onSearch() {
        const searchKey = (document.getElementById('searchInput') as HTMLInputElement).value.toLowerCase();
        if (searchKey === '') {
            this.articles = this.articlesBackUp;
        } else {
            this.articles.forEach(
                e => {
                    if (!JSON.stringify(e).toString().toLowerCase().includes(searchKey)) {
                        const index = this.articles.indexOf(e);
                        this.articles.splice(index, 1);
                    }
                }
            );

        }
    }

}
