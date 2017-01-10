import { DocumentsService } from './../../../../shared/documents.service';
import { Component, OnInit, OnChanges, OnDestroy, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { DbMainmenu } from './../../../../db-models/portal';
import { DbTopic } from './../../../../db-models/organ';

@Component({
  selector: 'app-documents-center',
  templateUrl: './documents-center.component.html',
  styleUrls: ['./documents-center.component.css']
})
export class DocumentsCenterComponent implements OnInit, OnChanges, OnDestroy {

  public viewTopics: Observable<DbTopic[]>;
  private idSub: Subscription;
  public mainmenu: Observable<DbMainmenu>;
  private contentId: number;

  constructor(public documentsService: DocumentsService, private r: ActivatedRoute) { }

  ngOnInit() {
    this.mainmenu = this.r.data.pluck<DbMainmenu>('data');
    this.idSub = this.r.data.pluck<DbMainmenu>('data').distinctUntilChanged().subscribe(data => {
      this.contentId = data.mme_content_id;
      this.viewTopics = this.documentsService.loadViewTopics(this.contentId);
    });
  }

  public ngOnChanges(changes: SimpleChanges) {
    this.viewTopics = this.documentsService.loadViewTopics(this.contentId);
  }

  ngOnDestroy() {
    if (this.idSub) {
      this.idSub.unsubscribe();
    }
  }
}