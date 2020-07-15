import { TestBed } from '@angular/core/testing';

import { ArticleXCommandeService } from './article-xcommande.service';

describe('ArticleXCommandeService', () => {
  let service: ArticleXCommandeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticleXCommandeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
