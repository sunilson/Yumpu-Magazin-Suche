import { Component, OnInit } from '@angular/core';
import { GoogleSearchService } from '../../google-search/google-search.service';
import { Language, SearchOptions } from '../../yumpu-stuff/models';
import { YumpuApiService } from '../../yumpu-stuff/providers/yumpu-api.service';
import { Router } from '@angular/router';
import { TranslationService } from '../../util/translation.service';
import { lang } from 'moment';

@Component({
  selector: 'app-selection-search-form',
  templateUrl: './selection-search-form.component.html',
  styleUrls: ['./selection-search-form.component.scss']
})
export class SelectionSearchFormComponent implements OnInit {

  searchQuery: string = ""
  selectedLanguage: Language = null
  loading: boolean = false
  translating: boolean = false

  constructor(public yumpuService: YumpuApiService, private router: Router, private translationService: TranslationService) {

  }

  startSearch() {
    this.loading = true
    this.yumpuService.search(new SearchOptions(this.searchQuery, this.selectedLanguage)).subscribe((res) => {
      this.router.navigate(['selection'])
    }, (error) => {
      this.loading = false
    })
  }

  translate(language: Language) {
    this.translating = true
    this.translationService.translateString(this.searchQuery, language).subscribe(value => {
      this.searchQuery = value
      this.translating = false
    }, error => {
      this.translating = false
    })
  }

  ngOnInit() {

  }
}
