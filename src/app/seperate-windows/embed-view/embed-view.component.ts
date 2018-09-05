import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageRepositoryService } from '../../storage/local-storage-repository.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MagazineSearchResult } from '../../yumpu-stuff/models';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-embed-view',
  templateUrl: './embed-view.component.html',
  styleUrls: ['./embed-view.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EmbedViewComponent implements OnInit {

  embedCode: any = ""
  public searchResult: MagazineSearchResult

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public storage: LocalStorageRepositoryService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      //Load search result
      this.storage.loadSingleResult(params["id"]).then(result => {
        console.log(result)
        this.embedCode = this.sanitizer.bypassSecurityTrustHtml(result.embed)
        this.searchResult = result
      })
    })
  }
}
