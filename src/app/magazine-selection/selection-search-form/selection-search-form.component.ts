import { Component, OnInit } from '@angular/core';
import { GoogleSearchService } from '../../google-search/google-search.service';
import { Language, SearchOptions, SearchOptionsOrdering } from '../../yumpu-stuff/models';
import { YumpuApiService } from '../../yumpu-stuff/providers/yumpu-api.service';
import { Router } from '@angular/router';
import { TranslationService } from '../../util/translation.service';
import { lang } from 'moment';
import { MatDialog, MatSnackBar } from '@angular/material';
import { AdvancedSearchComponent } from '../advanced-search/advanced-search.component';
import * as moment from "moment"

@Component({
  selector: 'app-selection-search-form',
  templateUrl: './selection-search-form.component.html',
  styleUrls: ['./selection-search-form.component.scss']
})
export class SelectionSearchFormComponent implements OnInit {

  currentSearchOptions = new SearchOptions()
  loading: boolean = false
  translating: boolean = false

  constructor(
    public yumpuService: YumpuApiService,
    private router: Router,
    private translationService: TranslationService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {

  }

  startSearch() {
    this.loading = true
    this.yumpuService.search(this.currentSearchOptions).subscribe((res) => {
      this.router.navigate(['selection'])
    }, (error) => {
      this.loading = false
      this.snackbar.open("Fehler bei API Anfrage", "", {
        duration: 2000
      });
    })
  }

  translate(language: Language) {
    this.translating = true
    this.translationService.translateString(this.currentSearchOptions.query, language).subscribe(value => {
      this.currentSearchOptions.query = value
      this.translating = false
    }, error => {
      this.translating = false
    })
  }

  advancedSearch() {
    const dialogRef = this.dialog.open(AdvancedSearchComponent, {
      width: '400px',
      data: { searchOptions: this.currentSearchOptions },
      disableClose: false
    })

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.currentSearchOptions = result
      }
    });
  }

  ngOnInit() {

  }
}
