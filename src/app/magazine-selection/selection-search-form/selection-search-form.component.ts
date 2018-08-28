import { Component, OnInit } from '@angular/core';
import { GoogleSearchService } from '../../google-search/google-search.service';
import { Language, SearchOptions } from '../../yumpu-stuff/models';
import { YumpuApiService } from '../../yumpu-stuff/providers/yumpu-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selection-search-form',
  templateUrl: './selection-search-form.component.html',
  styleUrls: ['./selection-search-form.component.scss']
})
export class SelectionSearchFormComponent implements OnInit {

  searchQuery: string = ""
  selectedLanguage: Language = null
  loading: boolean = false

  constructor(public yumpuService: YumpuApiService, private router: Router) {

  }

  startSearch() {
    this.loading = true
    this.yumpuService.search(new SearchOptions(this.searchQuery, this.selectedLanguage)).subscribe((res) => {
      this.router.navigate(['selection'])
    }, (error) => {
      this.loading = false
    })
  }

  ngOnInit() {

  }
}
