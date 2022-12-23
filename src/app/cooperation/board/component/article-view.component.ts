import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Article } from './article.model';

@Component({
  selector: 'app-article-view',
  template: `
    <nz-page-header nzTitle="제목" [nzSubtitle]="article?.title">
      <nz-page-header-content>
          {{article?.fromDate}}
      </nz-page-header-content>
    </nz-page-header>

    <div [innerHTML]="article?.contents">
    </div>

    <app-nz-file-upload
    [fileList]="fileList">
  </app-nz-file-upload>
  `,
  styles: [`
    nz-page-header {
      border: 1px solid rgb(235, 237, 240);
    }
  `]
})
export class ArticleViewComponent implements OnInit {

  @Input() article?: Article;

  fileList: any = [];

  constructor() { }

  ngOnInit() {
    this.fileList = this.article?.fileList ?? [];
  }

}
